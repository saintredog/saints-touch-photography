#!/usr/bin/env python3
"""
ClearTrace Agent Monitor
Live dashboard showing all spawned Claude agents and their status.
Run: python3 app.py
"""

import json
import os
import subprocess
import time
from datetime import datetime
from pathlib import Path
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

DB_FILE = Path(__file__).parent / "agents.json"

def load_agents():
    if DB_FILE.exists():
        with open(DB_FILE) as f:
            return json.load(f)
    return {}

def save_agents(agents):
    with open(DB_FILE, "w") as f:
        json.dump(agents, f, indent=2)

def check_pid_alive(pid):
    try:
        os.kill(int(pid), 0)
        return True
    except (OSError, ValueError):
        return False

def check_file_progress(output_files):
    """Check which output files exist and their sizes."""
    result = []
    for f in output_files:
        p = Path(f)
        if p.exists():
            size = p.stat().st_size
            mtime = datetime.fromtimestamp(p.stat().st_mtime).strftime("%H:%M:%S")
            result.append({"file": p.name, "size": size, "mtime": mtime, "done": True})
        else:
            result.append({"file": Path(f).name, "size": 0, "mtime": None, "done": False})
    return result

def all_files_done(output_files):
    return bool(output_files) and all(Path(f).exists() for f in output_files)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/agents")
def api_agents():
    agents = load_agents()
    now = time.time()
    for aid, agent in agents.items():
        pid = agent.get("pid")
        output_files = agent.get("output_files", [])
        if agent.get("status") == "running":
            pid_dead = pid and not check_pid_alive(pid)
            files_done = all_files_done(output_files)
            # Only auto-complete if ALL output files exist (PID dead is just informational)
            if files_done:
                agent["status"] = "done"
                agent["ended_at"] = agent.get("ended_at") or datetime.now().strftime("%H:%M:%S")
                agent["ended_ts"] = agent.get("ended_ts") or time.time()
            elif pid_dead and not output_files:
                # No files to track — fall back to PID death
                agent["status"] = "done"
                agent["ended_at"] = agent.get("ended_at") or datetime.now().strftime("%H:%M:%S")
                agent["ended_ts"] = agent.get("ended_ts") or time.time()
        if output_files:
            agent["file_progress"] = check_file_progress(output_files)
        elapsed = None
        if agent.get("started_ts"):
            end_ts = agent.get("ended_ts") or now
            elapsed = int(end_ts - agent["started_ts"])
        agent["elapsed"] = elapsed
    save_agents(agents)
    return jsonify(list(agents.values()))

@app.route("/api/register", methods=["POST"])
def register_agent():
    data = request.json
    agents = load_agents()
    aid = data.get("id") or str(int(time.time() * 1000))
    agents[aid] = {
        "id": aid,
        "label": data.get("label", "Agent"),
        "sections": data.get("sections", ""),
        "pid": data.get("pid"),
        "session_id": data.get("session_id"),
        "status": "running",
        "started_at": datetime.now().strftime("%H:%M:%S"),
        "started_ts": time.time(),
        "ended_at": None,
        "ended_ts": None,
        "output_files": data.get("output_files", []),
        "file_progress": [],
        "project": data.get("project", "ClearTrace"),
        "phase": data.get("phase", ""),
        "notes": data.get("notes", ""),
    }
    save_agents(agents)
    return jsonify({"ok": True, "id": aid})

@app.route("/api/complete", methods=["POST"])
def complete_agent():
    data = request.json
    agents = load_agents()
    aid = data.get("id")
    if aid in agents:
        agents[aid]["status"] = "done"
        agents[aid]["ended_at"] = datetime.now().strftime("%H:%M:%S")
        agents[aid]["ended_ts"] = time.time()
        agents[aid]["summary"] = data.get("summary", "")
    save_agents(agents)
    return jsonify({"ok": True})

@app.route("/api/clear", methods=["POST"])
def clear_done():
    agents = load_agents()
    agents = {k: v for k, v in agents.items() if v.get("status") == "running"}
    save_agents(agents)
    return jsonify({"ok": True})

if __name__ == "__main__":
    print("🔍 Agent Monitor running at http://localhost:7799")
    app.run(host="0.0.0.0", port=7799, debug=False)

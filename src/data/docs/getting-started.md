# Getting Started with Kmux

Welcome to **Kmux** (quest multiplexer) — a control plane for multi-project, multi-AI development. Every project is a quest. Kmux multiplexes them all.

Think of it as tmux for your entire workflow: one command switches your complete project context—like changing save files in a game.

## What is Kmux?

Kmux solves the context-switching chaos of modern development:

- **Instant quest switching**: One command switches tmux sessions, port ranges, and environment
- **Zero port collisions**: Auto-assigned 100-port ranges per quest (3000-3099, 3100-3199, etc.)
- **AI tool coordination**: MCP server lets AI assistants see your quest state (coming in v0.2)
- **Quest tracking**: Always know which quest is running, suspended, or stopped

Every codebase is a quest—whether it's a client project, side project, or open-source contribution. kmux manages them all so you can switch between quests instantly without losing context.

## Installation

### macOS

```bash
# Using Homebrew (recommended)
brew install kmux

# Or download binary
curl -fsSL https://kmux.dev/install.sh | bash
```

### Linux

```bash
# Using install script
curl -fsSL https://kmux.dev/install.sh | bash

# Or manual installation
wget https://github.com/plmelo/kmux/releases/latest/kmux-linux-amd64
chmod +x kmux-linux-amd64
sudo mv kmux-linux-amd64 /usr/local/bin/kmux
```

### From Source

```bash
git clone https://github.com/plmelo/kmux.git
cd kmux
make build
sudo mv bin/kmux /usr/local/bin/
```

## Initial Setup

After installation, run the setup wizard:

```bash
kmux setup
```

The wizard will:
1. Configure shell completion (bash/zsh/fish)
2. Verify tmux is installed
3. Set default port range (starts at 3000 by default)
4. Enable analytics (optional, privacy-first)

**Requirements:**
- **tmux** version 3.0+ (install via `brew install tmux` or `apt install tmux`)
- **Go** 1.21+ (only for building from source)

## Quick Start: Your First Quest

### 1. Initialize a Quest

Navigate to your project directory and register it with kmux:

```bash
cd ~/projects/my-app
kmux init
```

You'll be prompted for a project name (defaults to directory name). This creates:
- `.kmux.yaml` — Project configuration file
- Registry entry in `~/.kmux/projects.json`
- Auto-assigned port range (e.g., 3000-3099)

**Example output:**
```
Project name: my-app
✓ Initialized project 'my-app' (ports 3000-3099)
```

### 2. Configure Your tmux Layout

Edit `.kmux.yaml` to define your workspace:

```yaml
name: my-app
port_start: 3000
port_end: 3099

tmux:
  session_name: my-app
  windows:
    - name: server
      panes:
        - command: npm run dev
    - name: editor
      panes:
        - command: nvim
    - name: shell
      panes:
        - command: ""  # Empty shell
```

**Available options:**
- `windows`: List of tmux windows to create
- `panes`: Commands to run in each pane (empty string = just a shell)
- `command`: Startup command for the pane

### 3. Start Your Quest

```bash
kmux up
```

This command:
- Creates a tmux session with your configured layout
- Sets `PORT=3000` and `PORT_RANGE=3000-3099` in all panes
- Runs startup commands
- Transitions quest state to RUNNING

**Attach to the tmux session:**
```bash
kmux up --attach
# or manually:
tmux attach -t my-app
```

### 4. Check Project Status

```bash
kmux status
```

**Example output:**
```
Project: my-app
State:   RUNNING
Ports:   3000-3099
Path:    /home/user/projects/my-app

tmux session: my-app
  Window 0: server
    Pane 0: npm run dev (running)
  Window 1: editor
    Pane 0: nvim (running)
  Window 2: shell
    Pane 0: bash (running)
```

### 5. Stop Your Project

```bash
kmux down
```

This kills the tmux session and sets project state to STOPPED. Port allocation remains reserved.

## Working with Multiple Quests

### Register Multiple Quests

```bash
# Quest 1: Client frontend
cd ~/projects/frontend
kmux init --name frontend
# Assigned ports: 3000-3099

# Quest 2: API backend
cd ~/projects/backend
kmux init --name backend
# Assigned ports: 3100-3199

# Quest 3: Side project
cd ~/projects/mobile
kmux init --name mobile
# Assigned ports: 3200-3299
```

### List All Quests

```bash
kmux list
```

**Example output:**
```
┌──────────┬─────────────┬───────────┬─────────────────────────┐
│ NAME     │ STATE       │ PORTS     │ PATH                    │
├──────────┼─────────────┼───────────┼─────────────────────────┤
│ frontend │ RUNNING     │ 3000-3099 │ /home/user/projects/... │
│ backend  │ STOPPED     │ 3100-3199 │ /home/user/projects/... │
│ mobile   │ SUSPENDED   │ 3200-3299 │ /home/user/projects/... │
└──────────┴─────────────┴───────────┴─────────────────────────┘
```

### Switch Between Quests

The `switch` command is the heart of kmux — like changing save files:

```bash
kmux switch backend
```

This command:
1. Suspends your current quest (if any)
2. Resumes (or starts) the target quest
3. Switches your tmux client to the new session

**One command switches your entire context.** It's like loading a different save file — all your terminals, servers, and environment variables switch instantly.

### Use PORT Environment Variable

Every tmux pane in a kmux project has access to:
- `PORT` — Port range start (e.g., 3000)
- `PORT_RANGE` — Full range (e.g., 3000-3099)

**Example: Start a dev server on the correct port**

`.kmux.yaml`:
```yaml
tmux:
  windows:
    - name: server
      panes:
        - command: npm run dev -- --port $PORT
```

Or in your code:
```javascript
// server.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on ${port}`));
```

**Why 100 ports per project?**
Most projects need 2-5 ports (frontend, backend, database, etc.). 100-port ranges ensure you never run out and never collide.

## Advanced Usage

### Custom Port Ranges

Override auto-assignment with `--port`:

```bash
kmux init --name special-project --port 5000
# Assigns ports 5000-5099
```

Useful for projects that require specific ports (e.g., matching production).

### Force Re-registration

Overwrite an existing project or recover from errors:

```bash
kmux init --force
```

### Check Specific Project Status

```bash
kmux status backend
```

### Show Port Range

```bash
kmux port backend
# Output: backend: 3100-3199
```

### Remove a Project

Unregister a project (deletes registry entry and `.kmux.yaml`):

```bash
kmux rm backend
```

### Health Check

Verify kmux installation and dependencies:

```bash
kmux doctor
```

Checks:
- tmux installed and running
- Config files valid
- Project registry integrity
- Port range allocations
- State file consistency

## Configuration Files

### Project Config: `.kmux.yaml`

Located in each project directory. Defines tmux layout and startup behavior.

**Full example:**
```yaml
name: my-full-stack-app
port_start: 3000
port_end: 3099

tmux:
  session_name: my-full-stack-app
  windows:
    - name: frontend
      panes:
        - command: cd client && npm run dev
    - name: backend
      panes:
        - command: cd server && npm start
    - name: db
      panes:
        - command: docker-compose up postgres
    - name: logs
      panes:
        - command: tail -f logs/app.log
    - name: shell
      panes:
        - command: ""
```

### Global Config: `~/.kmux/config.yaml`

System-wide preferences:

```yaml
analytics:
  enabled: true  # Privacy-first usage analytics

port:
  start: 3000   # First auto-assigned port
  range: 100    # Ports per project

tmux:
  prefix: "C-b"  # tmux prefix key
  shell: "/bin/zsh"

notifications:
  enabled: true
```

### Project Registry: `~/.kmux/projects.json`

Auto-managed file tracking all projects (don't edit manually):

```json
{
  "projects": {
    "frontend": {
      "name": "frontend",
      "path": "/home/user/projects/frontend",
      "port_start": 3000,
      "port_end": 3099,
      "state": "RUNNING",
      "created_at": "2026-03-01T12:00:00Z"
    }
  },
  "next_port_range": 3100
}
```

## Quest States

kmux tracks three quest states:

| State | Description | Commands |
|-------|-------------|----------|
| **STOPPED** | Quest registered but not running | `kmux init`, `kmux down` |
| **RUNNING** | tmux session active, you're on this quest | `kmux up`, `kmux switch <this>` |
| **SUSPENDED** | tmux session exists but paused (like a background save) | `kmux switch <other>` |

**State Transitions:**
```
STOPPED ─(kmux up)→ RUNNING
RUNNING ─(kmux switch other)→ SUSPENDED
RUNNING ─(kmux down)→ STOPPED
SUSPENDED ─(kmux switch this)→ RUNNING
```

Think of it like a game: STOPPED = quest not started, RUNNING = actively playing, SUSPENDED = paused save.

## Tips & Best Practices

### 1. Use Descriptive Quest Names

Good: `saas-frontend`, `client-api`, `oss-contribution`
Avoid: `app`, `project1`, `test`

Think of quest names like save file names — you should know what's inside without opening it.

### 2. Configure tmux Layouts for Your Quest

Most developers use 2-4 windows per quest:
- **server** — Dev servers, watch processes
- **editor** — Vim/Emacs/etc.
- **shell** — Git, commands, exploration
- **logs** — Monitoring, debugging

### 3. Add kmux to Your Onboarding Docs

Make `kmux init` the first step for new team members. Encode your team's workspace layout in `.kmux.yaml` and check it into git. New devs can start their quest in seconds.

### 4. Leverage Port Ranges

Document which ports your services use:
```yaml
# .kmux.yaml comments
# PORT+0 (3000): Frontend dev server
# PORT+1 (3001): Backend API
# PORT+2 (3002): WebSocket server
# PORT+3 (3003): Storybook
```

### 5. Use kmux with AI Coding Tools

When Claude Code, Cursor, or Copilot finishes a task, you'll know exactly which project it was. Set terminal title to include project name:

```yaml
tmux:
  windows:
    - name: server
      panes:
        - command: |
            echo -ne "\033]0;kmux: my-app\007"
            npm run dev
```

## Troubleshooting

### "tmux not found"

Install tmux:
```bash
# macOS
brew install tmux

# Ubuntu/Debian
sudo apt install tmux

# Fedora/RHEL
sudo dnf install tmux
```

### "Port range already in use"

Check existing allocations:
```bash
kmux list
kmux port <project>
```

Force re-init with custom port:
```bash
kmux init --force --port 5000
```

### "Project already registered"

Use `--force` to overwrite:
```bash
kmux init --force
```

### tmux Session Won't Start

Run diagnostics:
```bash
kmux doctor
tmux list-sessions
```

Check `.kmux.yaml` syntax (must be valid YAML).

### Lost Track of Running Projects

```bash
kmux list
kmux status  # Shows current directory's project
```

## What's Next?

kmux v0.1 is the **CLI foundation**. Upcoming versions:

- **v0.2 (MCP Server)** — AI tools can query project state via Model Context Protocol
- **v0.3 (Terminal Capture)** — AI gets full terminal history for better context
- **v0.4 (Cloud Sync)** — Sync projects across machines, team features

### MCP Server Preview (v0.2)

The MCP server will expose project data to AI tools:

```bash
kmux mcp serve
```

AI tools (Claude Desktop, etc.) can then:
- Query which projects are running: `kmux://projects`
- Read terminal output: `kmux://projects/my-app/terminal`
- Update task status: Write to `kmux://projects/my-app/status`

**This enables AI tools to coordinate** — no more asking "which project am I in?"

## Community & Support

- **GitHub**: [github.com/plmelo/kmux](https://github.com/plmelo/kmux)
- **Issues**: Report bugs and request features
- **Discussions**: Share workflows, ask questions

## License

kmux is proprietary software with a free CLI tier. See LICENSE for details.

---

---

**You're all set!** Start with `kmux init` in your project directory and begin your quest. Switch between quests instantly, never lose context, and finally have all your projects under control.

Every project is a quest. Kmux multiplexes them all.

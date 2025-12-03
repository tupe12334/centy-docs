---
sidebar_position: 7
---

# CLI Reference

Complete reference for all Centy CLI commands.

## Global Options

These options are available for all commands:

| Option | Description |
|--------|-------------|
| `--help`, `-h` | Show help for a command |
| `--version`, `-v` | Show Centy version |
| `--quiet`, `-q` | Suppress non-essential output |
| `--json` | Output results as JSON |

## Project Management

### `centy init`

Initialize Centy in the current directory.

```bash
centy init [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--priority-levels <n>` | Number of priority levels | `3` |
| `--default-state <state>` | Default state for new issues | `"open"` |
| `--force` | Overwrite existing configuration | `false` |

**Examples:**

```bash
centy init
centy init --priority-levels 5
centy init --default-state backlog
```

### `centy status`

Show project status and statistics.

```bash
centy status
```

**Output includes:**
- Total issues by status
- Issues by priority
- Recent activity

## Issue Commands

### `centy create issue`

Create a new issue.

```bash
centy create issue [title] [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--priority <n>` | Priority level | Config default |
| `--status <state>` | Initial status | Config default |
| `--template <name>` | Template to use | None |
| `--description <text>` | Issue description | None |

**Examples:**

```bash
centy create issue
centy create issue "Fix login bug"
centy create issue "Fix login bug" --priority 1
centy create issue "Add dark mode" --template feature-request
```

### `centy list issues`

List all issues in the project.

```bash
centy list issues [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--status <state>` | Filter by status | All |
| `--priority <n>` | Filter by priority | All |
| `--sort <field>` | Sort by field | `created` |
| `--limit <n>` | Limit results | All |

**Examples:**

```bash
centy list issues
centy list issues --status open
centy list issues --priority 1 --status in-progress
centy list issues --sort updated --limit 10
```

### `centy show issue`

Display details of a specific issue.

```bash
centy show issue <id>
```

**Arguments:**

- `id`: Issue display number or UUID

**Examples:**

```bash
centy show issue 1
centy show issue 6a740dbd-ec2d-45f9-9927-fdcb6c3d3801
```

### `centy update issue`

Update issue metadata.

```bash
centy update issue <id> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--status <state>` | New status |
| `--priority <n>` | New priority |
| `--<field> <value>` | Update custom field |

**Examples:**

```bash
centy update issue 1 --status in-progress
centy update issue 1 --priority 2
centy update issue 1 --status review --assignee "john"
```

### `centy close issue`

Close an issue.

```bash
centy close issue <id> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--comment <text>` | Closing comment |

**Examples:**

```bash
centy close issue 1
centy close issue 1 --comment "Fixed in v2.1.0"
```

### `centy delete issue`

Delete an issue permanently.

```bash
centy delete issue <id> [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--force` | Skip confirmation | `false` |

**Examples:**

```bash
centy delete issue 1
centy delete issue 1 --force
```

### `centy search issues`

Search issues by content.

```bash
centy search issues <query> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--status <state>` | Filter by status |
| `--priority <n>` | Filter by priority |

**Examples:**

```bash
centy search issues "login"
centy search issues "authentication" --status open
```

## Documentation Commands

### `centy create doc`

Create a new document.

```bash
centy create doc <title> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--template <name>` | Template to use |
| `--slug <slug>` | URL-friendly slug |

**Examples:**

```bash
centy create doc "API Reference"
centy create doc "Users API" --template api --slug users
```

### `centy list docs`

List all documents.

```bash
centy list docs
```

### `centy show doc`

Display a document.

```bash
centy show doc <slug>
```

### `centy delete doc`

Delete a document.

```bash
centy delete doc <slug> [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--force` | Skip confirmation | `false` |

## Asset Commands

### `centy add asset`

Add an asset to an issue.

```bash
centy add asset <issue-id> <file-path>
```

**Examples:**

```bash
centy add asset 1 ./screenshot.png
centy add asset 1 ./error-log.txt
```

### `centy list assets`

List assets attached to an issue.

```bash
centy list assets <issue-id>
```

### `centy remove asset`

Remove an asset from an issue.

```bash
centy remove asset <issue-id> <filename>
```

## Template Commands

### `centy list templates`

List available templates.

```bash
centy list templates [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--type <type>` | Filter by type (`issue` or `doc`) |

### `centy show template`

Display template content.

```bash
centy show template <name>
```

### `centy validate template`

Validate template syntax.

```bash
centy validate template <name>
```

## Maintenance Commands

### `centy repair`

Repair Centy data structures.

```bash
centy repair <target>
```

**Targets:**

- `manifest`: Rebuild the manifest file
- `metadata`: Repair issue metadata
- `all`: Repair everything

**Examples:**

```bash
centy repair manifest
centy repair all
```

### `centy export`

Export issues to various formats.

```bash
centy export [options]
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `--format <format>` | Output format (`json`, `csv`, `md`) | `json` |
| `--output <file>` | Output file | stdout |
| `--status <state>` | Filter by status | All |

**Examples:**

```bash
centy export --format json > issues.json
centy export --format csv --output issues.csv
centy export --format md --status open
```

### `centy import`

Import issues from external sources.

```bash
centy import <file> [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--format <format>` | Input format (`json`, `csv`, `github`) |
| `--dry-run` | Preview without importing |

## Exit Codes

| Code | Description |
|------|-------------|
| `0` | Success |
| `1` | General error |
| `2` | Invalid arguments |
| `3` | Issue not found |
| `4` | Configuration error |
| `5` | File system error |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CENTY_CONFIG` | Path to config file |
| `CENTY_PRIORITY_LEVELS` | Override priority levels |
| `CENTY_DEFAULT_STATE` | Override default state |
| `NO_COLOR` | Disable colored output |

## Next Steps

- [Configuration](./configuration) - Configure Centy behavior
- [LLM Integration](./llm-integration) - AI assistant integration

---
sidebar_position: 2
---

# Installation

Get Centy up and running in your development environment.

## Requirements

- Node.js 18 or higher
- npm, yarn, or pnpm

## Install via npm

```bash
npm install -g centy-cli
```

## Install via yarn

```bash
yarn global add centy-cli
```

## Install via pnpm

```bash
pnpm add -g centy-cli
```

## Verify Installation

After installation, verify that Centy is available:

```bash
centy --version
```

## Initialize a Project

Navigate to your project directory and initialize Centy:

```bash
cd your-project
centy init
```

This creates the `.centy/` folder structure with default configuration.

## Initialize with Options

You can customize the initialization:

```bash
# Initialize with custom priority levels
centy init --priority-levels 5

# Initialize with custom default state
centy init --default-state "backlog"
```

## Updating Centy

To update to the latest version:

```bash
# npm
npm update -g centy-cli

# yarn
yarn global upgrade centy-cli

# pnpm
pnpm update -g centy-cli
```

## Uninstalling

To remove Centy from your system:

```bash
# npm
npm uninstall -g centy-cli

# yarn
yarn global remove centy-cli

# pnpm
pnpm remove -g centy-cli
```

## Next Steps

After installation, proceed to [Configuration](./configuration) to customize Centy for your project.

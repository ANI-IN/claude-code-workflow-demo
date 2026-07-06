# Project
Camera-surveillance platform. TypeScript backend that ingests camera
streams and serves snapshot frames through an image pipeline.

# Map
- src/api/        public device + snapshot API routes
- src/integrations/ per-camera integration modules
- src/pipeline/   frame processing (resize, encode) — add format work here
- tests/          test suite; the source of truth for "correct"

# Commands
- Run tests: `npm test`
- Lint:      `npm run lint`

# Code Style
- 2-space indentation, named exports only.
- All camera/device endpoints must use TLS (https:// / rtsps://).
- Never hardcode credentials; read them from config.

# Workflow
Follow Explore -> Plan -> Code -> Commit.
- Explore & plan in Plan Mode before editing.
- State explicit success criteria in every plan.
- Validate against tests/ before considering work done.
- Run the code-reviewer subagent before committing.

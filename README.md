# The Claude Code Workflow: Explore, Plan, Code, Commit

A small Claude Code teaching demo. It walks you through the four step loop that keeps Claude Code reliable: **Explore, Plan, Code, Commit**. In about 15 minutes you take one real feature, adding WebP conversion to a camera snapshot pipeline, through all four steps, and you practice course correcting early while it is cheapest.

All examples use TypeScript.

## 1. Project Overview

This repository is a compact, self contained Claude Code demo built around a camera surveillance theme. The sample code is a TypeScript backend that ingests camera streams and serves snapshot frames through an image pipeline. The demo exists to teach a working habit rather than to ship a product:

- Let Claude read the code and propose a plan before writing anything.
- Approve the plan and let Claude implement it against a test suite.
- Get a fresh eyes review from a subagent, then a commit message in your style.

The feature used to teach the loop is a WebP conversion step for the snapshot pipeline. You build it yourself as you follow the exercises.

## 2. Important Note on Intentional Flaws

**Some parts of this demo are intentionally incomplete or imperfect, and they must not be fixed.** They are deliberate teaching markers that create the "before" state of the exercise. If you remove or repair them, the demo no longer teaches what it is meant to teach.

The clearest example lives in `src/pipeline/imagePipeline.ts`. It carries a marker comment stating that WebP conversion is not implemented yet, and calling the pipeline with the WebP format throws an error on purpose. The matching WebP case in `tests/imagePipeline.test.ts` is written to fail until the feature is built. This is not a defect. It is the starting point that lets a learner build the feature during the Code step.

Treat every such marker as intentional. Notice it, understand why it is there, and leave it in place. The point of the exercise is to build the missing feature yourself, following the workflow, not to quietly patch the markers.

## 3. Prerequisites

- Claude Code installed and running, so that `claude` is available in your terminal.
- Node.js version 18 or newer.
- For the test suite, nothing beyond Node.js. The `npm test` script runs the tests through `ts-node`, which is declared as a dev dependency and installed for you by `npm install`.

## 4. Installation

1. Clone the repository and move into it:

   ```bash
   git clone https://github.com/ANI-IN/claude-code-workflow-demo.git
   cd claude-code-workflow-demo
   ```

2. Install dependencies. This installs the dev tooling the test suite runs on, which is `ts-node` and `typescript`:

   ```bash
   npm install
   ```

## 5. Project Structure

```
claude-code-workflow-demo/
├── CLAUDE.md                 Project conventions Claude reads (TLS, credentials, style)
├── INSTRUCTIONS.md           The lesson walkthrough in Markdown
├── README.md                 This file
├── package.json              Scripts and the dev tooling the tests run on
├── tsconfig.json             TypeScript settings used by ts-node
├── The Claude Code Workflow_ Explore, Plan, Code, Commit.docx   The source lesson document
├── .gitignore                Ignore rules for operating system and editor noise
├── .claude/
│   └── agents/
│       └── code-reviewer.md  The read only reviewer subagent used in the Commit step
├── src/
│   ├── api/
│   │   └── snapshot.ts        Public route: validates host, pulls a frame, runs the pipeline
│   ├── integrations/
│   │   └── onvifCamera.ts     Pulls a raw JPEG snapshot from a camera over a TLS endpoint
│   └── pipeline/
│       └── imagePipeline.ts   Frame processing. The WebP feature is built here during the demo
├── tests/
│   └── imagePipeline.test.ts  The source of truth for correct. WebP cases fail until built
└── exercises/
    ├── README.md                    How to use the exercises, plus the lesson takeaways
    ├── 01-explore-and-plan.md        Explore and Plan in Plan Mode
    ├── 02-code-against-the-plan.md   Code against the test suite
    └── 03-commit-with-review.md      Commit after a read only subagent review
```

## 6. Running the Demos

### Demo A: The workflow walkthrough

This is the main demo. It takes you through Explore, Plan, Code, and Commit.

1. Start Claude Code from inside the project folder:

   ```bash
   claude
   ```

2. Follow the exercises in the `exercises/` folder in order, or read the walkthrough in `INSTRUCTIONS.md`. Both cover the same loop.
3. You will enter Plan Mode, review and revise a plan, implement WebP conversion against the tests, run a read only subagent review, and generate a commit message in your style.

### Demo B: The snapshot pipeline test suite

The test suite is the source of truth the Code step validates against.

1. Install dependencies with `npm install` if you have not already. This provides `ts-node` and `typescript`.
2. Run the tests:

   ```bash
   npm test
   ```

   You can also run them without a local install:

   ```bash
   npx ts-node -e "require('./tests/imagePipeline.test').run()"
   ```

3. Observe the result. In the starting state, the JPEG passthrough case passes and the WebP case fails on purpose, because the feature is not built yet. That failure is expected and intentional. It turns green once you implement WebP conversion during the Code step.

## 7. Exercises

The `exercises/` folder contains one step by step guide per stage of the loop, derived directly from the lesson:

- `exercises/README.md` explains how to use the guides and lists the key takeaways.
- `exercises/01-explore-and-plan.md`, `exercises/02-code-against-the-plan.md`, and `exercises/03-commit-with-review.md` walk you from start to finish.

Each guide tells you what to do, what to observe, what to look for in the code, and the intended learning outcome. Work through them in order, and keep each one open while you run the matching step in Claude Code. Start with `exercises/README.md`.

## 8. Additional Notes

- **Conventions.** `CLAUDE.md` holds the project conventions Claude reads on every session: all camera and device endpoints must use TLS, credentials are never hardcoded and come from config, and the code style is two space indentation with named exports only. The exercises point these out so you can see how conventions shape both the implementation and the review.
- **The review step.** The Commit step uses the read only `code-reviewer` subagent defined in `.claude/agents/code-reviewer.md`. It runs in its own context for a fresh eyes pass before you commit, so it does not carry the bias the main agent picked up while writing the change.
- **Lesson source.** The lesson lives in two forms in this repository: `INSTRUCTIONS.md` for quick reading and the original `.docx` for the full workshop version. The exercises are derived from both.
- **Scope.** This is a teaching demo, not production software. The camera integration and pipeline are deliberately minimal so the workflow stays in focus.

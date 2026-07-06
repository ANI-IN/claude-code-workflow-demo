# Exercises: The Claude Code Workflow

These exercises turn the lesson **The Claude Code Workflow: Explore, Plan, Code, Commit** into a hands on walkthrough you can run yourself. You will take one real feature, adding WebP conversion to a camera snapshot pipeline, through the full four step loop, and practice course correcting early while it is cheapest.

All examples use TypeScript.

## How to use these exercises

1. Read the root `README.md` first for the project overview, prerequisites, and how to run the demo.
2. Open the project folder in your terminal and start Claude Code:

   ```bash
   cd claude-code-workflow-demo
   claude
   ```

3. Work through the exercises in order. Each file is one step of the loop and builds on the one before it:
   - `01-explore-and-plan.md` reads the code and produces a plan in Plan Mode.
   - `02-code-against-the-plan.md` approves the plan and implements it against the test suite.
   - `03-commit-with-review.md` runs a read only subagent review, then writes a commit message in your style.
4. Keep each exercise open while you work. Do what the **Steps** section says, watch for what the **What to observe** section calls out, and read the **Look at the code** notes so you understand why each move matters.

## Key takeaways from the lesson

- Explore and Plan in Plan Mode (Shift + Tab) so Claude proposes an approach before editing anything.
- Course correct on the plan. It is the cheapest place to fix direction, because no code exists yet.
- Code against clear success criteria and a reliable test suite that acts as the source of truth.
- Commit only after a read only subagent review, then generate a commit message in your style.
- The loop ties the other ideas together: Plan Mode for exploring, `CLAUDE.md` for conventions, subagents for review, and context discipline throughout.

## A note on the starting state

The demo ships intentionally incomplete. WebP conversion is not built yet, and the WebP test is written to fail until you build it. These are deliberate teaching markers, not defects. Notice them, understand why they are there, and leave them in place until the Code step asks you to implement the feature. See the section on intentional flaws in the root `README.md` for more.

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Claude starts editing before you are ready | You are not in Plan Mode. Press Shift + Tab until the footer reads "plan mode on". |
| The plan misses requirements | Add explicit success criteria to your prompt and ask for a revision before approving. |
| Tests pass but the result is wrong | The tests are not a reliable source of truth yet. Tighten them first, then run them again. |
| The reviewer repeats the main agent's blind spots | Confirm it is a separate subagent with read only tools, not the same thread reviewing itself. |

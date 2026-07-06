# The Claude Code Workflow: Explore → Plan → Code → Commit

A hands-on walkthrough of the four-step loop that keeps Claude Code reliable. In about 15 minutes you will take a real feature — adding WebP conversion to a camera snapshot pipeline — through Explore, Plan, Code, and Commit, course-correcting early while it is cheapest.

All examples use TypeScript.

In this demo, we will:

- Let Claude read the code and propose a plan before writing anything.
- Approve the plan and let Claude implement it against a test suite.
- Get a fresh-eyes review from a subagent, then a commit message in our style.

---

## Background: why this loop

Most people jump straight to "write the code," which means more correcting later. The Explore → Plan → Code → Commit loop front-loads the thinking, so problems get caught before any code exists — where they are cheapest to fix.

| Step | What it does |
|---|---|
| Explore | Gives Claude the context it needs about your project. |
| Plan | Produces an approach you can review and measure success against. |
| Code | The back-and-forth to reach the final implementation. |
| Commit | Review and push, then start the next feature. |

---

## Prerequisites

- Claude Code installed and running (`claude` is available in your terminal).
- The `demo-5-workflow` folder from the workshop bundle. Open it:

```bash
cd demo-5-workflow
claude
```

This folder contains a small snapshot pipeline, a test suite, a `CLAUDE.md`, and a read-only code-reviewer subagent — everything the loop needs.

---

## Step 1 — Explore and Plan (in Plan Mode)

Plan Mode lets Claude read the code but **not edit it**, so it can propose an approach safely.

Enter Plan Mode by pressing **Shift + Tab** until the footer reads "plan mode on". Then prompt:

```
I need to add WebP conversion to our snapshot pipeline. Figure out where
in the pipeline it should happen, whether we need a new dependency, and
how to approach it. Keep all endpoints TLS-only per our conventions.
```

Claude reads `src/pipeline/`, `src/api/`, and the tests, then returns a plan — likely proposing the conversion inside `src/pipeline/imagePipeline.ts`, where raw frames are already processed.

This is the best place to course-correct. Review the plan. If anything is off — wrong location, missing a step, no test coverage — ask for a revision now, before any code is written:

```
Revise: keep the original frame too, and add a test that asserts the
output is valid WebP.
```

---

## Step 2 — Code (against the plan)

When the plan looks right, **Approve** it. Claude works through the steps. You can let it auto-accept edits or confirm each one.

Two things make this phase smoother, and both are already set up in this demo:

- **Success criteria.** The plan should state what "correct" looks like. Here it is concrete: the pipeline returns WebP bytes, the original frame is preserved, and the tests pass.
- **A test suite as the source of truth.** Run it after the change:

```
npm test
```

`tests/imagePipeline.test.ts` validates the conversion. If a test fails, Claude troubleshoots against it rather than guessing. If Claude hits the same issue repeatedly, ask it to save the fix to `CLAUDE.md` so it is not rediscovered next time.

---

## Step 3 — Commit (with a fresh-eyes review)

Before committing, get a second opinion from a subagent. It runs in its own context, so it does not carry the bias the main agent picked up while writing the code this session.

```
Use the code-reviewer subagent to review the WebP changes before I commit.
```

The reviewer reads the changed files and returns a structured assessment — security, correctness, and whether it is ready to merge. Address anything it flags.

Then have Claude write the commit message in your style:

```
Write a commit message for these changes in our conventional-commits style.
```

Review, commit, and you are ready to start the next feature. Rinse and repeat.

---

## Summary

- Explore and Plan in Plan Mode (Shift + Tab) so Claude proposes an approach before editing anything.
- Course-correct on the plan — it is the cheapest place to fix direction.
- Code against clear success criteria and a reliable test suite.
- Commit only after a read-only subagent review, then generate a commit message in your style.
- This loop ties the other lessons together: Plan Mode (explore), CLAUDE.md (conventions), subagents (review), and context discipline throughout.

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Claude starts editing before you are ready | You are not in Plan Mode. Press Shift + Tab until the footer reads "plan mode on". |
| The plan misses requirements | Add explicit success criteria to your prompt and ask for a revision before approving. |
| Tests pass but the result is wrong | The tests are not a reliable source of truth yet. Tighten them first, then re-run. |
| The reviewer repeats the main agent's blind spots | Confirm it is a separate subagent with read-only tools, not the same thread reviewing itself. |

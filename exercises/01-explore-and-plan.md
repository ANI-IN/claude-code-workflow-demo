# Exercise 1: Explore and Plan (in Plan Mode)

**Goal:** Let Claude read the codebase and propose an approach for adding WebP conversion, before a single line of code is written. This is the Explore and Plan half of the loop, and it is the cheapest place to catch problems.

## Background

Plan Mode lets Claude read your code but not edit it. Claude gathers context and returns a plan of action that you can review and measure against your own success criteria. Because nothing is written yet, this is the best moment to course correct.

## Steps

1. Open the project folder in your terminal and start Claude Code. The lesson opens the workshop bundle folder like this:

   ```
   cd demo-5-workflow
   claude
   ```

   If you cloned this repository, the folder is named after the repository instead. Either way, start `claude` from inside the project.

2. Enter Plan Mode. Press **Shift + Tab** until the footer reads "plan mode on".

3. Ask Claude to explore and plan the feature. Use a prompt like this one from the lesson:

   ```
   I need to add WebP conversion to our snapshot pipeline. Figure out where
   in the pipeline it should happen, whether we need a new dependency, and
   how to approach it. Keep all endpoints TLS-only per our conventions.
   ```

4. Read the plan Claude returns. Decide whether it meets your criteria. If anything is off, such as the wrong location, a missing step, or no test coverage, ask for a revision now, before any code is written. The lesson uses this revision:

   ```
   Revise: keep the original frame too, and add a test that asserts the
   output is valid WebP.
   ```

5. Do not approve yet. Stop here once you have a plan you are happy with. You will approve and implement it in Exercise 2.

## What to observe

- In Plan Mode, Claude reads files but never edits them. Watch the footer to confirm it reads "plan mode on" before you send the prompt.
- Claude will likely read `src/pipeline/`, `src/api/`, and the tests, then propose doing the conversion inside `src/pipeline/imagePipeline.ts`, where raw frames are already processed.
- The plan is a proposal, not a commitment. Requesting a revision here costs nothing, because no code exists yet.

## Look at the code

Open `src/pipeline/imagePipeline.ts` and study the starting state. Notice two things:

- The `FrameOptions` type allows a `"webp"` format, yet the code carries the marker comment that says WebP is not implemented yet.
- Calling `processFrame` with `{ format: "webp" }` throws `WebP conversion not implemented yet`.

These are intentional. They describe the "before" state of the exercise and tell you exactly what the feature needs to do. Read the `FEATURE TASK` and `Success criteria` comments at the top of the file. They are your target for Exercise 2. Do not change anything yet, and do not treat the marker or the throw as bugs to patch. They are the deliberate starting point.

## Learning outcome

You practiced the Explore and Plan half of the loop. You saw that Plan Mode keeps Claude read only while it gathers context, and that reviewing and revising the plan is the cheapest way to steer direction, before any code exists.

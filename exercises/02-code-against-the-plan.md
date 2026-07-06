# Exercise 2: Code (Against the Plan)

**Goal:** Approve the plan from Exercise 1 and let Claude implement WebP conversion, using the test suite as the source of truth. This is the Code step of the loop.

## Background

Once the plan looks right, you approve it and Claude works through the steps. Two things keep this phase smooth, and both are already set up in this demo:

- **Success criteria.** The plan should state what "correct" looks like. Here it is concrete: the pipeline returns WebP bytes, the original frame is preserved, and the tests pass.
- **A test suite as the source of truth.** `tests/imagePipeline.test.ts` validates the conversion, so Claude troubleshoots against real feedback instead of guessing.

## Steps

1. When the plan looks right, **Approve** it. Claude begins working through the steps. You can let it auto accept file edits or confirm each one.

2. After the change, run the tests:

   ```
   npm test
   ```

3. Read the result. If a test fails, let Claude troubleshoot against the failing assertion rather than guessing. The failing test tells Claude precisely what "correct" means.

4. If Claude keeps running into the same issue, ask it to save the solution to its `CLAUDE.md` file, so it does not rediscover the fix next time.

5. Stop when the tests pass and you have reviewed the change yourself. You will commit in Exercise 3.

## What to observe

- Approving the plan is the moment Claude switches from read only exploration to making edits. You chose when that happened.
- The WebP cases in `tests/imagePipeline.test.ts` are written to fail until the feature exists. Watch them move from failing to passing as the implementation lands.
- A test that fails for the right reason is useful. It is the signal that guides the implementation.

## Look at the code

Open `tests/imagePipeline.test.ts` and read it before you run anything:

- `RAW_JPEG` is a tiny fake frame that starts with JPEG magic bytes.
- The WebP assertion checks that the output starts with the `RIFF` magic bytes that begin every WebP file.
- The comment at the top states plainly that the WebP cases are written to fail until the feature is implemented during the Code step.

This is the intentional starting marker in action. The failing WebP test is not a defect in the demo. It is the source of truth that defines the feature. Let the Code step make it pass rather than weakening the test.

Then open `src/pipeline/imagePipeline.ts` again and compare the implementation against the `Success criteria` comment at the top of the file. The feature is done when the pipeline can return WebP bytes, the original frame is still available, and the tests pass.

## Learning outcome

You practiced the Code step. You approved a reviewed plan, implemented against clear success criteria, and used a reliable test suite as the source of truth so that troubleshooting was grounded in real feedback rather than guesswork.

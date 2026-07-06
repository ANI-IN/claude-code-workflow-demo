# Exercise 3: Commit (with a Fresh Eyes Review)

**Goal:** Before you push, get a second opinion from a read only subagent, then have Claude write a commit message in your style. This is the Commit step that closes the loop.

## Background

A subagent runs in its own context. It gets a fresh pair of eyes on the code and does not carry the bias the main agent picked up while writing the change this session. That independence is the point, because it lets the reviewer catch what the author missed.

## Steps

1. Once you have tested the change yourself and are happy with it, ask Claude to run a review with the read only code reviewer subagent:

   ```
   Use the code-reviewer subagent to review the WebP changes before I commit.
   ```

2. Read the structured assessment the reviewer returns. It covers security, correctness, and whether the change is ready to merge. Address anything it flags.

3. When the review is clean, ask Claude to write the commit message in your style:

   ```
   Write a commit message for these changes in our conventional-commits style.
   ```

4. Review the message, commit, and you are ready to start the next feature. Rinse and repeat.

## What to observe

- The reviewer reads only the changed files and returns a report. Confirm it runs as a separate subagent with read only tools, not the same thread reviewing its own work.
- A fresh context is what catches the blind spots. If the same thread reviewed itself, it would tend to repeat its own assumptions.
- The commit message reflects your conventions, because you asked for your style rather than a generic message.

## Look at the code

Open `CLAUDE.md` at the project root. This is where the project conventions live, and it is part of what both the reviewer and the main agent read. Notice the rules the review will hold the change to, such as using TLS for every camera and device endpoint, never hardcoding credentials, and keeping to named exports with two space indentation. A good commit is one that respects these conventions.

The reviewer itself is defined in `.claude/agents/code-reviewer.md`. Open it to see that it is restricted to read only tools, which is what lets it review your work without editing it.

## Learning outcome

You practiced the Commit step. You used an independent read only subagent for a fresh eyes review before committing, then generated a commit message in your own style. Together with the earlier exercises, you have now run the full Explore, Plan, Code, Commit loop from start to finish.

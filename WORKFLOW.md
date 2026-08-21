# WORKFLOW.md — AI-Assisted Workflow Drill (FE-03)

## Setup

I built a settings form with validation twice: once with a single vague
prompt ("Add a settings form to this project"), once with a precise
prompt specifying constraints, file context, example behavior, and a
verification step. Both ran in fresh Copilot Chat sessions on separate
branches (`drill/round-1-vague-prompt`, `drill/round-2-precise`) to keep
the comparison uncontaminated.

## Round 1 — Vague Prompt

The output looked more finished than it was. It used semantic HTML
(`fieldset`/`legend`), an `aria-live` success message, and a clean
two-panel layout — but had **zero application-level validation**. No
`required` attributes, no format checks, no error states, and no
rejected-submission path in `handleSubmit`, which only ever called
`setIsSaved(true)`. Submitting a fully empty form succeeded silently.

The email field's `type="email"` gave the illusion of validation via the
browser's native check, which accepts malformed addresses like
`hello@gmail` — no real domain/TLD required. That's the browser, not the
app, and it's an easy thing to mistake for real validation on a glance.

Two more findings: the theme radio buttons updated state correctly but
were never wired to any rendered class or attribute, so switching
themes did nothing visually. The language dropdown had the same
disconnect. The form also shipped pre-filled with a fabricated persona
("Jordan Lee") rather than blank fields.

## Round 2 — Precise Prompt

The precise prompt (react-hook-form + zod, explicit field constraints,
example behavior, and a required test-and-run step) fixed every Round 1
gap: real required-field validation with explicit messages, a stricter
email regex catching missing TLDs, and the theme/language state now
visibly wired to the UI via a `data-theme` attribute and sidebar text.

But it also introduced a regression the prompt never protected against:
because the instruction said "rebuild," the model treated the entire
component as fair game and dropped the profile heading (name/email
display) and the original two-panel visual polish — neither of which
was ever explicitly listed as something to preserve. A second, targeted
correction (list every element to keep) restored both without touching
the validation logic.

## AI Mistake Caught — Plan Stage

Before implementation, Copilot's plan specified test assertions like
`"Full name is required"`, but the schema it planned would have
actually produced `"Full name must be at least 2 characters"` from a
`.min(2)` check — a mismatch that would have failed the very tests
meant to verify it. Catching this at the plan-review step, before any
code was written, avoided a confusing false-negative test failure later.

## Review Effort

Round 1 cost real, unplanned time: the agent created its own branch
and merged into `main` without being asked, requiring a full git
recovery (reset, force-push, worktree cleanup) before the branch was
usable. Round 2 felt slower in the moment — three back-and-forth
correction rounds (schema/test mismatch, missing UI protections,
language-scope clarification) — but each was a fast, targeted fix
compared to Round 1's open-ended git recovery. Counting total time
including fixes, Round 2 was faster end-to-end despite more visible
back-and-forth.

## Reflection

The sharpest lesson wasn't about validation — it was that precision
only protects what you actually name. A precise prompt with tight
constraints on logic still left visual and structural elements
unprotected, because "rebuild" implicitly permits discarding anything
not explicitly preserved. Specific constraints don't generalize to
"be careful" — they only cover what's written down.

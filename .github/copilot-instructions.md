# Front-End AI Engineering Capstone — Copilot Instructions

## Purpose

This file provides guidance for GitHub Copilot when working in this repository. VS Code automatically applies these instructions to Copilot Chat requests within this workspace.
Follow these conventions unless the user explicitly requests otherwise.

---

## Technology Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5
* CSS3

### Development Tools

* Node.js (LTS)
* Git
* GitHub
* Visual Studio Code

### AI Tools

AI assistance may come from GitHub Copilot, Gemini CLI, Antigravity, or other
free AI coding tools.

Focus on engineering principles and best practices rather than tool-specific
workflows unless explicitly requested.

---

## Coding Standards

When generating or reviewing code:

* Prefer semantic HTML.
* Write modern JavaScript (ES6+).
* Build small, reusable React components.
* Keep components focused on a single responsibility.
* Prioritize readability over cleverness.
* Prefer maintainable solutions over unnecessary complexity.
* Avoid unnecessary dependencies.
* Follow accessibility and responsive design best practices.

---

## Git Workflow

Use the Conventional Commits 1.0.0 specification for every commit.

Common commit types:

* `feat`
* `fix`
* `docs`
* `refactor`
* `style`
* `test`
* `perf`
* `chore`

Branching:

* Primary branch: `main` — no direct commits.
* Each task or piece of work happens on its own feature branch, merged via
  pull request. No fixed module-numbering scheme for this repo.

---

## AI Collaboration Guidelines

When assisting with this repository:

* Explain concepts before providing complete solutions whenever practical.
* Encourage understanding rather than copying.
* Explain trade-offs when multiple valid solutions exist.
* Recommend an approach based on the project context without presenting it
  as the only correct solution.
* Review AI-generated code critically before it is committed.
* Prioritize maintainability, accessibility, performance, and security.
* Ask clarifying questions when requirements are ambiguous.
* Keep recommendations concise unless detailed explanations are requested.
* Remember that this repository is both a learning resource and a
  professional portfolio.

## Project Rules (from FE-03 AI-Assisted Workflow Drill)

- Forms use react-hook-form + zod. Validation error messages must be
  explicit and required-specific (e.g. "Full name is required"), never
  left to a validator's default message or an unvalidated empty state.

- Any prompt requesting a "rebuild" or "redesign" of an existing component
  must explicitly list every UI element that must be preserved (headings,
  layout structure, specific styling). Unlisted elements will be silently
  dropped in a full rewrite, not kept by default.

- Any UI state that changes on user interaction (theme, language,
  selection, etc.) must be visibly wired to something rendered on screen.
  Verify this by checking the actual UI, not just the state value in dev
  tools or React DevTools.

---

## Documentation Guidelines

* Keep documentation concise and accurate.
* Update documentation when implementation changes.
* Avoid duplicating information already documented elsewhere.
* Refer to `README.md` for repository structure and navigation.
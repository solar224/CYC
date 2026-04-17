# Refactoring Ticket: Token Alias Removal and CSS Variable Sync

## Owner

Frontend Platform / UI Architecture

## Priority

P1 (Maintainability)

## Background

The token system currently exposes both semantic tokens and backward-compatible aliases under `appTokens.color.*`.
This helped reduce migration risk but now increases cognitive load and can cause inconsistent token usage across components.

## Scope

- Migrate component usage from `appTokens.color.*` aliases to `appTokens.semantic.*`.
- Remove alias block from `src/theme/tokens.js` after migration is complete.
- Define and document canonical CSS variables generated from JS tokens at theme bootstrap time.

## Non-Goals

- Visual redesign.
- Breaking route or layout behavior.

## Deliverables

1. Usage inventory of alias references.
2. Component migration PR(s) by feature area.
3. Alias removal PR.
4. Updated token usage guide.

## Acceptance Criteria

- No references to deprecated alias paths remain in `src/**/*.{js,jsx,ts,tsx}`.
- `src/theme/tokens.js` no longer exports backward-compat alias map.
- Build passes and no visual regressions in header/footer/floating actions.

## Rollout Plan

1. Phase 1: Add linter rule or grep check for deprecated paths.
2. Phase 2: Migrate by feature slices.
3. Phase 3: Remove aliases and enforce semantic tokens only.

## Risk and Mitigation

- Risk: Style regressions from incorrect token mapping.
- Mitigation: Snapshot checks for key shell components and manual QA on light/dark mode.

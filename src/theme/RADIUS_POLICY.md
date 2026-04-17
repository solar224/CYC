# Radius Policy

This file defines the component-level radius strategy to keep UI corners visually consistent.

## Scale Tokens

- `appTokens.radius.base` = `4`
- `appTokens.radius.sm` = `8`
- `appTokens.radius.md` = `12`
- `appTokens.radius.lg` = `16`
- `appTokens.radius.xl` = `20`
- `appTokens.radius.pill` = `999px`
- `appTokens.radius.circle` = `50%`
- `appTokens.radius.squircle` = `35%`

## Component Roles

- `appTokens.radiusRoles.button` = `12px`
- `appTokens.radiusRoles.card` = `20px`
- `appTokens.radiusRoles.floating` = `16px`
- `appTokens.radiusRoles.field` = `12px`
- `appTokens.radiusRoles.chip` = `8px`
- `appTokens.radiusRoles.indicator` = `8px`
- `appTokens.radiusRoles.micro` = `4px`
- `appTokens.radiusRoles.pill` = `999px`
- `appTokens.radiusRoles.circle` = `50%`
- `appTokens.radiusRoles.fab` = `35%`

## Usage Rules

1. Buttons and clickable controls: use `radiusRoles.button`.
2. Cards and major content surfaces: use `radiusRoles.card`.
3. Floating shells (dialogs, toolbars, floating panels): use `radiusRoles.floating`.
4. Inputs and editable fields: use `radiusRoles.field`.
5. Chips, tags, tiny labels: use `radiusRoles.chip`.
6. Small visual indicators and tracks: use `radiusRoles.indicator` or `radiusRoles.micro`.
7. Pills and fully rounded markers: use `radiusRoles.pill`.
8. Perfect circles: use `radiusRoles.circle`.
9. FAB-like rounded squares: use `radiusRoles.fab`.

## Implementation Rule

Do not hardcode border radius values in component code. Use `appTokens.radiusRoles.*` (or in rare low-level cases `appTokens.radius.*`) to avoid drift.

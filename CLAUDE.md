# CLAUDE.md — Evo Components Design System

Rules for implementing Figma designs in this codebase using the Model Context Protocol.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Bundler | Vite 7 |
| Routing | React Router v7 |
| Styling | Plain CSS (no Tailwind, no CSS Modules, no Styled Components) |
| Language | TypeScript with `verbatimModuleSyntax` — always `import type` for type-only imports |

---

## Project Structure

```
src/
├── index.css          ← global reset + ALL design tokens (:root)
├── main.tsx           ← entry point
├── App.tsx            ← router setup
├── components/        ← shared UI components (each has .tsx + .css)
│   ├── Badge.tsx / Badge.css
│   ├── Button.tsx / Button.css
│   ├── IconButton.tsx / IconButton.css
│   ├── Layout.tsx / Layout.css
│   ├── Sidebar.tsx / Sidebar.css
│   ├── StatCards.tsx / StatCards.css
│   ├── Table.tsx / Table.css
│   ├── Tabs.tsx / Tabs.css
│   ├── Tooltip.tsx / Tooltip.css
│   ├── ChatPanel.tsx / ChatPanel.css
│   ├── DropdownMenu.tsx / DropdownMenu.css
│   └── Nudge.tsx / Nudge.css
├── pages/             ← route-level pages (each has .tsx + .css)
│   ├── Home.tsx / Home.css
│   ├── Inventory.tsx / Inventory.css
│   ├── Policies.tsx / Policies.css
│   ├── CreatePolicy.tsx / CreatePolicy.css
│   ├── AssetDetails.tsx / AssetDetails.css
│   ├── RepositoryDetails.tsx / RepositoryDetails.css
│   ├── IssueDetails.tsx / IssueDetails.css
│   ├── ScansJobs.tsx / ScansJobs.css
│   ├── Reports.tsx / Reports.css
│   └── ReportView.tsx / ReportView.css
└── data/
    └── mockData.ts    ← all mock data
```

---

## Design Tokens

**Single source of truth:** `src/index.css` — all tokens are CSS custom properties at `:root`.

**Never hard-code hex values.** Always use a token. If no token exists for a Figma value, add one to `src/index.css` first.

### Color tokens

```css
/* Backgrounds */
--color-bg: #18181b              /* page canvas */
--color-bg-sidebar: #111113      /* sidebar */
--color-bg-surface: #27272a      /* cards, panels, table headers */
--color-bg-surface-hover: #2f2f34
--color-bg-badge: #09090b

/* Borders */
--color-border: #3f3f46
--color-border-secondary: #52525c

/* Foreground / text */
--color-fg: #f4f4f5              /* primary text */
--color-fg-secondary: #d4d4d8
--color-fg-tertiary: #9f9fa9
--color-fg-muted: #71717a

/* Brand / accent */
--color-highlight: #cbabee       /* purple brand — use for links, deltas, active states */
--color-link: var(--color-highlight)
--color-brand: var(--color-highlight)
--color-brand-dim: #1e1030

/* Severity */
--color-critical-bg: #9f0712    --color-critical-fg: #ffe2e2
--color-high-bg: #9f2d00        --color-high-fg: #ffedd4
--color-medium-bg: #894b00      --color-medium-fg: #fef9c2
--color-low-bg: #52525c         --color-low-fg: #d4d4d8

/* Status */
--color-success-bg: #14532d     --color-success-fg: #86efac
--color-active-bg: #3f3f46      --color-active-fg: #d4d4d8
--color-info-bg: #024a70        --color-info-border: #74d4ff    --color-info-fg: #8ec5ff
--color-running-bg: #dff2fe     --color-running-fg: #00598a     --color-running-border: #0069a8
```

### Figma token mapping

When Figma output uses `--p-color-*` (Polaris-style tokens), map them to our tokens:

| Figma token | Our token |
|---|---|
| `--p-color-bg` | `--color-bg-surface` |
| `--p-color-bg-fill` | `--color-bg-surface` |
| `--p-color-bg-inverse` | `--color-fg` |
| `--p-color-border` | `--color-border` |
| `--p-color-text` | `--color-fg` |
| `--p-color-text-secondary` | `--color-fg-secondary` |
| `--p-color-text-tertiary` | `--color-fg-tertiary` |
| `--p-color-text-inverse` | `--color-bg` |
| `--p-color-text-disabled` | `rgba(255,255,255,0.24)` |
| `--p-color-border-disabled` | `rgba(255,255,255,0.06)` |
| `primitives/white` | `var(--color-fg)` |
| `primitives/black` | `var(--color-bg)` |
| `primitives/neutral/900` | `var(--color-bg)` |
| `primitives/neutral/800` | `var(--color-bg-surface)` |

### Typography & shape tokens

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
```

---

## Styling Rules

1. **Plain CSS only.** No Tailwind. All Figma Tailwind output MUST be converted to plain CSS.
2. **BEM naming.** Components use `.block__element--modifier` (e.g. `.stat-card__label`, `.btn--primary`).
3. **Component CSS lives next to the component.** `Badge.tsx` imports `./Badge.css`.
4. **Page CSS lives next to the page.** `Policies.tsx` imports `./Policies.css`.
5. **Shared table styles** are in `Table.css` — import it in any page that uses a table: `import '../components/Table.css'`.
6. **Dark mode only.** The app has no light mode. Do not add `@media (prefers-color-scheme)` overrides.
7. **No inline styles** except for dynamic values (e.g. `style={{ width: `${pct}%` }}`).

---

## Component Patterns

### Component file structure

```tsx
import type { ReactNode } from 'react';
import './ComponentName.css';

// ── ComponentName — Figma <fileKey> <nodeId> ──────────────────────────────────

interface ComponentNameProps {
  variant: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  children?: ReactNode;
}

export function ComponentName({ variant, size = 'md', children }: ComponentNameProps) {
  return (
    <div className={`component-name component-name--${variant} component-name--${size}`}>
      {children}
    </div>
  );
}
```

### CSS file structure

```css
/* ── ComponentName — Figma <fileKey> <nodeId> ───────────────────────────── */
.component-name {
  /* base styles */
}

.component-name--primary { /* ... */ }
.component-name--secondary { /* ... */ }
.component-name--sm { /* ... */ }
```

### TypeScript rules

- Always `import type` for type-only imports (`import type { ReactNode } from 'react'`)
- Name exports only — no default exports from component files
- Props interfaces are defined inline above the component

---

## Existing Shared Components

Use these before creating new ones:

### `<Badge variant="..." label="..." />`
Variants: `critical | high | medium | low | unknown | neutral | default | gray | disabled | success | running | active | type`
Optional: `size="sm"`, `leadingIcon`, `trailingIcon`

```tsx
import { Badge, severityVariant } from '../components/Badge';
<Badge variant="critical" label="Critical" />
<Badge variant="active" label="Active" />
<Badge variant={severityVariant(severity)} label={severity} />
```

### `<IssueBadges critical={n} high={n} medium={n} low={n} />`
Renders C/H/M/L count pills.

### `<AssetTypeCounter counts={{ mcp, model, dataset, library, other }} />`
Renders icon + count pills per asset type.

### `<Button label="..." variant="primary|secondary|tertiary" size="md|sm|xs" />`
```tsx
import { Button } from '../components/Button';
<Button label="Save" variant="primary" size="md" onClick={...} />
<Button label="Cancel" variant="secondary" size="md" type="submit" />
```

### `<IconButton icon={<SvgIcon />} variant="primary|secondary|ghost" size="md|sm|xs" />`
```tsx
import { IconButton } from '../components/IconButton';
<IconButton icon={<PlusIcon />} variant="secondary" size="sm" label="Add item" />
```

### `<Tooltip content="..." placement="top|bottom|left|right">`
Wraps any trigger element. Light (inverted) background — `var(--color-fg)` bg, `var(--color-bg)` text, directional arrow.
```tsx
import { Tooltip } from '../components/Tooltip';
<Tooltip content="MCP server policies can't be modified" placement="left">
  <button disabled>...</button>
</Tooltip>
```

### `<DropdownMenu items={[...]} />`
Each item: `{ label, icon?, active?, disabled?, onClick? }`
```tsx
import { DropdownMenu } from '../components/DropdownMenu';
import type { MenuItem } from '../components/DropdownMenu';
<DropdownMenu items={[
  { label: 'Edit', onClick: handleEdit },
  { label: 'Delete', onClick: handleDelete },
]} />
```

### `<ChatPanel reportMode? />`
AI chat sidebar. `reportMode` shows a "Create report" button in the header instead of icon buttons.
```tsx
import { ChatPanel } from '../components/ChatPanel';
<ChatPanel />
<ChatPanel reportMode />
```

### `<StatCards items={[...]} bordered? />`
Each item: `{ icon?, label, count, delta?, variant? }`
`bordered` adds `--color-border-secondary` outline to each card.

### `<Tabs variant="line|contained" tabs={[...]} value={...} onChange={...} />`
Each tab: `{ value, label, badge? }`

### Table markup pattern

```tsx
import '../components/Table.css';

// Wrapped table (with title header)
<div className="table-wrap">
  <div className="table-wrap__title">
    <span className="table-wrap__title-text">Title</span>
    <div className="table-wrap__title-actions">...</div>
  </div>
  <div className="table-toolbar">...</div>
  <table className="table">
    <thead>
      <tr>
        <th className="table__th">Column</th>
      </tr>
    </thead>
    <tbody>
      <tr className="table__row">
        <td className="table__td table__td--name">Primary cell</td>
        <td className="table__td table__td--secondary">Muted cell</td>
        <td className="table__td table__td--highlight">+12</td>
      </tr>
    </tbody>
  </table>
</div>
```

Table cell variants: `--name` (bold, primary color) | `--secondary` | `--muted` | `--highlight` (brand color) | `--vendor` (small, tertiary)

---

## Figma → Code Workflow

### When receiving Figma design context (MCP output)

1. **Ignore Tailwind class strings** — the MCP always outputs React + Tailwind. Convert to BEM CSS.
2. **Map `--p-color-*` tokens** to our `--color-*` equivalents (see token table above).
3. **Check existing components first** — reuse Badge, Button, Table classes, etc. before writing new CSS.
4. **Comment the Figma node** — add `/* Figma <fileKey> <nodeId> */` to new CSS blocks.
5. **No new files unless necessary** — prefer adding CSS classes to an existing `.css` file.

### Token fallback values in Figma output

Figma MCP output includes inline fallbacks like `var(--p-color-bg-fill, #27272a)`. The fallback hex is useful for verifying the mapping but should not appear in our code — use our token instead.

### Spacing values from Figma

| Figma Tailwind | CSS value |
|---|---|
| `gap-[4px]` | `gap: 4px` |
| `gap-[6px]` | `gap: 6px` |
| `gap-[8px]` | `gap: 8px` |
| `gap-[12px]` | `gap: 12px` |
| `gap-[16px]` | `gap: 16px` |
| `p-[8px]` | `padding: 8px` |
| `px-[16px] py-[8px]` | `padding: 8px 16px` |
| `h-[36px]` | `height: 36px` |
| `rounded-[var(--radius/lg,8px)]` | `border-radius: var(--radius-lg)` |
| `rounded-[var(--radius/md,6px)]` | `border-radius: var(--radius-md)` |
| `rounded-[var(--radius/sm,4px)]` | `border-radius: var(--radius-sm)` |
| `rounded-[9999px]` | `border-radius: 9999px` |

---

## Icon System

Icons are inline SVGs defined as functions within component files. No external icon library.

```tsx
function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="5.5" cy="5.5" r="4"/>
      <path d="M9 9l2.5 2.5"/>
    </svg>
  );
}
```

- Size: typically `16x16` for UI icons, `13x13` for compact contexts
- Color: always `currentColor` — controlled by parent's CSS color
- Defined at bottom of the component file that uses them (not shared)
- `strokeWidth` is typically `1.3` or `1.5`

---

## Page Layout Pattern

Pages follow a consistent structure:

```tsx
export function PageName() {
  return (
    <div className="page-name">
      <StatCards items={...} />              {/* optional KPI row */}
      <div className="table-wrap">           {/* main content */}
        <div className="table-toolbar">...</div>
        <table className="table">...</table>
      </div>
    </div>
  );
}
```

Page CSS:
```css
.page-name {
  display: flex;
  flex-direction: column;
  gap: 16px;   /* standard vertical spacing between sections */
}
```

---

## Asset Management

- No static image assets — all visuals are CSS or inline SVG
- Mock data lives in `src/data/mockData.ts`
- No CDN or asset pipeline — Vite handles everything

---

## Build & Dev

```bash
npm run dev      # dev server (Vite HMR)
npm run build    # tsc -b && vite build
vercel --prod    # deploy to https://evo-components.vercel.app
```

No test suite. No linting rules beyond TypeScript strict mode.

---

## Source of Truth

The **Evo UI Kit Figma file** (`GKHSL8s3gPJsdvwuFdBc9K`) is the design source of truth. When Figma definitions and existing code diverge, prefer Figma.

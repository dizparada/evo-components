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
| Icons | `@heroicons/react/24/outline` — always sized via `style={{ width: N, height: N }}` |
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
│   ├── Nudge.tsx / Nudge.css
│   ├── Sidebar.tsx / Sidebar.css
│   ├── StatCards.tsx / StatCards.css
│   ├── SeverityCounters.tsx / SeverityCounters.css
│   ├── Table.tsx / Table.css
│   ├── Tabs.tsx / Tabs.css
│   ├── Tooltip.tsx / Tooltip.css
│   ├── ChatPanel.tsx / ChatPanel.css
│   └── DropdownMenu.tsx / DropdownMenu.css
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
/* ── Backgrounds ─────────────────────────────────────────────────────────── */
--color-bg: #18181b              /* page canvas */
--color-bg-sidebar: #111113      /* sidebar background */
--color-bg-surface: #27272a      /* cards, panels, table headers */
--color-bg-surface-hover: #2f2f34
--color-bg-badge: #09090b        /* darkest — badge backgrounds */

/* ── Borders ─────────────────────────────────────────────────────────────── */
--color-border: #3f3f46
--color-border-secondary: #52525c

/* ── Foreground / text ───────────────────────────────────────────────────── */
--color-fg: #f4f4f5              /* primary text */
--color-fg-secondary: #d4d4d8   /* secondary text */
--color-fg-tertiary: #9f9fa9    /* tertiary / placeholder text */
--color-fg-muted: #71717a       /* muted / disabled text */

/* ── Brand / accent ──────────────────────────────────────────────────────── */
--color-highlight: #cbabee       /* purple brand — links, active states, brand accents */
--color-link: var(--color-highlight)
--color-brand: var(--color-highlight)
--color-brand-dim: #1e1030       /* subtle brand tint for hover backgrounds */

/* ── Severity ────────────────────────────────────────────────────────────── */
--color-critical-bg: #9f0712    --color-critical-fg: #ffe2e2
--color-high-bg: #9f2d00        --color-high-fg: #ffedd4
--color-medium-bg: #894b00      --color-medium-fg: #fef9c2
--color-low-bg: #52525c         --color-low-fg: #d4d4d8

/* ── Status ──────────────────────────────────────────────────────────────── */
--color-success-bg: #14532d     --color-success-fg: #86efac
--color-active-bg: #3f3f46      --color-active-fg: #d4d4d8
--color-running-bg: #dff2fe     --color-running-fg: #00598a     --color-running-border: #0069a8
--color-info-bg: #024a70        --color-info-border: #74d4ff    --color-info-fg: #8ec5ff
--color-warning-bg: #733e0a     --color-warning-border: #ffdf20 --color-warning-fg: #ffdf20
```

### Shape & typography tokens

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px   /* used for large table/card containers */
```

### Figma token mapping

When Figma MCP output uses `--p-color-*` (Polaris-style tokens), map to our tokens:

| Figma token | Our token |
|---|---|
| `--p-color-bg` | `--color-bg-surface` |
| `--p-color-bg-fill` | `--color-bg-surface` |
| `--p-color-bg-fill-secondary` | `--color-bg` |
| `--p-color-bg-fill-hover` | `--color-active-bg` |
| `--p-color-bg-fill-tertiary` | `--color-bg-surface` |
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
| `--highlight-color` | `var(--color-highlight)` |

---

## Styling Rules

1. **Plain CSS only.** No Tailwind. All Figma Tailwind output MUST be converted to plain CSS.
2. **BEM naming.** Components use `.block__element--modifier` (e.g. `.stat-card__label`, `.btn--primary`).
3. **Component CSS lives next to the component.** `Badge.tsx` imports `./Badge.css`.
4. **Page CSS lives next to the page.** `Reports.tsx` imports `./Reports.css`.
5. **Shared table styles** are in `Table.css` — import it in any page that uses a table.
6. **Dark mode only.** The app has no light mode. Do not add `@media (prefers-color-scheme)` overrides.
7. **No inline styles** except for dynamic values (e.g. `style={{ width: `${pct}%` }}`) and heroicon sizing.

### Spacing reference (Figma Tailwind → CSS)

| Figma | CSS |
|---|---|
| `gap-[4px]` | `gap: 4px` |
| `gap-[6px]` | `gap: 6px` |
| `gap-[8px]` | `gap: 8px` |
| `gap-[12px]` | `gap: 12px` |
| `gap-[16px]` | `gap: 16px` |
| `gap-[24px]` | `gap: 24px` |
| `p-[8px]` | `padding: 8px` |
| `px-[16px] py-[10px]` | `padding: 10px 16px` |
| `px-[24px] py-[24px]` | `padding: 24px` |
| `rounded-[var(--radius/xl,12px)]` | `border-radius: var(--radius-xl)` |
| `rounded-[var(--radius/lg,8px)]` | `border-radius: var(--radius-lg)` |
| `rounded-[var(--radius/md,6px)]` | `border-radius: var(--radius-md)` |
| `rounded-[var(--radius/sm,4px)]` | `border-radius: var(--radius-sm)` |
| `rounded-[9999px]` | `border-radius: 9999px` |

---

## Icon System

Use **`@heroicons/react/24/outline`** for all standard UI icons. Always size via inline style.

```tsx
import {
  MagnifyingGlassIcon,
  TrashIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowsUpDownIcon,
  SparklesIcon,
  CheckIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  LinkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

// Usage — size via inline style, color via currentColor (CSS)
<MagnifyingGlassIcon style={{ width: 13, height: 13 }} />
<TrashIcon style={{ width: 14, height: 14 }} />
<ArrowsUpDownIcon style={{ width: 10, height: 10 }} />
```

**Size conventions:**
- `10×10` — sort / chevron arrows inside table headers
- `13×13` — compact inline icons (search prefix, sparkles in buttons)
- `14×14` — standard row action icons (trash, edit, chevron nav)
- `16×16` — modal close, larger interactive icons

**Custom SVG icons kept as-is** (no heroicons equivalent):
- `EvoLogoIcon` — brand logo (Sidebar)
- `McpIcon`, `ModelIcon`, `DatasetIcon`, `LibraryIcon`, `OtherIcon` — asset type icons (Badge, Inventory)
- Sidebar nav icons: `HomeIcon`, `InventoryIcon`, `PoliciesIcon`, `ReportsIcon`, `ScansIcon`, etc.
- `ChartIcon` — illustration SVG in Reports empty state

---

## Existing Shared Components

Always check these before writing new CSS or components.

### `<Badge variant="..." label="..." />`
Figma: `GKHSL8s3gPJsdvwuFdBc9K 2069-81627`

Variants: `critical | high | medium | low | unknown | success` (severity — solid fill, flat pill)
`neutral | default | gray | disabled | running | active | type | warning` (non-severity — content wrapper)

Optional: `size="sm"`, `leadingIcon`, `trailingIcon`

```tsx
import { Badge, severityVariant } from '../components/Badge';
<Badge variant="critical" label="Critical" />
<Badge variant="warning" label="Partial success" />
<Badge variant="type" label="Model" />
<Badge variant={severityVariant(severity)} label={severity} />
```

### `<SeverityCounters critical={n} high={n} medium={n} low={n} />`
Figma: `GKHSL8s3gPJsdvwuFdBc9K 3326-62858`

Renders C/H/M/L letter badge + count pairs. Use instead of `IssueBadges` (deprecated).

```tsx
import { SeverityCounters } from '../components/SeverityCounters';
<SeverityCounters critical={2} high={5} medium={1} low={0} />
```

### `<AssetTypeCounter counts={{ mcp, model, dataset, library, other }} />`
Renders icon + count pill per asset type. Exported from `Badge.tsx`.

### `<Button label="..." variant="primary|secondary|tertiary" size="md|sm|xs" />`
Figma: `GKHSL8s3gPJsdvwuFdBc9K 1614-1550`

```tsx
import { Button } from '../components/Button';
<Button label="Save" variant="primary" size="md" onClick={...} />
<Button label="Cancel" variant="secondary" size="md" />
<Button label="Delete" variant="primary" size="md" onClick={handleDelete} />
```

**Button styles (reference for consistent styling elsewhere):**
- `secondary` (default): `bg: --color-bg-surface`, `border: --color-border`, `color: --color-fg`
- `secondary:hover`: `bg: --color-fg-tertiary`, `border: --color-fg-tertiary`, `color: --color-bg`
- `primary`: `bg: --color-fg`, `border: --color-fg`, `color: --color-bg`, `font-weight: 500`
- `primary:hover`: `bg: --color-fg-tertiary`, `border: --color-fg-tertiary`, `color: --color-bg`
- `disabled`: `bg: --color-bg`, `border: rgba(255,255,255,0.06)`, `color: rgba(255,255,255,0.24)`
- All sizes use `border-radius: var(--radius-md)`, `font-size: 13px`, `letter-spacing: 0.3px`
- Heights: `md=32px`, `sm=24px`, `xs=20px`

### `<IconButton icon={...} variant="primary|secondary|ghost" size="md|sm|xs" />`

```tsx
import { IconButton } from '../components/IconButton';
<IconButton icon={<PlusIcon style={{ width: 14, height: 14 }} />} variant="secondary" size="sm" label="Add" />
```

### `<Tabs variant="line|contained" tabs={[...]} value={...} onChange={...} />`
Figma: `GKHSL8s3gPJsdvwuFdBc9K 2072-81848`

Each tab: `{ value, label, badge? }`

- **contained**: pill group with bg/border wrapper; active tab = primary button style (white bg, dark text)
- **line**: underline style; active tab = `--color-brand` bottom border, `--color-fg` text

```tsx
import { Tabs } from '../components/Tabs';
<Tabs variant="contained" tabs={[{ value: 'all', label: 'All' }, { value: 'mine', label: 'Mine' }]} value={tab} onChange={setTab} />
<Tabs variant="line" tabs={[{ value: 'risk', label: 'Risk profile' }, { value: 'issues', label: 'Issues', badge: 3 }]} value={tab} onChange={setTab} />
```

### `<Tooltip content="..." placement="top|bottom|left|right">`
Wraps any trigger element. Inverted — `--color-fg` bg, `--color-bg` text, directional arrow.

```tsx
import { Tooltip } from '../components/Tooltip';
<Tooltip content="Cannot modify MCP server policies" placement="left">
  <button disabled>...</button>
</Tooltip>
```

### `<DropdownMenu items={[...]} />`
Each item: `{ label, icon?, active?, disabled?, onClick? }`

```tsx
import { DropdownMenu } from '../components/DropdownMenu';
<DropdownMenu items={[{ label: 'Edit', onClick: handleEdit }, { label: 'Delete', onClick: handleDelete }]} />
```

### `<ChatPanel reportMode? />`
`reportMode` shows a "Create report" header button instead of icon buttons.

### `<StatCards items={[...]} bordered? />`
Each item: `{ icon?, label, count, delta?, variant? }`. `bordered` adds `--color-border-secondary` outline.

---

## Table Pattern

```tsx
import '../components/Table.css';

<div className="table-wrap">                          {/* border, radius-lg, shadow, overflow:hidden */}
  <div className="table-toolbar">
    <div className="table-toolbar__start">
      <span className="table-toolbar__title">Title</span>
      <span className="table-toolbar__badge">42</span>
    </div>
    <div className="table-toolbar__end">
      <div className="table-toolbar__search-wrap">
        <span className="table-toolbar__search-icon"><MagnifyingGlassIcon style={{ width: 13, height: 13 }} /></span>
        <input className="table-toolbar__search" placeholder="Search..." />
      </div>
    </div>
  </div>
  <table className="table">
    <thead>
      <tr>
        <th className="table__th table__th--sortable">
          <span className="table__th-content">
            Name <span className="table__th-icon"><ArrowsUpDownIcon style={{ width: 10, height: 10 }} /></span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="table__row">
        <td className="table__td table__td--name">Primary cell</td>
        <td className="table__td">Regular cell</td>
        <td className="table__td table__td--vendor">Small muted cell</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Table cell variants:** `--name` (bold, `--color-fg`) | `--secondary` / `--muted` (`--color-fg-muted`) | `--highlight` (`--color-highlight`) | `--vendor` (12px, `--color-fg-tertiary`)

**Row action button:** use `.table__more-btn` class for icon-only buttons at end of rows.

### Pagination

```tsx
<div className="table-pagination">
  <button className="table-pagination__btn table-pagination__btn--icon" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
    <ChevronLeftIcon style={{ width: 14, height: 14 }} />
  </button>
  {pages.map(n => (
    <button key={n} className={`table-pagination__btn${n === page ? ' table-pagination__btn--active' : ''}`} onClick={() => setPage(n)}>{n}</button>
  ))}
  <button className="table-pagination__btn table-pagination__btn--icon" onClick={() => setPage(p => p + 1)}>
    <ChevronRightIcon style={{ width: 14, height: 14 }} />
  </button>
  <div className="table-pagination__perpage">
    <span className="table-pagination__perpage-label">Results per page</span>
    <select className="table-pagination__perpage-select"><option>10</option><option>25</option></select>
  </div>
</div>
```

Pagination button styles match `<Button>` — `secondary` by default, `primary` for active page.

---

## Confirmation Modal Pattern

For destructive actions (delete, etc.). Use `--color-bg-surface` bg, `--radius-md`, `padding: 24px`, `width: 480px`.

```tsx
// CSS classes in page .css file:
// .delete-modal-backdrop — fixed inset-0, rgba(0,0,0,0.6), flex center, z-index: 200
// .delete-modal — bg-surface, radius-md, padding 24px, width 480px, gap 32px (header + footer)
// .delete-modal__header — flex space-between, gap 16px
// .delete-modal__title — 16px, font-weight 500, letter-spacing -0.4px
// .delete-modal__body — 14px, line-height 20px, letter-spacing 0.3px
// .delete-modal__footer — flex, justify-content flex-end, gap 16px

function ConfirmModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="delete-modal-backdrop" onClick={onCancel}>
      <div className="delete-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="delete-modal__header">
          <div>
            <h2 className="delete-modal__title">Delete report</h2>
            <p className="delete-modal__body">Are you sure? This action cannot be undone.</p>
          </div>
          <button className="delete-modal__close" onClick={onCancel}>
            <XMarkIcon style={{ width: 16, height: 16 }} />
          </button>
        </div>
        <div className="delete-modal__footer">
          <Button label="Cancel" variant="secondary" size="md" onClick={onCancel} />
          <Button label="Delete" variant="primary" size="md" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}
```

---

## Page Layout Pattern

```tsx
export function PageName() {
  return (
    <div className="page-name">          {/* flex-col, gap: 16px */}
      <StatCards items={...} />           {/* optional KPI row */}
      <div className="table-wrap">        {/* main content */}
        <div className="table-toolbar">...</div>
        <table className="table">...</table>
      </div>
      <div className="table-pagination">...</div>
    </div>
  );
}
```

```css
.page-name {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

---

## Figma → Code Workflow

1. **Call `get_design_context`** with the node's fileKey + nodeId.
2. **Ignore Tailwind class strings** — convert all to BEM CSS.
3. **Map `--p-color-*` tokens** using the table above.
4. **Check existing components first** — reuse Badge, Button, Tabs, Table classes before writing new CSS.
5. **Comment the Figma node** — add `/* Figma <fileKey> <nodeId> */` to new CSS rule blocks.
6. **Add missing tokens to `src/index.css`** before using them anywhere.
7. **No new files unless necessary** — prefer adding to an existing `.css` file.

### Figma files

| File | Key | Purpose |
|---|---|---|
| Evo UI Kit | `GKHSL8s3gPJsdvwuFdBc9K` | Component library source of truth |
| Evo GA | `ldezalbJY9Ml9bWU0eMqPz` | App-level page designs |

---

## Build & Deploy

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b && vite build
vercel --prod    # deploy → https://evo-components.vercel.app
```

No test suite. TypeScript strict mode only.

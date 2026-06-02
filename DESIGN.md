---
name: Blueprint & Parchment
colors:
  surface: '#fcf8ff'
  surface-dim: '#ddd7e9'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f1ff'
  surface-container: '#f1ebfd'
  surface-container-high: '#ebe6f7'
  surface-container-highest: '#e5e0f2'
  on-surface: '#1c1a26'
  on-surface-variant: '#48464f'
  inverse-surface: '#312f3c'
  inverse-on-surface: '#f4eeff'
  outline: '#78767f'
  outline-variant: '#c9c5d0'
  surface-tint: '#5e588a'
  primary: '#423d6c'
  on-primary: '#ffffff'
  primary-container: '#5a5485'
  on-primary-container: '#d3ccff'
  inverse-primary: '#c8c0f8'
  secondary: '#5e5d6b'
  on-secondary: '#ffffff'
  secondary-container: '#e4e0f2'
  on-secondary-container: '#646371'
  tertiary: '#42424a'
  on-tertiary: '#ffffff'
  tertiary-container: '#595961'
  on-tertiary-container: '#d2d0da'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c8c0f8'
  on-primary-fixed: '#1b1442'
  on-primary-fixed-variant: '#464170'
  secondary-fixed: '#e4e0f2'
  secondary-fixed-dim: '#c7c4d5'
  on-secondary-fixed: '#1b1a26'
  on-secondary-fixed-variant: '#464553'
  tertiary-fixed: '#e3e1eb'
  tertiary-fixed-dim: '#c7c5cf'
  on-tertiary-fixed: '#1a1b22'
  on-tertiary-fixed-variant: '#46464e'
  background: '#fcf8ff'
  on-background: '#1c1a26'
  surface-variant: '#e5e0f2'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Space Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Space Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  grid-size: 20px
  margin-sm: 16px
  margin-md: 32px
  margin-lg: 64px
  gutter: 20px
---

## Framework

All styles **must** use **TailwindCSS v4** exclusively. No raw `<style>` blocks or CSS files should be added to components. Global custom utilities are defined as `@utility` in `src/app.css` for complex patterns that cannot be expressed concisely with Tailwind utilities alone.

---

## Brand & Style

The visual narrative of the design system is rooted in the "Architect’s Desk"—a workspace where precision meets raw creativity. It bridges the gap between high-level engineering and experimental design. The interface should feel like a living document, blending the warmth of physical paper with the clinical accuracy of technical drafting.

The style is **Drafting Minimalism**. It leverages heavy whitespace, intentional structural lines, and a "low-ink" aesthetic. The target response is one of intellectual curiosity; the user should feel they are looking at a master plan in progress rather than a static, finished product.

## Colors

The palette is derived from aged drafting paper and indigo-based drafting inks. 

- **Primary (#5A5485):** A deepened, high-contrast version of the requested lavender. This color is used for all functional text, primary buttons, and critical technical lines to ensure WCAG AA compliance (approx 5.8:1 contrast ratio) against the paper background.
- **Secondary & Tertiary (#D6D3E4, #E8E6F0):** Muted, desaturated violets used for large surface fills, "blueprint" callout backgrounds, and hover states.
- **Background (#FDFCF8):** A warm, unbleached paper tone that reduces eye strain compared to pure white.
- **Grid Lines (#E5E3DC):** Subtle structural lines that mimic a 10px graph paper or blueprint grid.

## Typography

This design system uses a dual-technical typeface approach:

1.  **Space Grotesk (Headings):** Provides a clean, geometric structure for primary information. It feels engineered yet modern. Headlines should use tight tracking to mimic technical titling blocks.
2.  **Space Mono (Body & Labels):** Provides the "blueprint" aesthetic. Every line of code, technical description, and interface label uses this monospaced font to reinforce the programmer/builder persona.

**Editorial Note:** For "hand-drawn" annotations (as requested), a decorative handwriting font can be used sparingly for "as-built" notes, but all functional UI must remain in the defined technical fonts.

## Layout & Spacing

The layout is governed by a **Strict 20px Technical Grid**. Every element must snap to this grid to maintain the blueprint aesthetic.

- **Desktop:** 12-column fixed grid (max-width 1280px) centered on the paper background. 20px gutters.
- **Mobile:** 4-column fluid grid with 16px side margins.
- **The "Technical Margin":** All primary containers should feature a "Safe Zone" border—a thin 1px line offset from the edge of the screen by 20px, framing the content like a drafting sheet border.
- **Visual Rhythm:** Spacing should always be a multiple of 4px, but ideally aligned to the 20px grid marks for major section breaks.

## Elevation & Depth

This system rejects shadows in favor of **Tonal Layering and Linework**.

- **Level 0 (Base):** The textured paper background with the 20px graph pattern.
- **Level 1 (Components):** Elements like cards or input fields are defined by 1px solid borders (#5A5485) rather than shadows.
- **Level 2 (Modals/Popovers):** Instead of shadows, use a "double-border" effect or a solid 4px offset "hard shadow" in the Primary color to simulate a physical layer of paper stacked on top.
- **Glassmorphism:** Use only for "tracing paper" effects. A high-blur backdrop with a very subtle white tint (20% opacity) can be used for overlays, mimicking semi-transparent vellum paper.

## Shapes

Shapes are strictly geometric. Standard components use a **4px corner radius** (Soft), which provides a "milled" or "plotted" look that isn't as aggressive as sharp corners but far more technical than fully rounded ones.

- **Interactive Elements:** Buttons and Inputs use the 4px radius.
- **Structural Elements:** Large content containers or "blueprints" should maintain 0px sharp corners to feel like cut sheets of paper.

## Components

- **Buttons:** Solid primary fill with `label-sm` text in background color. For secondary buttons, use a 1px primary border with a transparent background and a "hollow" hover state (slight tertiary fill).
- **Inputs:** Simple bottom-border only (1px primary) to mimic a line on a form. When focused, the border remains 1px but a very faint `secondary` background fill appears.
- **Callouts (Annotations):** Use a 1px dotted line with a small circle at one end (the anchor) leading to a small box containing `label-sm` text. This mimics architectural callouts.
- **Cards:** No shadow. 1px solid border. Title of the card should be separated by a 1px horizontal "cut line."
- **Progress Bars:** Use a "hatched" pattern fill (diagonal 45-degree lines) for the progress indicator to look like a technical shading technique.
- **Lists:** Bullet points are replaced with small "+" signs or "x" marks to maintain the coordinate/grid feel.

---

## TailwindCSS Usage

### Convention

- **No raw CSS in components.** All styling uses Tailwind utility classes directly in the template.
- **Custom utilities** (`@utility` in `src/app.css`) are reserved for patterns that are:
  - Too complex to express with Tailwind alone (e.g., `dot-grid` background, `box-shadow` offsets).
  - Repeated across multiple components.
- **Arbitrary values** (`text-[9px]`, `tracking-[0.12em]`) are acceptable for one-off sizes not covered by the theme scale.
- **Theme tokens** from the `@theme` block are preferred over raw values (e.g., `text-ink` over `text-[#423d6c]`, `font-mono` over `font-['Space_Mono']`).

### Available Theme Tokens

All tokens in `src/app.css` `@theme` block are usable as Tailwind classes:

| Token | Example usage | Tailwind class |
|---|---|---|
| `--color-ink` | Text, borders | `text-ink`, `border-ink`, `bg-ink` |
| `--color-on-ink` | Text on ink bg | `text-on-ink` |
| `--color-surface-container-lowest` | Card backgrounds | `bg-surface-container-lowest` |
| `--color-secondary-container` | Titleblock headers | `bg-secondary-container` |
| `--color-on-secondary-container` | Text on secondary | `text-on-secondary-container` |
| `--color-on-surface` | Body text | `text-on-surface` |
| `--color-on-surface-variant` | Muted body text | `text-on-surface-variant` |
| `--color-outline` | Borders, labels | `text-outline`, `border-outline` |
| `--color-outline-variant` | Subtle borders | `border-outline-variant` |
| `--color-paper` | Page background | `bg-paper` |
| `--color-error` | Error text | `text-error` |
| `--font-display` | Headings | `font-display` |
| `--font-mono` | Body, labels, code | `font-mono` |
| `--font-hand` | Hand-drawn annotations | `font-hand` |

### Responsive Breakpoints

Use Tailwind's `sm:`, `md:`, `lg:` (min-width) and `max-sm:`, `max-md:`, `max-lg:` (max-width) variants. The grid is:
- **Mobile first** by default (single column).
- **`sm:`** (640px) for tablet / 2-column layouts.
- **`lg:`** (1024px) for desktop / 3-column layouts.

### Applying the Design Language

| Style | How to apply |
|---|---|
| **1px solid border (ink)** | `border border-ink` |
| **1px solid border (outline-variant)** | `border border-outline-variant` |
| **1px dashed border (outline)** | `border border-dashed border-outline` |
| **Hard shadow (4px offset)** | Use `@utility subheader-stuck` or `hover:shadow-[4px_4px_0_0_var(--color-ink)]` |
| **Headline LG** (hero titles) | `headline-lg-mobile headline-lg text-ink` |
| **Headline MD** (section titles) | `headline-md text-on-surface` |
| **Headline SM** (subsection titles) | `headline-sm text-on-surface` |
| **Body LG** (large body) | `body-lg text-on-surface` |
| **Body MD** (default body) | `body-md text-on-surface` |
| **Label SM** (technical labels) | `label-sm text-outline` |
| **Mono label** | `font-mono text-[10px] uppercase tracking-[0.1em] text-outline` |
| **Display heading** | `font-display text-[22px] leading-[1.15] tracking-tight font-bold text-ink` |
| **Dot grid background** | Use `@utility dot-grid` |
| **Titleblock bar** | `grid grid-cols-4 max-sm:grid-cols-2 border-b border-ink bg-secondary-container *:px-3.5 *:py-[10px] *:flex *:flex-col *:gap-0.5 *:min-w-0 *:border-r *:border-ink *:last:border-r-0` |
| **Card hover** | `hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-ink)]` |
| **Not found box** | Use `@utility notfound-box` |
| **Sticky stuck shadow** | Use `@utility subheader-stuck` with `class:subheader-stuck={isStuck}` |

---

## Custom `@utility` Classes

Defined in `src/app.css` for patterns that need more than plain Tailwind.

| Utility | CSS | When to use |
|---|---|---|---|
| `subheader-stuck` | `box-shadow: 4px 0 0 0 var(--color-ink)` | Sticky subheader when scrolled past trigger point |
| `notfound-box` | Centered 404 box with dashed outline | Empty state / not-found views |
| `dot-grid` | Radial-gradient dot pattern background | Paper body backgrounds (mimics grid paper) |
| `headline-lg` | Space Grotesk, 48px, bold, 1.1, -0.02em | Hero / page-level titles (desktop) |
| `headline-lg-mobile` | Space Grotesk, 32px, bold, 1.2 | Hero / page-level titles (mobile) |
| `headline-md` | Space Grotesk, 32px, semibold, 1.2 | Section titles |
| `headline-sm` | Space Grotesk, 20px, semibold, 1.4 | Subsection titles |
| `body-lg` | Space Mono, 18px, normal, 1.6 | Large body text |
| `body-md` | Space Mono, 15px, normal, 1.6 | Default body text |
| `label-sm` | Space Mono, 12px, medium, 1.0, 0.05em | Technical labels, metadata |

To create a new utility, add it to `src/app.css`:

```css
@utility my-utility {
  /* CSS here */
}
```
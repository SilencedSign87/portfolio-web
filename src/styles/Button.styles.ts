import { cva, type VariantProps } from "class-variance-authority"

export type buttonAppearance =
  | "primary"
  | "outline"
  | "subtle"
  | "ghost"
  | "danger"

export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "px-4 py-2",
    "rounded",
    "font-mono text-[12px] font-medium uppercase tracking-[0.08em]",
    "border",
    "transition-colors duration-100",
    "select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]",
    "disabled:opacity-40 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      appearance: {
        primary: [
          "bg-[var(--ink)] text-[var(--color-on-ink,#ffffff)]",
          "border-[var(--ink)]",
          "hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]",
          "active:bg-[var(--ink)]",
        ],
        outline: [
          "bg-transparent text-[var(--ink)]",
          "border-[var(--ink)]",
          "hover:bg-[var(--ink-container)] hover:text-[var(--on-ink-container)]",
          "active:bg-[var(--secondary-container)]",
        ],
        subtle: [
          "bg-transparent text-[var(--ink)]",
          "border-transparent",
          "hover:bg-[var(--secondary-container)] hover:text-[var(--on-secondary-container)]",
        ],
        ghost: [
          "bg-transparent text-[var(--on-surface)]",
          "border-transparent",
          "hover:text-[var(--ink)]",
        ],
        danger: [
          "bg-transparent text-[var(--color-error,#ba1a1a)]",
          "border-[var(--color-error,#ba1a1a)]",
          "hover:bg-[var(--color-error,#ba1a1a)] hover:text-white",
        ],
      } satisfies Record<buttonAppearance, string | string[]>,
      size: {
        sm: "px-3 py-1.5 text-[11px]",
        md: "px-4 py-2 text-[12px]",
        lg: "px-5 py-2.5 text-[13px]",
        icon: "p-2 aspect-square",
      },
      block: {
        true: "w-full",
        false: "",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        appearance: "primary",
        active: true,
        class: "bg-[var(--ink-soft)] border-[var(--ink-soft)]",
      },
      {
        appearance: "outline",
        active: true,
        class: "bg-[var(--ink-container)] text-[var(--on-ink-container)]",
      },
      {
        appearance: "subtle",
        active: true,
        class: "bg-[var(--ink-container)] text-[var(--on-ink-container)]",
      },
      {
        appearance: "ghost",
        active: true,
        class: "text-[var(--ink)] underline underline-offset-4 decoration-1",
      },
    ],
    defaultVariants: {
      appearance: "outline",
      size: "md",
      block: false,
      active: false,
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonStyles>

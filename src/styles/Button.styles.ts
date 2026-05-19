import { cva } from "class-variance-authority"

export type buttonAppearance = "default" | "accent" | "subtle" | "outline" | "transparent"

export const buttonStyles = cva(
    "px-3 py-1 rounded-sm flex items-center justify-center border transition-colors duration-100" ,
    {
        variants: {
            appearance: {
                default: [
                    "bg-white dark:bg-neutral-800",
                    "text-black dark:text-white",
                    "border-transparent",
                    "hover:bg-neutral-200 active:bg-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-800",
                ],
                accent: [
                    "bg-brand-tint-100 dark:bg-brand-shade-300",
                    "text-white! dark:text-black!",
                    "border-transparent",
                    "hover:bg-brand-tint-100 dark:hover:bg-brand-shade-200 active:bg-brand-tint-200 dark:active:bg-brand-shade-100",
                ],
                subtle: [
                    "bg-transparent",
                    "text-black dark:text-white",
                    "border-transparent",
                    "hover:bg-neutral-200 active:bg-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-800",
                ],
                outline: [
                    "bg-transparent",
                    "text-black dark:text-white",
                    "border border-neutral-400 dark:border-neutral-700",
                    "hover:border-neutral-600 dark:hover:border-neutral-500 active:border-neutral-800 dark:active:border-neutral-300",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                ],
                transparent: [
                    "bg-transparent",
                    "text-black dark:text-white",
                    "border-transparent",
                ]
            } satisfies Record<buttonAppearance, string | string[]>,
            active: {
                true: "",
                false: ""
            }
        },
        compoundVariants: [
            {
                appearance: "default",
                active: true,
                class: "bg-neutral-200 dark:bg-neutral-600",
            },
            {
                appearance: "accent",
                active: true,
                class: "bg-brand-tint-200 dark:bg-brand-shade-100",
            },
            {
                appearance: "subtle",
                active: true,
                class: "bg-neutral-200 dark:bg-neutral-600",
            },
            {
                appearance: "outline",
                active: true,
                class: "border-2 border-black dark:border-white",
            },
            {
                appearance: "transparent",
                active: true,
                class: "text-brand-base!",
            }
        ],
        defaultVariants: {
            appearance: "default",
            active: false
        }
    }
);
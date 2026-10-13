// Shared class lists, so every card, button and link of the same kind looks and behaves
// the same everywhere on the site. Change a style here, not in the component.

export const iconButtonClass =
  "inline-grid place-items-center w-9 h-9 border border-line rounded-full text-muted text-lg transition hover:text-accent hover:border-accent active:scale-[0.96]";

export const pillLinkClass =
  "inline-flex items-center gap-1.5 px-3 py-1 border border-line rounded-full text-sm font-medium whitespace-nowrap transition-colors hover:border-accent hover:text-accent";

export const sectionTitleClass = "font-display text-[1.375rem] font-semibold tracking-[-0.01em]";

export const pageTitleClass = "font-display text-[2rem] font-semibold leading-tight tracking-[-0.02em]";

export const cardClass =
  "flex flex-col gap-2 p-5 bg-card border border-line rounded-[14px] min-w-0";

export const cardHeadClass = "flex items-baseline justify-between gap-3";

export const cardTitleClass = "font-display text-lg font-semibold leading-[1.35] tracking-[-0.01em]";

export const cardMetaClass = "font-mono text-[0.8125rem] text-muted whitespace-nowrap tabular-nums";

export const cardDescClass = "text-muted text-[0.9375rem] leading-[1.6]";

export const cardLinksClass = "flex flex-wrap gap-4 mt-auto pt-1 text-[0.9375rem]";

// Blog cards: white titles and links that turn magenta on hover
export const blogLinkClass = "text-fg no-underline transition-colors hover:text-accent";

// Project cards: magenta titles that underline on hover. Project links use .text-link.
export const projectTitleLinkClass =
  "text-accent no-underline decoration-2 underline-offset-4 hover:underline";

/** 8px grid spacing system */
export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

export const layout = {
  sidebarWidth: "16rem",
  sidebarCollapsedWidth: "5rem",
  navbarHeight: "4rem",
  contentMaxWidth: "90rem",
  pagePadding: spacing[6],
  cardPadding: spacing[6],
  sectionGap: spacing[6],
} as const;

export type SpacingKey = keyof typeof spacing;

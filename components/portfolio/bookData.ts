export type PageId = "home" | "profile" | "experience" | "projects" | "contact";

export interface PortfolioPage {
  id: PageId;
  label: string;
}

export const portfolioPages: PortfolioPage[] = [
  { id: "home", label: "首页" },
  { id: "profile", label: "档案" },
  { id: "experience", label: "履历" },
  { id: "projects", label: "项目" },
  { id: "contact", label: "结语" },
];

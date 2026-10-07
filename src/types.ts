export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags: string[];
  bookmarked?: boolean;
}

export type FAQCategory =
  | "mobilization"
  | "camp"
  | "ppa-cds"
  | "relocation"
  | "clearance"
  | "pop-exemption";

export interface CategoryMeta {
  id: FAQCategory;
  label: string;
  icon: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  suggestedQuestions?: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: ChecklistCategory;
  checked: boolean;
}

export type ChecklistCategory = "documents" | "white-kit" | "essentials" | "medicals";

export interface ChecklistCategoryMeta {
  id: ChecklistCategory;
  label: string;
  icon: string;
}

export interface CampLocation {
  state: string;
  address: string;
  geozone: "North-Central" | "North-East" | "North-West" | "South-East" | "South-South" | "South-West";
}

export interface RelocationGround {
  id: string;
  title: string;
  description: string;
  icon: string;
  documents: string[];
  eligibility: string;
}
import type { CategoryMeta, FAQCategory, ChecklistCategory, ChecklistCategoryMeta, RelocationGround, CampLocation } from "./types";

export const BRAND_NAME = "KopaBot";
export const TAGLINE = "Your NYSC Companion";

export const CATEGORIES: CategoryMeta[] = [
  { id: "mobilization", label: "Mobilization", icon: "RefreshCw" },
  { id: "camp", label: "Camp Life", icon: "Tent" },
  { id: "ppa-cds", label: "PPA & CDS", icon: "Briefcase" },
  { id: "relocation", label: "Relocation", icon: "Navigation" },
  { id: "clearance", label: "Clearance", icon: "FileCheck" },
  { id: "pop-exemption", label: "POP & Exemption", icon: "Shield" },
];

export const FAQ_DATA: { id: FAQCategory; questions: { q: string; a: string }[] }[] = [
  {
    id: "mobilization",
    questions: [
      { q: "When is the next NYSC mobilization?", a: "NYSC mobilizes prospective corps members three times a year (Batches A, B, C). Check the NYSC portal (portal.nysc.org.ng) for exact dates." },
      { q: "How do I register for NYSC?", a: "Visit portal.nysc.org.ng, click 'Register for Mobilization', fill in your details, upload required documents, and print your call-up letter when available." },
      { q: "What documents are required for registration?", a: "You need your degree certificate/diploma/statement of result, university ID card, birth certificate/declaration of age, local government identification letter, and passport photographs." },
      { q: "Can I defer my NYSC mobilization?", a: "Yes, you can defer by not registering during your batch. However, you may be required to provide reasons and supporting documents if questioned later." },
    ],
  },
  {
    id: "camp",
    questions: [
      { q: "What should I bring to camp?", a: "Bring your call-up letter, school ID, credentials, NYSC white T-shirts and shorts, bedsheets, mosquito net, toiletries, cutlery, mattress, padlock, and cash for incidentals." },
      { q: "How long is the orientation camp?", a: "The orientation camp lasts for three weeks (21 days) at designated NYSC orientation camps across Nigeria." },
      { q: "What activities happen at camp?", a: "Activities include morning drills, parades, lectures on various topics, skills acquisition training, sports, cultural events, and the swearing-in ceremony." },
      { q: "Can I leave camp during orientation?", a: "Leaving camp during orientation is generally not allowed except for emergencies, and you must obtain permission from the camp officials." },
    ],
  },
  {
    id: "ppa-cds",
    questions: [
      { q: "What is a PPA (Place of Primary Assignment)?", a: "A PPA is where corps members are posted to work during their service year. It can be a school, hospital, government ministry, or private organization." },
      { q: "Can I choose my PPA?", a: "You can indicate preferences during camp, but the final posting is at the discretion of NYSC. You can apply for relocation after camp if needed." },
      { q: "What is CDS (Community Development Service)?", a: "CDS is a weekly group activity where corps members contribute to community development through projects like teaching, health outreach, sanitation, or skills training." },
    ],
  },
  {
    id: "relocation",
    questions: [
      { q: "How do I apply for relocation?", a: "Submit a relocation application through the NYSC portal with supporting documents. Grounds include marital status, health conditions, and security concerns." },
      { q: "Can I relocate on marital grounds?", a: "Yes, married female corps members can relocate to their husband's state. You'll need to provide your marriage certificate, husband's ID, and proof of residence." },
    ],
  },
  {
    id: "clearance",
    questions: [
      { q: "How do I get my PPA clearance?", a: "Your PPA supervisor signs your monthly clearance forms. Ensure you attend regularly and perform your duties diligently." },
      { q: "What happens if I miss clearance?", a: "Missing clearance may result in your monthly allowance being withheld. You'll need to provide a valid reason and get a backdated signature." },
    ],
  },
  {
    id: "pop-exemption",
    questions: [
      { q: "When is POP (Passing Out Parade)?", a: "POP is held at the end of the 12-month service year, usually on a Thursday designated by NYSC." },
      { q: "Who is eligible for exemption?", a: "Graduates over 30 years at the time of graduation, or those who have served in the military or paramilitary for over a year, are eligible for exemption." },
    ],
  },
];

export const CHECKLIST_CATEGORIES: ChecklistCategoryMeta[] = [
  { id: "documents", label: "Documents", icon: "FileCheck" },
  { id: "white-kit", label: "White Kit", icon: "Tent" },
  { id: "essentials", label: "Essentials", icon: "Briefcase" },
  { id: "medicals", label: "Medicals", icon: "Shield" },
];

export const CHECKLIST_ITEMS: { id: string; label: string; category: ChecklistCategory }[] = [
  { id: "call-up-letter", label: "Call-up Letter (printed)", category: "documents" },
  { id: "school-id", label: "School ID Card", category: "documents" },
  { id: "credentials", label: "Degree Certificate / Statement of Result", category: "documents" },
  { id: "birth-cert", label: "Birth Certificate / Declaration of Age", category: "documents" },
  { id: "lg-id", label: "Local Government Identification Letter", category: "documents" },
  { id: "passport", label: "Passport Photographs (8-10 copies)", category: "documents" },
  { id: "white-tshirts", label: "White T-shirts (4-5)", category: "white-kit" },
  { id: "white-shorts", label: "White Shorts (3-4)", category: "white-kit" },
  { id: "white-socks", label: "White Socks (4 pairs)", category: "white-kit" },
  { id: "white-sneakers", label: "White Sneakers / Canvas", category: "white-kit" },
  { id: "bedsheet", label: "Bed Sheet & Pillowcase", category: "essentials" },
  { id: "mosquito-net", label: "Mosquito Net", category: "essentials" },
  { id: "mattress", label: "Foam Mattress", category: "essentials" },
  { id: "padlock", label: "Padlock & Bag", category: "essentials" },
  { id: "cutlery", label: "Cutlery Set (Plate, Cup, Spoon)", category: "essentials" },
  { id: "toiletries", label: "Toiletries (Soap, Toothpaste, Shampoo)", category: "essentials" },
  { id: "malaria-drugs", label: "Malaria Drugs & Painkillers", category: "medicals" },
  { id: "first-aid", label: "First Aid Kit", category: "medicals" },
  { id: "hand-sanitizer", label: "Hand Sanitizer & Face Masks", category: "medicals" },
  { id: "sunscreen", label: "Sunscreen & Insect Repellent", category: "medicals" },
];

export const CAMP_LOCATIONS: CampLocation[] = [
  { state: "Abia", address: "NYSC Orientation Camp, Umunna, Bende LGA", geozone: "South-East" },
  { state: "Abuja", address: "NYSC Orientation Camp, Kubwa, FCT Abuja", geozone: "North-Central" },
  { state: "Lagos", address: "NYSC Orientation Camp, Iyana Ipaja, Agege", geozone: "South-West" },
  { state: "Kaduna", address: "NYSC Orientation Camp, Dutsen-Wai, Kaduna", geozone: "North-West" },
  { state: "Enugu", address: "NYSC Orientation Camp, Awgu, Enugu State", geozone: "South-East" },
  { state: "Rivers", address: "NYSC Orientation Camp, Nonwa-Gbam, Tai LGA", geozone: "South-South" },
  { state: "Kano", address: "NYSC Orientation Camp, Karfi, Kano State", geozone: "North-West" },
  { state: "Oyo", address: "NYSC Orientation Camp, Iseyin, Oyo State", geozone: "South-West" },
  { state: "Benue", address: "NYSC Orientation Camp, Wannune, Tarka LGA", geozone: "North-Central" },
  { state: "Edo", address: "NYSC Orientation Camp, Okada, Edo State", geozone: "South-South" },
];

export const RELOCATION_GROUNDS: RelocationGround[] = [
  {
    id: "marital",
    title: "Marital Grounds",
    description: "For married female corps members to relocate to their husband's state of residence.",
    icon: "Heart",
    documents: ["Marriage Certificate", "Husband's ID Card", "Husband's Letter of Residency", "Affidavit of Marriage"],
    eligibility: "Available to married female corps members only. Must be legally married before or during service.",
  },
  {
    id: "health",
    title: "Health Grounds",
    description: "For corps members with medical conditions requiring specialized care in another state.",
    icon: "HeartPulse",
    documents: ["Medical Report from a Government Hospital", "Referral Letter", "Recommendation from NYSC Medical Board"],
    eligibility: "Must have a documented medical condition that cannot be managed in the current state of deployment.",
  },
  {
    id: "security",
    title: "Security Grounds",
    description: "For corps members posted to states with active security concerns or communal crises.",
    icon: "ShieldAlert",
    documents: ["Security Report from State Authorities", "Letter from NYSC State Secretariat", "Affidavit of Security Concern"],
    eligibility: "Applicable when NYSC officially designates a state as having security challenges.",
  },
];

export const QUICK_REPLIES = [
  "When is the next mobilization?",
  "What to bring to camp",
  "How to apply for relocation",
  "When is POP?",
  "Camp locations near me",
  "Clearance requirements",
];
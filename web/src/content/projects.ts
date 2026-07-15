/**
 * Project roster + case studies. The three featured entries (SFDA, KFSHRC,
 * IAU) are full case studies; the rest are honest roster entries. Photos are
 * placeholders pending sign-off — narrative marked as such where not final.
 */
export interface ScopeItem {
  icon: string;
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  client: string;
  location: string;
  type: string;
  typeChip: string;
  chipKind: "bsl" | "std";
  year: string;
  standards: string[];
  featured: boolean;
  video?: string;
  photoLabel: string;
  summary: string;
  overviewTitle: string;
  overview: string[];
  scope: ScopeItem[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "sfda-bsl3",
    name: "SFDA — BSL-3 Laboratory",
    client: "SFDA",
    location: "Riyadh, KSA",
    type: "BSL-3 Biocontainment",
    typeChip: "BSL-3",
    chipKind: "bsl",
    year: "Available on request",
    standards: ["WHO", "CDC", "NIH", "BMBL", "ISO 14644"],
    featured: true,
    video: "/media/videos/workshop-sfda.mp4",
    photoLabel: "SFDA BSL-3",
    summary:
      "A high-risk biocontainment laboratory delivered for Saudi Arabia's national regulator — designed, built, commissioned and certified to international biosafety standards.",
    overviewTitle: "Containment built to pass inspection",
    overview: [
      "The Saudi Food & Drug Authority required a BSL-3 facility for high-risk work, with the airflow, pressure control and containment integrity to satisfy WHO, CDC, NIH and BMBL guidance.",
      "Masarat delivered the facility end-to-end — from conceptual design and detailed engineering through construction, HVAC and mechanical installation, testing and validation, to commissioning, handover and staff training. (Full project narrative available after sign-off.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Architectural, HVAC, electrical & process engineering for BSL-3 containment." },
      { icon: "construction", title: "Construction & Installation", body: "GRP panels, doors, airflow & pressure-control systems." },
      { icon: "fact_check", title: "Testing & Certification", body: "Containment integrity, HEPA leak, pressure & airflow validation." },
      { icon: "school", title: "Commissioning & Training", body: "Handover and operator training for safe, compliant use." },
    ],
    gallery: ["Containment corridor", "Anteroom / gowning", "BSC & equipment"],
  },
  {
    slug: "kfshrc-cleanroom",
    name: "KFSHRC — Cleanroom",
    client: "King Faisal Specialist Hospital & Research Centre",
    location: "Riyadh, KSA",
    type: "GMP Cleanroom",
    typeChip: "Cleanroom",
    chipKind: "std",
    year: "Available on request",
    standards: ["ISO 14644", "GMP", "USP <797>"],
    featured: true,
    video: "/media/videos/project-2.mp4",
    photoLabel: "KFSHRC Cleanroom",
    summary:
      "A GMP cleanroom for one of the Kingdom's leading specialist hospitals and research centres — classified, qualified and validated to ISO 14644.",
    overviewTitle: "A controlled environment for sterile work",
    overview: [
      "KFSHRC needed a cleanroom suite meeting ISO 14644 classification and GMP practice for sterile preparation and research.",
      "Masarat delivered the impervious GRP envelope, HVAC and terminal HEPA filtration, and the qualification & validation that proves the space performs to its class. (Full project narrative available after sign-off.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Cleanroom layout, HVAC and pressure-cascade design to ISO 14644." },
      { icon: "construction", title: "Build & Install", body: "GRP wall & ceiling systems, coved corners, terminal HEPA filtration." },
      { icon: "fact_check", title: "Qualification & Validation", body: "Particle counts, air changes, recovery and pressure verification." },
      { icon: "school", title: "Handover & Support", body: "Documentation, training and planned preventive maintenance." },
    ],
    gallery: ["Cleanroom suite", "Terminal filters", "Gowning / airlock"],
  },
  {
    slug: "iau-bsl3-glp",
    name: "IAU — BSL-3 & GLP Labs",
    client: "Imam Abdulrahman Bin Faisal University",
    location: "Dammam, KSA",
    type: "BSL-3 & GLP Laboratories",
    typeChip: "BSL-3 · GLP",
    chipKind: "bsl",
    year: "Available on request",
    standards: ["WHO", "CDC", "BMBL", "GLP", "ISO 14644"],
    featured: true,
    video: "/media/videos/project-3.mp4",
    photoLabel: "IAU Labs",
    summary:
      "Biocontainment and GLP laboratories for a leading Saudi university — research-grade containment and good-laboratory-practice environments delivered together.",
    overviewTitle: "Research containment, delivered end-to-end",
    overview: [
      "Imam Abdulrahman Bin Faisal University required BSL-3 containment alongside GLP-compliant laboratory space for research programmes.",
      "Masarat engineered and built both environments, integrating containment airflow, pressure control and the finishes and services that let researchers work safely and to standard. (Full project narrative available after sign-off.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Containment + GLP lab engineering, airflow and pressure regimes." },
      { icon: "construction", title: "Construction & Installation", body: "GRP systems, lab fit-out, HVAC and mechanical installation." },
      { icon: "fact_check", title: "Testing & Validation", body: "Containment integrity, HEPA, pressure and airflow validation." },
      { icon: "school", title: "Commissioning & Training", body: "Handover and researcher/operator training." },
    ],
    gallery: ["BSL-3 suite", "GLP laboratory", "Service corridor"],
  },
  {
    slug: "kfuh-tb-lab",
    name: "KFUH — TB Laboratory",
    client: "King Fahd University Hospital",
    location: "Khobar, KSA",
    type: "TB / Containment Laboratory",
    typeChip: "Containment",
    chipKind: "bsl",
    year: "Available on request",
    standards: ["WHO", "CDC", "BMBL"],
    featured: false,
    photoLabel: "KFUH TB Lab",
    summary:
      "A tuberculosis / containment laboratory delivered for a major Saudi university hospital.",
    overviewTitle: "Containment for high-risk diagnostics",
    overview: [
      "A containment laboratory for high-risk diagnostic work, engineered to the airflow and containment standards the application demands.",
      "Delivered end-to-end by Masarat. (Case-study detail available on request.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Containment lab engineering and airflow design." },
      { icon: "construction", title: "Build & Install", body: "GRP systems, doors, HVAC and controls." },
      { icon: "fact_check", title: "Testing & Certification", body: "Containment and filtration verification." },
      { icon: "school", title: "Handover", body: "Commissioning and operator training." },
    ],
    gallery: ["Laboratory", "Anteroom", "Services"],
  },
  {
    slug: "abmi-facility",
    name: "ABMI — Cleanroom Facility",
    client: "ABMI",
    location: "KSA",
    type: "Cleanroom Facility",
    typeChip: "Cleanroom",
    chipKind: "std",
    year: "Available on request",
    standards: ["ISO 14644", "GMP"],
    featured: false,
    photoLabel: "ABMI Facility",
    summary: "A cleanroom facility delivered to ISO 14644 / GMP practice.",
    overviewTitle: "Cleanroom delivery to standard",
    overview: [
      "A controlled-environment facility built and validated to ISO 14644 classification.",
      "Delivered end-to-end by Masarat. (Case-study detail available on request.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Cleanroom and HVAC engineering." },
      { icon: "construction", title: "Build & Install", body: "GRP envelope and terminal filtration." },
      { icon: "fact_check", title: "Qualification", body: "Classification and validation." },
      { icon: "school", title: "Handover", body: "Documentation and training." },
    ],
    gallery: ["Cleanroom", "Filters", "Airlock"],
  },
  {
    slug: "nami-labs",
    name: "NAMI — Laboratories",
    client: "NAMI",
    location: "KSA",
    type: "Research Laboratories",
    typeChip: "Laboratory",
    chipKind: "std",
    year: "Available on request",
    standards: ["GLP", "ISO 14644"],
    featured: false,
    photoLabel: "NAMI Labs",
    summary: "Research laboratories engineered and delivered to GLP practice.",
    overviewTitle: "Laboratories built for research",
    overview: [
      "GLP-oriented laboratory environments engineered for reliable, standards-compliant research.",
      "Delivered end-to-end by Masarat. (Case-study detail available on request.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Laboratory and services engineering." },
      { icon: "construction", title: "Build & Install", body: "Fit-out, HVAC and mechanical." },
      { icon: "fact_check", title: "Validation", body: "Environmental verification." },
      { icon: "school", title: "Handover", body: "Commissioning and training." },
    ],
    gallery: ["Laboratory", "Bench systems", "Services"],
  },
  {
    slug: "care-medical",
    name: "Care Medical — Cleanroom",
    client: "Care Medical",
    location: "KSA",
    type: "Medical Cleanroom",
    typeChip: "Cleanroom",
    chipKind: "std",
    year: "Available on request",
    standards: ["ISO 14644", "GMP"],
    featured: false,
    photoLabel: "Care Medical",
    summary: "A medical cleanroom delivered to ISO 14644 / GMP practice.",
    overviewTitle: "Medical-grade controlled environment",
    overview: [
      "A cleanroom for medical use, classified and validated to ISO 14644.",
      "Delivered end-to-end by Masarat. (Case-study detail available on request.)",
    ],
    scope: [
      { icon: "draw", title: "Design & Engineering", body: "Cleanroom and HVAC engineering." },
      { icon: "construction", title: "Build & Install", body: "GRP envelope and filtration." },
      { icon: "fact_check", title: "Qualification", body: "Classification and validation." },
      { icon: "school", title: "Handover", body: "Documentation and training." },
    ],
    gallery: ["Cleanroom", "Filters", "Airlock"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

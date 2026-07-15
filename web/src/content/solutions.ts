/**
 * The three client pathways — Build & Engineer, Equip, Test & Maintain —
 * plus the shared 8-phase delivery method. This is the spine of the site's
 * information architecture, carried over from the approved content strategy.
 */
export interface Capability {
  icon: string;
  title: string;
  body: string;
}

export interface Solution {
  slug: "build" | "equip" | "test-maintain";
  icon: string;
  eyebrow: string;
  title: string;
  lead: string;
  intro: string;
  photo: string;
  features: string[];
  capabilities: Capability[];
}

export const solutions: Solution[] = [
  {
    slug: "build",
    icon: "architecture",
    eyebrow: "Solutions · Build & Engineer",
    title: "Build & Engineer",
    lead: "We design and construct the controlled environment itself — the impervious shell, the airflow, and the containment that makes a space safe.",
    intro:
      "From turnkey cleanrooms and GMP suites to BSL-3/4 biocontainment laboratories, Masarat takes a controlled environment from concept to a facility that passes inspection. One accountable team owns design, engineering, construction and installation.",
    photo: "/media/photos/cleanroom-interior.jpg",
    features: [
      "Turnkey cleanrooms & GMP suites",
      "BSL-3 / BSL-4 biocontainment laboratories",
      "GRP wall & ceiling systems with coved corners",
      "HVAC, pressure cascade & terminal HEPA filtration",
      "Doors, vision panels, airlocks & pass-throughs",
      "Electrical, mechanical & controls installation",
    ],
    capabilities: [
      { icon: "draw", title: "Design & Engineering", body: "Architectural, HVAC, electrical and process engineering to ISO 14644 and GLP/GMP." },
      { icon: "construction", title: "Construction & Installation", body: "Impervious GRP envelope, services and finishes installed by our own engineers." },
      { icon: "air", title: "Airflow & Containment", body: "Pressure-cascade design and unidirectional airflow that hold the room to its class." },
    ],
  },
  {
    slug: "equip",
    icon: "science",
    eyebrow: "Solutions · Equip",
    title: "Equip",
    lead: "We add the technical systems and products that make a controlled environment usable — safely, and to standard.",
    intro:
      "Biological safety cabinets, fume hoods, laboratory equipment, cleanroom furniture and the supporting systems. We help you choose the right equipment for the work — with honest distinctions between what protects the product, the operator, and the environment.",
    photo: "/media/photos/biosafety-cabinet.jpg",
    features: [
      "Biological safety cabinets (Class I / II / III)",
      "Clean benches & laminar-flow units",
      "Fume hoods & ductless enclosures",
      "Laboratory equipment & benching",
      "Cleanroom furniture & pass-through systems",
      "Monitoring, sensors & controls",
    ],
    capabilities: [
      { icon: "biotech", title: "Safety Cabinets & Hoods", body: "The right containment for the task — with clear guidance on BSCs vs clean benches vs fume hoods." },
      { icon: "table_restaurant", title: "Furniture & Systems", body: "Cleanroom-grade furniture, benching and pass-throughs that keep the space clean." },
      { icon: "sensors", title: "Monitoring & Controls", body: "Sensors and controls that make performance visible and auditable." },
    ],
  },
  {
    slug: "test-maintain",
    icon: "fact_check",
    eyebrow: "Solutions · Test & Maintain",
    title: "Test & Maintain",
    lead: "We prove performance and protect it — certifying to standard on day one and keeping it compliant year after year.",
    intro:
      "Commissioning, qualification and validation (CQV), air-quality and cabinet certification, and planned preventive maintenance. The applicable standard, traceable instrument calibration and a clear service report are the deliverables that matter.",
    photo: "/media/photos/corridor-control.jpg",
    features: [
      "Commissioning, qualification & validation (CQV)",
      "HEPA filter integrity (leak) testing",
      "Airborne particle counting & classification",
      "Pressure, airflow & air-change verification",
      "Biosafety cabinet certification (NSF/49 aligned)",
      "Planned preventive maintenance & requalification",
    ],
    capabilities: [
      { icon: "verified", title: "Certification & Validation", body: "Traceable, standards-referenced testing with a clear report and certificate." },
      { icon: "filter_alt", title: "Air-Quality & HEPA", body: "Particle counts, HEPA integrity and airflow verification to ISO 14644." },
      { icon: "engineering", title: "Preventive Maintenance", body: "Scheduled service and periodic requalification that keep facilities compliant." },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export interface Phase {
  num: string;
  title: string;
  body: string;
  ongoing?: boolean;
}

export const deliveryPhases: Phase[] = [
  { num: "01", title: "Project Initiation", body: "Kick-off, finalised requirements & scope, initial site assessment." },
  { num: "02", title: "Design", body: "Conceptual & detailed engineering and architectural design, approved by the client." },
  { num: "03", title: "Procurement", body: "Sourcing of materials & equipment, quality checks, preparation for shipping." },
  { num: "04", title: "Construction", body: "Site preparation, GRP panels and structural components assembled and installed." },
  { num: "05", title: "Installation", body: "HVAC systems, cleanroom components, electrical and mechanical installation." },
  { num: "06", title: "Testing & Validation", body: "Comprehensive testing and validation to ISO 14644 and GLP/GMP compliance." },
  { num: "07", title: "Commissioning & Handover", body: "Final inspections, full documentation, handover of the facility and staff training." },
  {
    num: "08",
    title: "Ongoing Support & Partnership",
    body: "We stay with you after handover — preventive maintenance, periodic requalification, training refreshers and responsive support to keep your facility compliant year after year.",
    ongoing: true,
  },
];

export const pillars = [
  { icon: "rule", title: "Standards-led", body: "ISO 14644, GLP/GMP, USP, WHO/CDC/NIH/BMBL — work built to pass inspection." },
  { icon: "all_inclusive", title: "End-to-end", body: "Design » Supply » Construct » Install » Commission, under one accountable partner." },
  { icon: "groups", title: "Saudi expertise + global network", body: "Local engineers backed by national & international specialists." },
  { icon: "workspace_premium", title: "Trusted institutions", body: "Delivered for SFDA, KFSHRC, KFUH, IAU and more." },
];

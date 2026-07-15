/** The real four-person leadership team, carried over from the approved site. */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export const team: TeamMember[] = [
  {
    name: "Faisal Alrasheedi",
    role: "CEO & Founder",
    bio: "Founded Masarat in 2016 and leads its mission to deliver critical environments the Kingdom can trust.",
    photo: "/team/faisal-alrasheedi.png",
  },
  {
    name: "Turki bin Saud",
    role: "Director of Operations",
    bio: "Leads project delivery and operations with a focus on reliable execution and long-term client support.",
    photo: "/team/turki-bin-saud.png",
  },
  {
    name: "Fawaz Kekya",
    role: "Administrative Manager",
    bio: "Leads administration and operations support, keeping standards, documentation and service quality consistent across projects.",
    photo: "/team/fawaz-kekya.png",
  },
  {
    name: "Khalid Alzuwayyid",
    role: "Manager of Service & Maintenance",
    bio: "Coordinates service and maintenance to keep clients' facilities performing reliably long after handover.",
    photo: "/team/khalid-alzuwayyid.png",
  },
];

/** The company's values, shown on the About page. */
export const values = [
  { icon: "shield", title: "Integrity", body: "We do what is right for the facility and the people it protects — even when no one is watching." },
  { icon: "verified", title: "Quality", body: "We build to the standard, prove it with evidence, and stand behind the result." },
  { icon: "handshake", title: "Responsibility", body: "We take ownership of outcomes, not just deliverables." },
  { icon: "diversity_3", title: "Partnership", body: "We stay with clients long after handover — their compliance is our concern." },
];

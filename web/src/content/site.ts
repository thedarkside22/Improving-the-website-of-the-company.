/**
 * Single source of truth for brand + contact facts. These are the real,
 * confirmed Masarat details carried over from the approved design. When the
 * Sanity CMS is wired up, this becomes the fallback / seed data.
 */
export const site = {
  name: "Masarat for Accreditation",
  shortName: "Masarat",
  founded: 2016,
  phone: "+966 1148 70 043",
  phoneHref: "+966114870043",
  email: "info@m4acc.com",
  whatsapp: "966114870043",
  address: "6776 Al Ulaya, Al Wurud, Riyadh 12215",
  addressAr: "6776 العليا، الورود، الرياض 12215",
  mapUrl:
    "https://www.google.com/maps/place/Masarat+for+Accreditation/@24.718324,46.6710433,17z",
  hours: "Sun–Thu, 08:00–17:00 (AST)",
  compliance: ["SFDA", "CBAHI", "WHO", "CAP", "CDC", "GMP", "ISO 14644", "NSF"],
  trustedBy: ["SFDA", "KFSHRC", "IAU", "KFUH"],
  social: {
    linkedin: "https://www.linkedin.com/company/m4acc-company/",
    x: "https://x.com/masarat4acc",
    youtube: "https://www.youtube.com/@MasaratforAccreditation",
  },
} as const;

/** The standards / frameworks grid on the home + about pages. */
export const standards = [
  { code: "ISO 14644", note: "Cleanroom classification" },
  { code: "GLP / GMP", note: "Lab & manufacturing" },
  { code: "USP <797>/<800>", note: "Sterile & hazardous" },
  { code: "WHO · CDC · NIH", note: "Biosafety / BMBL" },
  { code: "SFDA", note: "Saudi FDA" },
  { code: "CBAHI · JCIA · CAP", note: "Healthcare accreditation" },
  { code: "NSF", note: "Biosafety cabinets" },
];

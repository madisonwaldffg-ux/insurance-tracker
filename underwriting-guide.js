/* ===========================================================================
   underwriting-guide.js -- the carriers this agent is contracted with and the
   shared underwriting summaries for their products.

   Source: the agent's Notion "Carriers" database (Oct 2026). Only facts written
   there are filled in; everything else is left blank to be completed from the
   carrier's own underwriting guide. Each agent can add their own notes on top
   in the Underwriting tab (saved to their account).

   UW_CARRIERS: display name, matching comp-guide.js key (for the product list),
   states the carrier excludes, and what it's best for.
   UW_GUIDE[carrier display name][product] fields (all optional, plain text):
     ages, face, uwType, benefit, build, knockouts, rx, notes
   =========================================================================== */
window.UW_CARRIERS = [
  { name: "American Amicable", comp: "American-Amicable", excludes: "MA", bestFor: "Whole life · equity protection" },
  { name: "American Home Life", comp: "American Home Life (AHL)", excludes: "MA, OR", bestFor: "Whole life · equity protection only" },
  { name: "CICA - Citizens", comp: "CICA Life", excludes: "", bestFor: "" },
  { name: "CoreBridge", comp: "Corebridge Financial", excludes: "", bestFor: "Guaranteed issue" },
  { name: "Foresters", comp: "Foresters", excludes: "MA", bestFor: "Full suite · #1 for term" },
  { name: "Mutual of Omaha", comp: "Mutual of Omaha", excludes: "", bestFor: "Full suite · whole life · writes in MA" },
  { name: "Transamerica", comp: "Transamerica", excludes: "", bestFor: "Term (mortgage protection)" },
  { name: "Liberty Bankers", comp: "Liberty Bankers", excludes: "", bestFor: "" },
  { name: "Kansas City Life", comp: "Kansas City Life", excludes: "", bestFor: "Term (mortgage protection)" },
  { name: "Occidental Life (North Carolina)", comp: "", excludes: "", bestFor: "" },
  { name: "Fidelity & Guaranty (F&G)", comp: "F&G", excludes: "", bestFor: "Term (mortgage protection)" },
  { name: "SBLI", comp: "", excludes: "", bestFor: "" },
  { name: "United Home Life", comp: "United Home Life", excludes: "", bestFor: "" },
  { name: "Royal Neighbors", comp: "", excludes: "", bestFor: "COPD and neuropathy cases" }
];

window.UW_GUIDE = {
  "Foresters": {
    "Strong Foundation": {
      ages: "Up to age 75",
      face: "$50,000 – $250,000",
      uwType: "Term",
      knockouts: "Usual term knockouts (heart attack/stents, stroke, serious cancer, COPD, autoimmune, etc.) — Foresters will sometimes still accept.",
      rx: "Only carrier that counts cigarettes ONLY as tobacco.",
      notes: "#1 term carrier. Good for diabetes (especially type 2).\nOffers a complimentary trust and will — can help set it up; lets heirs bypass probate so children can access the home right away, and any assets can go into the trust."
    },
    "Planright": {
      ages: "Up to age 85",
      face: "$5,000 – $35,000",
      uwType: "Whole life — final expense / equity protection",
      notes: "Good for diabetes (especially type 2)."
    },
    "SmartUL": {
      face: "Up to $150,000",
      uwType: "Universal life (indexed to the S&P)",
      notes: "Structure as whole life, pitch as permanent coverage. Good for very healthy, older clients with money to spare — a larger policy at a cheaper rate, with cash value tied to the S&P."
    }
  },
  "American Amicable": {
    "Dignity Solutions & Family Legacy": {
      ages: "0 – 85",
      face: "Up to $50,000",
      uwType: "Whole life — final expense; immediate approval",
      benefit: "Immediate, graded, or return of premium (ROP)",
      notes: "Good for equity protection. Good for anxiety and depression, clients on lots of medications, and women with multiple health issues."
    }
  },
  "American Home Life": {
    "FE": {
      ages: "Up to age 89 (most carriers stop at 85)",
      face: "Up to $30,000",
      uwType: "Whole life — Patriot Series (equity protection only)",
      build: "No height and weight chart",
      knockouts: "Good with large health risks 12+ months ago — quote as standard.\nPreferred: cancer over 2 years ago; heart attack over 2 years ago.\nStroke: standard.",
      notes: "Full details in the AMH Product Profile PDF on the Notion carrier page."
    }
  },
  "CoreBridge": {
    "GIWL Whole Life": {
      ages: "Up to age 80",
      uwType: "Guaranteed issue",
      benefit: "2-year waiting period",
      notes: "Use for sick or really bad health."
    }
  },
  "Mutual of Omaha": {
    "Living Promise": {
      uwType: "Whole life — equity protection",
      notes: "Affordable and approves quickly. Mutual of Omaha writes policies in MA."
    },
    "IULe": {
      notes: "IUL Express."
    }
  },
  "Royal Neighbors": {
    "All products": {
      knockouts: "Takes COPD at standard. Takes neuropathy."
    }
  }
};

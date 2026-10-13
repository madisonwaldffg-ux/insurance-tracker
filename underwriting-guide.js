/* ===========================================================================
   underwriting-guide.js -- the carriers this agent is contracted with and the
   shared underwriting summaries for their products.

   Sources: the agent's Notion "Carriers" database (Oct 2026) and the agency's
   Forged Term Underwriting Knockout Guide + Final Expense Underwriting Knockout
   Cheat Sheet (Google Drive, July 2026). Only facts stated there are filled in;
   everything else is left blank to be completed from the carrier's own guide. Each agent can add their own notes on top
   in the Underwriting tab (saved to their account).

   UW_CARRIERS: display name, matching comp-guide.js key (for the product list),
   states the carrier excludes, and what it's best for.
   UW_GUIDE[carrier display name][product] fields (all optional, plain text):
     ages, face, uwType, benefit, build, knockouts, rx, notes, src (where it came from)
   =========================================================================== */
window.UW_CARRIERS = [
  { name: "American Amicable", comp: "American-Amicable", excludes: "MA", bestFor: "Whole life · equity protection" },
  { name: "American Home Life", comp: "American Home Life (AHL)", excludes: "MA, OR", bestFor: "Whole life · equity protection only" },
  { name: "CICA - Citizens", comp: "CICA Life", excludes: "", bestFor: "Final expense · guaranteed issue fallback" },
  { name: "CoreBridge", comp: "Corebridge Financial", excludes: "", bestFor: "Guaranteed issue" },
  { name: "Foresters", comp: "Foresters", excludes: "MA", bestFor: "Full suite · #1 for term" },
  { name: "Mutual of Omaha", comp: "Mutual of Omaha", excludes: "", bestFor: "Full suite · whole life · writes in MA" },
  { name: "Transamerica", comp: "Transamerica", excludes: "", bestFor: "Term (mortgage protection) · final expense" },
  { name: "Liberty Bankers", comp: "Liberty Bankers", excludes: "", bestFor: "" },
  { name: "Kansas City Life", comp: "Kansas City Life", excludes: "", bestFor: "Term (mortgage protection)" },
  { name: "Occidental Life (North Carolina)", comp: "", excludes: "", bestFor: "" },
  { name: "Fidelity & Guaranty (F&G)", comp: "F&G", excludes: "", bestFor: "Term (mortgage protection)" },
  { name: "SBLI", comp: "", excludes: "", bestFor: "" },
  { name: "United Home Life", comp: "United Home Life", excludes: "", bestFor: "Term · final expense · insulin / prior declines" },
  { name: "Royal Neighbors", comp: "", excludes: "", bestFor: "COPD and neuropathy cases" }
];

window.UW_GUIDE = {
  "Foresters": {
    "Strong Foundation": {
      ages: "Up to age 75",
      face: "$50,000 – $250,000",
      uwType: "Term — non-medical (simplified) underwriting",
      knockouts: "Non-med declines: heart attack, CAD, angina, stent/angioplasty, bypass, heart/valve surgery, CHF, cardiomyopathy, significant arrhythmia, aneurysm, pacemaker, PVD/PAD, stroke/TIA; Alzheimer's/dementia, ALS, MS, Parkinson's, muscular dystrophy, paralysis, permanent wheelchair; chronic kidney disease, cirrhosis/liver disease, hepatitis B/C, emphysema, chronic bronchitis, oxygen; ADL help, HIV/AIDS, organ transplant, leukemia, Hodgkin's, lupus, severe depression, bipolar, schizophrenia, suicide attempt, non-marijuana drug use, unexplained weight loss, build outside chart.\nDiabetes: Type 1 or 2, INCLUDING insulin, can get individual consideration (A1C, age, duration, build, no complications).\nCOPD: mild COPD non-smoker may qualify (no oxygen, no steroids, minimal shortness of breath, can climb a flight of stairs).\nCancer: basal cell may qualify; most others need treatment done 10+ years, no recurrence.\nSeizures: may qualify if controlled, none for 2 years. Crohn's: 5+ years remission. Gastric bypass: after 1 year, weight stable.\nMild anxiety/depression: may qualify if age 25+, onset 1+ year ago, no hospitalization, no missed work.\nAlcoholism: decline within 5 years; may qualify after 5 years with no relapse.\nCriminal: probation/parole/jail/pending charges = decline. No jail time: consider 1 year after probation ends. Jail served: consider 5 years after parole.\nDUI: 1 within 12 months, or 2 with the latest within 5 years = non-med decline.",
      rx: "Only carrier that counts cigarettes ONLY as tobacco.\nMarijuana: recreational up to 6 days/week may be accepted; daily or medical use = individual consideration.\nHumira/Enbrel/chronic prednisone can reveal moderate–severe RA. No broad drug-name knockout list published.",
      notes: "#1 term carrier. Good for diabetes (especially type 2) — best starting point for insulin-dependent diabetics and mild non-smoker COPD on term.\nHazardous jobs/sports/private aviation may need a questionnaire, rating, exclusion or full underwriting.\nOffers a complimentary trust and will — can help set it up; lets heirs bypass probate so children can access the home right away, and any assets can go into the trust.",
      src: "Notion carrier notes; Forged Term Underwriting Knockout Guide (Jul 2026)"
    },
    "SmartUL": {
      face: "Up to $150,000",
      uwType: "Indexed universal life — uses Foresters' non-medical guide (same as Strong Foundation)",
      knockouts: "Same non-med declines as Strong Foundation, PLUS:\nDiabetes: insulin, poor control or any complication = decline (controlled Type 2 on diet/pills may qualify).\nCOPD: decline.",
      notes: "Structure as whole life, pitch as permanent coverage. Good for very healthy, older clients with money to spare — a larger policy at a cheaper rate, with cash value tied to the S&P.\nAvoid for insulin users and any COPD.",
      src: "Notion carrier notes; Forged Term Underwriting Knockout Guide (Jul 2026)"
    },
    "Planright": {
      ages: "Up to age 85",
      face: "$5,000 – $35,000",
      uwType: "Whole life — final expense / equity protection; eApp",
      benefit: "Must meet general qualifications, be mentally competent and answer \"No\" to the medical questions. eApp returns Preferred, Standard, Basic, referral, or not eligible.",
      notes: "Good for diabetes (especially type 2). Good level-benefit option for clean or remote health history.",
      src: "Notion carrier notes; Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    }
  },
  "American Amicable": {
    "Dignity Solutions & Family Legacy": {
      ages: "0 – 85",
      face: "Up to $50,000",
      uwType: "Whole life — final expense; immediate approval",
      benefit: "Immediate, graded, or return of premium (ROP)",
      notes: "Good for equity protection. Good for anxiety and depression, clients on lots of medications, and women with multiple health issues.",
      src: "Notion carrier notes"
    }
  },
  "American Home Life": {
    "FE": {
      ages: "Up to age 89 (most carriers stop at 85)",
      face: "Up to $30,000",
      uwType: "Whole life — Patriot Series (equity protection only)",
      benefit: "Three level tiers plus one modified tier; eApp and disease/Rx guides decide placement.",
      build: "No height and weight chart",
      knockouts: "Good with large health risks 12+ months ago — quote as standard.\nPreferred: cancer over 2 years ago; heart attack over 2 years ago.\nStroke: standard.\nOxygen changes the case.",
      notes: "Best starting point for COPD WITHOUT oxygen, Parkinson's and lupus — possible day-one placement (falls, ADLs and progression matter). Also a fallback (modified tier) for recent heart attack/stroke/stent/cancer.\nFull details in the AMH Product Profile PDF on the Notion carrier page.",
      src: "Notion carrier notes; Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    }
  },
  "CICA - Citizens": {
    "Standard Issue": {
      uwType: "Whole life — final expense",
      benefit: "Level benefit",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    },
    "Guaranteed Issue": {
      uwType: "Guaranteed issue",
      benefit: "Available for applicants who meet the age/state eligibility.",
      notes: "Fallback for the usual hard stops: oxygen, dialysis/ESRD, dementia, hospice or terminal illness, active cancer treatment — if eligible AND the applicant can legally consent. Also a CHF fallback.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    }
  },
  "CoreBridge": {
    "GIWL Whole Life": {
      ages: "Up to age 80",
      uwType: "Guaranteed issue",
      benefit: "2-year waiting period",
      notes: "Use for sick or really bad health.",
      src: "Notion carrier notes"
    }
  },
  "Mutual of Omaha": {
    "Term": {
      uwType: "Term Life Express — simplified issue (application, build chart, MIB, Rx data, medical data, MVR)",
      knockouts: "Decline: diabetes over age 45 (50 in CA/VI) plus Table 2+ build, nicotine or PVD; diabetes with ANY complications; Table 2+ build plus high blood pressure, asthma with nicotine, or PVD.\nCommon adjusted offer/decline: CHF, cardiomyopathy, CKD/renal failure, CAD/heart surgery, COPD, defibrillator, hepatitis B/C, cirrhosis, leukemia/lymphoma/melanoma, metastatic/recurrent cancer, serious mental illness, ALS/MS/Parkinson's, stroke/TIA, transplant, PVD/PAD, lupus, paralysis.\nHigh blood pressure: no hospitalization for it in 5 years.\nPrior United of Omaha decline or offer worse than Table 4 = ineligible for Express products.\nAlcohol/drug use, treatment or related conviction: none in 10 years. DUI/DWI/reckless driving: none in 5 years. 4+ moving violations: ineligible. Felony: none in 10 years.\nHazardous occupations/sports and aviation: not allowed (e.g. bomb squad, military aircrew, work above 49 ft, racing, skydiving, climbing). POA-signed applications not accepted.",
      rx: "Non-nicotine rates: no tobacco/nicotine in any form for 12 months. Marijuana may qualify as non-tobacco.\nRx knockouts: dementia (Aricept, donepezil, Namenda, Exelon, Razadyne), advanced heart (amiodarone, digoxin, Ranexa, Eliquis, Xarelto, Aggrenox), COPD (Anoro, Daliresp, Spiriva, Tudorza), cancer (Keytruda, Opdivo, Revlimid, Arimidex, Femara, etc.), Parkinson's/MS (Sinemet, Azilect, Copaxone, Avonex, Tysabri), transplant (CellCept, Prograf, cyclosporine), psychiatric (clozapine, Haldol, Geodon, Invega, Latuda, lithium, Risperdal, Zyprexa), substance treatment (methadone, Suboxone, naltrexone, Antabuse), other (Humira, Enbrel, methotrexate, morphine).",
      src: "Forged Term Underwriting Knockout Guide (Jul 2026)"
    },
    "Living Promise": {
      uwType: "Whole life — equity protection; simplified issue",
      benefit: "A \"Yes\" in Part One generally means no Living Promise offer. A \"Yes\" in Part Two generally routes to the Graded plan.",
      notes: "Affordable and approves quickly. Writes policies in MA.\nMOO Graded is a starting point for recent heart attack, stroke, stent, bypass or cancer, and for CHF.",
      src: "Notion carrier notes; Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    },
    "IULe": {
      notes: "IUL Express.",
      src: "Notion carrier notes"
    }
  },
  "Transamerica": {
    "FE Express": {
      uwType: "Whole life — final expense",
      benefit: "Immediate level benefit",
      notes: "Good level-benefit option for clean/remote health. Backup for insulin, COPD without oxygen, Parkinson's, prior declines or high build.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    },
    "Graded FE Express": {
      uwType: "Whole life — final expense, graded",
      benefit: "Two-year graded benefit",
      notes: "Starting point for recent heart attack, stroke, stent, bypass or cancer, and for CHF/cardiomyopathy (Entresto; Lasix + carvedilol + spironolactone).",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    }
  },
  "Liberty Bankers": {
    "SIMPL": {
      uwType: "Simplified issue whole life (Preferred / Standard)",
      notes: "Backup for insulin users without severe complications, prior declines or high build.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    },
    "Modified Whole Life": {
      uwType: "Modified whole life — the impaired-risk plan",
      notes: "Starting point for CHF/cardiomyopathy and recent heart attack, stroke, stent, bypass or cancer.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    }
  },
  "Kansas City Life": {
    "Signature Term Simplified Issue": {
      ages: "Phone interview: $50K–$250K random, mandatory ages 61–65; over $250K always.",
      uwType: "Signature Term Express — simplified issue (pre-screen only: public guide dated June 2020)",
      build: "Outside the build chart = ineligible for the simplified product.",
      knockouts: "Decline: diabetes diagnosed before age 50; insulin at any age; any diabetic complication.\nAny current excluded prescription = ineligible.\nNo reliable public DUI, felony, probation/parole or substance-abuse timeline — verify with KCL underwriting.\nVisa: permanent resident or qualifying H1B/L1, generally 1+ year living in the U.S.",
      rx: "MVR: mandatory ages 18–45, as needed 46–65.\nRx exclusions: insulin; dementia (Aricept, Namenda, Exelon); heart (amiodarone, digoxin, Entresto, flecainide, nitroglycerin, Pradaxa, Ranexa, sotalol, Tikosyn, Xarelto, Eliquis); COPD (Anoro, Breo, Daliresp, Spiriva, Tudorza); cancer (Keytruda, Opdivo, Revlimid, tamoxifen, Arimidex, Femara, chemo); Parkinson's/MS/ALS (Sinemet, Copaxone, Avonex, Tysabri, Rilutek); HIV/hepatitis antivirals; transplant/autoimmune (CellCept, Prograf, Humira, Enbrel, methotrexate, Xeljanz); psychiatric (Abilify, clozapine, Haldol, lithium, Latuda, Risperdal, Seroquel, Zyprexa, Invega, Geodon, Vraylar); substance treatment (methadone, Suboxone, naltrexone, Antabuse).\nIndividual consideration with reason: Coreg, Plavix, warfarin, Lovenox, prednisone.",
      notes: "Older guide required a home purchase or refinance within the past 2 years (mortgage protection). Confirm the current state application before submitting.",
      src: "Forged Term Underwriting Knockout Guide (Jul 2026)"
    }
  },
  "United Home Life": {
    "Term": {
      face: "Simple Term 20 DLX: $25,000 – $50,000",
      uwType: "Simple Term 20 / 30 / 20 ROP (built-in Table 4) and Simple Term 20 DLX (built-in Table 8)",
      benefit: "DLX advertises day-one coverage up to $50,000 for qualifying applicants.",
      build: "Must be inside the build chart for the plan; outside the DLX chart, UHL points to graded-benefit products.",
      knockouts: "Simple Term (Table 4) fits minor conditions: controlled Type 2 diabetes, controlled blood pressure/cholesterol, depression, anxiety.\nSimple Term 20 DLX fits moderate conditions: Type 1/insulin diabetes, schizophrenia, bipolar, major depression, disability, previous declines.\nBasic eligibility fails: can't understand/sign; no doctor or not seen in 3 years; outside build chart; foreign national not legally/permanently in U.S. 2+ years; called to combat duty.\nPre-screen with UHL: active cancer, dialysis, oxygen, advanced CHF, recent heart/stroke event, active substance abuse, progressive neurologic disease.",
      rx: "Non-tobacco: no nicotine, substitute or vaping in 12 months. Rx search may trigger questions, APS, exam or labs. No published DUI/felony timelines — check the application.",
      src: "Forged Term Underwriting Knockout Guide (Jul 2026)"
    },
    "Express Issue Premier WL": {
      uwType: "Whole life — final expense (Express Issue)",
      benefit: "Immediate",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    },
    "Express Issue Deluxe WL": {
      uwType: "Whole life — final expense (Express Issue)",
      benefit: "Immediate. 2-year lookback for moderate conditions.",
      notes: "Best starting point for Type 1 diabetes / insulin (complications still matter), previous declines and high build.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    },
    "Express Issue Graded WL": {
      uwType: "Whole life — final expense (Express Issue)",
      benefit: "May use a graded death benefit. 1-year lookback for major conditions.",
      notes: "Good for previous declines and certain build challenges.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026)"
    }
  },
  "Royal Neighbors": {
    "All products": {
      knockouts: "Takes COPD at standard. Takes neuropathy.",
      src: "Notion carrier notes"
    }
  }
};

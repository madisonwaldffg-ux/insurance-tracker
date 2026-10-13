/* ===========================================================================
   underwriting-guide.js -- the carriers this agent is contracted with and the
   shared underwriting summaries for their products.

   Sources: the agent's Notion "Carriers" database (Oct 2026), the agency's
   Forged Term Underwriting Knockout Guide + Final Expense Underwriting Knockout
   Cheat Sheet (July 2026), the FE & WL and TERM UW cheat sheets, and the
   carrier guides in the "Insurance Sales Agent" project (Oct 2026 refresh):
   American Amicable Products at a Glance + Agent Manual, AHL Patriot disease
   guide / drug list / state availability, CICA Agent Guide, Foresters UW guide
   + non-med diabetes ratings, Mutual of Omaha SI UW guide + product portfolio,
   Transamerica Underwriting Primer, Liberty Bankers agent guide.
   Only facts stated in those sources are filled in; everything else is left
   blank. Each agent can add their own notes on top in the Underwriting tab
   (saved to their account).

   UW_CARRIERS: display name, matching comp-guide.js key (for the product list),
   states the carrier excludes, and what it's best for.
   UW_GUIDE[carrier display name][product] fields (all optional, plain text):
     ages, face, uwType, benefit, build, knockouts, rx, notes, src (where it came from)
   =========================================================================== */
window.UW_CARRIERS = [
  { name: "American Amicable", comp: "American-Amicable", excludes: "MA", bestFor: "Whole life · equity protection" },
  { name: "American Home Life", comp: "American Home Life (AHL)", excludes: "AK, CA, CT, DE, DC, HI, ME, MA, NH, NJ, NY, OR, RI, VT", bestFor: "Whole life · equity protection only" },
  { name: "CICA - Citizens", comp: "CICA Life", excludes: "CA, DE, ME, MA, NJ, NY, VA", bestFor: "Final expense · guaranteed issue fallback" },
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
  "American Amicable": {
    "Dignity Solutions & Family Legacy": {
      ages: "Older-age plan 50–85 (age last birthday); younger-age plan 0–49",
      face: "Older age (50–85): min $2,500 ($5,000 WA). Immediate ages 50–75 up to $50,000; Immediate 76–85 up to $25,000; Graded/ROP 50–85 up to $25,000.\nYounger age (0–49): min $10,000. Immediate 0–49 up to $35,000; ROP 18–49 up to $20,000.",
      uwType: "Whole life — simplified issue, no exam; MIB check + script check; point-of-sale decision (Final Expense Decision Engine)",
      benefit: "Immediate (level), Graded, or Return of Premium (ROP) — the health questions decide the plan.",
      rx: "MIB + prescription (script) check on every app.\nOlder-age plan: phone interview (PHI) only on Immediate when the applicant is 71+ with no prescriptions, or the payor isn't the spouse/child/self.\nYounger-age plan: PHI only if the SSN starts with 9 or 2, or the payor isn't the spouse/self.\nRisk assessment before you apply: Live Chat in the agent portal or riskassess@aatx.com (not by phone). Have ready: product, tobacco status, height/weight, age, gender, current/recent Rx with the reason for each, medical history, occupation/source of income.",
      notes: "Good for equity protection. Good for anxiety and depression, clients on lots of medications, and women with multiple health issues.\nRiders (older age): ADB (not on ROP), children's & grandchildren's insurance (not on ROP), confined care, nursing home waiver of premium, terminal illness. Younger age adds level term rider and waiver of premium.\nDrafts can follow the Social Security schedule (1S, 3S, 2W, 3W, 4W) — set Policy Date to \"Upon Approval\".",
      src: "Notion carrier notes; American Amicable Products at a Glance (rev 8/25); American Amicable Agent Manual"
    },
    "Home Protector": {
      ages: "15-yr 20–65 · 20-yr 20–60 · 25-yr 20–55 · 30-yr 20–50. ROP (tobacco): 20-yr 20–60, 25-yr 20–55, 30-yr 20–50. Age last birthday.",
      face: "Min $25,000 or $25/month (whichever is greater). Max $500,000 ages 20–45; $300,000 ages 46+.",
      uwType: "Term (15/20/25/30, plus 20/25/30 ROP) — mortgage protection; simplified issue, no exam; MIB + script check; point-of-sale decision",
      rx: "MIB + script check.\nRisk assessment before you apply: Live Chat in the agent portal or riskassess@aatx.com (not by phone). Have ready: product, tobacco status, height/weight, age, gender, current/recent Rx with the reason for each, medical history, occupation/source of income.",
      notes: "Riders: ADB, accident-only disability income, critical illness, waiver of premium, children's insurance, disability income, unemployment waiver, chronic illness, level term, confined care, terminal illness.",
      src: "American Amicable Products at a Glance (rev 8/25); American Amicable Agent Manual"
    },
    "Term Made Simple": {
      ages: "10-yr 18–75 · 15-yr 18–70 · 20-yr 18–65 · 30-yr 18–55 (age last birthday)",
      face: "Min $50,000 or $20/month (whichever is greater); max $500,000",
      uwType: "Term 10/15/20/30 — simplified issue, no exam; MIB + script check; point-of-sale decision",
      rx: "MIB + script check.\nRisk assessment before you apply: Live Chat in the agent portal or riskassess@aatx.com (not by phone). Have ready: product, tobacco status, height/weight, age, gender, current/recent Rx with the reason for each, medical history, occupation/source of income.",
      notes: "Riders: ADB, accident-only DI, critical illness, waiver of premium, children's insurance, DI rider, unemployment waiver, chronic illness, confined care, terminal illness.",
      src: "American Amicable Products at a Glance (rev 8/25); American Amicable Agent Manual"
    },
    "Easy Term": {
      ages: "10-yr 18–70 · 20-yr 18–65 · 30-yr 18–55. ROP: 20-yr 18–60, 30-yr 18–50, tobacco ROP 18–40. Age nearest birthday.",
      face: "Min $25,000 or $15/month (whichever is greater). Max $500,000 ages 18–45; $300,000 ages 46+.",
      uwType: "Term 10/20/30 and 20/30 ROP — simplified issue, no exam; MIB + script check; point-of-sale decision",
      rx: "MIB + script check.\nRisk assessment before you apply: Live Chat in the agent portal or riskassess@aatx.com (not by phone). Have ready: product, tobacco status, height/weight, age, gender, current/recent Rx with the reason for each, medical history, occupation/source of income.",
      src: "American Amicable Products at a Glance (rev 8/25)"
    },
    "Express UL": {
      ages: "Non-tobacco 15–75; tobacco 18–75 (age nearest birthday)",
      face: "Min $25,000 or $20/month; max $500,000 (excluding riders)",
      uwType: "Flexible premium adjustable universal life — simplified issue, no exam; MIB + script check",
      rx: "Phone interview (PHI) required ages 65+.\nRisk assessment before you apply: Live Chat in the agent portal or riskassess@aatx.com (not by phone). Have ready: product, tobacco status, height/weight, age, gender, current/recent Rx with the reason for each, medical history, occupation/source of income.",
      notes: "Minimum 15-year guarantee. Policy loans after year 1 at 7.4% in advance.",
      src: "American Amicable Products at a Glance (rev 8/25)"
    },
    "SecureLife Plus": {
      ages: "Non-tobacco standard 0–80; preferred non-tobacco 18–80; tobacco 18–80 (age nearest birthday)",
      face: "Min: standard $10,000 ($25,000 WA & CA); preferred $100,000",
      uwType: "Flexible premium universal life. Non-med & no PHI for non-tobacco ages 18–65 up to $99,999; fully underwritten $100,000 and up.",
      notes: "Minimum 20-year guarantee. Policy loans after year 1 at 8% in arrears. Mobile app only (no voice signature).",
      src: "American Amicable Products at a Glance (rev 8/25)"
    },
    "Security Protector": {
      ages: "20-yr term 51–60; 30-yr term 20–50 (age last birthday)",
      face: "$1,000 term with choice of ADB amount: $100,000, $200,000 or $300,000",
      uwType: "20 & 30-year term with ADB — simplified issue, no exam; MIB + script check. Standard through Table 6.",
      src: "American Amicable Products at a Glance (rev 8/25)"
    },
    "Survivor Protector": {
      ages: "15-yr 20–75 · 20-yr 20–70 · 25-yr 20–65 · 30-yr 20–60 · to age 70: 20–55 (age nearest birthday)",
      face: "Monthly income benefit: 15-yr $179–$2,145 · 20-yr $145–$1,736 · 25-yr $125–$1,496 · 30-yr $112–$1,340 · to-age-70 varies (see agent guide)",
      uwType: "Decreasing term with monthly income benefit — simplified issue, no exam; MIB + script check; point-of-sale decision",
      notes: "Convertible while in force; 24-month guarantee.",
      src: "American Amicable Products at a Glance (rev 8/25)"
    },
    "OBA": {
      ages: "18–65 (age last birthday)",
      face: "Option A $50,000 · B $100,000 · C $150,000 · D $200,000",
      uwType: "Group level term — simplified issue, no exam; MIB check",
      notes: "Only for government employees, first responders, state-funded teachers/school employees, railroad, hospital and airline/travel employees, and their spouses. Renewable every 10 years to attained age 70. Can be combined with Financial Lifeline, Financial Solution or Encore.",
      src: "American Amicable Products at a Glance (rev 8/25)"
    },
    "Guaranteed Guardian": {
      ages: "0–75 (age nearest birthday)",
      face: "See agent guide",
      uwType: "Whole life — uses age/amount non-med limit guidelines; MIB check",
      notes: "DocuSign signature only.",
      src: "American Amicable Products at a Glance (rev 8/25)"
    }
  },
  "American Home Life": {
    "FE": {
      ages: "Up to age 89 (most carriers stop at 85)",
      face: "Up to $30,000",
      uwType: "Whole life — Patriot Series (equity protection only)",
      benefit: "Patriot Series tiers: Preferred, Standard (level) and Modified. The disease guide below shows which tier each condition lands in; if a medication is unacceptable for the level plan, check the Graded/Modified plans.",
      build: "No height and weight chart",
      knockouts: "DECLINE: currently needs ADL help; AIDS/HIV; Alzheimer's/dementia; ALS; amputation caused by disease or diabetes; bed confinement; bone marrow or organ transplant (or advised); cancer — current, recurrent ever, or diagnosed/treated within 24 months; cirrhosis; CHF (ever); defibrillator; unrepaired heart defect; currently receiving home health care, hospice, or hospitalized/in a nursing facility; Huntington's; kidney dialysis (had or advised); mental incapacity; muscular dystrophy; liver failure; oxygen used within the last 12 months; terminal illness; current wheelchair/scooter use; tests/surgery/hospitalization recommended in the last 12 months and not done.\nMODIFIED: alcohol/drug treatment within 2 years; within 0–12 months of aneurysm, angina, stent, cardiomyopathy, heart cath, heart attack, heart surgery, circulatory surgery, stroke/TIA or pacemaker; chronic kidney disease/nephropathy (any time); within 24 months of insulin shock/diabetic coma, diabetic retinopathy, nephropathy or neuropathy; hepatitis, kidney disease or liver disease within 24 months; kidney failure treated (not dialysis) within 24 months.\nSTANDARD: the same heart/stroke events at 13–24 months; COPD, emphysema and chronic bronchitis (any time); COVID-19 with oxygen 13+ months ago and still on inhalers/nebulizer; lupus; multiple sclerosis; Parkinson's.\nPREFERRED: the same heart/stroke events at 25+ months; cancer cured 24+ months; basal cell; AFib/arrhythmia; diabetes including insulin (even insulin before age 50, or diagnosed 20+ years ago); diabetic complications 25+ months ago; hepatitis, kidney disease or liver disease 24+ months ago; bipolar; schizophrenia; seizures; ulcerative colitis; chronic pancreatitis; paralysis with no ADL help; amputation from an accident; oxygen 13–24 months ago (not now).",
      rx: "Nicotine: no nicotine or tobacco in 12 months = Non-Smoker. Any cigarettes, other tobacco, occasional pipe/cigar, or nicotine-only use within 12 months = Smoker.\nDrug list (eff. 08/22/2026): a drug flagged with no condition is always unacceptable; a drug flagged with conditions is unacceptable only when taken for those conditions. Examples: Entresto, Accupril, warfarin = CHF; Lasix/furosemide = CHF, cirrhosis or kidney disease; Plavix, nitroglycerin = angina; Spiriva, Trelegy, aclidinium = COPD/chronic lung; prednisone = kidney disease or lupus; donepezil, Suboxone, abacavir = any condition.\nAlways list the condition next to each medication on the app — the medication can reveal a declinable condition the client didn't mention.",
      notes: "Best starting point for COPD WITHOUT oxygen, Parkinson's and lupus — possible day-one placement (falls, ADLs and progression matter). Also a fallback (modified tier) for recent heart attack/stroke/stent/cancer.\nNot available in AK, CA, CT, DE, DC, HI, ME, MA, NH, NJ, NY, OR, RI or VT. Disease guide and drug list are for agent use only.",
      src: "Notion carrier notes; FE & WL UW Cheat Sheet (Founders Financial Group); AHL Patriot Series Final Expense Disease UW Guide; AHL Drug List (eff. 08/22/2026); AHL Product Availability"
    }
  },
  "CICA - Citizens": {
    "Standard Issue": {
      ages: "0–85",
      face: "Ages 0–50: $1,000–$30,000 · 51–70: $1,000–$20,000 · 71–85: $1,000–$10,000",
      uwType: "Whole life — simplified issue. If all predetermination questions are \"No\" and the Eligibility Verification passes, it issues as applied. No exam.",
      benefit: "Level, immediate full death benefit from day one. Built-in terminal illness accelerated benefit (lesser of 50% or $15,000) and accidental dismemberment; optional accidental death rider.",
      build: "No height/weight restrictions",
      knockouts: "Standard Issue is pass/fail on these questions (any \"Yes\" = Guaranteed Issue instead):\n• Currently hospitalized, bed-confined, in a nursing/assisted-living facility, in hospice, needs help with ADLs, or terminally ill.\n• HIV/ARC/AIDS.\n• More than one cancer, recurrent or metastatic cancer, or currently treated for cancer (basal/squamous skin excluded).\n• In the past 10 years: uncontrolled diabetes, uncontrolled HBP, stroke/TIA, paralysis, CHF, heart disease, cardiomyopathy, lung disease (COPD/emphysema), cirrhosis/liver failure, kidney failure/CKD/dialysis that is NOT being treated or medicated. (Treated/medicated conditions can still be approved for Standard.)\n• Ever: mental disorder, brain/nervous system disorder, systemic lupus, Alzheimer's/dementia, ALS, Huntington's, muscular dystrophy, cystic fibrosis, pulmonary fibrosis, multiple myeloma.\n• Past 2 years: hospitalized 2+ times, or tests/treatment/surgery/hospitalization advised but not done.\n• Past 2 years: alcohol/drug/opioid treatment (or advised), felony or misdemeanor conviction/guilty plea, or suicide attempt.\n• Past 5 years: advised to have an organ transplant.\nMental health: mild/temporary, no antipsychotics, minimal meds, stable, no hospitalization/disability, no substance or alcohol issues, no self-harm = Standard. Hospitalization, functional limits, disability, ECT, multiple psych meds, suicide attempt/self-harm or co-existing disorders = Guaranteed Issue.",
      rx: "No smoking restrictions (brochure). Eligibility Verification + HIPAA authorization run in the agent portal. Phone sales must be on a recorded line with a voice signature.",
      notes: "Not sold in CA, DE, ME, MA, NJ, NY or VA (check portal for UT/WI plan availability).\nFrequent lapsers: more than 3 lapsed/not-taken policies in a calendar year = automatic decline on the 4th app.\nSocial Security billing (1st, 3rd, or 2nd/3rd/4th Wednesday). Hold date up to 28 days. Agent support: CPS@citizensinc.com · 737-289-4670.",
      src: "FE & WL UW Cheat Sheet (Founders Financial Group); CICA Life Agent Guide & Underwriting (May 2026)"
    },
    "Guaranteed Issue": {
      ages: "0–85",
      face: "Ages 0–50: $1,000–$30,000 · 51–70: $1,000–$30,000 · 71–85: $1,000–$10,000",
      uwType: "Guaranteed issue whole life — no health questions, no exam",
      benefit: "Years 1–2: death benefit = 110% of premiums paid (accidental death pays the full amount). Full face amount from year 3. Includes accidental death benefit to age 85, terminal illness and dismemberment benefits.",
      build: "No height/weight restrictions",
      knockouts: "None medical. Felony or misdemeanor conviction/guilty plea in the past 2 years = GI only (not Standard).",
      notes: "Fallback for the usual hard stops: oxygen, dialysis/ESRD, dementia, hospice or terminal illness, active cancer treatment — if eligible AND the applicant can legally consent. Also a CHF fallback.",
      src: "FE & WL UW Cheat Sheet (Founders Financial Group); CICA Life Agent Guide & Underwriting (May 2026)"
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
  "Foresters": {
    "Strong Foundation": {
      ages: "Up to age 75",
      face: "Non-med issue limits: ages 18–55 up to $500,000 standard / $300,000 substandard; ages 56–80 up to $250,000 standard / $150,000 substandard. (Agency notes: $50,000–$250,000.)",
      uwType: "Term — non-medical (simplified) underwriting",
      knockouts: "Non-med declines: heart attack, CAD, angina, stent/angioplasty, bypass, heart/valve surgery, CHF, cardiomyopathy, significant arrhythmia, aneurysm, pacemaker, PVD/PAD, stroke/TIA; Alzheimer's/dementia, ALS, MS, Parkinson's, muscular dystrophy, paralysis, permanent wheelchair; chronic kidney disease, cirrhosis/liver disease, hepatitis B/C, emphysema, chronic bronchitis, oxygen; ADL help, HIV/AIDS, organ transplant, leukemia, Hodgkin's, lupus, severe depression, bipolar, schizophrenia, suicide attempt, non-marijuana drug use, unexplained weight loss, build outside chart.\nDiabetes: Type 1 or 2, INCLUDING insulin, can get individual consideration (A1C, age, duration, build, no complications).\nCOPD: mild COPD non-smoker may qualify (no oxygen, no steroids, minimal shortness of breath, can climb a flight of stairs).\nCancer: basal cell may qualify; most others need treatment done 10+ years, no recurrence.\nSeizures: may qualify if controlled, none for 2 years. Crohn's: 5+ years remission. Gastric bypass: after 1 year, weight stable.\nMild anxiety/depression: may qualify if age 25+, onset 1+ year ago, no hospitalization, no missed work.\nAlcoholism: decline within 5 years; may qualify after 5 years with no relapse.\nCriminal: probation/parole/jail/pending charges = decline. No jail time: consider 1 year after probation ends. Jail served: consider 5 years after parole.\nDUI: 1 within 12 months, or 2 with the latest within 5 years = non-med decline.\nAlso non-med declines: cerebral palsy, cystic fibrosis, Down syndrome, spina bifida, systemic lupus, severe asthma with hospitalization, living in a nursing home/skilled nursing/psychiatric facility.\nUsually uninsurable combinations: chronic kidney disease + high blood pressure; depression/anxiety + alcohol abuse; diabetes + CAD, CVD or kidney disease.",
      rx: "Non-tobacco = no cigarettes in 12 months. Cigars, pipe, chew, nicotine patch, vape pens and marijuana are all allowed at non-tobacco rates.\nMarijuana: recreational up to 6 days/week may be accepted; daily or medical use = individual consideration.\nHumira/Enbrel/chronic prednisone can reveal moderate–severe RA. No broad drug-name knockout list published.\nEvery non-med app runs a Milliman IntelliScript Rx/medical-data/credit-attribute insurance score plus MIB. If it doesn't qualify for non-med rates the app is declined (a new fully underwritten app may be needed).",
      notes: "#1 term carrier. Good for diabetes (especially type 2) — best starting point for insulin-dependent diabetics and mild non-smoker COPD on term.\nHazardous jobs/sports/private aviation may need a questionnaire, rating, exclusion or full underwriting.\nOffers a complimentary trust and will — can help set it up; lets heirs bypass probate so children can access the home right away, and any assets can go into the trust.\nDiabetes: run the Strong Foundation Diabetes Ratings Calculator (ezbiz.foresters.com/sfdiabetesratings).\nRisk Assessment Line: 1-877-622-4249 option 2.",
      src: "Notion carrier notes; Forged Term Underwriting Knockout Guide (Jul 2026); Foresters UW Guide — Advantage Plus II, Strong Foundation, Your Term & SMART UL (506305 US 04/26)"
    },
    "SmartUL": {
      ages: "Non-med: 0–75. Accelerated underwriting: 18–60 up to $2,000,000; 61–65 up to $1,000,000.",
      face: "Non-med issue limits: ages 0–15 up to $150,000; 16–55 up to $400,000; 56–75 up to $150,000. (Agency notes: up to $150,000.)",
      uwType: "Indexed universal life — uses Foresters' non-medical guide (same as Strong Foundation)",
      knockouts: "Same non-med declines as Strong Foundation, PLUS:\nDiabetes: insulin, poor control or any complication = decline (controlled Type 2 on diet/pills may qualify).\nCOPD: decline.\nNon-med diabetes (Your Term, Advantage Plus II, SMART UL): Type 2 on pills/diet only. Any insulin, A1C above 8.9%, or any vision, nerve or kidney complication = write fully underwritten instead. Under age 20 not eligible.\nStep 1 — duration points (≤5 yrs / 6–15 / >15): age 20–29: 6 / decline / decline · 30–39: 4/5/6 · 40–49: 3/4/5 · 50–59: 2/3/4 · 60–69: 1/2/3 · 70–79: 1/1/2 · 80+: 0/1/1.\nStep 2 — build points 0–4 from the diabetes build chart (e.g. 5'6\": ≤195 = 0, 196–226 = 1, 227–244 = 2, 245–250 = 3, 251–263 = 4; heavier = decline).\nTotal of 6 or less may qualify for non-med.\nUsually uninsurable combinations: chronic kidney disease + high blood pressure; depression/anxiety + alcohol abuse; diabetes + CAD, CVD or kidney disease.",
      rx: "Non-tobacco = no tobacco or nicotine in 12 months. Marijuana allowed; no vaping (nicotine or not).\nEvery non-med app runs a Milliman IntelliScript Rx/medical-data/credit-attribute insurance score plus MIB. If it doesn't qualify for non-med rates the app is declined (a new fully underwritten app may be needed).",
      notes: "Structure as whole life, pitch as permanent coverage. Good for very healthy, older clients with money to spare — a larger policy at a cheaper rate, with cash value tied to the S&P.\nAvoid for insulin users and any COPD.\nRisk Assessment Line: 1-877-622-4249 option 2.",
      src: "Notion carrier notes; Forged Term Underwriting Knockout Guide (Jul 2026); Foresters UW Guide — Advantage Plus II, Strong Foundation, Your Term & SMART UL (506305 US 04/26); Foresters Diabetes Ratings for Non-Med (505049 US 07/24)"
    },
    "Planright": {
      ages: "Up to age 85",
      face: "$5,000 – $35,000",
      uwType: "Whole life — final expense / equity protection; eApp",
      benefit: "Must meet general qualifications, be mentally competent and answer \"No\" to the medical questions. eApp returns Preferred, Standard, Basic, referral, or not eligible.",
      build: "Max weight Preferred / Standard / Basic — 5'0\": 229/245/262 · 5'4\": 260/278/297 · 5'8\": 292/313/334 · 6'0\": 325/348/372 · 6'4\": 357/382/409.",
      knockouts: "Tiers: Preferred / Standard / Basic (graded) / No Coverage. Conditions not asked on the app default to Preferred.\nNo Coverage: AIDS/HIV, ALS, Alzheimer's/dementia, disease amputation, CHF, cardiomyopathy, current/recurrent internal cancer, dialysis or oxygen within 12 months, organ transplant, mental incapacity, terminal illness, confined to hospital/hospice/nursing home, needs ADL help.\nBasic: heart attack, stent, bypass, angina, stroke, pacemaker, defibrillator within 1 year (Standard at 1–2 years); cancer within 3 years; diabetic complications (any time); alcohol/drug treatment within 2 years; chronic narcotic Rx.\nStandard: COPD/emphysema, cirrhosis, hepatitis C, lupus, RA, Parkinson's or paralysis with no ADL help.\nPreferred: controlled diabetes (run the calculator), AFib with no procedure, basal cell, bipolar/depression (not asked), sleep apnea.",
      rx: "Rx lookup (PlanRight Medical Reference Guide 10/24): e.g. Advair = Preferred for asthma / Standard for COPD; albuterol = Preferred asthma / Standard COPD; Actos/Actoplus = Preferred diabetes / Basic if for diabetic complications; Abilify, Aldactazide or acebutolol for CHF = No Coverage. Full table is in the FE & WL cheat sheet.",
      notes: "Good for diabetes (especially type 2). Good level-benefit option for clean or remote health history.\nDiabetes: run the eligibility calculator (ezbiz.foresters.com/sfdiabetesratings) — it returns the rate class.",
      src: "Notion carrier notes; FE & WL UW Cheat Sheet (Founders Financial Group)"
    },
    "Your Term": {
      ages: "Non-med: 18–80. Accelerated underwriting (no labs/exam): 18–60 up to $2,000,000; 61–65 up to $1,000,000.",
      face: "Non-med issue limits: ages 18–55 up to $400,000; 56–80 up to $150,000. Fully underwritten above that.",
      uwType: "Term — fully underwritten with a non-medical option and accelerated underwriting. Classes: Preferred Plus, Preferred, Standard Plus, Standard (non-tobacco), Tobacco Plus, Standard Tobacco, Substandard.",
      build: "Separate non-medical and fully underwritten build charts in the Foresters guide.",
      knockouts: "Non-med uses the same impairment guide as Strong Foundation, except diabetes and COPD:\nNon-med diabetes (Your Term, Advantage Plus II, SMART UL): Type 2 on pills/diet only. Any insulin, A1C above 8.9%, or any vision, nerve or kidney complication = write fully underwritten instead. Under age 20 not eligible.\nStep 1 — duration points (≤5 yrs / 6–15 / >15): age 20–29: 6 / decline / decline · 30–39: 4/5/6 · 40–49: 3/4/5 · 50–59: 2/3/4 · 60–69: 1/2/3 · 70–79: 1/1/2 · 80+: 0/1/1.\nStep 2 — build points 0–4 from the diabetes build chart (e.g. 5'6\": ≤195 = 0, 196–226 = 1, 227–244 = 2, 245–250 = 3, 251–263 = 4; heavier = decline).\nTotal of 6 or less may qualify for non-med.\nCOPD: non-med decline.\nUsually uninsurable combinations: chronic kidney disease + high blood pressure; depression/anxiety + alcohol abuse; diabetes + CAD, CVD or kidney disease.\nWaiting periods: cancer 1+ years; CAD (angina, heart attack, bypass, angioplasty) at least 6 months; anything under investigation waits until it's done.",
      rx: "Non-tobacco = no tobacco or nicotine in 12 months (Preferred: 3 years; Preferred Plus: 5 years). Marijuana allowed; vaping of any kind is NOT.\nEvery non-med app runs a Milliman IntelliScript Rx/medical-data/credit-attribute insurance score plus MIB. If it doesn't qualify for non-med rates the app is declined (a new fully underwritten app may be needed).",
      notes: "Preferred Plus (non-tobacco 5 yrs): cholesterol ≤230 (18–60), ratio ≤5.0, BP ≤135/85 under 60; no parent death from CAD/CVD/cancer before 65; no DUI history.\nTemporary Insurance Agreement: ages 15 days–70, applied amounts up to $1,000,000 (pays up to $500,000) if the client answers No to the 3 TIA questions and pays the first month.\nCollect the standard rate with the app — preferred can't be promised.\nRisk Assessment Line: 1-877-622-4249 option 2.",
      src: "Foresters UW Guide — Advantage Plus II, Strong Foundation, Your Term & SMART UL (506305 US 04/26); Foresters Diabetes Ratings for Non-Med (505049 US 07/24); TERM UW Cheat Sheet (Founders Financial Group)"
    },
    "Advantage Plus": {
      ages: "Non-med: 0–75. Accelerated underwriting: 18–60 up to $2,000,000; 61–65 up to $1,000,000.",
      face: "Non-med issue limits: ages 0–15 up to $150,000; 16–55 up to $400,000; 56–75 up to $150,000 (term riders count toward the limit).",
      uwType: "Advantage Plus II participating whole life — fully underwritten with non-medical and accelerated options",
      knockouts: "Same non-med impairment guide as Strong Foundation, except:\nNon-med diabetes (Your Term, Advantage Plus II, SMART UL): Type 2 on pills/diet only. Any insulin, A1C above 8.9%, or any vision, nerve or kidney complication = write fully underwritten instead. Under age 20 not eligible.\nStep 1 — duration points (≤5 yrs / 6–15 / >15): age 20–29: 6 / decline / decline · 30–39: 4/5/6 · 40–49: 3/4/5 · 50–59: 2/3/4 · 60–69: 1/2/3 · 70–79: 1/1/2 · 80+: 0/1/1.\nStep 2 — build points 0–4 from the diabetes build chart (e.g. 5'6\": ≤195 = 0, 196–226 = 1, 227–244 = 2, 245–250 = 3, 251–263 = 4; heavier = decline).\nTotal of 6 or less may qualify for non-med.\nCOPD: non-med decline.\nUsually uninsurable combinations: chronic kidney disease + high blood pressure; depression/anxiety + alcohol abuse; diabetes + CAD, CVD or kidney disease.",
      rx: "Non-tobacco = no tobacco or nicotine in 12 months. Marijuana allowed; no vaping.\nEvery non-med app runs a Milliman IntelliScript Rx/medical-data/credit-attribute insurance score plus MIB. If it doesn't qualify for non-med rates the app is declined (a new fully underwritten app may be needed).",
      notes: "Risk Assessment Line: 1-877-622-4249 option 2.",
      src: "Foresters UW Guide — Advantage Plus II, Strong Foundation, Your Term & SMART UL (506305 US 04/26); Foresters Diabetes Ratings for Non-Med (505049 US 07/24)"
    }
  },
  "Mutual of Omaha": {
    "Term": {
      ages: "10-yr 18–75 · 15-yr 18–70 · 20-yr 18–60 · 30-yr 18–50 (age last birthday; may vary by state and tobacco)",
      face: "$25,000–$550,000 ages 18–50 · $25,000–$450,000 ages 51–60 · $25,000–$350,000 ages 61–75. That is also the max combined simplified-issue coverage with Mutual.",
      uwType: "Term Life Express — simplified issue (application, build chart, MIB, Rx data, medical data, MVR)",
      benefit: "Standard NT / Standard T only (no table ratings). Living benefit riders (terminal, chronic, critical illness) included. Convertible after year 2 to the earlier of end of level term or age 70 (to IUL Express or conversion WL).",
      build: "Max weight TLE/IULE (Table 2 multiple-impairment limit in brackets) — 5'0\": 220 (205) · 5'4\": 245 (225) · 5'8\": 274 (251) · 6'0\": 305 (281) · 6'4\": 338 (311). Min weight e.g. 5'0\" 85, 6'0\" 122.",
      knockouts: "Decline: diabetes over age 45 (50 in CA/VI) plus Table 2+ build, nicotine or PVD; diabetes with ANY complications; Table 2+ build plus high blood pressure, asthma with nicotine, or PVD.\nCommon adjusted offer/decline: CHF, cardiomyopathy, CKD/renal failure, CAD/heart surgery, COPD, defibrillator, hepatitis B/C, cirrhosis, leukemia/lymphoma/melanoma, metastatic/recurrent cancer, serious mental illness, ALS/MS/Parkinson's, stroke/TIA, transplant, PVD/PAD, lupus, paralysis.\nHigh blood pressure: no hospitalization for it in 5 years.\nPrior United of Omaha decline or offer worse than Table 4 = ineligible for Express products.\nAlcohol/drug use, treatment or related conviction: none in 10 years. DUI/DWI/reckless driving: none in 5 years. 4+ moving violations: ineligible. Felony: none in 10 years.\nHazardous occupations/sports and aviation: not allowed (e.g. bomb squad, military aircrew, work above 49 ft, racing, skydiving, climbing). POA-signed applications not accepted.",
      rx: "Non-nicotine: no tobacco or nicotine in ANY form (gum, patch, cigar, vape, hookah) for 12 months — occasional cigars do not qualify. Marijuana can qualify as non-tobacco.\nMIB, Rx and medical data check on all apps; MVR mandatory ages 18–35, as needed 36+; phone interview as needed (recorded).\nRx exclusions (TLE & IULE, partial): Aricept/donepezil, Namenda, Exelon, Razadyne/galantamine, Cognex; amiodarone, digoxin/Lanoxin/Digitek, dobutamine, Ranexa, Eliquis, Xarelto, Aggrenox; Anoro Ellipta, Daliresp, Spiriva, Tudorza, Kalydeco; Keytruda, Opdivo, Revlimid, Arimidex, Femara, tamoxifen, Casodex, Eligard, Zoladex, Cytoxan, fluorouracil, methotrexate, Rituxan, Neupogen, Hydrea, Megace; Sinemet/carbidopa-levodopa, Stalevo, Azilect, Ampyra, Avonex, Betaseron, Copaxone, Rebif, Tysabri; CellCept, mycophenolate, Myfortic, Prograf, cyclosporine/Gengraf/Sandimmune; clozapine, Haldol, chlorpromazine, perphenazine, Geodon, Invega, Latuda, lithium, Risperdal, Saphris, Symbyax, Zyprexa; methadone, Suboxone, naltrexone/Revia, naloxone, Antabuse, Campral; HIV/hepatitis antivirals (Atripla, Truvada-type drugs, Viread, Epivir HBV, Baraclude, ribavirin); Humira, Enbrel, Xeljanz; morphine; calcium acetate.",
      notes: "Non-health: no alcohol/drug use, treatment or conviction in 10 years; no DUI/DWI/reckless driving in 5 years; 4+ moving violations ineligible; no felony in 10 years; no hazardous job/sport; aviation not allowed; POA-signed apps not accepted.\nAutomated underwriting on the iGO e-App: Approved, Referred or Declined at point of sale.\nRisk assessments: ExpressRiskAssessment@mutualofomaha.com · 888-624-1173. Underwriting support 1-800-775-7896.",
      src: "Forged Term Underwriting Knockout Guide (Jul 2026); Mutual of Omaha Simplified Issue UW Guide (Apr 2026); Mutual of Omaha Product Portfolio (May 2026)"
    },
    "Living Promise": {
      ages: "Level benefit 45–85 · Graded benefit 45–80 (age last birthday; may vary by state)",
      face: "Level $2,000–$50,000 · Graded $2,000–$20,000. Max $50,000 simplified whole life and $25,000 graded combined with Mutual.",
      uwType: "Whole life — final expense / equity protection; simplified issue (build chart, MIB, Rx, medical data, random phone interview)",
      benefit: "All \"No\" = Level benefit (no reduction in early years). A \"Yes\" in Part Two = Graded benefit only. A \"Yes\" in Part One generally means no coverage. Level has tobacco/non-tobacco rates; Graded has no tobacco distinction.",
      build: "Max weight Level / Graded — 5'0\": 226/244 · 5'4\": 252/270 · 5'8\": 283/300 · 6'0\": 315/333 · 6'4\": 348/367.",
      rx: "Not eligible for Living Promise when currently taking (these may still get the GRADED plan): amiodarone, Ampyra, Anoro Ellipta, Antabuse, Avonex, Azilect, Betaseron, calcium acetate, Campral, carbidopa-levodopa/Sinemet/Stalevo, chlorpromazine, clozapine, Copaxone, Daliresp, Geodon, Haldol, Invega, Latuda, lithium, naloxone, naltrexone/Revia, perphenazine, Ranexa, Rebif, ribavirin, Risperdal, Saphris, Spiriva, Suboxone, Symbyax, Tudorza, Zyprexa.\nNo coverage at all: Aricept/donepezil, Namenda, Exelon, Razadyne, Cognex; cancer drugs (Keytruda, Opdivo, Revlimid, Cytoxan, Casodex, Eligard, Zoladex, fluorouracil, Megace, Rituxan, Neupogen, Hydrea); transplant drugs (CellCept, Prograf, cyclosporine, Myfortic); HIV/hepatitis B antivirals.\nGive the reason on the app for: Abilify, Aggrenox, Arimidex, carvedilol/Coreg, clopidogrel/Plavix, Coumadin/warfarin, digoxin, Eliquis, Xarelto, Pradaxa, Lovenox, Seroquel, tamoxifen, Femara, Truvada.",
      notes: "Affordable and approves quickly. Writes policies in MA.\nMOO Graded is a starting point for recent heart attack, stroke, stent, bypass or cancer, and for CHF.\nConditional receipt coverage up to $50,000 if the first premium is collected.",
      src: "Notion carrier notes; FE & WL UW Cheat Sheet (Founders Financial Group); Mutual of Omaha Simplified Issue UW Guide (Apr 2026); Mutual of Omaha Product Portfolio (May 2026)"
    },
    "IULe": {
      ages: "18–75 (age last birthday)",
      face: "$25,000–$550,000 ages 18–50 · $25,000–$450,000 ages 51–60 · $25,000–$350,000 ages 61–75",
      uwType: "IUL Express — simplified issue; same underwriting as Term Life Express (build chart, MIB, Rx, medical data, MVR, phone interview as needed)",
      benefit: "Standard NT / Standard T only. No-lapse guarantee: 20 years (ages 18–60) or to age 80 (61+) when the no-lapse premium is paid. Living benefit riders included.",
      build: "Max weight TLE/IULE (Table 2 multiple-impairment limit in brackets) — 5'0\": 220 (205) · 5'4\": 245 (225) · 5'8\": 274 (251) · 6'0\": 305 (281) · 6'4\": 338 (311). Min weight e.g. 5'0\" 85, 6'0\" 122.",
      knockouts: "Same as Term Life Express: multiple impairments worse than Table 4 decline (diabetes over 45 with Table 2 build, nicotine or PVD; diabetes with any complication; Table 2 build plus HBP, PVD, or asthma with nicotine). Prior United of Omaha decline or offer worse than Table 4 = ineligible.",
      rx: "Rx exclusions (TLE & IULE, partial): Aricept/donepezil, Namenda, Exelon, Razadyne/galantamine, Cognex; amiodarone, digoxin/Lanoxin/Digitek, dobutamine, Ranexa, Eliquis, Xarelto, Aggrenox; Anoro Ellipta, Daliresp, Spiriva, Tudorza, Kalydeco; Keytruda, Opdivo, Revlimid, Arimidex, Femara, tamoxifen, Casodex, Eligard, Zoladex, Cytoxan, fluorouracil, methotrexate, Rituxan, Neupogen, Hydrea, Megace; Sinemet/carbidopa-levodopa, Stalevo, Azilect, Ampyra, Avonex, Betaseron, Copaxone, Rebif, Tysabri; CellCept, mycophenolate, Myfortic, Prograf, cyclosporine/Gengraf/Sandimmune; clozapine, Haldol, chlorpromazine, perphenazine, Geodon, Invega, Latuda, lithium, Risperdal, Saphris, Symbyax, Zyprexa; methadone, Suboxone, naltrexone/Revia, naloxone, Antabuse, Campral; HIV/hepatitis antivirals (Atripla, Truvada-type drugs, Viread, Epivir HBV, Baraclude, ribavirin); Humira, Enbrel, Xeljanz; morphine; calcium acetate.",
      notes: "IUL Express. Signed illustration (or Illustration Certification Form) required. Not available for substandard term conversions.\nNon-health: no alcohol/drug use, treatment or conviction in 10 years; no DUI/DWI/reckless driving in 5 years; 4+ moving violations ineligible; no felony in 10 years; no hazardous job/sport; aviation not allowed; POA-signed apps not accepted.",
      src: "Notion carrier notes; Mutual of Omaha Simplified Issue UW Guide (Apr 2026); Mutual of Omaha Product Portfolio (May 2026)"
    },
    "Childrens WL": {
      ages: "14 days–17 years",
      face: "$5,000–$50,000",
      uwType: "Whole life — limited health questions, no exam",
      benefit: "Level; rates never increase. Guaranteed insurability rider; waiver of premium on death of owner.",
      notes: "Up to 8 children on one app (separate policy each). Grandparents can sign without a parent. No conditional receipt.",
      src: "Mutual of Omaha Simplified Issue UW Guide (Apr 2026); Mutual of Omaha Product Portfolio (May 2026)"
    },
    "GA Advantage": {
      ages: "18–70",
      face: "$50,000–$500,000 (in $1,000 increments)",
      uwType: "Guaranteed ADvantage — accidental death only; guaranteed issue",
      notes: "Renewable to age 80. Optional return of premium rider.",
      src: "Mutual of Omaha Product Portfolio (May 2026)"
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
    },
    "Trendsetter Super Term": {
      uwType: "Term — fully underwritten with expanded non-medical underwriting up to best class for many ages/amounts",
      knockouts: "Diabetes — Standard to Table 8. Knockouts: Type 1 under age 20 or A1C over 9.0; Type 2 under 30 diagnosed 15+ years ago, A1C over 10.0, or uncontrolled; comorbidities rated over Table 4.\nHeart attack / CAD — under age 40 decline; 40–45 Table 6 to decline; 46–59 Table 4 to decline; 60+ Table 2 to decline. Knockouts: under 1 month from stent/angioplasty, under 3 months from bypass, stroke within 2 years or with diabetes, no follow-up in 2 years, current chest pain/SOB.\nAnxiety/mood (not major depression) — mild = Standard; moderate = Tables 2–4; severe, suicide attempt or inpatient = decline. Knockouts: drug/alcohol abuse in 7 years, hospitalization or suicide attempt/thoughts in 12 months, diagnosis in last 6 months.\nAsthma — adult non-smoker mild Standard–Table 2, moderate Tables 3–8; adult smoker mild Tables 2–4, moderate Table 8; severe or oxygen = decline. Children under 6 decline.\nCancer — Standard to Table 8; some (non-melanoma skin, prostate, testicular, thyroid, colon, etc.) can get preferred 10 years post-treatment. Knockouts: currently in treatment, watch-and-wait, pending tests, elevated tumor markers, ADL issues.\nCOPD — mild Tables 2–4; moderate Tables 5–8; severe decline. Knockouts: FEV1 under 60%, chronic steroids, oxygen, ADL issues.\nHypertension — Standard if well controlled.\nRheumatoid arthritis — mild Standard–Table 2; moderate Tables 3–4; severe Tables 5–8. Bed/wheelchair confined = knockout.\nSleep apnea — mild Standard; moderate Standard–Table 3; severe Standard–Table 6. Oxygen use = knockout.\nStroke — Table 2 to decline. Knockouts: stroke in past 6 months, multiple strokes, comorbidities over Table 4.\nAFib — non-chronic, no heart disease, under 4 episodes a year: Standard–Table 2; chronic: Tables 2–4. Knockout: with heart disease, stroke or valve disease.",
      rx: "Tobacco = ANY tobacco or nicotine (cigarettes, cigars, chew, patch, gum, pipe, hookah) or ANY vaping/e-cigarette, with or without nicotine, within 24 months. Celebratory cigars may not trigger tobacco rates depending on frequency.\nSmokers may qualify for preferred smoker rates depending on age and face amount.\nTransamerica orders all requirements; APS on fewer than 20% of term cases. Provide every doctor's name, specialty, address, phone, date last seen, reason and results to avoid delays.",
      notes: "Juveniles: up to $1,000,000 to match parent coverage; household income $100,000+ for $500,000 and up (not NY/WA). Terminal illness rider is built in. Chronic illness/LTC riders need base rating Table 4 or better (Table D) and no ADL issues, cognitive impairment, walker/wheelchair, Medicaid or POA.",
      src: "Transamerica Underwriting Primer (134886R4)"
    },
    "Trendsetter LB Term": {
      uwType: "Term with living benefits — fully underwritten",
      knockouts: "Only available for risks through Table 4. Uses the same impairment guide as Trendsetter Super (see that product).",
      rx: "Tobacco = ANY tobacco or nicotine (cigarettes, cigars, chew, patch, gum, pipe, hookah) or ANY vaping/e-cigarette, with or without nicotine, within 24 months. Celebratory cigars may not trigger tobacco rates depending on frequency.\nSmokers may qualify for preferred smoker rates depending on age and face amount.\nTransamerica orders all requirements; APS on fewer than 20% of term cases. Provide every doctor's name, specialty, address, phone, date last seen, reason and results to avoid delays.",
      notes: "Critical illness rider not available with a history of heart attack, stroke, cancer, renal failure, transplant, paralysis, AIDS, angioplasty or bypass. Chronic illness rider: Standard only if base rate is Table 4 or better.",
      src: "Transamerica Underwriting Primer (134886R4)"
    },
    "FFIUL": {
      uwType: "Financial Foundation IUL — fully underwritten; same underwriting primer as Trendsetter (term and IUL ranges are the same)",
      knockouts: "See Trendsetter Super Term for the impairment ranges.",
      rx: "Tobacco = ANY tobacco or nicotine (cigarettes, cigars, chew, patch, gum, pipe, hookah) or ANY vaping/e-cigarette, with or without nicotine, within 24 months. Celebratory cigars may not trigger tobacco rates depending on frequency.\nSmokers may qualify for preferred smoker rates depending on age and face amount.\nTransamerica orders all requirements; APS on fewer than 20% of term cases. Provide every doctor's name, specialty, address, phone, date last seen, reason and results to avoid delays.",
      src: "Transamerica Underwriting Primer (134886R4)"
    }
  },
  "Liberty Bankers": {
    "SIMPL": {
      ages: "18–80",
      face: "$3,000–$30,000 (ages 66–80 max $15,000)",
      uwType: "Simplified issue whole life — SIMPL Preferred / SIMPL Standard (comp guide: SI Market PermaLife)",
      build: "Max weight SIMPL Preferred / SIMPL Standard / MWL — 5'0\": 235/247/299 · 5'2\": 251/263/321 · 5'4\": 266/279/341 · 5'6\": 282/297/360 · 5'8\": 297/314/384 · 5'10\": 313/332/408 · 6'0\": 330/352/430 · 6'2\": 347/371/451 · 6'4\": 366/391/473. Above MWL = decline. Min weight e.g. 5'0\" 89, 6'0\" 129.",
      knockouts: "PART 1 — any \"Yes\" = STOP, no coverage: ever had CHF, cardiomyopathy, memory loss/Alzheimer's/dementia, defibrillator, 2+ internal cancers, terminal illness (24 months); organ/bone marrow/stem cell transplant, kidney failure or dialysis, muscular dystrophy, mental incapacity, ALS, Down syndrome, cystic fibrosis, pulmonary fibrosis, Huntington's; diabetes at age 9 or younger; AIDS/HIV or other immune disorder. Within 2 years: uncontrolled diabetes or HBP, diabetic coma/insulin shock, diabetic amputation, schizophrenia, alcohol/drug abuse or Rx dependency. Within 1 year: hospitalized 5+ days total, awaiting surgery/hospitalization, oxygen, unable to care for self, bedridden or in a nursing home/hospice/assisted living.\nPART 2 — any \"Yes\" = Modified Whole Life (MWL) only: within 3 years cancer (incl. melanoma; excl. basal cell), chemo or radiation; within 2 years angina, heart/circulatory surgery or disease, valve disorder, heart attack, pacemaker or stent; stroke (not TIA) or paralysis; aneurysm, brain tumor, sickle cell; diabetic nephropathy/neuropathy/retinopathy; chronic hepatitis, hep C, cirrhosis, chronic pancreatitis, kidney disease, systemic lupus; MS, Parkinson's, or walker/wheelchair/scooter due to illness; felony/misdemeanor conviction or pending charge.\nPART 3 — any \"Yes\" = SIMPL Standard (all \"No\" = SIMPL Preferred): ever COPD, chronic bronchitis, emphysema, irregular heartbeat/AFib, PVD/PAD, or insulin-dependent diabetes; within 2 years epileptic seizures or TIA.",
      rx: "PreCheck mobile app: Rate Check (quotes), Rx Check (drug lookup with auto-decline by tier: Preferred / Standard / Modified) and UW Check (face-to-face risk assessment in about a minute, thumbs up/down by tier). Agent support 214-245-5292 · agentsupport@lbig.com.",
      notes: "Backup for insulin users without severe complications, prior declines or high build.",
      src: "FE & WL UW Cheat Sheet (Founders Financial Group); Liberty Bankers Ordinary Life Agent Guide (LBIG-0523-POLAG1)"
    },
    "Modified Whole Life": {
      ages: "18–80 (check state availability for MWL)",
      face: "$3,000–$30,000 (ages 66–80 max $15,000)",
      uwType: "Modified whole life — the impaired-risk plan",
      build: "Max weight SIMPL Preferred / SIMPL Standard / MWL — 5'0\": 235/247/299 · 5'2\": 251/263/321 · 5'4\": 266/279/341 · 5'6\": 282/297/360 · 5'8\": 297/314/384 · 5'10\": 313/332/408 · 6'0\": 330/352/430 · 6'2\": 347/371/451 · 6'4\": 366/391/473. Above MWL = decline. Min weight e.g. 5'0\" 89, 6'0\" 129.",
      knockouts: "Applies when Part 1 is all \"No\" but anything in Part 2 is \"Yes\".\nPART 2 — any \"Yes\" = Modified Whole Life (MWL) only: within 3 years cancer (incl. melanoma; excl. basal cell), chemo or radiation; within 2 years angina, heart/circulatory surgery or disease, valve disorder, heart attack, pacemaker or stent; stroke (not TIA) or paralysis; aneurysm, brain tumor, sickle cell; diabetic nephropathy/neuropathy/retinopathy; chronic hepatitis, hep C, cirrhosis, chronic pancreatitis, kidney disease, systemic lupus; MS, Parkinson's, or walker/wheelchair/scooter due to illness; felony/misdemeanor conviction or pending charge.\nPart 1 \"Yes\" answers are still a decline (see SIMPL).",
      rx: "PreCheck mobile app: Rate Check (quotes), Rx Check (drug lookup with auto-decline by tier: Preferred / Standard / Modified) and UW Check (face-to-face risk assessment in about a minute, thumbs up/down by tier). Agent support 214-245-5292 · agentsupport@lbig.com.",
      notes: "Starting point for CHF/cardiomyopathy and recent heart attack, stroke, stent, bypass or cancer.",
      src: "FE & WL UW Cheat Sheet (Founders Financial Group); Liberty Bankers Ordinary Life Agent Guide (LBIG-0523-POLAG1)"
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
    },
    "Signature Term": {
      uwType: "Fully underwritten term (plus accelerated UW for healthier risks). Classes: Preferred Elite, Preferred, Standard Select, Standard, Preferred Tobacco. Up to Table 8, then decline.",
      knockouts: "Likely ratings: anxiety mild Std / severe Table 2+; asthma mild Std / severe Table 6–decline; AFib paroxysmal Std–Table 2 / chronic Table 4–decline; bipolar mild Tables 2–4 / severe decline; CAD Table 2–decline; COPD mild Tables 2–4 / severe or oxygen decline; CHF current decline / past Table 2–decline; Crohn's Std–Table 4; depression mild Std / severe decline.\nDiabetes Type 2 (non-insulin): 40s Tables 3–7, 60+ Std–Table 5; Type 1/insulin add 2–3 tables. Seizures Std–decline; sleep apnea treated mild Std / severe Table 2–decline; stroke under 6 months decline, mild Tables 5–8; TIA under 3 months postpone, 2+ years Tables 2–4; valve repair Table 2–decline, replacement Table 3–decline.\nAlcohol abuse: 2 years or less postpone; 6+ years Standard. Drug abuse: current decline; 6+ years Std–decline. Gastric bypass: under 6 months postpone; 5+ years Std–Table B. Controlled HBP/cholesterol: Preferred possible. Marijuana: Std tobacco to decline.\nFull UW only (not accelerated): HIV, hepatitis B/C, MS, PVD, lupus, transplant, Parkinson's/ALS, cirrhosis, kidney disease, aneurysm, pulmonary fibrosis.",
      rx: "Non-medical: DUI (1 or 2+) OK if more than 5 years; reckless driving within 5 years decline; felony or misdemeanor OK if more than 10 years; probation/parole on a felony decline; suspended license decline. Payment: ACH monthly/annual.",
      src: "TERM UW Cheat Sheet (Founders Financial Group)"
    }
  },
  "Occidental Life (North Carolina)": {
    "OLIC Term": {
      ages: "10 & 15-yr term 18–70; 20-yr term 18–65 (age nearest birthday)",
      face: "Min $100,000",
      uwType: "10/15/20-year term — age/amount non-med limit guidelines; MIB check",
      rx: "Risk assessments go through the American-Amicable group: Live Chat in the agent portal or riskassess@aatx.com.",
      notes: "Occidental Life of North Carolina is one of the American-Amicable group companies — same portal, e-file and service request system.",
      src: "American Amicable Products at a Glance (rev 8/25); American Amicable Agent Manual"
    }
  },
  "Fidelity & Guaranty (F&G)": {
    "Everlast": {
      ages: "0–80",
      face: "Min death benefit $150,000 (ages 0–45) / $100,000 (46–80)",
      uwType: "Indexed universal life — fully underwritten; exam-free ages 0–60 up to $5M (InstApproval); substandard available",
      knockouts: "Everlast & Pathsetter share one brokerage UW guide: Preferred through Table 8 (Table H / 300%); most impairments are table-rated rather than declined.\nCommon declines: recurrent or Stage IV cancer; uncontrolled diabetes or diabetes with complications; heart disease with diabetes or stroke; awaiting/received heart, lung or liver transplant; dialysis; oxygen; living in a care facility; dementia/Alzheimer's; ALS; Huntington's; cirrhosis or hepatitis D; AIDS; pulmonary fibrosis with oxygen.\nAccepted (rated): AFib, bipolar, CHF and CAD (without diabetes/stroke), COPD without oxygen, Crohn's, MS, PVD, lupus, valve repair/replacement, kidney disease (not dialysis), aneurysm, mild stroke, TIA.\nAlcohol or drug treatment within 2 years = decline. Anxiety/depression/hypertension/cholesterol: Preferred–Table 8. Marijuana: non-tobacco possible.",
      rx: "Non-medical: up to 2 violations in 3 years; DUI (1 or 2+) OK if more than 5 years. F&G usually orders records (APS) for undisclosed history, stroke, heart disease, substance abuse, insulin diabetes, cancer, liver/pancreas, paralysis, seizures, psych disorders beyond mild anxiety/depression, and respiratory beyond mild asthma.",
      notes: "Classes: Preferred NT, NT, Preferred Tobacco, Tobacco, Standard, Express Standard. IUL accumulation; term and child riders.",
      src: "TERM UW Cheat Sheet (Founders Financial Group)"
    },
    "Pathsetter": {
      ages: "0–80",
      face: "Min face $50,000",
      uwType: "Indexed universal life — fully underwritten; exam-free ages 0–60 up to $5M; substandard available",
      knockouts: "Everlast & Pathsetter share one brokerage UW guide: Preferred through Table 8 (Table H / 300%); most impairments are table-rated rather than declined.\nCommon declines: recurrent or Stage IV cancer; uncontrolled diabetes or diabetes with complications; heart disease with diabetes or stroke; awaiting/received heart, lung or liver transplant; dialysis; oxygen; living in a care facility; dementia/Alzheimer's; ALS; Huntington's; cirrhosis or hepatitis D; AIDS; pulmonary fibrosis with oxygen.\nAccepted (rated): AFib, bipolar, CHF and CAD (without diabetes/stroke), COPD without oxygen, Crohn's, MS, PVD, lupus, valve repair/replacement, kidney disease (not dialysis), aneurysm, mild stroke, TIA.\nAlcohol or drug treatment within 2 years = decline. Anxiety/depression/hypertension/cholesterol: Preferred–Table 8. Marijuana: non-tobacco possible.",
      rx: "Non-medical: up to 2 violations in 3 years; DUI (1 or 2+) OK if more than 5 years. F&G usually orders records (APS) for undisclosed history, stroke, heart disease, substance abuse, insulin diabetes, cancer, liver/pancreas, paralysis, seizures, psych disorders beyond mild anxiety/depression, and respiratory beyond mild asthma.",
      notes: "Classes: Preferred NT, NT, Preferred Tobacco, Tobacco, Standard.",
      src: "TERM UW Cheat Sheet (Founders Financial Group)"
    },
    "Quantum": {
      ages: "0–60",
      face: "$50,000–$1,000,000",
      uwType: "Indexed universal life — accelerated UW (no-exam option), phone interview for cause. Standard or better up to Table 4 (D); anything needing more goes elsewhere.",
      knockouts: "Decline: cancer within 10 years (basal cell OK); heart surgery or heart attack within 5 years; CHF; COPD; Type 1 or 2 diabetes unless A1C under 7 with no complications; bipolar; drug use within 5 years; alcohol abuse; hepatitis B/C or liver disorder; HIV; MS; Parkinson's/ALS; transplant; stroke within 5 years or 2+ TIAs; lupus (SLE); rheumatoid arthritis/connective tissue disease; kidney disease; aneurysm; pulmonary fibrosis; valve surgery within 5 years; Crohn's; opioid/narcotic chronic pain.\nAccept: anxiety/depression (no hospitalization, no time lost, up to Table 4); asthma (decline under age 6); AFib diagnosed 2+ years, controlled, under 65; controlled HBP and cholesterol; seizures diagnosed 5+ years and compliant; gastric bypass after 1 year; treated sleep apnea; fibromyalgia; one TIA 6+ months ago at age 46+; PVD in a non-smoker; discoid lupus after 1 year.",
      rx: "Marijuana under 4 times a week OK; daily = decline. Up to 2 violations in 3 years; DUI OK if more than 5 years. Riders: overloan protection, terminal/chronic/critical illness.",
      src: "TERM UW Cheat Sheet (Founders Financial Group)"
    }
  },
  "SBLI": {
    "Term": {
      uwType: "Term — accelerated underwriting; labs/vitals or APS for cause. Classes: Preferred Plus, Preferred, Select, Standard (non-nicotine & nicotine). Substandard build to about Table 8.",
      knockouts: "Decline: any cancer within 2 years; CHF; HIV; cirrhosis; renal failure; pulmonary hypertension; ALS; drug abuse within 5 years; stroke within 1 year; heart valve surgery within 6 months; aneurysm surgery within 6 months; most transplants; severe chronic pain/disability; probation/parole.\nAccept: controlled anxiety or depression on 1 med (depression 1+ year); mild asthma; basal/squamous skin cancer (under 3 lesions); controlled HBP; cholesterol up to 300; gastric bypass 5+ years; treated mild sleep apnea with CPAP.\nRefer (labs/APS): alcohol history, AFib, bipolar, CAD, COPD (severe = decline), Crohn's, diabetes (Type 1 or 2), seizures, hepatitis B/C, melanoma, MS, PVD, TIA, ulcerative colitis, lupus.",
      rx: "Marijuana under 11 times a month OK.",
      src: "TERM UW Cheat Sheet (Founders Financial Group)"
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
      ages: "20–80",
      face: "$5,000–$100,000",
      uwType: "Whole life — final expense (Express Issue)",
      benefit: "Immediate",
      knockouts: "Graded/GI routing: heart attack, bypass/heart surgery, CAD, CHF, cardiomyopathy or stroke within 1 year = GI only, otherwise Graded; stent, angina, pacemaker, defibrillator, cancer history, kidney/liver disease = Graded or GI; AIDS/HIV, terminal illness or confined to hospital/hospice/nursing home = GI knockout (decline); ALS, dementia, mental incapacity, oxygen, cystic fibrosis, pulmonary fibrosis = GI only.\nPremier look-back 2 years: bipolar, schizophrenia, lupus.\nDeluxe/Premier: insulin diabetes. Deluxe: DUI/reckless driving/suspended license within 2 years.\nExpress/Provider (no hit): AFib, arthritis, basal cell, controlled depression/PTSD without hospitalization, sleep apnea, ulcerative colitis, seizures, Crohn's.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026); FE & WL UW Cheat Sheet (Founders Financial Group)"
    },
    "Express Issue Deluxe WL": {
      ages: "20–80",
      face: "$5,000–$50,000",
      uwType: "Whole life — final expense (Express Issue)",
      benefit: "Immediate. 2-year lookback for moderate conditions.",
      knockouts: "Graded/GI routing: heart attack, bypass/heart surgery, CAD, CHF, cardiomyopathy or stroke within 1 year = GI only, otherwise Graded; stent, angina, pacemaker, defibrillator, cancer history, kidney/liver disease = Graded or GI; AIDS/HIV, terminal illness or confined to hospital/hospice/nursing home = GI knockout (decline); ALS, dementia, mental incapacity, oxygen, cystic fibrosis, pulmonary fibrosis = GI only.\nPremier look-back 2 years: bipolar, schizophrenia, lupus.\nDeluxe/Premier: insulin diabetes. Deluxe: DUI/reckless driving/suspended license within 2 years.\nExpress/Provider (no hit): AFib, arthritis, basal cell, controlled depression/PTSD without hospitalization, sleep apnea, ulcerative colitis, seizures, Crohn's.",
      notes: "Best starting point for Type 1 diabetes / insulin (complications still matter), previous declines and high build.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026); FE & WL UW Cheat Sheet (Founders Financial Group)"
    },
    "Express Issue Graded WL": {
      uwType: "Whole life — final expense (Express Issue)",
      benefit: "May use a graded death benefit. 1-year lookback for major conditions.",
      knockouts: "Graded/GI routing: heart attack, bypass/heart surgery, CAD, CHF, cardiomyopathy or stroke within 1 year = GI only, otherwise Graded; stent, angina, pacemaker, defibrillator, cancer history, kidney/liver disease = Graded or GI; AIDS/HIV, terminal illness or confined to hospital/hospice/nursing home = GI knockout (decline); ALS, dementia, mental incapacity, oxygen, cystic fibrosis, pulmonary fibrosis = GI only.\nPremier look-back 2 years: bipolar, schizophrenia, lupus.\nDeluxe/Premier: insulin diabetes. Deluxe: DUI/reckless driving/suspended license within 2 years.\nExpress/Provider (no hit): AFib, arthritis, basal cell, controlled depression/PTSD without hospitalization, sleep apnea, ulcerative colitis, seizures, Crohn's.",
      notes: "Good for previous declines and certain build challenges.",
      src: "Final Expense Underwriting Knockout Cheat Sheet (Jul 2026); FE & WL UW Cheat Sheet (Founders Financial Group)"
    },
    "Guaranteed Issue Whole Life": {
      ages: "45–75",
      face: "$5,000–$25,000",
      uwType: "Guaranteed issue whole life — no health questions",
      knockouts: "GI knockouts: AIDS/HIV, terminal illness, currently confined to a hospital, hospice or nursing home.",
      notes: "Floor for ALS, dementia, mental incapacity, oxygen, cystic fibrosis/pulmonary fibrosis and very recent heart/stroke events.",
      src: "FE & WL UW Cheat Sheet (Founders Financial Group)"
    },
    "Provider Whole Life": {
      ages: "0–80",
      face: "$10,000–$150,000 (age-banded)",
      uwType: "Fully underwritten whole life — Standard / Preferred; level benefit",
      build: "Preferred max weight — 5'0\": 161 · 5'4\": 181 · 5'8\": 203 · 6'0\": 226 · 6'4\": 252.",
      src: "FE & WL UW Cheat Sheet (Founders Financial Group)"
    }
  },
  "Royal Neighbors": {
    "All products": {
      knockouts: "Takes COPD at standard. Takes neuropathy.",
      src: "Notion carrier notes"
    },
    "Ensured Legacy FE": {
      ages: "SIWL 50–85 · Graded (GDB) 50–85 · Guaranteed Issue 50–80",
      face: "SIWL $5,000–$40,000 · GDB $5,000–$20,000 · GI $3,000–$10,000",
      uwType: "Simplified issue whole life (Preferred / Standard), Graded Death Benefit, or Guaranteed Issue — three tiers cover nearly any health",
      knockouts: "GI only: AIDS/HIV, ALS, Alzheimer's/dementia, mental incapacity, oxygen, dialysis, confined to a hospital/hospice/nursing home or assisted living. Terminal illness = decline.\nGI or Graded (GDB): heart attack, bypass, stent, angina, stroke, CHF, cardiomyopathy, current/recurrent cancer, kidney disease, cirrhosis, alcohol/drug history, transplant, muscular dystrophy, Huntington's, disease-related amputation, wheelchair/walker from disease. CAD within 2 years = Graded; more than 2 years = Standard.\nSIWL or GDB: AFib, asthma/COPD, controlled diabetes incl. insulin, cured cancer, hepatitis B/C, lupus, MS, Parkinson's, RA, bipolar, seizures, ulcerative colitis, pacemaker, pancreatitis.\nSIWL: arthritis, basal cell, depression, sleep apnea, neuropathy (non-diabetic).\nNon-health: DUI, misdemeanor and probation/parole accepted; felony = decline on SIWL but accepted on GI; currently incarcerated = decline.",
      rx: "No tobacco class on GI. Payment: ACH monthly/quarterly/semi-annual/annual.",
      src: "Notion carrier notes; FE & WL UW Cheat Sheet (Founders Financial Group)"
    },
    "Jet Term Life": {
      ages: "18–65 (accelerated UW 18–60; fully underwritten 61–65)",
      face: "$25,000–$5,000,000",
      uwType: "Term — accelerated underwriting, no exam (MIB + MVR + Rx on all applicants). Preferred NT, Standard NT, Std Tobacco, Substandard up to Table 4 (accelerated) or Table 16 (traditional, 61–65).",
      knockouts: "Decline: AFib, cancer within 2 years, melanoma within 5 years, CHF, CAD, COPD, Type 1/insulin diabetes, drug abuse, heart valve surgery, HIV, transplant, Parkinson's/ALS, PVD, stroke, TIA, cirrhosis, kidney disease, aneurysm, pulmonary fibrosis.\nTable 2–4: Type 2 diabetes on oral meds, bipolar stable on meds, Crohn's/UC stable, controlled seizures, gastric bypass with stable BMI, hepatitis managed, mild/stable MS or lupus, RA on DMARDs, alcohol 3–9 years sober.\nStandard NT: mild anxiety/depression, mild-moderate asthma, controlled HBP/cholesterol, CPAP-compliant sleep apnea, fibromyalgia, basal/squamous skin cancer, alcohol 10+ years sober.",
      rx: "No knock-out medication list. DUI: Standard if 5+ years, Table 2–4 at 3–5 years, decline under 3 years or 2+ DUIs. Felony or probation/parole = decline. Marijuana: Std NT unless daily/heavy (tobacco class).",
      notes: "Not available in AL, AK, HI, LA, MA, NH, NY. Payment: EFT, check, credit card.",
      src: "TERM UW Cheat Sheet (Founders Financial Group)"
    }
  }
};

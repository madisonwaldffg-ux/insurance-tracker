/* ===========================================================================
   underwriting-guide.js -- shared underwriting summaries, one entry per carrier
   product (keys match comp-guide.js). Everyone in the hub sees these; each
   agent can also keep their own notes on top (saved to their account).

   Fields (all optional, plain text):
     ages      Issue ages
     face      Face amounts
     uwType    Underwriting type (simplified issue, guaranteed issue, full UW...)
     benefit   Benefit structure (level / graded / modified, waiting periods)
     build     Height & weight / build chart notes
     knockouts Knockout conditions / decline triggers
     rx        Rx / MIB / phone interview checks
     notes     Anything else

   Example:
     "Mutual of Omaha": {
       "Living Promise": { ages: "45-85", face: "$2,000-$40,000", uwType: "Simplified issue", ... }
     }
   Only fill these from the carrier's own underwriting guide.
   =========================================================================== */
window.UW_GUIDE = {};

# VELTARO V1 — Assumptions and evidence register v0.1
**Prepared 19 October 2026 | Research, not vehicle design approval**

## Decision status
Both architecture hypotheses (A: electric VTOL; B: runway fixed-wing with folding road configuration) remain open. No validated numerical performance, dimensions, weight or cost exists.

| ID | Question | Architecture | Evidence needed | Current status | Responsible review lens |
|---|---|---|---|---|---|
| A01 | What user mission and legal operating sites are realistically available? | Both | Documented use case + aviation/road access | Unknown | Product / operations |
| A02 | What is the maximum feasible road envelope? | Both | Target jurisdiction road type-approval scope | Unknown | Automotive / legal |
| A03 | What payload and passenger count is needed? | Both | User interviews and requirements | Unknown | Product |
| A04 | What is the traceable component mass budget? | Both | Source-grounded subsystem estimates | Unknown | Engineering |
| A05 | What power is needed in each flight phase? | Both, different models | Physics model + assumptions + independent check | Unknown | Aerospace |
| A06 | What usable stored energy and reserves are required? | Both | Mission profile + applicable reserve rules | Unknown | Aerospace / regulatory |
| A07 | What happens after single-point propulsion/control failures? | Both | Preliminary hazard analysis | Unknown | Safety |
| A08 | Can flight-mode structures meet road crash constraints? | Both | Road safety framework + packaging trade study | Unknown | Automotive / structures |
| A09 | Which certification path might apply? | Both | Qualified airworthiness and road advice | Unknown | Legal / certification |
| A10 | Is there demand at feasible total cost? | Both | Qualitative interviews and cost model | Unknown | Commercial / CFO |

## Model discipline
Never infer a commercial vehicle range from an illustrative battery density. Separate hover, transition, takeoff/climb, cruise, descent, landing, reserves and ground mode. Any mass-energy estimate must show units, credible source, date, uncertainty, safety factors and conditions of applicability.

## Initial qualitative architecture comparison
| Dimension | VTOL | Folding fixed-wing |
|---|---|---|
| Runway dependence | May reduce runway dependency; still needs authorized sites | Runway or appropriate landing infrastructure needed |
| Hover power | Central design requirement | Not applicable in sustained wing-borne operation |
| Mechanism risk | Rotor/transition architecture dependent | Fold/lock/structural interface dependent |
| Road integration | Packaging, rotor protection, crash structure | Wing packaging, road dimensions, structural joints |
| Emergency response | Architecture-specific; unresolved | Architecture-specific; unresolved |
| Preferred concept | **Not selected** | **Not selected** |

## Review gate
Only proceed to quantified comparison when the mission is agreed, required inputs have traceable evidence and uncertainty is recorded. Physical testing, investment, certification advice and prototype manufacture remain outside this document.

## Reference starting points
- EASA aircraft product certification: https://www.easa.europa.eu/en/domains/aircraft-products
- European road-vehicle approval framework Regulation (EU) 2018/858: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0858

These references do not establish which detailed rules would apply to an actual VELTARO architecture.

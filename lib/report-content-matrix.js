export const reportContentMatrix = {
  "Control & Governance": {
    "Strong": {
      "observations": [
        "Controls are embedded and consistently followed across all finance processes. Segregation of duties is in place, compliance is proactively managed through a structured calendar, and the function is resilient to personnel changes."
      ],
      "risks": [],
      "actions": [
        "Conduct annual controls review to ensure standards evolve with headcount",
        "Document any new processes before they go live",
        "Evaluate external audit readiness as the business approaches investor scrutiny"
      ]
    },
    "Good": {
      "observations": [
        "Core controls are present but applied inconsistently. Segregation of duties exists informally and compliance is mostly managed but reactive rather than proactive."
      ],
      "risks": [
        "A single process failure or personnel absence can create a material control gap."
      ],
      "actions": [
        "Formalise the approvals matrix and document who can authorise each type of transaction",
        "Introduce a compliance calendar with named owners for each regulatory deadline",
        "Conduct a segregation of duties review across banking, entry and reporting functions"
      ]
    },
    "Needs Work": {
      "observations": [
        "Controls are defined on paper but not consistently followed. Segregation of duties is incomplete and compliance is managed ad hoc."
      ],
      "risks": [
        "Without consistent controls, exposure to error, fraud and compliance gaps becomes harder to manage as the business grows. Exposure to fraud, error and regulatory non-compliance is significant and growing."
      ],
      "actions": [
        "Stop all single-person control over banking and payment processes immediately",
        "Build a minimum viable approvals matrix and enforce it within 30 days",
        "Assign a compliance calendar owner and conduct a regulatory gap assessment"
      ]
    },
    "Critical": {
      "observations": [
        "No documented controls, no segregation of duties, compliance entirely reactive. Finance operates with minimal governance."
      ],
      "risks": [
        "Immediate exposure to financial loss, regulatory penalty or audit failure. Intervention required now."
      ],
      "actions": [
        "Halt any single-person access to banking, payments and book-keeping immediately",
        "Engage PV Advisory for an emergency controls assessment within 2 weeks",
        "Document and implement a bare-minimum approvals and segregation framework before any other work begins"
      ]
    }
  },
  "Visibility": {
    "Strong": {
      "observations": [
        "MIS is delivered by Day 7. Cash flow, receivables, payables and revenue are tracked at granular level with named KPI owners. Real-time dashboards are in active use and trusted by leadership."
      ],
      "risks": [],
      "actions": [
        "Explore advanced analytics to move from descriptive to predictive reporting",
        "Introduce scenario-based cash forecasting alongside the rolling tracker",
        "Segment revenue KPIs to customer, product and channel level if not already done"
      ]
    },
    "Good": {
      "observations": [
        "Reporting is regular and mostly reliable but MIS delivery is likely extending beyond Day 10. MIS arrives 12–15 days into the month. Cash visibility appears to have gaps, particularly around receivables or payables."
      ],
      "risks": [
        "Decisions may be based on data that is not fully current, which limits the team's ability to respond quickly. Decisions are made on data that is 10–15 days stale."
      ],
      "actions": [
        "Set a hard MIS deadline of Day 10 with a named owner and escalation path",
        "Build a weekly receivables ageing dashboard updated every Monday",
        "Introduce a 13-week rolling cash flow tracker — even a structured Excel template is a start"
      ]
    },
    "Needs Work": {
      "observations": [
        "Reporting is inconsistent and frequently delayed. Regular cash flow visibility is limited or inconsistent. No regular cash flow visibility. KPIs are informal or not tracked against targets."
      ],
      "risks": [
        "Leadership is flying blind on cash and collections. Missed payments and unpleasant surprises are common."
      ],
      "actions": [
        "Define a fixed MIS delivery date and hold the team accountable for it every month",
        "Build a basic cash flow template covering the next 4 weeks and review it weekly",
        "Identify 3–5 core KPIs and assign a named owner and review frequency for each"
      ]
    },
    "Critical": {
      "observations": [
        "No MIS, no dashboards, no cash flow visibility. Finance data is produced only when specifically requested and takes weeks to compile."
      ],
      "risks": [
        "The business has no financial visibility. A cash crisis can arrive without warning."
      ],
      "actions": [
        "Start producing a basic P&L and balance sheet every month from this month forward",
        "Build a simple 4-week cash tracker and update it every Monday",
        "Appoint one person accountable for finance reporting before any systems work begins"
      ]
    }
  },
  "Process": {
    "Strong": {
      "observations": [
        "Finance processes are documented, standardised and consistently followed. Month-end closes within 5 business days. Budgeting runs on a defined cycle with leadership participation. Variance analysis actively shapes the next plan."
      ],
      "risks": [],
      "actions": [
        "Schedule an annual process review to ensure SOPs evolve with business complexity",
        "Identify and automate the remaining manual steps in existing SOPs",
        "Introduce a formal process for onboarding all new finance team members through documented procedures"
      ]
    },
    "Good": {
      "observations": [
        "Core processes exist and mostly work but are not fully documented. Month-end is broadly functional but may be taking longer than the Day 5 target. Reliable but takes 7–10 days."
      ],
      "risks": [
        "Processes depend on individuals rather than documentation. Staff turnover creates operational risk."
      ],
      "actions": [
        "Document the top 5 finance processes that currently exist only in people's heads",
        "Set a month-end target of Day 7 and build a close checklist to track it",
        "Introduce a structured budgeting calendar with defined owner, milestone and review dates"
      ]
    },
    "Needs Work": {
      "observations": [
        "Processes are informal and person-dependent. Month-end is delayed or inconsistent. There is no formal budgeting cycle and variance analysis is rare."
      ],
      "risks": [
        "Delays in month-end close push back reporting timelines, which can affect the quality and timeliness of business decisions. Function is fragile under any personnel change."
      ],
      "actions": [
        "Build a month-end close checklist covering every step from data entry to final sign-off",
        "Set a target of Day 10 for month-end and enforce it with a named accountable person",
        "Draft a 12-month budget for the current financial year even if historical data is incomplete"
      ]
    },
    "Critical": {
      "observations": [
        "No defined finance processes. Each month-end is a firefight. No budgeting, no forecasting, no standardisation of any kind."
      ],
      "risks": [
        "Finance cannot support business decisions. Errors and delays are the norm. The function is not fit for purpose."
      ],
      "actions": [
        "Define the 3 most critical finance tasks and document how they are done — today",
        "Build a simple month-end checklist and assign an owner for each step",
        "Engage PV Advisory for a process assessment before any technology investment"
      ]
    }
  },
  "Technology": {
    "Strong": {
      "observations": [
        "Systems across accounting, billing, payroll and banking are fully integrated. Manual data entry is under 10% of team time. Leadership trusts and uses live dashboards."
      ],
      "risks": [],
      "actions": [
        "Explore AI-powered financial analytics for forecasting and anomaly detection",
        "Plan a technology scaling roadmap for the next 2-year business growth phase",
        "Automate variance analysis and exception-based reporting where not already done"
      ]
    },
    "Good": {
      "observations": [
        "Core accounting software is in use but system integrations are partial. Manual data entry is likely consuming a meaningful share (20-40%) of the team's time."
      ],
      "risks": [
        "Time spent on manual data entry is time not spent on analysis. Manual transfer between systems creates data integrity risk."
      ],
      "actions": [
        "Map every manual data transfer between systems and prioritise automating the top 3",
        "Build one live dashboard that leadership looks at every Monday morning",
        "Evaluate the ROI of integrating payroll, billing and accounting within the next 6 months"
      ]
    },
    "Needs Work": {
      "observations": [
        "Basic accounting software only. No meaningful integrations between systems. Dashboards are spreadsheet-based and manually updated. Manual entry dominates the finance team's time."
      ],
      "risks": [
        "The finance team is a data entry team, not an analysis team. Significant error risk exists from manual data handling."
      ],
      "actions": [
        "Shortlist and implement a cloud accounting platform within 90 days",
        "Stop all spreadsheet-based reporting and move to the accounting platform's native reports",
        "Identify the highest-volume manual task and build an automation case for it"
      ]
    },
    "Critical": {
      "observations": [
        "No dedicated accounting software. Spreadsheets are the primary finance tool. No dashboards. All processes are manual."
      ],
      "risks": [
        "The technology foundation is absent. Scaling without this creates compounding errors and eventual team burnout."
      ],
      "actions": [
        "Select and implement a basic cloud accounting platform as the immediate first priority",
        "Do not invest in any other technology until accounting software is live and adopted",
        "Engage PV Advisory to define the minimum viable tech stack for the business stage"
      ]
    }
  },
  "People": {
    "Strong": {
      "observations": [
        "The finance team is competent, commercially aware, and operates with clear written role descriptions. Performance is reviewed quarterly against measurable KPIs. Backup coverage exists for all critical roles."
      ],
      "risks": [],
      "actions": [
        "Formalise succession planning for the senior finance role",
        "Build a finance capability development plan aligned to the business growth roadmap",
        "Introduce an annual skills gap assessment for the finance team"
      ]
    },
    "Good": {
      "observations": [
        "The team is competent and engaged but role definitions are informal and not documented. Performance reviews happen but are not structured around measurable outcomes."
      ],
      "risks": [
        "Informal roles create accountability gaps under pressure. One personnel absence can disrupt critical finance operations for days."
      ],
      "actions": [
        "Formalise written role descriptions with clear accountability for each position",
        "Identify the top 2 critical finance roles and cross-train a backup for each",
        "Introduce quarterly outcome-based performance reviews with measurable KPIs for every team member"
      ]
    },
    "Needs Work": {
      "observations": [
        "Roles are unclear and responsibilities overlap or fall through gaps. There is significant key-person dependency with minimal backup coverage."
      ],
      "risks": [
        "The finance function is a single point of failure. Any absence immediately exposes the business. Errors go undetected without a second reviewer."
      ],
      "actions": [
        "Write a one-page role definition for every finance team member within 30 days",
        "Identify the single highest-risk key-person dependency and start cross-training a backup this month",
        "Map the skills gap between current team capability and the finance function the business needs in 12 months"
      ]
    },
    "Critical": {
      "observations": [
        "No defined finance team structure. Finance tasks are shared informally across departments or handled by non-finance staff. No performance management in place."
      ],
      "risks": [
        "Finance ownership is unclear. Errors go undetected. The business has no dedicated finance capability."
      ],
      "actions": [
        "One named person must own the function starting today",
        "Agree on the minimum finance tasks that must happen every month and assign each to a person",
        "Engage PV Advisory to assess whether the business needs a full-time hire, a part-time resource or a Virtual CFO"
      ]
    }
  },
  "Strategy": {
    "Strong": {
      "observations": [
        "Finance is a genuine strategic partner present in pricing, hiring and expansion decisions. Working capital is actively managed as a strategic lever. Profitability is understood at product, customer, channel and geography level."
      ],
      "risks": [],
      "actions": [
        "Build a rolling 12-month financial model updated monthly with actuals",
        "Introduce formal scenario planning for all major strategic decisions",
        "Evaluate whether the business is ready for a full-time CFO or a next-level finance capability upgrade"
      ]
    },
    "Good": {
      "observations": [
        "Finance provides useful input to business decisions but is not consistently at the strategic table. Working capital is monitored. Profitability is understood at business level but not by segment."
      ],
      "risks": [
        "Major strategic decisions are made without full financial modelling. Finance is reactive rather than predictive, limiting its value to leadership."
      ],
      "actions": [
        "Build a rolling 3-month cash flow forecast reviewed in every leadership meeting",
        "Introduce profitability analysis by product line or customer segment within 60 days",
        "Present a monthly financial narrative to leadership — not just the numbers, but what they mean"
      ]
    },
    "Needs Work": {
      "observations": [
        "Finance is primarily a compliance and reporting function with limited involvement in business decisions. No scenario planning capability. Leadership does not rely on finance for strategic input."
      ],
      "risks": [
        "The business is making major decisions without financial analysis. Growth decisions may create unforeseen cash or margin pressure."
      ],
      "actions": [
        "Attend every leadership meeting and present a 3-slide financial summary",
        "Build a simple financial model projecting the next 6 months based on current trajectory",
        "Introduce break-even and scenario analysis before any significant cost or investment decision"
      ]
    },
    "Critical": {
      "observations": [
        "Finance has no strategic role. Leadership makes decisions without financial input. No financial model, no scenario planning and no strategic engagement from the finance team."
      ],
      "risks": [
        "Without financial input in strategic decisions, major calls on growth, pricing or investment are being made without a full picture. The business is operating without a financial compass."
      ],
      "actions": [
        "Start attending leadership meetings and asking: what does this decision cost and what does it return?",
        "Build a basic revenue and cost model for the next 12 months",
        "Engage PV Advisory to define what strategic finance capability looks like for this business stage"
      ]
    }
  }
};

export const maturityLevels = {
  5: {
    name: "Strategic",
    range: "121–150",
    coverText: "Finance is a growth engine, not a support function. Best-in-class across all dimensions.",
    duration: 9,
    phase3Name: "Scale & Sustain",
    phase3Focus: [
      "Build a rolling 12-month financial model",
      "Introduce formal scenario planning",
      "Review finance leadership structure for the next growth phase"
    ]
  },
  4: {
    name: "Managed",
    range: "91–120",
    coverText: "Strong foundation. A few targeted improvements unlock the next level.",
    duration: 12,
    phase3Name: "Enable Strategy",
    phase3Focus: [
      "Connect finance to strategic decisions",
      "Build profitability by segment",
      "Introduce scenario planning"
    ]
  },
  3: {
    name: "Basic",
    range: "61–90",
    coverText: "Structure exists but is inconsistent. Process and technology investment needed.",
    duration: 15,
    phase3Name: "Standardise & Automate",
    phase3Focus: [
      "Eliminate manual processes",
      "Integrate systems",
      "Build dashboards leadership trusts"
    ]
  },
  2: {
    name: "Developing",
    range: "31–60",
    coverText: "High manual dependency. Controls are partial and risks are real.",
    duration: 18,
    phase3Name: "Build Foundation",
    phase3Focus: [
      "Establish core controls",
      "Implement cloud accounting",
      "Define team roles and responsibilities"
    ]
  },
  1: {
    name: "Fragmented",
    range: "0–30",
    coverText: "Immediate intervention needed. One bad quarter away from a finance crisis.",
    duration: 18,
    phase3Name: "Emergency Stabilisation",
    phase3Focus: [
      "Implement minimum viable controls",
      "Appoint a finance owner",
      "Build basic reporting from scratch"
    ]
  }
};

import { FileText, Database, Settings, ShieldCheck, PieChart, TrendingUp } from "lucide-react";
import React from 'react';

export const CATEGORIES = [
  "All",
  "Strategy",
  "Finance",
  "Operations",
  "Compliance",
  "Reporting",
  "Business"
];

export const STATIC_RESOURCES = [
  {
    id: "res-1",
    title: "Procurement ROI Framework",
    description: "A specialized framework for calculating and presenting procurement-led savings to board-level stakeholders.",
    category: "Strategy",
    type: "PDF Guide",
    size: "1.2 MB",
    icon: <FileText size={24} />,
    downloadUrl: "#",
    fileName: "procurement-roi-framework.pdf"
  },
  {
    id: "res-2",
    title: "Virtual CFO Implementation Checklist",
    description: "Everything you need to successfully transition from local accounting to a strategic virtual CFO model.",
    category: "Finance",
    type: "Checklist",
    size: "0.5 MB",
    icon: <Settings size={24} />,
    downloadUrl: "#",
    fileName: "vcfo-checklist.pdf"
  },
  {
    id: "res-3",
    title: "GST Compliance Audit Sheet",
    description: "Internal audit template to ensure your business remains 100% compliant with the latest GST regulations in India.",
    category: "Compliance",
    type: "Audit Sheet",
    size: "0.8 MB",
    icon: <ShieldCheck size={24} />,
    downloadUrl: "#",
    fileName: "gst-audit-sheet.pdf"
  },
  {
    id: "res-4",
    title: "Rolling Forecast Template",
    description: "Move beyond annual budgets with this dynamic 12-month rolling forecast model for high-growth businesses.",
    category: "Reporting",
    type: "Excel Model",
    size: "2.1 MB",
    icon: <Database size={24} />,
    downloadUrl: "#",
    fileName: "rolling-forecast-model.xlsx"
  },
  {
    id: "res-5",
    title: "Startup Equity Dilution Model",
    description: "Understand the impact of future funding rounds on founder and employee equity pools.",
    category: "Business",
    type: "Model",
    size: "1.4 MB",
    icon: <PieChart size={24} />,
    downloadUrl: "#",
    fileName: "equity-dilution-model.xlsx"
  },
  {
    id: "res-6",
    title: "P2P Lifecycle Optimization Guide",
    description: "Best practices for streamlining your procurement-to-pay process to unlock working capital.",
    category: "Operations",
    type: "PDF Guide",
    size: "0.9 MB",
    icon: <TrendingUp size={24} />,
    downloadUrl: "#",
    fileName: "p2p-optimization.pdf"
  }
];

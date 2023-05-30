import {
    ArrowDownToLine,
    ArrowRightToLine,
    ArrowUpCircle,
    ArrowUpToLine,
    CheckCircle2,
    Circle,
    HelpCircle,
    XCircle,
  } from "lucide-react"

  //manages icons i think 
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "new",
      label: "New",
      icon: HelpCircle,
    },
    {
      value: "open",
      label: "Open",
      icon: Circle,
    },
    {
      value: "scheduled",
      label: "Scheduled",
      icon: ArrowUpCircle,
    },
    {
      value: "completed",
      label: "Completed",
      icon: CheckCircle2,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: XCircle,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownToLine,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightToLine,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpToLine,
    },
  ]
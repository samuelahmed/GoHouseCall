import { columns } from "~/components/sessionTable/columns";
import { DataTable } from "~/components/sessionTable/dataTable";
import { Button } from "../ui/button";

const demoSessions = [
  {
    id: "1",
    sessionType: "Mobility Support",
    description: "Help with walking",
    status: "Open",
  },
  {
    id: "2",
    sessionType: "Personal Care",
    description: "Help with bathing",
    status: "New",
  },
  {
    id: "3",
    sessionType: "Home Care",
    description: "Need help at home",
    status: "Scheduled",
  },
  {
    id: "4",
    sessionType: "Transportation",
    description: "Need help getting to the doctor",
    status: "Completed",
  },
  {
    id: "5",
    sessionType: "Other",
    description: "Need help with other things",
    status: "Canceled",
  },
  {
    id: "6",
    sessionType: "Mobility Support",
    description: "Help needed for walking and getting around outside.",
    status: "Open",
  },
  {
    id: "7",
    sessionType: "Personal Care",
    description: "Looking for support with grooming and dressing.",
    status: "New",
  },
  {
    id: "8",
    sessionType: "Home Care",
    description:
      "Assistance required for meal preparation and light housekeeping.",
    status: "Scheduled",
  },
  {
    id: "9",
    sessionType: "Transportation",
    description:
      "Seeking help for transportation to social events and gatherings.",
    status: "Completed",
  },
  {
    id: "10",
    sessionType: "Other",
    description: "Require assistance with organizing and decluttering.",
    status: "Canceled",
  },
  {
    id: "11",
    sessionType: "Transportation",
    description: "Require help with transportation to medical appointments.",
    status: "New",
  },
  {
    id: "12",
    sessionType: "Home Care",
    description: "In need of support for household chores and cleaning.",
    status: "Scheduled",
  },
  {
    id: "13",
    sessionType: "Mobility Support",
    description: "Looking for assistance with mobility aids and equipment.",
    status: "Completed",
  },
  {
    id: "14",
    sessionType: "Personal Care",
    description: "Require help with medication management and reminders.",
    status: "Canceled",
  },
  {
    id: "15",
    sessionType: "Other",
    description: "Seeking support for pet care and walking.",
    status: "Open",
  },
  {
    id: "16",
    sessionType: "Transportation",
    description: "Need assistance with grocery shopping and errands.",
    status: "New",
  },
  {
    id: "17",
    sessionType: "Home Care",
    description: "In need of companionship and social interaction.",
    status: "Scheduled",
  },
  {
    id: "18",
    sessionType: "Mobility Support",
    description: "Require help with physical therapy exercises.",
    status: "Completed",
  },
  {
    id: "19",
    sessionType: "Personal Care",
    description: "Seeking assistance with meal preparation and feeding.",
    status: "Canceled",
  },
];

export default function sessionsTableMain() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-4">
        <Button>Create Session</Button>
      </div>
      <DataTable data={demoSessions} columns={columns} />
    </>
  );
}

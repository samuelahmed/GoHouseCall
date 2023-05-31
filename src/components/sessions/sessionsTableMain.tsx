import { columns } from "~/components/sessionTable/columns";
import { DataTable } from "~/components/sessionTable/dataTable";

const demoSessions = [
  {
    id: "1",
    title: "Mobility Support",
    description: "Help with walking",
    status: "Open",
  },
  {
    id: "2",
    title: "Personal Care",
    description: "Help with bathing",
    status: "New",
  },
  {
    id: "3",
    title: "Home Care",
    description: "Need help at home",
    status: "Scheduled",
  },
  {
    id: "4",
    title: "Transportation",
    description: "Need help getting to the doctor",
    status: "Completed",
  },
  {
    id: "5",
    title: "Other",
    description: "Need help with other things",
    status: "Canceled",
  },  
  {
    id: "6",
    title: "Mobility Support",
    description: "Help needed for walking and getting around outside.",
    status: "Open"
  },
  {
    id: "7",
    title: "Personal Care",
    description: "Looking for support with grooming and dressing.",
    status: "New"
  },
  {
    id: "8",
    title: "Home Care",
    description: "Assistance required for meal preparation and light housekeeping.",
    status: "Scheduled"
  },
  {
    id: "9",
    title: "Transportation",
    description: "Seeking help for transportation to social events and gatherings.",
    status: "Completed"
  },
  {
    id: "10",
    title: "Other",
    description: "Require assistance with organizing and decluttering.",
    status: "Canceled"
  },
  {
    id: "11",
    title: "Transportation",
    description: "Require help with transportation to medical appointments.",
    status: "New"
  },
  {
    id: "12",
    title: "Home Care",
    description: "In need of support for household chores and cleaning.",
    status: "Scheduled"
  },
  {
    id: "13",
    title: "Mobility Support",
    description: "Looking for assistance with mobility aids and equipment.",
    status: "Completed"
  },
  {
    id: "14",
    title: "Personal Care",
    description: "Require help with medication management and reminders.",
    status: "Canceled"
  },
  {
    id: "15",
    title: "Other",
    description: "Seeking support for pet care and walking.",
    status: "Open"
  },
  {
    id: "16",
    title: "Transportation",
    description: "Need assistance with grocery shopping and errands.",
    status: "New"
  },
  {
    id: "17",
    title: "Home Care",
    description: "In need of companionship and social interaction.",
    status: "Scheduled"
  },
  {
    id: "18",
    title: "Mobility Support",
    description: "Require help with physical therapy exercises.",
    status: "Completed"
  },
  {
    id: "19",
    title: "Personal Care",
    description: "Seeking assistance with meal preparation and feeding.",
    status: "Canceled"
  }
];

export default function TaskPage() {
  return (
    <>
      <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={demoSessions} columns={columns} />
      </div>
    </> 
  );
}

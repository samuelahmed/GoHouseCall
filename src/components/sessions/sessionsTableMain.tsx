import { columns } from "~/components/sessionTable/columns";
import { DataTable } from "~/components/sessionTable/dataTable";

const demoSessions = [
  {
    id: "1",
    title: "Meow",
    description: "test session description",
    status: "open",
  },
];

export default function TaskPage() {
  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={demoSessions} columns={columns} />
      </div>
    </>
  );
}

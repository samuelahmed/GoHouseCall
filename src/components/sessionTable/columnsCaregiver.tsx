import { type ColumnDef } from "@tanstack/react-table";
import { sessiontypes, applicationStatus } from "./dataCaregiver";
import { type sessionSchemaCaregiver } from "./sessionSchemaCaregiver";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import { DataTableRowActions } from "./dataTableRowActions";

export const columnsCaregiver: ColumnDef<sessionSchemaCaregiver>[] = [
  //this is only here to get the id of the session
  //it is not displayed on the table
  //it does create a like 5 px wide invisible column
  {
    accessorKey: "id",
    header: ({}) => <></>,
    cell: ({}) => <></>,
  },
  {
    accessorKey: "sessionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session Type" />
    ),
    cell: ({ row }) => {
      const sessionType = sessiontypes.find(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        (sessionType) => sessionType.value === row.getValue("sessionType")
      );
      if (!sessionType) {
        return null;
      }
      return (
        <div
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            window.location.href = `/careSession/${row.getValue("id")}`;
          }}
          className="flex w-[100px] items-center font-semibold hover:cursor-pointer hover:underline"
        >
          <span>{sessionType.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "applicationStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Status" />
    ),
    cell: ({ row }) => {
      const status = applicationStatus.find(
        (status) => status.value === row.getValue("applicationStatus")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("title")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[300px]">{row.getValue("description")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("city")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("date");
      if (!date) {
        return null;
      }
      const day = (date as Date).getDate();
      const month = (date as Date).getMonth() + 1;
      return <div className="w-[80px]">{`${month} / ${day}`}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("startTime")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("duration")} hours</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">$ {row.getValue("total")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

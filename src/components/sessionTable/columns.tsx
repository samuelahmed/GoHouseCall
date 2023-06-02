"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { sessiontypes, statuses } from "./data";
import { type SessionSchema } from "./sessionSchema";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import { DataTableRowActions } from "./dataTableRowActions";
// import { useRouter } from "next/router";





export const columns: ColumnDef<SessionSchema>[] = [
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
        //on click push to session page
        onClick={() => {
          window.location.href = "/sessionPage";
        //  href/
        }}

        className="flex w-[100px] items-center hover:cursor-pointer hover:underline font-semibold">
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("description")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

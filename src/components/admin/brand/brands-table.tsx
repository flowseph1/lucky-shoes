"use client";

import { Brand } from "@/app/admin/brands/page";
import { Table } from "@/components/table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { IoTrash } from "react-icons/io5";

const columnHelper = createColumnHelper<Brand>();
const columns: ColumnDef<Brand, any>[] = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => <p className="text-sm">{info.getValue()}</p>,
  }),
  columnHelper.accessor("name", {
    header: "Producto",
  }),
  columnHelper.accessor("image", {
    header: "Imagen",
    cell: (info) => (
      <Image
        src={info.getValue()}
        alt="Brand"
        width={40}
        height={40}
        className="rounded-full bg-neutral-900"
      />
    ),
  }),
];

export default function BrandsTable({ data }: { data: Brand[] }) {
  return <Table data={data} columns={columns} />;
}

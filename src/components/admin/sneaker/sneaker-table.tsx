"use client";

import { Sneaker } from "@/app/admin/sneakers/page";
import { Table } from "@/components/table";
import { PillStatus } from "@/components/ui/pill-status";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { IoTrash } from "react-icons/io5";

  const columnHelper = createColumnHelper<Sneaker>();
  const columns: ColumnDef<Sneaker, any>[] = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("name", {
      header: "Producto",
      cell: (props) => <ProductCell product={props.row.original} />,
    }),
    columnHelper.accessor("brand_name", {
      header: "Marca",
      cell: (props) => <p className="text-sm">{props.getValue()}</p>,
    }),
    columnHelper.accessor("slug", {
      header: "Slug",
      cell: (props) => <p className="text-sm">{props.getValue()}</p>,
    }),
    columnHelper.accessor("status", {
      header: "Estado",
      cell: (props) => <PillStatus variant={props.row.original.status} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "Acciones",
      cell: () => (
        <div className="flex">
          <div className="flex cursor-pointer items-center justify-center w-12 h-12 hover:bg-neutral-300 rounded-full">
            <IoTrash size={15} />
          </div>
        </div>
      ),
    }),
  ];

  export function SneakerTable({ data }: { data: Sneaker[] }) {
    return (
        <Table data={data} columns={columns} />
    );
  }
  
   function ProductCell({ product }: { product: Sneaker }) {
    return (
      <div className="flex gap-10">
        <Image
          alt={product.name}
          src={product.grid_picture_url}
          height={50}
          width={50}
          className="rounded-full bg-neutral-900"
        />
        <div className="flex flex-col">
          <p className="text-sm text-white/50">{product.name}</p>
        </div>
      </div>
    );
  }
  
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AdminProductTableRow from "./AdminProductTableRow";
import { Table } from "@/components/ui";
import Image from "next/image";
import { TableRow } from "@/types/table";

const dataHeader = [
  "ID",
  "Producto",
  "Descripción",
  "Marca",
  "Color",
  "Estado",
];

const AdminProductTable = ({
  setShowModal,
  setSelectedProduct,
}: {
  setShowModal: (arg: boolean) => void;
  setSelectedProduct: (product: TableRow) => void;
}) => {
  const onSelectProduct = (product: TableRow) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const [activePage, setActivePage] = useState(1);

  const [sneakersPerPage, setSneakersPerPage] = useState(5);

  const totalPages = Math.ceil(data.sneakers.length / sneakersPerPage);

  const dataBody = data.sneakers.map((sneaker) => {
    return {
      id: {
        label: `#${sneaker.id}`,
        value: sneaker.id,
      },
      product: {
        label: (
          <div className="flex w-full flex-col items-center">
            <Image
              alt=""
              src={sneaker.grid_picture_url}
              width={50}
              height={40}
            />
          </div>
        ),

        value: sneaker.grid_picture_url,
      },
      description: {
        label: (
          <div className="flex max-w-[20rem] flex-col">
            <div className="text-sm font-semibold">{sneaker.name}</div>
          </div>
        ),

        value: sneaker.name,
      },
      brand: {
        label: <div className="text-xs">{sneaker.brand_name}</div>,
        value: sneaker.brand_name,
      },
      color: {
        label: <div className="text-xs">{sneaker.color}</div>,
        value: sneaker.color,
      },
      state: {
        label: (
          <div className="rounded-full bg-success-background font-bold text-success-text">
            Activo
          </div>
        ),
        value: "Activo",
      },
    };
  });

  return (
    <div>
      {/*  <table className="w-full table-auto overflow-hidden rounded-lg text-sm">
                <thead className="border-b-[0.1rem] border-neutral-100 bg-neutral-300 text-left text-text-light">
                    <tr>
                        <th className="px-8 py-5">ID</th>
                        <th className="px-8 py-5">Producto</th>
                        <th className="px-8 py-5">Descripción</th>
                        <th className="px-8 py-5">Marca</th>
                        <th className="px-8 py-5">Color</th>
                        <th className="px-8 py-5">Estado</th>
                    </tr>
                </thead>
                <tbody className="table-row-group bg-container-extra-light">
                    <AnimatePresence mode="wait" initial={false}>
                        {data.sneakers
                            .slice((activePage - 1) * sneakersPerPage, activePage * sneakersPerPage)
                            .map((sneaker) => (
                                <AdminProductTableRow
                                    key={sneaker.id}
                                    onSelectProduct={onSelectProduct}
                                    sneaker={sneaker}
                                />
                            ))}
                    </AnimatePresence>
                </tbody>
            </table> */}

      <Table
        dataHeader={dataHeader}
        dataBody={dataBody}
        onRowPress={onSelectProduct}
      />

      {/*  <div className="my-10 flex w-full ">
                <div className="mr-10 flex flex-[0.3] space-x-4">
                    <button
                        className={
                            "h-fit flex-1 rounded-md bg-neutral-600 px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                        }
                        onClick={() => setActivePage(activePage - 1)}
                    >
                        Atras
                    </button>
                    <button
                        className={
                            "h-fit flex-1 rounded-md bg-neutral-600 px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                        }
                        onClick={() => setActivePage(activePage + 1)}
                    >
                        Siguiente
                    </button>
                </div>
                <div className="flex flex-1 flex-wrap">
                    {Array.from(Array(totalPages).keys()).map((page, index) => {
                        return (
                            <button
                                key={index}
                                className={classNames(
                                    "mb-5 mr-5 w-20 rounded-md bg-neutral-600 py-1 text-sm font-semibold  hover:bg-neutral-50 hover:text-text-base",
                                    activePage === page + 1 ? "bg-neutral-50 text-text-base" : "text-text-extra-light"
                                )}
                                onClick={() => setActivePage(page + 1)}
                            >
                                {page + 1}
                            </button>
                        );
                    })}
                </div>
            </div> */}
    </div>
  );
};

export default AdminProductTable;

import { Button, Input, Subtitle, Title } from "@/components/ui";
import { ISneaker } from "@/interfaces";
import { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
import AdminProductTable from "./AdminProductTable";
import AdminProductsFilters from "./AdminProductsFilters";
import dynamic from "next/dynamic";

const AdminProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<null | ISneaker>(null);

  const [showModal, setShowModal] = useState(false);

  const [addProduct, setAddProduct] = useState(false);

  const ProducDetailModal = dynamic(() => import("./AdminProductDetail"));

  const AdminProductAdd = dynamic(() => import("./AdminProductAdd"));

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onCloseMondalAdd = () => {
    setAddProduct(false);
  };

  return (
    <div>
      <Title subtitle="Productos" className="mb-12" />

      <div className="max-w-[70rem]">
        <div className="mb-8 flex items-center justify-between ">
          <Input
            iconLeft={<CiSearch size={18} />}
            placeholder="Buscar"
            className="!mb-0"
          />
          <div className="flex items-center space-x-4">
            {/* <AdminProductsFilters /> */}
            <Button title="Agregar" onClick={() => setAddProduct(true)} />
          </div>
        </div>

        <AdminProductTable
          setShowModal={setShowModal}
          setSelectedProduct={setSelectedProduct}
        />
      </div>

      {showModal && (
        <ProducDetailModal
          onCloseModal={onCloseModal}
          product={selectedProduct}
        />
      )}

      {addProduct && <AdminProductAdd onCloseModal={onCloseMondalAdd} />}
    </div>
  );
};

export default AdminProducts;

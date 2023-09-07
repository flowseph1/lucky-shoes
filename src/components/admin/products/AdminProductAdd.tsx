import {
  Button,
  Input,
  InputAdd,
  InputArea,
  InputSelect,
  InputSelector,
  InputSwitch,
  Modal,
} from "@/components/ui";
import { colores, genders } from "@/data";
import { useGetBrandsQuery, useGetCategoriesQuery } from "@/store/api";
import { Category } from "@prisma/client";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import AdminProductImage from "./AdminProductImage";

const AdminProductAdd = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      id: "",
      gridPictureURL: "",
      name: "",
      brand: "",
      gender: "",
      color: "",
      slug: "",
      category: [],
      tags: [],
    },
  });

  const nameField = watch("name");

  const { data: categoryData } = useGetCategoriesQuery("category");

  const { data: brandsData } = useGetBrandsQuery("brand");

  const categories = useMemo(
    () => categoryData?.map((category: Category) => category.name) ?? [],
    [categoryData]
  );

  const { id, gridPictureURL } = watch();

  useEffect(() => {
    setValue("slug", nameField.toLowerCase().replaceAll(" ", "-"));
  }, [nameField]);

  return (
    <Modal title={"Agregar Producto"} onCloseModal={() => onCloseModal()}>
      <div className="flex flex-col">
        <div className="mb-10 flex">
          <AdminProductImage
            gridPictureURL={gridPictureURL}
            setValue={setValue}
            id={id}
          />
          <div className="flex flex-1 flex-col">
            <div>
              <Input
                placeholder="Nombre"
                register={register("name")}
                fullWidth
                label="Nombre"
              />
            </div>
            <div className="flex space-x-7">
              <InputSelect
                control={control}
                label="Marca"
                name="brand"
                fullWidth
                data={brandsData ?? []}
                labelExtractor="name"
                valueExtractor="name"
              />
              <InputSelect
                fullWidth
                label="Color"
                control={control}
                name="color"
                data={colores}
                labelExtractor="name"
                valueExtractor="name"
              />
            </div>

            <div className="flex space-x-7">
              <InputSelect
                fullWidth
                label="Genero"
                control={control}
                name="gender"
                data={genders}
                labelExtractor="name"
                valueExtractor="name"
              />
              <Input
                label="Slug"
                register={register("slug")}
                disabled
                fullWidth
                placeholder="Ingresar Slug"
                className="!mb-0"
              />
            </div>
          </div>
        </div>

        <InputArea />

        <InputSelector
          label="Categorias"
          className="mb-10"
          control={control}
          name="category"
          fullWidth
          data={categories}
        />

        <InputAdd
          label="Etiquetas"
          className="mb-10"
          control={control}
          name="tags"
          placeholder="Ingresar etiquetas"
        />

        <div className="flex">
          <InputSwitch
            label="Destacado"
            subtitle="Destaca este producto para que sobresalga de los demas"
            className="mb-10 flex-1"
            control={control}
            name="destacado"
            placeholder="Ingresar etiquetas"
          />

          <InputSwitch
            label="Activo"
            subtitle="Controla la visibilidad del producto"
            className="mb-10 flex-1"
            control={control}
            name="destacado"
            placeholder="Ingresar etiquetas"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AdminProductAdd;

import { Input, InputSelect, InputSelector, Modal } from "@/components/ui";
import { brands, colores, genders } from "@/data";
import { LabelValue, TableRow } from "@/types/table";
import { useGetCategoriesQuery } from "@/store/api";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface AdminProductDetailProps {
  onCloseModal: () => void;
  product: TableRow;
}

const AdminProductDetail = ({
  onCloseModal,
  product,
}: AdminProductDetailProps) => {
  const getValue = (value: string | LabelValue) => {
    if (typeof value === "string") return value;
    return value.value;
  };

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      id: getValue(product.id),
      name: getValue(product.name),
      brand: getValue(product.brand_name),
      gender: getValue(product.gender),
      color: getValue(product.color),
      slug: getValue(product.slug),
      category: getValue(product.category),
      tags: getValue(product.keywords),
    },
  });

  // const { categoryData } = useData();

  const { data: categoryData } = useGetCategoriesQuery("category");

  return (
    <Modal title={getValue(product.name)} onCloseModal={onCloseModal}>
      <div className="flex flex-col">
        <div className="mb-6 flex">
          <div className="relative mr-8 flex flex-[0.5] items-center justify-center rounded-2xl border-[0.1rem] border-neutral-50 bg-neutral-700">
            <Image
              alt=""
              src={product?.grid_picture_url ?? ""}
              className="object-contain"
              fill
            />
            <div className="absolute left-5 top-5 rounded-full bg-neutral-100 px-5 py-1 text-xxs">
              {product?.id}
            </div>
          </div>
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
                data={brands.map((brand) => ({
                  value: brand.name,
                  label: brand.name,
                }))}
              />
              <InputSelect
                fullWidth
                label="Color"
                control={control}
                name="color"
                data={colores.map((color) => ({
                  value: color.name,
                  label: color.name,
                }))}
              />
            </div>

            <div className="flex space-x-7">
              <InputSelect
                fullWidth
                label="Genero"
                control={control}
                name="gender"
                data={genders.map((genders) => ({
                  value: genders.name,
                  label: genders.name,
                }))}
              />
              <Input
                label="Slug"
                register={register("slug")}
                fullWidth
                placeholder="Slug"
                className="!mb-0"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-7">
          <InputSelector
            label="Categorias"
            control={control}
            name="category"
            fullWidth
            data={categoryData?.map((category) => category.name) ?? []}
          />
          {/* <InputSelector label="Tags" control={control} name="tags" placeholder="Tags" fullWidth /> */}
        </div>

        <div>{/* <InputSelector /> */}</div>
      </div>
    </Modal>
  );
};

export default AdminProductDetail;

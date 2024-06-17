import { FragmentContainer } from "@/components/admin/fragment-contianer";
import { AdminHeading } from "@/components/admin/heading";

export default function ProductsPage() {
  return (
    <FragmentContainer>
      <AdminHeading
        title="Productos"
        subtitle="Gestiona los productos de tu tienda"
      />
    </FragmentContainer>
  );
}

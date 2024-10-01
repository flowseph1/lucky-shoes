import { FragmentContainer } from "@/components/admin/fragment-container";
import { AdminHeading } from "@/components/admin/heading";

export default function AdminPage() {
  return (
    <FragmentContainer>
      <AdminHeading title="Dashboard" subtitle="Vistazo general de tu tienda" />
    </FragmentContainer>
  );
}

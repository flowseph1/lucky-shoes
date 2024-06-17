import { AdminSideBar } from "@/components/admin/sidebar";
import { Container } from "@/components/container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="flex flex-row min-h-screen py-20">
        <AdminSideBar />
        <div className="flex-1">{children}</div>
      </div>
    </Container>
  );
}

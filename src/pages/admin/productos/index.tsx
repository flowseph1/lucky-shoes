import { AdminLayout, AdminProducts } from "@/components/admin";

export default function AdminPage() {
    return (
        <AdminLayout>
            <div className="flex-1 overflow-y-auto ">
                <AdminProducts />
            </div>
        </AdminLayout>
    );
}

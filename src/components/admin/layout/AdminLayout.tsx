import Head from "next/head";
import React from "react";
import { AdminHeader } from "../header";
import { AdminSideBar } from "../sidebar";
import { Container } from "@/components/container";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="relatve flex h-screen min-w-full flex-col">
      <Head>
        <title>Lucky Shoes | Admin</title>
      </Head>

      {/* <AdminHeader /> */}

      <main className="flex-1">
        <Container>
          <div className="flex h-full">
            <AdminSideBar />
            <div className="px-28 py-[8rem]">{children}</div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;

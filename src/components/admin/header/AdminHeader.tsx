import { Container } from "@/components/container";
import React from "react";

const AdminHeader = () => {
  return (
    <div
      className={
        "fixed left-0 top-0  h-[var(--navigation-height)] w-full border-b-[0.1rem] border-border-color bg-background"
      }
    >
      <Container>
        <div className="p- flex h-full items-center justify-between">
          <div className="flex w-[20rem] justify-center">
            <div className="logo-shadow animate-flicker font-neon text-xxl text-logo">
              Lucky-Admin
            </div>
          </div>
          <div>Bienvenido, Jose Acosta</div>
        </div>
      </Container>
    </div>
  );
};

export default AdminHeader;

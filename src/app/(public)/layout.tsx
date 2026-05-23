import React from "react";
import Sidebar from "./user/_components/sidebar";
import Header from "@/shared/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-8 py-4">
          <Header role="User" />
        </div>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

import Header from "@/shared/header";
import Sidebar from "@/shared/sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />
      <main className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-8 py-4">
          <Header role="Admin" />
        </div>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

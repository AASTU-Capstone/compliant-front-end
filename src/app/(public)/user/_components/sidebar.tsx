"use client";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconAlignBoxLeftTop,
    IconChevronLeft,
    IconChevronRight,
    IconFiles,
    IconLayoutDashboard,
    IconPlus,
    IconShieldLock,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiChatbot } from "react-icons/si";
import CreateComplaint from "./create-complaint";

const data = [
  { link: "/user/dashboard", label: "Dashboard", icon: IconLayoutDashboard },
  { link: "/user/complaints", label: "Complaints", icon: IconAlignBoxLeftTop },
  { link: "/user/resources", label: "Resources", icon: IconFiles },
  { link: "/user/chats", label: "ChatBot", icon: SiChatbot },
];

function Sidebar() {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (link: string) => {
    return pathname === link || pathname.startsWith(link + "/");
  };

  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <div
        className={`
          group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
          ${
            isActive(item.link)
              ? "bg-primary text-white shadow-md shadow-primary/25"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }
          ${collapsed ? "justify-center" : ""}
        `}
      >
        <item.icon
          className={`w-5 h-5 flex-shrink-0 ${isActive(item.link) ? "text-white" : ""}`}
        />
        {!collapsed && (
          <span className="text-sm font-medium truncate">{item.label}</span>
        )}
      </div>
    </Link>
  ));

  return (
    <>
      <Modal
        opened={opened}
        size="70%"
        onClose={close}
        title="Create Complaint"
        styles={{
          header: {
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
          },
          body: {
            backgroundColor: "var(--color-background)",
          },
          title: {
            fontWeight: 600,
            fontSize: "1.125rem",
          },
        }}
      >
        <CreateComplaint closeModal={close} />
      </Modal>

      <aside
        className={`
          relative z-30 flex flex-col h-screen bg-card border-r border-border
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-8 z-40 flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          {collapsed ? (
            <IconChevronRight size={14} />
          ) : (
            <IconChevronLeft size={14} />
          )}
        </button>

        {/* Logo Section */}
        <div className="flex items-center justify-center px-4 pt-6 pb-4">
          {collapsed ? (
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <IconShieldLock className="w-6 h-6 text-primary" />
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <IconShieldLock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Anon Whisper
                </h1>
                <p className="text-xs text-muted-foreground">Secure Platform</p>
              </div>
            </Link>
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-border" />

        {/* Create Button */}
        <div className="px-4 pt-6">
          <button
            onClick={open}
            className={`
              w-full flex items-center justify-center gap-2 py-3 px-4
              bg-primary text-white rounded-xl font-medium
              hover:bg-primary/90 transition-all duration-200
              shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30
              ${collapsed ? "px-0" : ""}
            `}
          >
            <IconPlus size={20} />
            {!collapsed && <span>New Complaint</span>}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">
                System Online
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;

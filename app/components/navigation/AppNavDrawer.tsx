"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { navConfig } from "./NavConfig";
import { crisisTheme } from "@/styles/Theme";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AppNavDrawer({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.15)" }}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 right-0 z-50 h-full w-[300px] px-4 py-6 flex flex-col"
        style={{
          background: crisisTheme.colors.surface,
          borderLeft: `1px solid ${crisisTheme.colors.border}`,
        }}
      >
        <div className="flex-1 space-y-1">
          {navConfig
            .filter((i) => i.section === "main")
            .map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={pathname.startsWith(item.href)}
                onClick={onClose}
              />
            ))}
        </div>

        <div className="pt-4 border-t space-y-1">
          {navConfig
            .filter((i) => i.section === "utility")
            .map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={false}
                onClick={onClose}
              />
            ))}
        </div>
      </motion.aside>
    </>
  );
}
"use client";

import { useState } from "react";

type Tab = "home" | "browse" | "saved" | "search";

interface BottomTabBarProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "browse", label: "Browse" },
  { id: "saved", label: "Saved" },
  { id: "search", label: "Search" },
];

function TabIcon({ tab, active }: { tab: Tab; active: boolean }) {
  const color = active ? "#0A84FF" : "rgba(255,255,255,0.45)";

  switch (tab) {
    case "home":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "browse":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "saved":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "search":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
  }
}

export default function BottomTabBar({ activeTab = "home", onTabChange }: BottomTabBarProps) {
  const [current, setCurrent] = useState<Tab>(activeTab);

  const handleTap = (tab: Tab) => {
    setCurrent(tab);
    onTabChange?.(tab);
  };

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        height: 84,
        paddingBottom: 20, // safe area
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "rgba(18,18,20,0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTap(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "6px 16px",
              minWidth: 64,
              transition: "opacity 0.15s ease",
            }}
          >
            <TabIcon tab={tab.id} active={isActive} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: isActive ? "#0A84FF" : "rgba(255,255,255,0.45)",
                letterSpacing: "0.01em",
                transition: "color 0.15s ease",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

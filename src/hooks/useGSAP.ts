"use client";
import { useEffect, useRef } from "react";
import { initGSAP } from "@/lib/animations";

export function useGSAP() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initGSAP();
      initialized.current = true;
    }
  }, []);
}

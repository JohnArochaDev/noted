"use client";

import { useEffect, useRef } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ClientSearchParamsHandler({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const hasCleared = useRef(false); // ← Prevents re-running after first clear

  useEffect(() => {
    // Only run once - prevent infinite loop
    if (hasCleared.current) return;

    // Convert to URLSearchParams safely
    const params = new URLSearchParams(
      Object.entries(searchParams)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );

    if (params.size > 0) {
      // Clear params by replacing with clean pathname
      router.replace(pathname, { scroll: false });
      hasCleared.current = true; // Mark as done - never run again
    }
  }, [searchParams, pathname, router]); // Dependencies are fine now

  return null; // Invisible component
}
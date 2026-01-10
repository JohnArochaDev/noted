"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchParamsHandler = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.size > 0) {
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, pathname, router]); // Add dependencies to avoid ESLint warning

  return null; // This component does nothing visible — just handles params cleanup
}
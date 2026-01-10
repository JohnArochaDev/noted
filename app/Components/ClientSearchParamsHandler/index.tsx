"use client";

import { useEffect, useRef } from "react";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ClientSearchParamsHandler({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;

    const params = new URLSearchParams(
      Object.entries(searchParams)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    );

    if (params.size > 0) {
      router.replace(pathname, { scroll: false });
      hasCleared.current = true;
    }
  }, [searchParams, pathname, router]);

  return null;
}

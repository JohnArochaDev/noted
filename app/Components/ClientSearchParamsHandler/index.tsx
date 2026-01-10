"use client";

// import { useEffect } from "react";

// import { usePathname, useRouter } from "next/navigation";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ClientSearchParamsHandler({ searchParams }: Props) {
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   // Convert searchParams to URLSearchParams for size check
  //   const params = new URLSearchParams(searchParams as Record<string, string>);
  //   if (params.size > 0) {
  //     router.replace(pathname, { scroll: false });
  //   }
  // }, [searchParams, pathname, router]);

  return null; // Invisible
}

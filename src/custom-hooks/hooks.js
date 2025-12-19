// import { useSearchParams, useRouter } from 'next/navigation';

// export function useQueryParams(defaults = {}) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Base defaults that can be overridden
//   const baseDefaults = {
//     page: '1',
//     limit: '10',
//     ...defaults
//   };

//   const params = {};
//   for (const key in baseDefaults) {
//     params[key] = searchParams.get(key) || baseDefaults[key];
//   }

//   const setParams = (newParams) => {
//     const updatedParams = new URLSearchParams(searchParams);
//     for (const key in newParams) {
//       updatedParams.set(key, newParams[key]);
//     }
//     router.replace(`?${updatedParams.toString()}`);
//   };

//   return { params, setParams };
// }

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export const useQueryParams = (defaultParams = {}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = { ...defaultParams };
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  // Set query params (preserve defaults if not overridden)
  const setParams = (newParams) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        currentParams.delete(key);
      } else {
        currentParams.set(key, String(value));
      }
    });

    router.replace(`?${currentParams.toString()}`);
  };

  // const setParams = (newParams) => {
  //   const updatedParams = new URLSearchParams(searchParams);
  //   for (const key in newParams) {
  //     updatedParams.set(key, newParams[key]);
  //   }
  //   router.replace(`?${updatedParams.toString()}`);
  // };

  const nonEmptyParams = useMemo(() => {
    return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return { params, setParams, nonEmptyParams };
};

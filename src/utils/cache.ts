import { QueryKey } from "@tanstack/react-query";
import { qc } from "../App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetFlattenedPaginatedCache = <T extends { [key: string]: any }>(queryKey: QueryKey) => {
  const flattenedCache: T[] = [];

  qc.getQueriesData<{ docs: T[]; pageCount: number }>({
    queryKey,
    exact: false,
  }).forEach(([, queryData]) => {
    if (queryData)
      queryData.docs.forEach((e) => {
        flattenedCache.push(e);
      });
  });

  return flattenedCache;
};

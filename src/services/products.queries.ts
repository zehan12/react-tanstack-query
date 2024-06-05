import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "./products.api";

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length == 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined;
            }
            return firstPageParam - 1;
        },
    });
};

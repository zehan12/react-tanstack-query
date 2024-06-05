import {
    useInfiniteQuery,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { getProduct, getProducts } from "./products.api";
import { Product } from "../types/product";
import { AxiosResponse } from "axios";

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

export const useProduct = (id: number | null) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["product", { id }],
        queryFn: () => getProduct(id!),
        enabled: !!id,
        placeholderData: () => {
            const cachedProducts = (
                queryClient.getQueryData(["products"]) as {
                    pages: Product[] | undefined;
                }
            )?.pages?.flat(2);

            if (cachedProducts) {
                return cachedProducts.find(
                    (item) => item.id === id
                );
            }
        },
    });
};

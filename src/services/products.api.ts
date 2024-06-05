import { axiosInstance } from "../axios";
import { Product } from "../types/product";

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
    return (
        await axiosInstance.get<Product[]>(
            `products?_page=${pageParam + 1}&_limit=3`
        )
    ).data;
};

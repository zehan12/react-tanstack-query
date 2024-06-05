import { FC, Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/products.queries";

const Products: FC = () => {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );
    const productsQuery = useProducts();
    const productQuery = useProduct(selectedProductId);

    return (
        <>
            <div>
                {productsQuery.data?.pages.map((group, index) => (
                    <Fragment key={index}>
                        {group.map((product) => (
                            <Fragment key={product.id}>
                                <button
                                    onClick={() =>
                                        setSelectedProductId(product.id)
                                    }
                                >
                                    {product.name}
                                </button>
                                <br />
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
                <br />
                <div>
                    <button
                        onClick={() => productsQuery.fetchNextPage()}
                        className="bg-blue-500 text-white px-4  py-3  font-semibold disabled:bg-gray-700  disabled:cursor-not-allowed"
                        disabled={
                            !productsQuery.hasNextPage ||
                            productsQuery.isFetchingNextPage
                        }
                    >
                        {productsQuery.isFetchingNextPage
                            ? "Loading more"
                            : productsQuery.hasNextPage
                            ? "Load more"
                            : "Nothing more to load"}
                    </button>
                </div>
                <div>
                    Selected Product
                    <div>{JSON.stringify(productQuery.data.data)}</div>
                </div>
            </div>
        </>
    );
};

export default Products;

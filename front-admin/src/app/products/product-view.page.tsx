// ========================== react ==========================
import { FC, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProducts } from "./store/products.actions";
import { productsSelector } from "./store/products.selectors";

const ProductViewPage: FC = () => {
    const isInitialLoading = useRef(true);
    const dispatch = useAppDispatch();
    const products = useAppSelector(productsSelector);

    // const navigate = useNavigate();

    useEffect(() => {
        if (!isInitialLoading.current) return;
        dispatch(fetchProducts());
        isInitialLoading.current = false;
    }, [dispatch, products.length]);

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>{product.name}</div>
            ))}
        </div>
    );
};

export default ProductViewPage;

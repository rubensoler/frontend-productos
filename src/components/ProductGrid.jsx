import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onEditClick }) => {
    return (
        <div className="product-grid">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} onEditClick={onEditClick} />
                ))
            ) : (
                <p>No hay productos disponibles</p>
            )}
        </div>
    );
};

export default ProductGrid;



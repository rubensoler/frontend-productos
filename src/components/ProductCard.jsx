import React from "react";

const ProductCard = ({ product, onEditClick }) => {
    const defaultImage = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;

    return (
        <div className="product-card">
            <img src={product.image_url || defaultImage} alt={product.name} onError={(e) => e.target.src = defaultImage} />
            <h2>{product.name}</h2>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <button onClick={() => {
                console.log("Clic en Editar Precio:", product); // Debugging
                onEditClick(product);
            }}>
                Editar
            </button>
        </div>
    );
};

export default ProductCard;

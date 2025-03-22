import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "./components/ProductGrid";
import Modal from "./components/Modal"; // Reusamos el modal
import "./App.css";


const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://127.0.0.1:8000/products";

function App() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [productData, setProductData] = useState({ name: "", price: "", image_url: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    // Obtener productos desde la API
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Abrir el modal para agregar o editar un producto
    const openModal = (product = null) => {
        setIsEditing(!!product); // Si hay un producto, es edición; si no, es nuevo
        setProductData(product || { name: "", price: "", image_url: "" });
        setShowModal(true);
    };

    // Cerrar modal y limpiar datos
    const closeModal = () => {
        setShowModal(false);
        setProductData({ name: "", price: "", image_url: "" });
    };

    // Manejo de cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    // Guardar cambios (Agregar o Editar)
    const saveProduct = async () => {
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/products/${productData.id}`, {
                    name: productData.name,
                    price: parseFloat(productData.price),
                    image_url: productData.image_url
                });
            } else {
                await axios.post(`${API_URL}/products`, {
                    name: productData.name,
                    price: parseFloat(productData.price),
                    image_url: productData.image_url
                });
            }
            fetchProducts();
            closeModal();
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    return (
        <div className="App">
            <h1>Lista de Productos</h1>
            <button className="add-button" onClick={() => openModal()}>Agregar Producto</button>

            <ProductGrid products={products} onEditClick={openModal} />

            {/* Modal para agregar y editar */}
            <Modal show={showModal} onClose={closeModal} title={isEditing ? "Editar Producto" : "Agregar Producto"}>
                <div className="modal-content">
                    <label>Nombre del Producto:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={productData.name} 
                        onChange={handleInputChange} 
                        placeholder="Nombre del producto"
                    />

                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="price"
                        value={productData.price} 
                        onChange={handleInputChange} 
                        placeholder="Precio"
                    />

                    <label>URL de la Imagen:</label>
                    <input 
                        type="text" 
                        name="image_url"
                        value={productData.image_url} 
                        onChange={handleInputChange} 
                        placeholder="URL de la Imagen"
                    />

                    <div className="modal-buttons">
                        <button onClick={saveProduct} className="save-button">Guardar</button>
                        <button onClick={closeModal} className="close-button">Cerrar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default App;


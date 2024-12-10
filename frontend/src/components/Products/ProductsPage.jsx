import React, { useEffect, useState } from "react";
import "../../assets/Styles/ProductsPage.css";
import ProductsSidebar from "./ProductsSidebar";
import ProductsList from "./ProductsList";
import api from "../../api";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('simuladores'); // Estado para la categoría seleccionada

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`/api/${category}`);
                setProducts(response.data.response);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, [category]); // Ejecutar el efecto cuando cambie la categoría

    return (
        <section className='products_page'>
            <ProductsSidebar setCategory={setCategory} /> {/* Pasar la función de actualización */}
            <ProductsList products={products} />
        </section>
    );
};

export default ProductsPage;
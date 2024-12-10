import React from "react";

import "../../assets/Styles/ProductsList.css";
import ProductCard from "./ProductCard";

const ProductsList = ({products}) => {
    return (
        <section className='products_list_section'>
            <header className='align_center products_list_header'>
                <h2>Productos</h2>
                <select name='sort' id='' className='products_sorting'>
                    <option value=''>Relevancia</option>
                    <option value='price desc'>Precio ALTO a BAJO</option>
                    <option value='price asc'>Precio BAJO a ALTO</option>
                    <option value='rate desc'>Rate ALTO a BAJO</option>
                    <option value='rate asc'>Rate BAJO a ALTO</option>
                </select>
            </header>

            <div className='products_list'>
                {products.map((product) => (
                    <ProductCard
                        key={product.id_simulador} // Esto es para React
                        id={product.id_simulador}  // Pasa el ID como prop
                        name={product.simulador}  // Pasa el nombre como prop
                        price={product.precio}    // Pasa el precio como prop
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductsList;

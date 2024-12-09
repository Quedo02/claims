import React from "react";

import "../../assets/Styles/ProductsSidebar.css";
import rocket from "../../assets/Images/rocket.png";
import LinkWithIcon from "../Navbar/LinkWithIcon";

const ProductsSidebar = () => {
    return (
        <aside className='products_sidebar'>
            <h2>Categoría</h2>

            <div className='category_links'>
                <LinkWithIcon
                    title='Simuladores'
                    link='products?category=electronics'
                    emoji={rocket}
                    sidebar={true}
                />
            </div>
        </aside>
    );
};

export default ProductsSidebar;
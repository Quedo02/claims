import React from "react";

import "../../assets/Styles/ProductsSidebar.css";
import rocket from "../../assets/Images/rocket.png";
import LinkWithIcon from "../Navbar/LinkWithIcon";

const ProductsSidebar = ({ setCategory }) => {
    return (
        <aside className='products_sidebar'>
            <h2>Categoría</h2>

            <div className='category_links'>
                <div onClick={() => setCategory('simuladores')}>
                    <LinkWithIcon
                        title='Simuladores'
                        link='#' // Puedes dejar el link vacío o usar '#'
                        emoji={rocket}
                        sidebar={true}
                    />
                </div>
                <div onClick={() => setCategory('cursos')}>
                    <LinkWithIcon
                        title='Cursos'
                        link='#' // Puedes dejar el link vacío o usar '#'
                        emoji={rocket}
                        sidebar={true}
                    />
                </div>
            </div>
        </aside>
    );
};

export default ProductsSidebar;
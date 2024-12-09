import React from "react";

import "../../assets/Styles/Navbar.css";
import rocket from "../../assets/Images/rocket.png";
import star from "../../assets/Images/glowing-star.png";
import idButton from "../../assets/Images/id-button.png";
import memo from "../../assets/Images/memo.png";
import order from "../../assets/Images/package.png";
import lock from "../../assets/Images/locked.png";
import LinkWithIcon from "./LinkWithIcon";

const Navbar = () => {
    return (
        <nav className='align_center navbar'>
            <div className='align_center'>
                <h1 className='navbar_heading'>Lobosimulador</h1>
                <form className='align_center navbar_form'>
                    <input
                        type='text'
                        className='navbar_search'
                        placeholder='Buscar productos'
                    />
                    <button type='submit' className='search_button'>
                        Buscar
                    </button>
                </form>
            </div>
            <div className='align_center navbar_links'>
                <LinkWithIcon title='Inicio' link='/' emoji={rocket} />
                <LinkWithIcon title='Productos' link='/products' emoji={star} />
                <LinkWithIcon title='Entrar' link='/login' emoji={idButton} />
                <LinkWithIcon title='Registrarse' link='/signup' emoji={memo} />
                <LinkWithIcon title='Mis pedidos' link='myorders' emoji={order} />
                <LinkWithIcon title='Salir' link='/logout' emoji={lock} />
                <a href='/cart' className='align_center'>
                    Carrito <p className='align_center cart_counts'>0</p>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;

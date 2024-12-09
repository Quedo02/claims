import React from "react";

import iphone from "../../assets/Images/iphone-14-pro.webp";
import mac from "../../assets/Images/mac-system-cut.jfif";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
    return (
        <div>
            <HeroSection
                title='Estuida en la BUAP'
                subtitle='Es un simulador del examen de admisión a la BUAP. Es el único diseñado por los mismos estudiantes de la BUAP'
                link='/'
                image={iphone}
            />

            <FeaturedProducts />

            <HeroSection
                title='Preparate para entrar a la BUAP'
                subtitle='Con nuestro simulador de examen de admisión a la BUAP'
                link='/'
                image={mac}
            />
        </div>
    );
};

export default HomePage;

import React from 'react'
import hero from '../../assets/hero.png'
import { Link } from "react-router";

function Hero() {
    return (
        <div>
            <section className=" section__container header__container ">
                <div className="header__content z-30 ">
                    <h4>UP TO 20% DISCOUNT ON</h4>
                    <h1>Girl's Fashion</h1>
                    <p>
                        Discover the latest trends and express your unique style with our
                        Women's Fashion website. Explore a curated collection of clothing,
                        accessories, and footwear that caters to every taste and occasion.
                    </p>
                    <button className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600"><Link to="/shop">EXPLORE NOW</Link></button>
                </div>
                <div className="header__image">
                    <img src={hero} alt="header" />
                </div>
            </section>
        </div>
    )
}

export default Hero

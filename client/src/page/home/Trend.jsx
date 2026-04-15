import React from 'react'

import image1 from '../../assets/card-1.png'
import image2 from '../../assets/card-2.png'
import image3 from '../../assets/card-3.png'
import { Link } from 'react-router'

function Trend() {

    const trendProduct = [
        { id: 1, name: "Womens Shirt", path: '#', description: "2023 Trend", image: image1 },
        { id: 1, name: "Womens Dresses", path: '#', description: "2023 Trend", image: image2 },
        { id: 1, name: "Womens Casuals", path: '#', description: "2023 Trend", image: image3 },
    ]

    return (
        <section className="section__container hero__container">
            {
                trendProduct.map((product, index) => (
                    <div key={index} className="hero__card">
                        <img src={product.image} alt={product.name} />
                        <div className="hero__content">
                            <p>{product.description}</p>
                            <h4>{product.name}</h4>
                            <Link to={product.path}>Discover More +</Link>
                        </div>
                    </div>
                ))
            }
        </section>

    )
}

export default Trend

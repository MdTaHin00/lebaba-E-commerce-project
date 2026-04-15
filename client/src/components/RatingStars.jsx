import React from 'react'

function RatingStars({rating}) {

    const stars = [];

    for(let i = 1 ; i <= 5 ; i ++){
        stars.push(<span key={i} className={`ri-star${i <= rating ? '-fill' : '-line'}`}></span>)
    }

    return (
        <div>
            <div className="product__rating">
                {stars}
            </div>
        </div>
    )
}

export default RatingStars

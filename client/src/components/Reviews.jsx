import React from 'react'
import StarRating from './StarRating'

const Reviews = ({reviews}) => {
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review) => {
                return (
                    <div key={review.id_recenzja}
                        className="card text-white bg-secondary mb-3 mr-4" 
                        style={{maxWidth: "30%"}}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.imie}</span>
                            <span><StarRating rating={review.ocena}/></span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.recenzja}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Reviews

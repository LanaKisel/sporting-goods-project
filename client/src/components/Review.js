import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const Review = ({review}) => {
    console.log(review)
    
    return (
        <div>
            <h2>Reviews:</h2>
            <h3>{review.user.name}</h3>
            <p>{review.text}</p>
            {(!review.photos || review.photos.length()===0 )? <br/> : <img src={review.photos}></img> }

        </div>
    )
}

export default Review


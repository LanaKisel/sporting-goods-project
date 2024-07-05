import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const Review = ({review}) => {
    console.log(review)
    
    return (
        <div>
            <h3>Reviews:</h3>            
            <p>"{review.text}"</p>
            {(!review.photos || review.photos.length()===0 )? "" : <img src={review.photos}></img> }
            <h6>{review.user.name}</h6>

        </div>
    )
}

export default Review


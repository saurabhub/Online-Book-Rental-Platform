import React from 'react'
import StarRatings from 'react-star-ratings'

const StarFilter = ({starClick, numberOfStars}) => {
  return (
    <StarRatings
        changeRating={()=>starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing='2px'
        starHoverColor='red'
        starEmptyColor='red'
        starSelectingHoverColor="black"
        className="p-0"
        isSelectable="false"
     />
  )
}

export default StarFilter
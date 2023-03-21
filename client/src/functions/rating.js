import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("Length", length);
    ratingsArray.map((rating) => total.push(rating.star));
    let totalReduced = total.reduce((prev, next) => prev + next, 0);
    // console.log("Total Sum of Stars: ", totalReduced);
    let highest = length * 5;
    // console.log("Highest: ", highest);

    let result = (totalReduced * 5) / highest;
    // console.log("Average: ", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
        <StarRatings
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />
          ({product.ratings.length})
        </span>
      </div>
    );
  }
};

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, setRating, count, size }) {
  // count:  number of stars you want, pass as props
  // size: size of star that you want

  const [hover, setHover] = useState(null);
  return (
    <div className="star-container">
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <input
              type="radio"
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              d="none"
            />
            <FaStar
              cursor="pointer"
              size={size || 20}
              transition="color 200ms"
            />
          </label>
        );
      })}
    </div>
  );
}

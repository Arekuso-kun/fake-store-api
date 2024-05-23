"use client";

import { Rating } from "flowbite-react";

const RatingComponent = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <Rating>
      {stars.map((filled, index) => (
        <Rating.Star key={index} filled={filled} />
      ))}
    </Rating>
  );
};

export default RatingComponent;

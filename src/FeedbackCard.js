import React from 'react';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';

function FeedbackCard({ locationName, comment, rating }) {
  // Set a fixed size for the stars
  const starSize = '20px';
  const starMarginRight = '5px'; // Adjust the margin as needed

  return (
    <Card>
      <Card.Header style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
        {locationName}
        {/* Star Ratings */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            numberOfStars={5} // Assuming a 5-star rating system
            name={`rating-${locationName}`}
            starDimension={starSize} // Set a fixed star size
          />
        </div>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{comment}</p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default FeedbackCard;

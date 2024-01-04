import React from 'react';
import Card from 'react-bootstrap/Card';
import StarRatings from 'react-star-ratings';

function FeedbackCard({ locationName, comment, rating, feedbackFrom }) {
  const starSize = '20px';

  return (
    <Card>
      <Card.Header style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
        {locationName}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            numberOfStars={5}
            name={`rating-${locationName}`}
            starDimension={starSize}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{comment}</p>
          <footer className="blockquote-footer">{`Feedback from: ${feedbackFrom}`}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default FeedbackCard;

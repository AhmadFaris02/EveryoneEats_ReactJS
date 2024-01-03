import React from 'react';

const RatingSelect = ({ select, selected }) => {
    const handleChange = (e) => {
        select(+e.currentTarget.value);
    };

    const indicators = [
        'Very Unsatisfied',
        'Unsatisfied',
        'Neutral',
        'Satisfied',
        'Very Satisfied',
    ];

    return (
        <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
                <div key={`rating-${i + 1}`} style={{ marginBottom: '5px' }}>
                    <span style={{ marginRight: '10px' }}>{i + 1}</span>
                    <input
                        type="radio"
                        id={`num${i + 1}`}
                        name="rating"
                        value={i + 1}
                        onChange={handleChange}
                        checked={selected === i + 1}
                    />
                    <label htmlFor={`num${i + 1}`}></label>
                    <span style={{ marginLeft: '10px' }}>{indicators[i]}</span>
                </div>
            ))}
        </div>
    );
};

export default RatingSelect;

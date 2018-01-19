import React from 'react';
import _ from 'lodash';

const Stars = (props) => {

    return (
        <div className="stars">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
}

export default Stars
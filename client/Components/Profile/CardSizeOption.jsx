import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import conjurationCardBack from '../../assets/img/cardback-conjuration.png';

import './CardSizeOption.scss';

function CardSizeOption(props) {
    let { name, label, selected, onSelect } = props;

    const handleClick = () => {
        if (onSelect) {
            onSelect(name);
        }
    };

    return (
        <div key={name} className='card-settings' onClick={handleClick}>
            <div className={classNames('game-card', 'vertical', name, { selected: selected })}>
                <img
                    className={classNames('game-card', 'vertical', name)}
                    src={conjurationCardBack}
                />
            </div>
            <span className='bg-label'>{label}</span>
        </div>
    );
}

CardSizeOption.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    selected: PropTypes.bool
};

export default CardSizeOption;

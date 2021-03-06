import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CardImage from '../GameBoard/CardImage';
import Phoenixborn from './Phoenixborn';
import Die from '../GameBoard/Die';
import DeckStatus from './DeckStatus';

import './DeckSummary.scss';

const DeckSummary = ({ deck }) => {
    let [zoomCard, setZoomCard] = useState(null);
    let [mousePos, setMousePosition] = useState({ x: 0, y: 0 });

    if (!deck) return null;

    const getCardsToRender = () => {
        let cardsToRender = [];
        let groupedCards = {};

        let combinedCards = deck.cards.concat(deck.conjurations);

        combinedCards.forEach((card) => {
            let type = card.card.type;

            if (type === 'character' || type === 'event') {
                type = card.card.side + ` ${type}`;
            }
            if (!groupedCards[type]) {
                groupedCards[type] = [card];
            } else {
                groupedCards[type].push(card);
            }
        });

        for (let key in groupedCards) {
            let cardList = groupedCards[key];
            let cards = [];
            let count = 0;

            cardList.forEach((card) => {
                cards.push(
                    <div key={card.card.id}>
                        <span>{card.count + 'x '}</span>
                        <span
                            className='card-link'
                            onMouseOver={() => setZoomCard(card)}
                            onMouseMove={(event) => {
                                let y = event.clientY;
                                let yPlusHeight = y + 420;

                                if (yPlusHeight >= window.innerHeight) {
                                    y -= yPlusHeight - window.innerHeight;
                                }

                                setMousePosition({ x: event.clientX, y: y });
                            }}
                            onMouseOut={() => setZoomCard(null)}
                        >
                            {card.card.name}
                        </span>
                    </div>
                );
                count += parseInt(card.count);
            });

            cardsToRender.push(
                <div className='cards-no-break'>
                    <div className='card-group-title'>{key + ' (' + count.toString() + ')'}</div>
                    <div key={key} className='deck-card-group'>
                        {cards}
                    </div>
                </div>
            );
        }

        return cardsToRender;
    };

    const getDiceToRender = () => {
        const diceToRender = [];
        if (deck.dicepool) {
            deck.dicepool.forEach((diceCount) => {
                for (let i = 0; i < diceCount.count; i++) {
                    diceToRender.push(<Die die={{ magic: diceCount.magic, level: 'power' }} />);
                }
            });
        }
        return (
            <div>
                <div className='card-group-title'>Dice</div>
                <div className='deck-card-group flex'> {diceToRender}</div>
            </div>
        );
    };

    var cardsToRender = getCardsToRender();
    var diceToRender = getDiceToRender();
    var phoenixbornStub = deck.phoenixborn.length > 0 ? deck.phoenixborn[0].id : '';

    return (
        <Col xs='12' className='deck-summary'>
            <Row>
                <Col xs='2' sm='3'>
                    <Phoenixborn pbStub={phoenixbornStub} />
                </Col>
                <Col xs='8' sm='5'>
                    <Row>
                        <Col xs='7'>
                            <span>Wins</span>
                        </Col>
                        <Col xs='5'>{deck.wins}</Col>
                    </Row>
                    <Row>
                        <Col xs='7'>
                            <span>Losses</span>
                        </Col>
                        <Col xs='5'>{deck.losses}</Col>
                    </Row>
                    <Row>
                        <Col xs='7'>
                            <span>Total</span>
                        </Col>
                        <Col xs='5'>{parseInt(deck.wins) + parseInt(deck.losses)}</Col>
                    </Row>
                    <Row>
                        <Col xs='7'>
                            <span>Win Rate</span>
                        </Col>
                        <Col xs='5'>{deck.winRate?.toFixed(2)}%</Col>
                    </Row>
                    <Row>
                        <Col xs='12'>
                            <DeckStatus status={deck.status} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='deck-cards'>
                {zoomCard && (
                    <div
                        className='decklist-card-zoom'
                        style={{ left: mousePos.x + 5 + 'px', top: mousePos.y + 'px' }}
                    >
                        <CardImage
                            card={Object.assign({}, zoomCard, zoomCard.card, zoomCard.cardData)}
                        />
                    </div>
                )}
                <div className='cards'>{cardsToRender}</div>
            </Row>
            <Row>
                <div className='large'>{diceToRender}</div>
            </Row>
        </Col>
    );
};

DeckSummary.displayName = 'DeckSummary';

export default DeckSummary;

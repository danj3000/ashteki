const Card = require('../../Card.js');

class OutOfTheMist extends Card {
    setupCardAbilities(ability) {
        this.play({
            effect: 'deal {1} damage to a target unit',
            effectArgs: (context) => context.player.unitsInPlay.length,
            target: {
                activePromptTitle: 'Choose a target',
                cardType: ['Ally', 'Conjuration'],
                controller: 'opponent',
                gameAction: ability.actions.dealDamage((context) => ({
                    amount: context.player.unitsInPlay.length
                }))
            },
            then: {
                may: 'draw a card?',
                gameAction: ability.actions.draw()
            }
        });
    }
}

OutOfTheMist.id = 'out-of-the-mist';

module.exports = OutOfTheMist;

const Card = require('../../Card.js');

class Anchornaut extends Card {
    setupCardAbilities(ability) {
        this.entersPlay({
            effect: 'deal 1 damage to {1}',
            effectArgs: (context) => context.target,
            target: {
                optional: true,
                cardCondition: (card, context) => card !== context.source,
                activePromptTitle: 'Throw 1',
                cardType: ['Ally', 'Conjuration'],
                gameAction: ability.actions.dealDamage({
                    amount: 1
                })
            }
        });
    }
}

Anchornaut.id = 'anchornaut';

module.exports = Anchornaut;

const { Level } = require('../../../constants.js');
const Card = require('../../Card.js');
const DiceCount = require('../../DiceCount.js');

class MindMaze extends Card {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [
                ability.effects.cardCannot('attack'),
                ability.effects.cardCannot('block'),
                ability.effects.cardCannot('guard')
            ]
        });

        this.action({
            inexhaustible: true,
            title: 'Escape',
            cost: [
                ability.costs.mainAction(),
                ability.costs.sideAction(),
                ability.costs.dice([new DiceCount(1, Level.Basic)]),
                ability.costs.chosenDiscard()
            ],
            gameAction: ability.actions.discard({ target: this })
        });

        this.forcedInterrupt({
            inexhaustible: true,
            title: 'Lost',
            when: {
                onRoundEnded: () => true
            },
            gameAction: ability.actions.discard((context) => ({
                target: context.source.parent
            }))
        });
    }
}

MindMaze.id = 'mind-maze';

module.exports = MindMaze;

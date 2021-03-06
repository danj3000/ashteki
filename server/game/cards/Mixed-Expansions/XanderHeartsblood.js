const { Level, Magic } = require('../../../constants.js');
const Card = require('../../Card.js');
const DiceCount = require('../../DiceCount.js');

class XanderHeartsblood extends Card {
    setupCardAbilities(ability) {
        return this.action({
            title: 'Reincarnate',
            cost: [
                ability.costs.sideAction(),
                ability.costs.exhaust(),
                ability.costs.dice([new DiceCount(1, Level.Class, Magic.Divine)])
            ],
            target: {
                controller: 'self',
                cardType: 'Ally',
                location: 'discard',
                gameAction: ability.actions.moveCard({ destination: 'hand' })
            },
            message: '{0} uses {1} to move {2} from discard to hand',
            messageArgs: (context) => [context.player, context.source, context.target]
        });
    }
}

XanderHeartsblood.id = 'xander-heartsblood';

module.exports = XanderHeartsblood;

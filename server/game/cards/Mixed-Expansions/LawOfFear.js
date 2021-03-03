const { BattlefieldTypes } = require('../../../constants.js');
const Card = require('../../Card.js');

class LawOfFear extends Card {
    setupCardAbilities(ability) {
        this.entersPlay({
            location: 'spellboard',
            target: {
                optional: true,
                activePromptTitle: 'Choose a unit with attack 0 to exhaust',
                cardType: BattlefieldTypes,
                cardCondition: (card) => card.attack === 0,
                gameAction: ability.actions.exhaust()
            }
        });

        this.persistentEffect({
            targetController: 'Any',
            match: (card) => card.isAttacker || card.isDefender,
            effect: ability.effects.modifyAttack(-1)
        });

        this.bound();
        this.fleeting();
    }
}

LawOfFear.id = 'law-of-fear';

module.exports = LawOfFear;
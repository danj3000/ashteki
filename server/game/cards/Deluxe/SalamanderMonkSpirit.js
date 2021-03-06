const Card = require('../../Card.js');

class SalamanderMonkSpirit extends Card {
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: [ability.effects.cardCannot('block'), ability.effects.cannotBeAttackTarget()]
        });
    }
}

SalamanderMonkSpirit.id = 'salamander-monk-spirit';

module.exports = SalamanderMonkSpirit;

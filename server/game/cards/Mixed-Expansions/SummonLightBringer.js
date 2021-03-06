const { Level, Magic } = require('../../../constants.js');
const Card = require('../../Card.js');
const DiceCount = require('../../DiceCount.js');

class SummonLightBringer extends Card {
    setupCardAbilities(ability) {
        this.action({
            title: 'Summon Light Bringer',
            cost: [
                ability.costs.mainAction(),
                ability.costs.exhaust(),
                ability.costs.dice([new DiceCount(1, Level.Class, Magic.Divine)])
            ],
            location: 'spellboard',
            gameAction: ability.actions.summon({
                conjuration: 'light-bringer'
            })
        });
    }
}

SummonLightBringer.id = 'summon-light-bringer';

module.exports = SummonLightBringer;

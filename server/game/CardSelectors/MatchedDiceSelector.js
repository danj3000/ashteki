const Dice = require('../dice');
const BaseDieSelector = require('./BaseDieSelector');

class MatchedDiceSelector extends BaseDieSelector {
    constructor(format, properties) {
        super(properties);

        // make sure it's an array for diceReq.
        this.format = Array.isArray(format) ? format : [format];
    }

    getNumDice() {
        // if (typeof this.numDice === 'function') {
        //     return this.numDice(context);
        // }

        return Dice.getRequiredCount(this.format);
    }

    defaultActivePromptTitle() {
        let numDice = this.getNumDice();
        if (this.dieType.length === 1) {
            return numDice === 1
                ? 'Choose a ' + this.dieType[0]
                : { text: `Choose {{amount}} ${this.dieType[0]}s`, values: { amount: numDice } };
        }

        return numDice === 1
            ? 'Choose a die'
            : { text: 'Choose {{amount}} Dice', values: { amount: numDice } };
    }

    // eslint-disable-next-line no-unused-vars
    hasEnoughSelected(selectedDice, context) {
        return selectedDice.length === this.getNumDice();
    }

    // eslint-disable-next-line no-unused-vars
    hasReachedLimit(selectedDice, context) {
        return selectedDice.length >= this.getNumDice();
    }

    // eslint-disable-next-line no-unused-vars
    automaticFireOnSelect(context) {
        return this.getNumDice() === 1 && !context.source.preventAutoDice;
    }
}

module.exports = MatchedDiceSelector;

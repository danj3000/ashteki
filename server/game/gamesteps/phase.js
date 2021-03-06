const BaseStepWithPipeline = require('./basestepwithpipeline.js');
const SimpleStep = require('./simplestep.js');

class Phase extends BaseStepWithPipeline {
    constructor(game, name) {
        super(game);
        this.name = name;
    }

    initialise(steps) {
        this.pipeline.initialise([new SimpleStep(this.game, () => this.startPhase())]);
        this.steps = steps.concat(new SimpleStep(this.game, () => this.endPhase()));
    }

    startPhase() {
        if (
            this.game.activePlayer &&
            this.game.activePlayer.getEffects('skipStep').includes(this.name)
        ) {
            return;
        }

        this.game.raiseEvent('onPhaseStarted', { phase: this.name }, () => {
            this.game.currentPhase = this.name;
            //todo: change this to a property on the phase
            if (this.name !== 'setup') {
                this.game.addAlert(
                    'phasestart',
                    '{0} phase',
                    this.name.charAt(0).toUpperCase() + this.name.slice(1)
                );
            }
        });

        for (let step of this.steps) {
            this.game.queueStep(step);
        }
    }

    endPhase() {
        this.game.raiseEvent('onPhaseEnded', { phase: this.name });
        this.game.currentPhase = '';
    }
}

module.exports = Phase;

describe('resonance', function () {
    describe('Empty spellboard', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: ['mist-spirit', 'iron-worker'],
                    dicepool: ['divine', 'sympathy', 'sympathy', 'divine', 'sympathy', 'sympathy'],
                    hand: ['resonance', 'summon-mist-spirit']
                },
                player2: {
                    phoenixborn: 'rin-northfell',
                    inPlay: ['hammer-knight'],
                    spellboard: [],
                    dicepool: ['natural', 'natural']
                }
            });
        });

        it('cannot be played', function () {
            this.player1.clickCard(this.resonance);
            expect(this.player1).toHaveDefaultPrompt();
        });
    });

    describe('resonance', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: ['mist-spirit', 'iron-worker'],
                    spellboard: ['summon-iron-rhino', 'empower', 'summon-gilder'],
                    dicepool: ['divine', 'sympathy', 'sympathy', 'divine', 'sympathy', 'sympathy'],
                    hand: ['resonance', 'summon-mist-spirit']
                },
                player2: {
                    phoenixborn: 'rin-northfell',
                    inPlay: ['hammer-knight'],
                    spellboard: [],
                    dicepool: ['natural', 'natural']
                }
            });
        });

        it('focuses chosen spells in slot', function () {
            this.player1.clickCard(this.resonance);
            this.player1.clickPrompt('play this ready spell');
            this.player1.clickDie(0);
            this.player1.clickPrompt('Done');
            this.player1.clickCard(this.summonIronRhino);

            expect(this.resonance.location).toBe('spellboard');
            expect(this.player1.player.isSpellboardFull('summon-mist-spirit')).toBe(false);
            expect(this.empower.focus).toBe(0);
            expect(this.summonIronRhino.focus).toBe(1);
            expect(this.resonance.focus).toBe(0);
            // unexhaust 2 dice
            expect(this.player1).toBeAbleToSelectDie(this.player1.dicepool[0]);
            expect(this.player1).not.toBeAbleToSelectDie(this.player1.dicepool[3]);
        });
    });
});

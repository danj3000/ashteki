describe('Safeguard', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'coal-roarkwin',
                inPlay: ['mist-spirit'],
                dicepool: ['ceremonial', 'natural', 'charm', 'charm'],
                hand: ['safeguard']
            },
            player2: {
                phoenixborn: 'rin-northfell',
                inPlay: ['hammer-knight'],
                spellboard: ['summon-butterfly-monk'],
                dicepool: ['charm', 'natural', 'natural', 'illusion', 'charm', 'charm'],
                hand: ['mist-typhoon'],
                archives: ['butterfly-monk']
            }
        });
    });

    it('prevents damage from action spell', function () {
        expect(this.mistSpirit.damage).toBe(0);

        this.player1.clickCard(this.safeguard);
        this.player1.clickPrompt('Play this action');
        this.player1.clickDie(0);
        this.player1.clickCard(this.mistSpirit);
        this.player1.endTurn();
        this.player2.clickCard(this.mistTyphoon);
        this.player2.clickPrompt('Play this action');
        this.player2.clickCard(this.mistSpirit);

        expect(this.mistSpirit.damage).toBe(0);
        expect(this.mistSpirit.location).toBe('play area');
    });

    it('it lasts until my next turn', function () {
        expect(this.mistSpirit.damage).toBe(0);

        this.player1.clickCard(this.safeguard);
        this.player1.clickPrompt('Play this action');
        this.player1.clickDie(0);
        this.player1.clickCard(this.mistSpirit);
        this.player1.actions.main = false; // fudge
        this.player1.endTurn();
        // lasts opponent turn
        this.player2.clickDie(1);
        this.player2.clickPrompt('Natural Dice Power');
        this.player2.clickCard(this.mistSpirit);
        this.player2.endTurn();
        expect(this.mistSpirit.location).toBe('play area');

        this.player1.clickDie(1);
        this.player1.clickPrompt('Natural Dice Power');
        this.player1.clickCard(this.mistSpirit);

        expect(this.mistSpirit.location).toBe('archives');
    });
});

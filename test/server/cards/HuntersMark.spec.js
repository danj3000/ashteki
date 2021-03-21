describe('Hunters Mark', function () {
    beforeEach(function () {
        this.setupTest({
            player1: {
                phoenixborn: 'harold-westraven',
                inPlay: ['mist-spirit', 'blue-jaguar', 'anchornaut'],
                dicepool: ['divine', 'illusion', 'charm', 'charm'],
                spellboard: [],
                archives: ['hunters-mark']
            },
            player2: {
                phoenixborn: 'coal-roarkwin',
                inPlay: ['iron-worker'],
                dicepool: ['natural', 'natural', 'charm', 'charm']
            }
        });
    });

    it('modifies card attack', function () {
        this.player1.clickCard(this.haroldWestraven);

        this.player1.clickPrompt('Mark Prey');
        this.player1.clickCard(this.ironWorker);
        this.player1.clickCard(this.huntersMark);
        this.player1.clickPrompt('Attack');
        this.player1.clickCard(this.ironWorker);
        this.player1.clickCard(this.mistSpirit);
        this.player2.clickDone(); // guard
        this.player2.clickPrompt('No'); // counter

        expect(this.ironWorker.location).toBe('discard');
    });
});

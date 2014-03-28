ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'game.entities.tank',
    'game.entities.crate',
    'game.levels.level',
    'game.player',
    'plugins.box2d.game',
    'game.data',
    'plugins.box2d.collision'
)
.defines(function(){

KraTank = ig.Box2DGame.extend({

	gravity: 0,
	playerCount: 3,

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	readySound: new ig.Sound( 'media/sounds/ready.*' ),
	fightSound: new ig.Sound( 'media/sounds/fight.*' ),

	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelLevel);
		this.players = [];
		for (var i = 0; i < this.playerCount; i++) {
			this.players.push((new Player({playerIndex:i,voice:"moron"})).spawnTank(true));
		}
		this.readySound.play();
		_.delayMethod(this.fightSound,"play",DATA.gracetime*1000);
	},

	messageTimer: null,

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	},

	// called from _playercontrolled#receiveDamage
	updatedscore: function(){
		console.log("------SCORE UPDATE-----");
		_.each(_.range(this.playerCount),function(i){
			console.log("Player",i,"has",this.players[i].kills,"kills and",this.players[i].deaths,"deaths");
		},this);
	}
});

// Disable all sounds for mobile devices
if( ig.ua.mobile ) {
    ig.Sound.enabled = false;
}

// Start the Game with 60fps, a resolution of 512x384, scaled
// up by a factor of 2
ig.main( '#canvas', KraTank, 60, 512, 384, 1 );

});

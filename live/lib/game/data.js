ig.module(
    'game.data'
)
.requires(
	'impact.game'
)
.defines(function(){

DATA = {
	gracetime: 3, // seconds before tanks are damagable and can fire
	respawntime: 3, // seconds before tanks are respawned after being destroyed
	playerkeys: {
		0: {
			up: ig.KEY.UP_ARROW,
			down: ig.KEY.DOWN_ARROW,
			left: ig.KEY.LEFT_ARROW,
			right: ig.KEY.RIGHT_ARROW,
			shoot: ig.KEY.SPACE,
			debug: ig.KEY.P
		},
		1: {
			up: ig.KEY.W,
			down: ig.KEY.S,
			left: ig.KEY.A,
			right: ig.KEY.D
		},
		2: {
			up: ig.KEY.I,
			down: ig.KEY.K,
			left: ig.KEY.J,
			right: ig.KEY.L
		}
	},
	tanks: {
		cooltank: {
			weight: 5000,
			health: 100,
			size: {x:45, y:32},
			forwardspeed: 50,
			backwardspeed: 20,
			slowdown: 3.5,
			turnspeed: Math.PI/2,
			driveSound: new ig.Sound('media/sounds/brum.*'),
			grip: 1 // number between 0 and 1, 1 means will never move sideways
		}
	},
	cannons: {
		megacannon: {
			cannonballspeed: 300,
			cannonballweight: 5,
			cannonballslowdown: 0.01,
			cannonrecoil: 10,
			reload: 2,
			fireSound: new ig.Sound( 'media/sounds/cannon.*' )
		}
	},
	collision: {
		tank: {
			categoryBits: 0x0008,
			groupIndex: 0,
			maskBits: 0xFFFF
		},
		projectile: {
			categoryBits: 0x0004,
			groupIndex: 0,
			maskBits: 0xFFFF & ~0x0001
		},
		crate: {
			categoryBits: 0x0002,
			groupIndex: 0,
			maskBits: 0xFFFF
		}
	}
};

});
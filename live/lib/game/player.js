ig.module(
    'game.player'
)
.requires(
    'impact.game',
    'impact.entity',
    'game.entities.tank',
    'game.data'
)
.defines(function(){

// preload all voices;
var voices = _.mapObj(["moron"],function(voice){
    return _.mapObj(["spawn","hurt","die","haha"],function(line){
        return new ig.Sound('media/sounds/voices/'+voice+'/'+line+'.*');
    },true);
},true);

Player = function(o){
    this.playerIndex = o.playerIndex;
    this.voice = voices[o.voice];
    this.deaths = 0;
    this.kills = 0;
};

Player.prototype.spawnTank = function(firsttime){
    var tank = DATA.tanks.cooltank;
    var settings = {
        tank: tank,
        cannon: DATA.cannons.megacannon,
        playerIndex: this.playerIndex,
        angle: Math.random() * 2* Math.PI
    };
    var x = tank.size.x + Math.floor(Math.random() * (ig.system.width - tank.size.x * 2));
    var y = tank.size.y + Math.floor(Math.random() * (ig.system.height - tank.size.y * 2));
    this.tank = ig.game.spawnEntity( EntityTank, x, y, settings).bindKeys(DATA.playerkeys[this.playerIndex]);
    this.tank.player = this;
    if (!firsttime){
        this.voice.spawn.play();
    }
    return this;
};

Player.prototype.tookDamage = function(otherplayer,damage,remaining){
    this.voice.hurt.play();
};

Player.prototype.lostTank = function(otherplayer,damage,remaining){
	delete this.tank;
    this.voice.die.play();
    this.deaths++;
    _.delayMethod(this,"spawnTank",DATA.respawntime*1000);
};

Player.prototype.dealtDamage = function(otherplayer,damage,remaining){
};

Player.prototype.scoredKill = function(otherplayer,damage,remaining){
	this.kills++;
	_.delayMethod(this.voice.haha,"play",350);
};

});
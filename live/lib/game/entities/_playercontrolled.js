ig.module(
    'game.entities._playercontrolled'
)
.requires(
    'game.entities._baseclass',
    'game.data'
)
.defines(function(){

EntityPlayerControlled = EntityBaseClass.extend({

    receiveDamage: function(damage,byplayer){
        var remaining = this.health-damage;
        if (remaining > 0){
            this.player.tookDamage(byplayer,damage,remaining);
            byplayer.dealtDamage(this.player,damage,remaining);
        } else {
            this.player.lostTank(byplayer,damage,remaining);
            byplayer.scoredKill(this.player,damage,remaining);
            ig.game.updatedscore();
        }
        this.parent(damage);
    },

    bindKeys: function(keys) {
        for (var state in keys) {
            ig.input.bind(keys[state], state + this.id);
        }
        return this;
    },

    // Id aware state checker
    state: function(state) {
        return ig.input.state(state + this.id);
    },

    // Id aware pressed checker
    pressed: function(state) {
        return ig.input.pressed(state + this.id);
    },

    // Id aware released checker
    released: function(state) {
        return ig.input.released(state + this.id);
    },

    init: function(x,y,settings) {
        this.gracetimer = new ig.Timer(DATA.gracetime);
        this.parent(x,y,settings);
    },

    hasGrace: function(){
        //console.log("GRACEQUERY",this.gracetimer < 0)
        return this.gracetimer.delta() < 0;
    },

    draw: function() {
        var ctx = ig.system.context;
        // From: http://impactjs.com/forums/help/how-to-place-mini-health-bars-on-enemies-level-editor-confusion
        // border/background
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.rect(
            (this.pos.x - ig.game.screen.x) * ig.system.scale,
            (this.pos.y - ig.game.screen.y + this.size.y + 8) * ig.system.scale,
            this.size.x * ig.system.scale,
            4 * ig.system.scale
        );
        ctx.closePath();
        ctx.fill();

        // health bar
        ctx.fillStyle = this.hasGrace() ? "rgb(255,255,255)" : "rgb(255,0,0)";
        ctx.beginPath();
        ctx.rect(
            (this.pos.x - ig.game.screen.x + 1) * ig.system.scale,
            (this.pos.y - ig.game.screen.y + this.size.y + 7) * ig.system.scale,
            ((this.size.x - 2) * (this.health / this.maxHealth)) * ig.system.scale,
            2 * ig.system.scale
        );
        ctx.closePath();
        ctx.fill();

        this.parent();
    }

});

});

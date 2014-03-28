ig.module(
    'game.entities.tank'
)
.requires(
    'impact.entity',
    'game.entities.projectile',
    'game.entities._playercontrolled',
    'game.data'
)
.defines(function(){

EntityTank = EntityPlayerControlled.extend({

    type: "tank",

    _reloadingSound: new ig.Sound('media/sounds/click.*'),
    _graceSound: new ig.Sound('media/sounds/wait.*'),

    init: function( x, y, settings ) {
        this.size = settings.tank.size;
        this.playerIndex = settings.playerIndex;
        this.health = this.maxHealth = settings.tank.health;
        this.animSheet = new ig.AnimationSheet( 'media/kratank' + this.playerIndex +  '.png', this.size.x,this.size.y );
        this.parent( x, y, settings );
        this.body.SetLinearDamping(settings.tank.slowdown);
        this.body.SetAngularDamping(10);
        this.body.SetMassData(new Box2D.Collision.Shapes.b2MassData({
            I: 0,
            mass: settings.tank.weight
        }));
        this.settings = settings;
        this.setCollisionData(DATA.collision.tank);
        this.reloadtimer = new ig.Timer(0);
        this.lateralCounterForceFactor = settings.tank.grip;
    },

    update: function(){
        angle = this.body.GetAngle();
        // handle driving
        if( this.state('up') || this.state('down') ) {
            var vector = new Box2D.Common.Math.b2Vec2(Math.cos(angle),Math.sin(angle));
            vector.Multiply(this.state('up') ? this.settings.tank.forwardspeed : -this.settings.tank.backwardspeed);
            this.body.ApplyForce(vector,this.body.GetPosition());
        }
        if (this.pressed('up') || this.pressed('down')) {
            this.settings.tank.driveSound.loop = true;
            this.settings.tank.driveSound.play();
        }
        if (this.released('up') || this.released('down')) {
            this.settings.tank.driveSound.loop = false;
        }
        this.body.ApplyImpulse( this.getLateralCounterForce(), this.body.GetWorldCenter() );
        // handle turning
        if( this.state('left') ) {
            this.body.SetAngularVelocity(-this.settings.tank.turnspeed);
        }
        else if( this.state('right') ) {
            this.body.SetAngularVelocity(this.settings.tank.turnspeed);
        }
        // handle firing
        if( this.pressed('shoot') ) {
            if (this.reloadtimer.delta()<0){
                this._reloadingSound.play();
            } else if (this.hasGrace()) {
                this._graceSound.play();
            } else {
                this.fireWeapon();
            }
        }
        // the rest
        if (this.pressed('debug')){
            console.log("Box2D pos",this.body.GetPosition(),"impact pos",this.pos);
        }
        this.parent();
    },

    fireWeapon: function(){
        var angle = this.body.GetAngle(),
            bulletx = this.pos.x + Math.cos(angle)*55,
            bullety = this.pos.y + Math.sin(angle)*55;
        bulletsettings = _.extend({
            owner: this.id,
            angle:this.body.GetAngle(),
        },this.settings.cannon);
        var projectile = ig.game.spawnEntity( EntityProjectile, bulletx, bullety, bulletsettings );
        projectile.player = this.player;
        var recoil = this.body.GetWorldVector(new Box2D.Common.Math.b2Vec2(-1,0));
        recoil.Multiply(this.settings.cannon.cannonrecoil);
        this.body.ApplyImpulse(recoil,this.body.GetWorldCenter());
        this.reloadtimer.set(this.settings.cannon.reload);
        this.settings.cannon.fireSound.play();
    }

});

});

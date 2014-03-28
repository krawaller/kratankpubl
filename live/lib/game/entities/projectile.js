ig.module(
    'game.entities.projectile'
)
.requires(
    'impact.entity',
    'game.entities._baseclass',
    'game.data'
)
.defines(function(){

EntityProjectile = EntityBaseClass.extend({
	size: {x: 16, y: 16},

	animSheet: new ig.AnimationSheet('media/cannonball16x16.png', 16, 16),

	init: function( x, y, settings ) {
		this.parent( x,y, settings );
		this.body.SetMassData(new Box2D.Collision.Shapes.b2MassData({
            I: 0,
            mass: settings.cannonballweight
        }));
        this.body.SetLinearDamping(settings.cannonballslowdown);
        var vector = new Box2D.Common.Math.b2Vec2(Math.cos(settings.angle),Math.sin(settings.angle));
        vector.Multiply(settings.cannonballspeed);
        this.body.ApplyImpulse( vector, this.body.GetPosition() );
        this.setCollisionData(DATA.collision.projectile);
	},

    update: function(){
        this.parent();
        var pos = this.body.GetPosition();
        if (pos.x < -5 || pos.x > 80 || pos.y < -5 || pos.y > 50){
            this.kill();
        }
    },

    check: function(other) {
        if (other.type === "tank" && other.id !== this.owner && !other.hasGrace()) {
            var otherVelocity = other.body.GetLinearVelocity().Copy();
            otherVelocity.Subtract(this.body.GetLinearVelocity());
            var damage = otherVelocity.Length() / 2; // TODO - use projectile mass in this formula!
            other.receiveDamage(damage,this.player);
            this.kill();
        }

    }

});

});

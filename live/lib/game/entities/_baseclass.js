ig.module(
    'game.entities._baseclass'
)
.requires(
    'impact.entity',
    'plugins.box2d.entity'
)
.defines(function(){

EntityBaseClass = ig.Box2DEntity.extend({

    collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!

    init: function(x,y,settings){
        this.parent(x,y,settings);
        this.addAnim( 'idle', 1, [0] ); // default anim
        if (settings.hasOwnProperty("angle")){
            this.body.SetAngle(settings.angle);
        }
    },

    getBox2DPosition: function(pos) {
        return {
            x: (pos.x + this.size.x / 2) * Box2D.SCALE,
            y: (pos.y + this.size.y / 2) * Box2D.SCALE
        };
    },

    setBox2DPositionFromImpactPosition: function(pos) {
        this.body.SetPosition(this.getBox2DPosition(pos));
    },

    setBox2DPositionAndAngleFromImpactPosition: function(pos, angle) {
        this.body.SetPositionAndAngle(this.getBox2DPosition(pos), angle);
    },

    getLateralCounterForce: function(){
        var vector = new Box2D.Common.Math.b2Vec2(0,1);
        var currentRightNormal = this.body.GetWorldVector(vector);
        var linearVel = this.body.GetLinearVelocity();
        var dot = Box2D.Common.Math.b2Math.Dot(currentRightNormal,linearVel);
        currentRightNormal.Multiply(-dot*this.body.GetMass()*(this.lateralCounterForceFactor||1));
        return currentRightNormal;
    },

    hasGrace: function(){return false;},

    setCollisionData: function(o){
        var filter = new Box2D.Dynamics.b2FilterData();
        filter.categoryBits = o.categoryBits;
        filter.groupIndex = o.groupIndex;
        filter.maskBits = o.maskBits;
        this.body.GetFixtureList().SetFilterData(filter);
    },

    kill: function(){
        // make kill async so we can kill stuff in box2d collision callback
        _.delayMethod(this,"parent");
    }
});

});

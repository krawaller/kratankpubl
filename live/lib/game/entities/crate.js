ig.module(
    'game.entities.crate'
)
.requires(
    'game.entities._baseclass'
)
.defines(function(){

EntityCrate = EntityBaseClass.extend({

    size: {x:16, y:16},

    animSheet: new ig.AnimationSheet( 'media/crate16x16.png', 16, 16 ),

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.body.SetLinearDamping(4.5);
        this.body.SetMassData(new Box2D.Collision.Shapes.b2MassData({
            I: 0,
            mass: 10.5
        }));
        this.setCollisionData(DATA.collision.crate);
    },
    update: function() {
        this.parent();
    }
});

});

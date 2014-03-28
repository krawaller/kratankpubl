// HEAVILY DAVIDMODIFIED PLUGIN
// original plugin gitrepo: https://github.com/quidmonkey/Box2D-Collision-Plugin
// discussion: http://impactjs.com/forums/code/box2d-collision-plugin

ig.module(
    'plugins.box2d.collision'
)
.requires(
    'plugins.box2d.entity',
    'plugins.box2d.game'
)
.defines(function(){

ig.Box2DEntity.inject({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        if (!ig.global.wm) {
            this.body.entity = this;
        }
    }
});

ig.Box2DGame.inject({

    // remove impact's collision detection for performance
    // comment out this line if you're using both
    // ig.Entity and ig.Box2dEntity
    checkEntities: function () {},

    loadLevel: function (data) {
        this.parent(data);
        var listener = new Box2D.Dynamics.b2ContactListener();
        listener.BeginContact = function(point){
            var a = point.m_fixtureA.m_body.entity, b = point.m_fixtureB.m_body.entity;
            if (a && b) {
                // call impact
                // favor the axis of greater penetration
                if (Math.abs(point.m_manifold.m_localPlaneNormal.y) > Math.abs(point.m_manifold.m_localPlaneNormal.x)) {
                    a.collideWith(b, 'y');
                    b.collideWith(a, 'y');
                } else {
                    a.collideWith(b, 'x');
                    b.collideWith(a, 'x');
                }
                // preserve impact's entity checks
                a.check(b);
                b.check(a);
            }
        };
        // attach to box2d world
        ig.world.SetContactListener(listener);
    }

});

});
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.body.setVelocity(5, 20);
        

    },
    update: function(delta) {
   if (me.input.isKeyPressed("right")) {
            //flip on x axis
            this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            //move left
        } else if (me.input.isKeyPressed("left")) {
            this.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        //jump
        if (me.input.isKeyPressed('up')) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }

        }
        //run...OR YOU DIE
        if (me.input.isKeyPressed("space")) {
            this.body.setVelocity(10, 20);
        } else {
            this.body.setVelocity(5, 20);
        }
        this.body.update(delta);
        return true;
    }

});
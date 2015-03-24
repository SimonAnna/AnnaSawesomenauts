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
        this.facing = "right";
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 80);
        this.renderable.addAnimation("attack", [0, 1], 80);

        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //flip on x axis
            this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            //move left
        } else if (me.input.isKeyPressed("left")) {
            this.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
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
        if (me.input.isKeyPressed("attack")) {
            
            if (!this.renderable.isCurrentAnimation("attack")){
                console.log("attack");
                this.renderable.setCurrentAnimation("attack","idle");
                this.renderable.setAnimationFrame();
            }
        }
        
        else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
                
            }
        }else {
            this.renderable.setCurrentAnimation("idle");
        }
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            
          var ydif = this.pos.y - response.b.pos.y;
          var xdif = this.pos.x - response.b.pos.x;
          
           if(ydif<-40 && xdif<70 && xdif>-35){
             this.body.falling= false;
             this.body.vel.y = -1;
          }
            else if(xdif>-35 && this.facing === 'right' && (xdif<0)){
             this.body.vel.x = 0;
             this.pos.x = this.pos.x -1;
          }
          else if(xdif<70 && this.facing === 'left' && (xdif>0)){
             this.body.vel.x = 0;
             this.pos.x = this.pos.x +1;
          }
          
        }
      
    }
});

game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image:"tower",
                width:100,
                height:100,
                spritewidth:"100",
                spriteheight:"100",
                
                getShape: function(){
                return (new me.Rect(0, 0, 100, 70)).toPolygon();
               }
                
        }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBaseEntity";
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta){
        if(this.health<=0){
            this.broken=true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function(){
        
    }
    
});

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image:"tower",
                width:100,
                height:100,
                spritewidth:"100",
                spriteheight:"100",
                
                getShape: function(){
                return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
                
        }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta){
        if(this.health<=0){
            this.broken=true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function(){
        
    }
    
});
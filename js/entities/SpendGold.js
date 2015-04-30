game.SpendGold = Object.extend({
    init: function(x,y,settings){
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused=true;
        this.buying = false;
    },
    update: function(){
        this.now = new Date().getTime();
        
        if(me.input.isKeyPressed("buy")&&this.now-this.lastBuy >= 1000){
          this.lastBuy = this.now;  
          if(!this.buying){
              this.startBuying();
          }else{
              this.stopBuying();
          }
        }
        this.checkBuyKeys();
        
        return true;
    },
    //starts buying
    startBuying: function(){
       this.buying=true; 
       me.state.pause(me.state.PLAY);
       game.data.pausePos = me.game.viewport.localToWorld(0,0);
       game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("spend"));
       game.data.buyscreen.updateWhenPaused = true;
       game.data.buyscreen.setOpacity(0.8);
       me.game.world.addChild(game.data.buyscreen, 34);
       game.data.player.body.setVelocity(0,0);
       me.input.bindKey(me.input.KEY.F1,"F1", true);
       me.input.bindKey(me.input.KEY.F2,"F2", true);
       me.input.bindKey(me.input.KEY.F3,"F3", true);
       me.input.bindKey(me.input.KEY.F4,"F4", true);
       me.input.bindKey(me.input.KEY.F5,"F5", true);
        me.input.bindKey(me.input.KEY.F6,"F6", true);
       this.setBuyText();
    },
    //stops buying
    stopBuying: function(){
        this.buying=false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(5,20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1,"F1", true);
       me.input.unbindKey(me.input.KEY.F2,"F2", true);
       me.input.unbindKey(me.input.KEY.F3,"F3", true);
       me.input.unbindKey(me.input.KEY.F4,"F4", true);
       me.input.unbindKey(me.input.KEY.F5,"F5", true);
       me.game.world.removeChild(game.data.buytext);
    },
    //sets text
    setBuyText:function(){
        game.data.buytext = new (me.Renderable.extend({
                    init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("FairydustB", 30, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, ENTER TO RETURN TO GAME.Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Increase Damage, current level: " +game.data.s1 + " cost: "+ ((game.data.s1+1)*10),this.pos.x, this.pos.y+50);
                this.font.draw(renderer.getContext(), "Run, current level: " +game.data.s2 + " cost: "+ ((game.data.s2+1)*10), this.pos.x, this.pos.y+100);
                this.font.draw(renderer.getContext(), "Increase Health " +game.data.s3 + " cost: "+ ((game.data.s3+1)*10), this.pos.x, this.pos.y+150);
                this.font.draw(renderer.getContext(), "Q Ability: Speed burst, current level:" +game.data.s4 + " cost: "+ ((game.data.s4+1)*10), this.pos.x, this.pos.y+200);
                this.font.draw(renderer.getContext(), "W Ability: regain healt: " +game.data.s5 + " cost: "+ ((game.data.s5+1)*10), this.pos.x, this.pos.y+250);
                this.font.draw(renderer.getContext(), "E Ability: Throw Spear: "  +game.data.s6 + " cost: "+ ((game.data.s6+1)*10), this.pos.x, this.pos.y+300);
                
              
            }
                }));
                me.game.world.addChild(game.data.buytext, 34);
            
    },
    //checks keys
    checkBuyKeys: function(){
        if(me.input.isKeyPressed('F1')){
            if(this.checkCost(1)){
                this.makePur(1);
            }
        }else if(me.input.isKeyPressed('F2')){
             if(this.checkCost(2)){
                this.makePur(2);
            }
        }else if(me.input.isKeyPressed('F3')){
             if(this.checkCost(3)){
                this.makePur(3);
            }
        }else if(me.input.isKeyPressed('F4')){
             if(this.checkCost(4)){
                this.makePur(4);
            }
        }else if(me.input.isKeyPressed('F5')){
             if(this.checkCost(5)){
                this.makePur(5);
            }
        }else if(me.input.isKeyPressed('F6')){
             if(this.checkCost(6)){
                this.makePur(6);
            }
        }
    },
    //checks to see if u have enough gold
    checkCost: function(skill){
        if(skill===1 &&(game.data.gold>=((game.data.s1+1)*10))){
            return true;
        }else if(skill===2 &&(game.data.gold>=((game.data.s2+1)*10))){
            return true;
        }else if(skill===3 &&(game.data.gold>=((game.data.s3+1)*10))){
            return true;
        }else if(skill===4 &&(game.data.gold>=((game.data.s4+1)*10))){
            return true;
        }else if(skill===5 &&(game.data.gold>=((game.data.s5+1)*10))){
            return true;
        }else if(skill===6 &&(game.data.gold>=((game.data.s6+1)*10))){
            return true;
        }else{
          return false;  
        }
    },
    //controlls putrchases
    makePur: function(skill){
        if(skill===1){
        game.data.gold -= ((game.data.s1+1)*10);
        game.data.s1+=1;
        game.data.playerAttack+=1;
    }else if(skill===2){
        game.data.gold -= ((game.data.s2+1)*10);
        game.data.s2+=1;
    }else if(skill===3){
        game.data.gold -= ((game.data.s3+1)*10);
        game.data.s3+=1;
        game.data.playerHealth+=1;
    }else if(skill===4){
        game.data.gold -= ((game.data.s4+1)*10);
        game.data.s4+=1;
    }else if(skill===5){
        game.data.gold -= ((game.data.s5+1)*10);
        game.data.s5+=1;
    }else if(skill===6){
        game.data.gold -= ((game.data.s6+1)*10);
        game.data.s6+=1;
        
    }else{
        return false;
    }
    }
    
});


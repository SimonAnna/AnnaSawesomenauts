game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title")),-10);
                
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("FairydustB", 60, "purple");
                me.input.registerPointerEvent('pointerdown',this,this.newGame.bind(this),true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "AwesomeNauts.", 20, 130);
                this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);                     
            },
            update: function(dt){
                return true;
            },
            
            newGame: function(){
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.NEW);
                
            }
                })));
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function() {
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("FairydustB", 60, "purple");
                me.input.registerPointerEvent('pointerdown',this,this.newGame.bind(this),true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);                     
            },
            update: function(dt){
                return true;
            },
            
            newGame: function(){
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);      
            }
                })));
                
               
	},
	
             
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});


/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
                enemyBaseHealth: 10,
                playerBaseHealth: 10,
                enemyCreepHealth: 10,
                playerHealth: 20,
                enemyCreepAttack: 1,
                playerAttack: 1,
                playerAttackTimer: 1000,
                enemyCreepAttackTimer: 1000,
                playerMoveSpeed: 5,
                creepMoveSpeed: 5,
                gameManager: "",
                player: "",
                exp: 0,
                gold:1000000000000000000000,
                s1:0,
                s2:0,
                s3:0,
                s4:0,
                s5:0,
                s6:0,
                exp1:0,
                exp2:0,
                exp3:0,
                win:"",
                pausePos: "",
                buyscreen: "",
                buytext: "",
                
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        
        

        me.state.SPEND = 112;
        me.state.LOAD = 113;
        me.state.NEW = 114;
	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
            me.pool.register("player", game.PlayerEntity, true);
            me.pool.register("PlayerBase", game.PlayerBaseEntity);
            me.pool.register("EnemyBase", game.EnemyBaseEntity);
            me.pool.register("EnemyCreep", game.EnemyCreep, true);
            me.pool.register("GameManager", game.GameManager);
            me.pool.register("PlayerAttack", game.PlayerAttack, true);
            me.pool.register("HeroDeathManager", game.HeroDeathManager);
            me.pool.register("ExpManager", game.ExpManager);
            me.pool.register("SpendGold", game.SpendGold);
            
            
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.SPEND, new game.SpendExp());
                me.state.set(me.state.LOAD, new game.LoadProfile());
                me.state.set(me.state.NEW, new game.NewProfile());
                

		// Start the game.
		me.state.change(me.state.MENU);
	}
};

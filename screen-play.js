function ScreenPlay(context, app) {
	this.m_context = context;
	this.m_app = app;
	
	this.m_sprites = [];
	this.m_spritesFree = [];
	this.m_running = true;
}
ScreenPlay.prototype = {
	initialize: function() {
		let sprites = this.m_sprites;
		let ctx = this.m_context;
		
		//Background initialize
		let bg1 = new Background(ctx, this.m_app.m_images['background_image1'], 8);
		bg1.m_screen = this;
		sprites.push(bg1);
		
		//Player initialize
		let pl = new Player(ctx, this.m_app.m_images['player_image'], this.m_app.m_keyboard);
		pl.m_screen = this;
		sprites.push(pl);
	},
	update: function(elapsedTime) {
		for (let i in this.m_sprites) 
		{
			this.m_sprites[i].update(elapsedTime);
		}
	},
	draw: function() {
		for (let i in this.m_sprites)
		{
			this.m_sprites[i].draw();
		}
	}
}

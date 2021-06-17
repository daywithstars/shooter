function ScreenPlay(context, app) {
	this.m_context = context;
	this.m_app = app;
	
	this.m_sprites = [];
	this.m_spritesFree = [];
	this.m_running = true;
}
ScreenPlay.prototype = {
	load: function() {
		var sprites = this.m_sprites;
		var ctx = this.m_context;
		
		var bg1 = new Background(ctx, this.m_app.m_images['background_image1'], 8);
		sprites.push(bg1);
	},
	update: function(elapsedTime) {
		for (var i in this.m_sprites) 
		{
			this.m_sprites[i].update(elapsedTime);
		}
	},
	draw: function() {
		for (var i in this.m_sprites)
		{
			this.m_sprites[i].draw();
		}
	}
}

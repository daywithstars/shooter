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
		this.addSprite(bg1);
		
		//Player initialize
		let pl = new Player(ctx, this.m_app.m_images['player_image'], this.m_app.m_keyboard);
		this.addSprite(pl);
	},
	addSprite: function(sprite) {
		this.m_sprites.push(sprite);
		sprite.m_screen = this;
	},
	freeSprite: function(sprite) {
		this.m_spritesFree.push(sprite);
	},
	update: function(elapsedTime) {
		for (let i in this.m_sprites) 
		{
			this.m_sprites[i].update(elapsedTime);
		}
		
		this.freeSprites();
	},
	draw: function() {
		for (let i in this.m_sprites)
		{
			this.m_sprites[i].draw();
		}
	},
	
	freeSprites: function() {
		let newSpriteArray = [];
		
		for (let i in this.m_sprites)
		{
			if (this.m_spritesFree.indexOf(this.m_sprites[i]) == -1)
			{
				newSpriteArray.push(this.m_sprites[i]);
			}
		}
		
		this.m_spritesFree = [];
		
		this.m_sprites = newSpriteArray;
	}
}






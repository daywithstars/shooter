function Player(context, image, keyboard) {
	this.m_context = context;
	this.m_keyboard = keyboard;
	this.m_image = image;
	this.m_speed = 0.200;
	
	this.m_x = context.canvas.width / 2;
	this.m_y = context.canvas.height - image.height;
}
Player.prototype = {
	update: function(elapsedTime) {
		if (this.m_keyboard.keyhold(KEYBOARD_KEYS.RIGHT))
		{
			this.m_x += elapsedTime * this.m_speed;
		}
		if (this.m_keyboard.keyhold(KEYBOARD_KEYS.LEFT))
		{
			this.m_x -= elapsedTime * this.m_speed;
		}
		if (this.m_keyboard.keyhold(KEYBOARD_KEYS.DOWN))
		{
			this.m_y += elapsedTime * this.m_speed;
		}
		if (this.m_keyboard.keyhold(KEYBOARD_KEYS.UP))
		{
			this.m_y -= elapsedTime * this.m_speed;
		}
		
		if (this.m_keyboard.keypress(KEYBOARD_KEYS.SPACE))
		{
			let bulletImage = this.m_screen.m_app.m_images['bullet_image'];
		
			this.m_screen.addSprite(
				new Bullet(
					this.m_context, 
					bulletImage, 
					this.m_x + 2, 
					this.m_y, 
					-300
					)
			);
			
			this.m_screen.addSprite(
				new Bullet(
					this.m_context, 
					bulletImage, 
					this.m_x + this.m_image.width - 10, 
					this.m_y, 
					-300
					)
			);
		}
		
		this.moveLimits();
	},
	moveLimits: function() {
		let ctx = this.m_context;
		
		if (this.m_x <= 0)
		{
			this.m_x = 0;
		}
		if (this.m_x + this.m_image.width >= ctx.canvas.width)
		{
			this.m_x = ctx.canvas.width - this.m_image.width;
		}
		if (this.m_y <= ctx.canvas.height / 8)
		{
			this.m_y = ctx.canvas.height / 8;
		}
		if (this.m_y + this.m_image.height >= ctx.canvas.height)
		{
			this.m_y = ctx.canvas.height - this.m_image.height;
		}
	},
	draw: function() {
		let ctx = this.m_context;
		let img = this.m_image;

		ctx.drawImage(img, this.m_x, this.m_y, img.width, img.height);
	},
	
	getHitboxes: function() {
		const hitboxes = [
			{
				name: 'default',
				x: this.m_x,
				y: this.m_y,
				w: this.m_image.width,
				h: this.m_image.height
			}
		];
		
		return hitboxes;
	},
	
	collisionWith: function(sprite) {
		if (sprite instanceof Asteroid)
		{
			console.log('collision with Asteroid');
			this.reset();
		}
	},
	
	reset: function() {
		this.m_x = this.m_context.canvas.width / 2;
		this.m_y = this.m_context.canvas.height - this.m_image.height;
	}
}






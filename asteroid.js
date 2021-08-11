function Asteroid(context, image) {
	this.m_context = context;
	this.m_image = image;

	this.m_speed = 0.200;
	this.m_x = Math.floor(Math.random() * (context.canvas.width - image.width));
	this.m_y = Math.floor(Math.random() * (-context.canvas.height));
}
Asteroid.prototype = {
	update: function(elapsedTime) {
		let ctx = this.m_context;
		let img = this.m_image;
		
		this.m_y += elapsedTime * this.m_speed;
		
		if (this.m_y > ctx.canvas.height)
		{
			this.reset();
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
	
	collisionWith: function(sprite)
	{
		if (sprite instanceof Player)
		{
			this.reset();
		}
	},
	
	reset: function() {
		let ctx = this.m_context;
		let img = this.m_image;
		
		this.m_x = Math.floor(Math.random() * (ctx.canvas.width - img.width));
		this.m_y = Math.floor(Math.random() * (-ctx.canvas.height));
	}
}






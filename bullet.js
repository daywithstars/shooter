function Bullet(context, image, x, y, dirY) {
	this.m_context = context;
	this.m_image = image;
	
	this.m_x = x;
	this.m_y = y;
	this.m_dy = dirY;
}
Bullet.prototype = {
	update: function(elapsedTime) {
		this.m_y += this.m_dy * (elapsedTime / 1000);
		
		if (this.m_y + this.m_image.height <= 0)
		{
			this.m_screen.freeSprite(this);
		}
	},
	draw: function() {
		let ctx = this.m_context;
		
		ctx.drawImage(this.m_image, this.m_x, this.m_y, this.m_image.width, this.m_image.height);
	},
	
	collisionWith: function(sprite) {
	}
}

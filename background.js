function Background(context, image, speed) {
	this.m_context = context;
	this.m_image = image;
	this.m_speed = speed;
	
	this.m_y = 200;
}
Background.prototype = {
	update: function(elapsedTime) {
		this.m_y += this.m_speed * (elapsedTime / 1000);
		
		if (this.m_y >= this.m_image.height)
		{
			this.m_y = 0;
		}
	},
	draw: function() {
		var ctx = this.m_context;
		var img = this.m_image;
		
		var posY = this.m_y - img.height;
		ctx.drawImage(img, 0, posY, img.width, img.height);
		
		posY = this.m_y;
		ctx.drawImage(img, 0, posY, img.width, img.height);
	}
}

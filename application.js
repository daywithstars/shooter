function Application(context) {
    this.m_context = context;
    this.m_images = {
    	background_image1: 'background-image1.png'
    }
    this.m_totalImages = 0;
    this.m_loadedImagesCount = 0;
    this.m_screens = [];
    this.m_elapsedTime = 0;
    this.m_prevElapsedTime = 0;
    this.m_running = false;
}
Application.prototype = {
	run: function() {
		this.load();
	},
	load: function() {
		var app = this;
	
		//Load images
		for (var i in this.m_images)
		{
			var img = new Image();
			img.src += 'res/img/' + this.m_images[i];
			this.m_totalImages++;
			img.onload = function() { app.loadingImages(); }
			
			this.m_images[i] = img;
		}
	
	
		var screenPlay = new ScreenPlay(this.m_context, this);
		screenPlay.load();
	
		this.m_screens.push(screenPlay);
	},
	loadingImages: function() {
		this.m_loadedImagesCount ++;
		if (this.m_loadedImagesCount >= this.m_totalImages)
		{
			this.m_running = true;
			
			this.m_prevElapsedTime = new Date().getTime();
			this.update();
		}
	},
	update: function() {
		if (! this.m_running) return ;
		
		var currentElapsedTime = new Date().getTime();
		this.m_elapsedTime = currentElapsedTime - this.m_prevElapsedTime;
		
		for (var i in this.m_screens)
		{
			this.m_screens[i].update(this.m_elapsedTime);
		}
		
		
		this.draw();
		
		this.m_prevElapsedTime = currentElapsedTime;
		var app = this;
		requestAnimationFrame( 
			function() {
				app.update();
			}
		);
	},
	draw: function() {
		var ctx = this.m_context;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		for (var i in this.m_screens)
		{
			this.m_screens[i].draw();
		}
	}
}






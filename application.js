function Application(context) {
    this.m_context = context;
    this.m_keyboard = new Keyboard(document);
    
    this.m_images = {
    	background_image1: 'background-image1.png',
    	player_image: 'spaceship.png',
    	bullet_image: 'bullet.png',
    	asteroid_image: 'asteroid.png'
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
		let app = this;
	
		//Load images
		for (let i in this.m_images)
		{
			let img = new Image();
			img.src += 'res/img/' + this.m_images[i];
			this.m_totalImages++;
			img.onload = function() { app.loadingImages(); }
			
			this.m_images[i] = img;
		}
	
	
		let screenPlay = new ScreenPlay(this.m_context, this);
		screenPlay.initialize();
	
		this.m_screens.push(screenPlay);
	},
	loadingImages: function() {
		this.m_loadedImagesCount ++;
		if (this.m_loadedImagesCount >= this.m_totalImages)
		{
			console.log('application-loadingImage: ' + this.m_totalImages + ' ' + 
				'images successful loaded\n');
			this.m_running = true;
			
			this.m_prevElapsedTime = new Date().getTime();
			this.update();
		}
	},
	update: function() {
		if (! this.m_running) return ;
		
		let currentElapsedTime = new Date().getTime();
		this.m_elapsedTime = currentElapsedTime - this.m_prevElapsedTime;
		
		
		
		for (let i in this.m_screens)
		{
			this.m_screens[i].update(this.m_elapsedTime);
		}
		this.m_keyboard.clearFrame();
		
		this.draw();
		
		this.m_prevElapsedTime = currentElapsedTime;
		let app = this;
		requestAnimationFrame( 
			function() {
				app.update();
			}
		);
	},
	draw: function() {
		let ctx = this.m_context;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		for (let i in this.m_screens)
		{
			this.m_screens[i].draw();
		}
	}
}






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
		this.screenSettings();
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
	},
	screenSettings: function() {
		console.log('screen-settings');
	
		let screenWidth = window.screen.width;
		let screenHeight = window.screen.height;
		this.m_context.canvas.width = 360;
		this.m_context.canvas.height = 640;
		
		if (screenWidth > screenHeight)
		{
			if (screenWidth / screenHeight  == 640/360)
			{
				console.log('case 0');
				
				let widthScale = 1;
				let heightScale = 1;
				
				let j = screenHeight;
				let i = screenWidth;
				while (true)
				{
					j -= 640;
					i -= 360;
					if (j < 640)
					{
						break;
					}
					
					if (i < 360)
					{
						break;
					}
					widthScale ++;
					heightScale++;
				}
				
				document.getElementById('myCanvas').style.width = (widthScale * 360).toString() + 'px';
				document.getElementById('myCanvas').style.height = (heightScale * 640).toString() + 'px';
			}
			else {
				console.log('case 1');
				
				let widthScale = 1;
				let heightScale = 1;
				
				let j = screenHeight;
				let i = screenWidth;
				while (true)
				{
					j -= 640;
					i -= 360;
					if (j < 640)
					{
						break;
					}
					
					if (i < 360)
					{
						break;
					}
					widthScale ++;
					heightScale++;
				}
				
				document.getElementById('myCanvas').style.width = (widthScale * 360).toString() + 'px';
				document.getElementById('myCanvas').style.height = (heightScale * 640).toString() + 'px';
			}
		}
		else {
			console.log('devicePixelRatio: ' + window.devicePixelRatio);
			
			if (screenHeight / screenWidth == 640/360)
			{
				console.log('case 1');
				
				document.getElementById('myCanvas').style.width = '100vw';
				document.getElementById('myCanvas').style.height = '100vh';
			}
			else {
				console.log('case 2');				
				
				let newWidth = 
				(Math.floor( (Math.trunc(window.devicePixelRatio) * screenWidth) / 360 ) * 360).toString() + 'px';
				let newHeight = 
				(Math.floor( (Math.trunc(window.devicePixelRatio) * screenHeight) / 640 ) * 640).toString() + 'px';
				
				document.getElementById('myCanvas').style.width = newWidth;
				
				document.getElementById('myCanvas').style.height = newHeight;
				
				console.log('newWidth: ' + newWidth);
				console.log('newHeight: ' + newHeight);
			}
		}
		
		console.log('screen width: ' + screenWidth);
		console.log('screen height: ' + screenHeight);
		
		console.log('context width: ' + this.m_context.canvas.width);
		console.log('context height: ' + this.m_context.canvas.height);
	}
}






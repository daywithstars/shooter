const KEYBOARD_KEYS = {
	ENTER: 13,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,	
	DOWN: 40
};


function Keyboard(elementListener) {
	this.m_element = elementListener;
	
	this.m_keyhold = [];
	this.m_keypress = [];
	this.m_keyrelease = [];
	this.m_repeat = false;
	
	var keyboard = this;
	
	elementListener.addEventListener('keydown', function(event) {
		let key = event.keyCode;

		keyboard.m_keyhold[key] = true;
		if (!keyboard.m_repeat)
		{
			keyboard.m_keypress[key] = true;
		}
		keyboard.m_keyrelease[key] = false;
		
		keyboard.m_repeat = true;
	});
	elementListener.addEventListener('keyup', function(event) {
		let key = event.keyCode;
		
		keyboard.m_keyhold[key] = false;
		keyboard.m_keypress[key] = false;
		keyboard.m_keyrelease[key] = true;
		
		keyboard.m_repeat = false;
	});
}
Keyboard.prototype = {
	clearFrame: function() {
		
		this.m_keypress = [];
		this.m_keyrelease = [];		
	},
	keypress: function(key) {
		return this.m_keypress[key];
	},
	keyhold: function(key) {	
		return this.m_keyhold[key];
	},
	keyrelease: function(key) {	
		return this.m_keyrelease[key];
	}
}




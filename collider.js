function Collider() {
	this.m_foes = [];
	this.m_friends = [];
	
	this.m_foesFree = [];
	this.m_friendsFree = [];
}
Collider.prototype = {
	addFoe: function(foe) {
		this.m_foes.push(foe);
		foe.m_collider = this;
		foe.m_type = 'foe';
	},
	addFriend: function(friend) {
		this.m_friends.push(friend);
		friend.m_collider = this;
		friend.m_type = 'friend';
	},
	addFreeSprite: function(sprite) {
		if (sprite.m_type == 'foe')
		{
			m_foesFree.push(sprite);
		}
		else if (sprite.m_type == 'friend')
		{
			m_friendsFree.push(sprite);
		}
	},
	
	update: function() {
		for (let i in this.m_foes)
		{
			for (let j in this.m_friends)
			{
				this.checkCollision(this.m_friends[j], this.m_foes[i]);
			}
		}
		
		this.freeSprites();
	},
	
	freeSprites: function() {
		let newFoeArray = [];
		let newFriendArray = [];
		
		for (let i in this.m_foes)
		{
			if (this.m_foesFree.indexOf(this.m_foes[i]) == -1)
			{
				newFoeArray.push(this.m_foes[i]);
			}
		}
		this.m_foesFree = [];
		this.m_foes = newFoeArray;
		
		for (let i in this.m_friends)
		{
			if (this.m_friendsFree.indexOf(this.m_friends[i]) == -1)
			{
				newFriendArray.push(this.m_friends[i]);
			}
		}
		this.m_friendsFree = [];
		this.m_friends = newFriendArray;
	},
	
	checkCollision: function(friend, foe) {
		if (friend.getHitboxes && foe.getHitboxes)
		{
			const foeHitboxes = foe.getHitboxes();
			const friendHitboxes = friend.getHitboxes();
			
			for (let i in foeHitboxes)
			{
				for (let j in friendHitboxes)
				{
					if (this.checkCollisionHitbox(foeHitboxes[i], friendHitboxes[j]))
					{
						if (foe.collisionWith && friend.collisionWith)
						{
							foe.collisionWith(friend, friendHitboxes[j], foeHitboxes[j]);
							friend.collisionWith(foe, foeHitboxes[j], friendHitboxes[j]);
						}						
					}
				}
			}
		}
		else {
			console.log('Collider: foe or friend not have getHitboxes method');
		}
	},
	checkCollisionHitbox: function(ht1, ht2) {
		if (ht1.x + ht1.w > ht2.x &&
			ht1.x < ht2.x + ht2.w &&
			ht1.y + ht1.h > ht2.y &&
			ht1.y < ht2.y + ht2.h)
		{
			return true;
		}
		
		return false;
	}
}






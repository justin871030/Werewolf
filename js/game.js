var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 1500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
var game = new Phaser.Game(config);
var pointer;
var group;
var back;
var ok;
var Seer;
var Witch;
var Hunter;
var Knight;
var Wolfking;
var Wolf1;
var Wolf2;
var Villager1;
var Villager2;
var Villager3;
const style = { font: '18px Arial', fill: '#00FFFF' };
const styleOver = { fill: '#FF00FF' };

var cha;

var Game = {};//functions of client socket

var back_list = [];

function preload ()
{
	this.load.spritesheet('back', 'assets/wolf/back.png',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('ok', 'assets/wolf/ok.png',{frameWidth:1280,frameHeight:720});
	this.load.spritesheet('Seer', 'assets/wolf/1.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('Witch', 'assets/wolf/2.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('Hunter', 'assets/wolf/3.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('Knight', 'assets/wolf/4.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('Wolfking', 'assets/wolf/5.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('Wolf', 'assets/wolf/6.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('Villager', 'assets/wolf/7.jpg',{frameWidth:378,frameHeight:536});
	this.load.spritesheet('background1', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background2', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background3', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background4', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background5', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('return', 'assets/wolf/return.png',{frameWidth:254,frameHeight:254});

}
function create (delta)
{
	
	back_list.push(this.add.sprite(100, 750, 'background1').setScale(2));
    back_list.push(this.add.sprite(300, 750, 'background2').setScale(2));
    back_list.push(this.add.sprite(500, 750, 'background3').setScale(2));
    back_list.push(this.add.sprite(700, 750, 'background4').setScale(2));
    back_list.push(this.add.sprite(900, 750, 'background5').setScale(2));
	Seer = this.physics.add.sprite(500, 750, 'Seer').setScale(1);
	Seer.disableBody(true, true);
	Witch = this.physics.add.sprite(500, 750, 'Witch').setScale(1);
	Witch.disableBody(true, true);
	Hunter = this.physics.add.sprite(500, 750, 'Hunter').setScale(1);
	Hunter.disableBody(true, true);
	Knight = this.physics.add.sprite(500, 750, 'Knight').setScale(1);
	Knight.disableBody(true, true);
	Wolfking = this.physics.add.sprite(500, 750, 'Wolfking').setScale(1);
	Wolfking.disableBody(true, true);
	Wolf1 = this.physics.add.sprite(500, 750, 'Wolf').setScale(1);
	Wolf1.disableBody(true, true);
	Wolf2 = this.physics.add.sprite(500, 750, 'Wolf').setScale(1);
	Wolf2.disableBody(true, true);
	Villager1 = this.physics.add.sprite(500, 750, 'Villager').setScale(1);
	Villager1.disableBody(true, true);
	Villager2 = this.physics.add.sprite(500, 750, 'Villager').setScale(1);
	Villager2.disableBody(true, true);
	Villager3 = this.physics.add.sprite(500, 750, 'Villager').setScale(1);
	Villager3.disableBody(true, true);
	back = this.physics.add.sprite(500, 750, 'back').setScale(1);
	ok = this.physics.add.sprite(500, 750, 'ok').setScale(1);
	ok.disableBody(true, true);
	group = this.add.group();
	group.add(Seer);
	group.add(Witch);
	group.add(Hunter);
	group.add(Knight);
	group.add(Wolfking);
	group.add(Wolf1);
	group.add(Wolf2);
	group.add(Villager1);
	group.add(Villager2);
	group.add(Villager3);

	this.input.mouse.disableContextMenu();
	this.input.on('pointerup', mouseup);
	Client.askNewPlayer();
	this.add.sprite(60,305, 'return').setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', function () {
          this.setScale(0.6);
        })
        .on('pointerout', function () {
          this.setScale(0.5);
        })
        .on('pointerdown', function () {
			var s = window.open('/', '_self');
		
			if (s && s.focus)
			{
				s.focus();
			}
			else if (!s)
			{
				window.location.href = url;
			}
        }, this);
	for (j = 1; j < 6; j++) {
        for (i = 0; i < 10; i++) {
		    this.anims.create({
            key: i.toString(),
            frames: [ { key: 'background'+j.toString(), frame: i } ],
            frameRate: 20
            });
        } 
	} 
    for (i = 0; i < 5; i++) {
        back_list[i].anims.play((count[i]%10).toString(), true);
        count[i] = count[i] + 1;
    }   

}
var choose = false;
function mouseup(pointer,time,cha) {
	if(pointer.y>=400)
	{
		if(!ready&&!start)
		{
			ok.enableBody(true, 500, 750, true, true);
		}
		else
		{
			ok.disableBody(true, true);
		}
		ready=!ready;
		Client.ReadyState(ready);
	}
}
var ready = false;
var start = false;
var backtime = true;
var get = true;

var temp = 0;
var count = [4,8,3,6,1];
var change_count = 0;
var change = [1,4,3,0,2]
function update (time)
{	
	if(time - temp >= 1000)
	{
        i=change[change_count%5];
        back_list[i].anims.play((count[i]%10).toString(), true);
        count[i] = count[i] + 1;
        change_count = change_count + 1;
        temp = time;
	}
}

Game.GetCard = function(Num)
{	
	back.disableBody(true, true);
	cha = group.getChildren()[Num];
	cha.enableBody(true, 500, 750, true, true);
	ok.disableBody(true, true);
	start = true;
}

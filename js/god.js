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

function preload ()
{
	this.load.spritesheet('back', 'assets/wolf/back.png',{frameWidth:378,frameHeight:536});
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
	this.load.spritesheet('reload', 'assets/wolf/reload.png',{frameWidth:888,frameHeight:980});
	this.load.spritesheet('return', 'assets/wolf/return.png',{frameWidth:254,frameHeight:254});

}
var list = [];
var back_list = [];
function create (delta)
{
	this.input.mouse.disableContextMenu();
	back_list.push(this.add.sprite(100, 750, 'background1').setScale(2));
    back_list.push(this.add.sprite(300, 750, 'background2').setScale(2));
    back_list.push(this.add.sprite(500, 750, 'background3').setScale(2));
    back_list.push(this.add.sprite(700, 750, 'background4').setScale(2));
    back_list.push(this.add.sprite(900, 750, 'background5').setScale(2));
	this.add.sprite(170,305, 'reload').setScale(0.08)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', function () {
          this.setScale(0.096);
        })
        .on('pointerout', function () {
          this.setScale(0.08);
        })
        .on('pointerdown', function () {
			Client.askJson();
        }, this);
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
var ready = false;
var backtime = true;
var get = true;
var update_json = false;
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
		Client.askJson();
		Client.sendTest();
		if(update_json)
		{
			for (i = 0; i < 5; i++) {
				list.push(this.add.text(100, 380+170*i, (i+1)+":", { fontSize: '32px', fill: '#000'}));
				list.push(this.physics.add.sprite(250, 460+170*i, Client.json[i+1]).setScale(0.3));
			} 
			for (i = 5; i < 10; i++) {
				list.push(this.add.text(600, 380+170*(i-5), (i+1)+":", { fontSize: '32px', fill: '#000'}));
				list.push(this.physics.add.sprite(750, 460+170*(i-5), Client.json[i+1]).setScale(0.3));
			}
		update_json = false ;
		}
		temp = time ;
	}
}

Game.Update = function()
{	
	update_json = true;
}
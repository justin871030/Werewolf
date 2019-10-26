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

var cha;

var Game = {};//functions of client socket

const style = { font: '50px Arial', fill: '#00FFFF' };
const styleOver = { fill: '#FF00FF' };

var back_list = [];

function preload ()
{
	this.load.spritesheet('background1', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background2', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background3', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background4', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
	this.load.spritesheet('background5', 'assets/wolf/background.jpg',{frameWidth:100,frameHeight:500});
    this.load.spritesheet('god_icon', 'assets/wolf/god_icon.png',{frameWidth:940,frameHeight:1100});
    this.load.spritesheet('player_icon', 'assets/wolf/player_icon.png',{frameWidth:512,frameHeight:512});

}
function create (delta)
{
    back_list.push(this.add.sprite(100, 750, 'background1').setScale(2));
    back_list.push(this.add.sprite(300, 750, 'background2').setScale(2));
    back_list.push(this.add.sprite(500, 750, 'background3').setScale(2));
    back_list.push(this.add.sprite(700, 750, 'background4').setScale(2));
    back_list.push(this.add.sprite(900, 750, 'background5').setScale(2));
    this.add.sprite(700, 700, 'god_icon').setScale(0.3)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', function () {
          this.setScale(0.4);
        })
        .on('pointerout', function () {
          this.setScale(0.3);
        })
        .on('pointerdown', function () {
			var s = window.open('god', '_self');
		
			if (s && s.focus)
			{
				s.focus();
			}
			else if (!s)
			{
				window.location.href = url;
			}
        }, this);
    this.add.sprite(300, 700, 'player_icon').setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', function () {
          this.setScale(0.6);
        })
        .on('pointerout', function () {
          this.setScale(0.5);
        })
        .on('pointerdown', function () {
			var s = window.open('player', '_self');
		
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
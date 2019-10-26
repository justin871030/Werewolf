var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var fs = require('fs');


app.use('/src',express.static(__dirname + '/src'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/try.html');
});
app.get('/god',function(req,res){
    res.sendFile(__dirname+'/god.html');
});
app.get('/player',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
server.lastPlayerID = 0;
server.PlayerNUM = 0;
server.PlayerReadyNUM = 0;
server.playernum = [];
server.playerReady = [];
server.cardlist = randomArray(10);
server.json_data ;
var done = false;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){
    if(server.PlayerNUM==0)
    {
        console.log('Reset!');
        server.lastPlayerID = 0;
        server.PlayerNUM = 0;
        server.PlayerReadyNUM = 0;
        server.playernum = [];
        server.playerReady = [];
        server.cardlist = randomArray(10);
        done = false;
        players = [];
        server.json_data = JSON.parse(fs.readFileSync('wolf.json'));
        server.json_data['Resets']=server.json_data['Resets']+1;   
        fs.writeFileSync('wolf.json', JSON.stringify(server.json_data))
    }
    socket.on('newplayer',function(){
        console.log('New player '+ server.lastPlayerID+', '+ ++server.PlayerNUM);
        socket.player = {
            id: server.lastPlayerID++,
            num: server.PlayerNUM-1
        };
        server.playernum.push(socket.player.num);
        server.playerReady.push(0);
        socket.emit('allplayers',getAllPlayers(),socket.player.id);
        socket.broadcast.emit('newplayer',socket.player);
        socket.on('ready',function(data){
            if(data){
                console.log('Player '+socket.player.id+' Ready!'+ ++server.PlayerReadyNUM);
                server.playerReady[socket.player.id]=1;
                if(server.PlayerReadyNUM == 10 && !done){
                    socket.emit('allready');
                    socket.broadcast.emit('allready');
                    done = true;
                    server.json_data['Games']=server.json_data['Games']+1;
                    for(i=0; i<server.cardlist.length; i++){
                        switch(server.cardlist[i]) {
                            case 0:
                                server.json_data[i+1]='Seer';
                                break;
                            case 1:
                                server.json_data[i+1]='Witch';
                                break;
                            case 2:
                                server.json_data[i+1]='Hunter';
                                break;
                            case 3:
                                server.json_data[i+1]='Knight';
                                break;
                            case 4:
                                server.json_data[i+1]='Wolfking';
                                break;
                            case 5:
                                server.json_data[i+1]='Wolf';
                                break;
                            case 6:
                                server.json_data[i+1]='Wolf';
                                break;
                            case 7:
                                server.json_data[i+1]='Villager';
                                break; 
                            case 8:
                                server.json_data[i+1]='Villager';
                                break;
                            case 9:
                                server.json_data[i+1]='Villager';
                                break;
                       } 
                       console.log(server.cardlist[i]);
                    }
                    fs.writeFileSync('wolf.json', JSON.stringify(server.json_data));
                }
            }
            else{
                console.log('Player '+socket.player.id+' Unready!'+ --server.PlayerReadyNUM);
                server.playerReady[socket.player.id]=0;
            }
        });
        socket.on('update',function(){
            socket.emit('getcard',server.playernum,server.cardlist);
        });
        socket.on('disconnect',function(){
            console.log('Disconnect player '+ socket.player.id+', '+ --server.PlayerNUM);
            server.PlayerReadyNUM = server.PlayerReadyNUM - server.playerReady[socket.player.id];
            for(i=socket.player.id+1; i<server.playernum.length; i++){
                server.playernum[i]--;
            }
        });
        socket.on('reset',function(){
            console.log('Reset!');
            server.lastPlayerID = 0;
            server.PlayerNUM = 1;
            server.PlayerReadyNUM = 0;
            server.playernum = [];
            server.cardlist = randomArray(10);
            done = false;
            players = [];
        });
    });
    socket.on('getjson',function(){
        socket.emit('json',server.json_data);
    });
    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}
function randomArray (high) {
    for (var a=[],i=0;i<high;++i) a[i]=i;
    a = shuffle(a);
    return a;
}
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}
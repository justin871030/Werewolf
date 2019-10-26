

var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.ReadyState = function(ReadyorNot){
  Client.socket.emit('ready',ReadyorNot);
};

Client.Reset = function(ReadyorNot){
  Client.socket.emit('reset');
};

Client.socket.on('allready',function(){
  Client.socket.emit('update');
});

Client.socket.on('newplayer',function(data){
});

Client.socket.on('allplayers',function(data,id){
  Client.socket.id = id;
});

Client.socket.on('getcard',function(idlist,data){
    Game.GetCard(data[idlist[Client.socket.id]]);
});
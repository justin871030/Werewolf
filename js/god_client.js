var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};


Client.askJson = function(){
    Client.socket.emit('getjson');
};

Client.socket.on('json',function(data){
  Client.json=data;
  Game.Update();
});
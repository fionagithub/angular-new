var express=require('express');
var app=express();

app.use(express.static('webroot'));

app.get('/index.html',function(req,res){
	console.log('---dirname--',__dirname);
	res.sendFile(__dirname+'/'+'index.html');
});
var server=app.listen(8089,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log('url :',host,port);
})
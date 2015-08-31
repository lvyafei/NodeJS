var http=require("http");
var url=require("url");
var router=require("./route");

function start(){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		var postData="";
		console.log("Request "+pathname+" received.");
		if(pathname=="/uploadfile"){
			router.route(pathname,request,response,null);
		}else{
			request.setEncoding("utf-8");
			request.addListener("data",function(postDataChunk){
				postData+=postDataChunk;
        		console.log("Received POST data:"+postDataChunk+".");
			});
			request.addListener("end",function(){
				router.route(pathname,request,response,postData);
			});
		}
		console.log((new Date()).toString());
	}
	http.createServer(onRequest).listen(8888);
	console.log("begin listen port 8888....");
}
exports.start=start;

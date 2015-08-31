var handler=require("./requestHandlers");

function route(pathname,request,response,data){
	var names=pathname.split("/");
	if(pathname=="/"){
		 handler.menu(request,response,data);
	}else if(names.length>1&&(typeof handler[names[1]]=="function")){
	    handler[names[1]](request,response,data);
	}else{
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("can't find route for "+pathname);
		response.end();
	}	
}
exports.route=route;

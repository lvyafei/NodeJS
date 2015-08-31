var exec=require("child_process").exec;
var fs=require("fs");
var querystring=require("querystring");
var formidable=require("formidable");

function menu(request,response,postdata){
	fs.readFile("./menu.html",function(err,html){
		if(err){
			throw err;
		}
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(html);
		response.end();
	});
}
function start(request,response,postdata){
	console.log("request handler 'start' was called.");
	exec("find /",{timeout:10000,maxBuffer:20000*1024},function(error,stdout,stderr){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(stdout);
		response.end();
	});
}
function textpost(request,response,postdata){
	fs.readFile("./textpost.html",function(err,html){
		if(err){
			throw err;
		}
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(html);
		response.end();
	});
}
function filepost(request,response,postdata){
	fs.readFile("./filepost.html",function(err,html){
		if(err){
			throw err;
		}
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(html);
		response.end();
	});
}
function upload(request,response,postdata){
	console.log("request handler 'upload' was called.");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("You've sent : "+querystring.parse(postdata).text);
	response.end();
}
function uploadfile(request,response,postdata){
	console.log("request handler 'uploadfile' was called.");
	var form=new formidable.IncomingForm();
	form.parse(request,function(error,fields,files){
		fs.renameSync(files.upload.path,"/root/图片/new.png");
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
};
function show(request,response,postdata){
	console.log("request handler 'show' was called.");
	fs.readFile("/root/图片/new.png","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();
		}else{
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	});
}
exports.menu=menu;
exports.start=start;
exports.textpost=textpost;
exports.filepost=filepost;
exports.upload=upload;
exports.uploadfile=uploadfile;
exports.show=show;

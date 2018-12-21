var rootModelName="usercp";//根模块名
var allRequire=[];
getAllModelAndRequire(rootModelName)

function getAllModelAndRequire(Model){
	var Rquire=angular.module(Model).requires;
	if(Rquire.length){
		allRequire=allRequire.concat(formatRequire(Model,Rquire))
		for(var i=0;i<Rquire.length;i++){//去掉重复依赖的插件模块
			if(Rquire[i]==="ui.bootstrap" || Rquire[i]==="ngCookies") continue;
			getAllModelAndRequire(Rquire[i]);
		}
	}
}

function formatRequire(mod,requireArray){
	var cacheRequire=[]
	for(var j=0;j<requireArray.length;j++){
		cacheRequire[j]=mod+">"+requireArray[j];
	}
	return cacheRequire;
}

allRequire=allRequire.filter(function(ele,index,self){
	return self.indexOf(ele) === index;
});

finallyAllRequire(allRequire);
function finallyAllRequire(arrRequire){
	for(var k=0;k<arrRequire.length;k++){
		var model=arrRequire[k].substr(0,arrRequire[k].indexOf(">"));
		var require=arrRequire[k].substr(arrRequire[k].lastIndexOf(">")+1);
		console.log("\""+model+"\""+" -> "+"\""+require+"\""+";");
	}
}

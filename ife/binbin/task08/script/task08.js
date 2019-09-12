var root = document.getElementById('root');

window.onload = function(){
	
	var perO = document.getElementById('perOrder');
	var postO = document.getElementById('postOrder');
	var text = document.getElementById('keyWord').value;
	var	perS = document.getElementById('perSearch');
	var postS = document.getElementById('postSearch');
	
	var divs = [];
	var timer = null;
	
	
	perO.onclick = function(){
		clear();
		perOrder(root);
		changeColor();
		
	}
	
	postO.onclick = function(){
		clear();
		postOrder(root);
		changeColor();
		
	}
	
	perS.onclick = function(){
		clear();
		perSearch(root, text);
		
	}
	
	postS.onclick = function(){
		
	}
	
	function perOrder(node){
		if(!(node == null)){
			divs.push(node);
			for(var i = 0; i < node.children.length; i++){
				perOrder(node.children[i]);
			}
		}
	}
	
	function perSearch(node, text){
		perOrder(node);
		var i = 0;
		divs[i].style.background = '#3355d0';
		timer = setInterval(function(){
			i++;
			var test = node.childNodes.nodeValue;
			alert(test);
			/**
			if(i < divs.length){
				if(test == divs[i].innerText){
					divs[i].style.background = '#3355d0';
				}else{
					alert(divs[i].innerText);
					divs[i - 1].style.background = '#ffffff';
					divs[i].style.background = '#3355d0';
				}
				
			}else{
				clearInterval(timer);
				divs[divs.length - 1].style.background = '#ffffff';
			}*/
		
		}, 500)
		
	}
	
	function postOrder(node){
		if(!(node == null)){
			for(var i = 0; i < node.children.length; i++){
				postOrder(node.children[i]);				
			}
			divs.push(node);
			
		}
	}
	

	
	function changeColor(){
		var i = 0;
		divs[i].style.background = "#3355d0";
		timer = setInterval(function(){
			i++;
			if(i < divs.length){
				divs[i - 1].style.background = "#ffffff";
				divs[i].style.background = "#3355d0";
			}else{
				clearInterval(timer);
				divs[divs.length - 1].style.background = '#ffffff';
			}
		},500)
	}
	
	function clear(){
		divs = [];
		clearInterval(timer);
		var oDiv = document.getElementsByTagName('div');
		for(var i = 0; i < oDiv.length; i++){
			oDiv[i].style.background = "#FFFFFF";
			
		}
	}
}

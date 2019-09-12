var root = document.getElementById('root');

window.onload = function(){
	
	var perO = document.getElementById('perOrder');
	
	/* in是关键字 不能新建 */
	var inO = document.getElementById('inOrder');
	var postO = document.getElementById('postOrder');
	var divs = [];
	var timer = null;
	
	perO.onclick = function(){
		clear();
		perOrder(root);
		changeColor();
	}

	inO.onclick = function(){
		clear();
		inOrder(root);
		changeColor();
		
	}
	
	postO.onclick = function(){
		clear();
		postOrder(root);
		changeColor();
	}

	function perOrder(node){
		if(!(node == null)){
			divs.push(node);
			perOrder(node.children[0]);
			perOrder(node.children[1]);
			
		}
	}

	function inOrder(node){
		if(!(node == null)){
			inOrder(node.children[0]);
			divs.push(node);
			inOrder(node.children[1]);
		}
	}
	
	function postOrder(node){
		if(!(node == null)){
			postOrder(node.children[0]);
			postOrder(node.children[1]);
			divs.push(node);
		}
	}
	
	function changeColor(){
		var i = 0;
		divs[i].style.background =  "#3355d0";
		timer = setInterval(function(){
			i++;
			if(i < divs.length){
				divs[i - 1].style.background = "#ffffff";
				divs[i].style.background = "#3355d0";
				
			}else{
				clearInterval(timer);
				divs[divs.length - 1].style.background = "#ffffff";
			}
		},500)
	}
	/* 防止遍历同时进行 */
	function clear(){
		divs = [];
		clearInterval(timer);
		var oDiv = document.getElementsByTagName('div');
		for(var i = 0; i < oDiv.length; i++){
			oDiv[i].style.background = "#FFFFFF";
			
		}
	}
}
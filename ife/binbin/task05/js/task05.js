var num = document.getElementById('num-input');

window.onload = function(){
	var leftIn = document.getElementById('leftIn');
	var rightIn = document.getElementById('rightIn');
	var leftOut = document.getElementById('leftOut');
	var rightOut = document.getElementById('rightOut');
	var paixu = document.getElementById('sort');
	
	var left = 'left';
	var right = 'right';
	
	leftIn.onclick = function (){
		insertNum(left);
	}
	
	rightIn.onclick = function(){
		insertNum(right);
	}
	
	leftOut.onclick = function () {
		removeNum(left);
	}
	
	rightOut.onclick = function(){
		removeNum(right);
	}
	
	paixu.onclick = function(){
		sort();
	}

}
function insertNum(position){
	var regExp = /^[0-9]+$/;
	
	if(num.value ===""){
		alert("输入框不能为空");
	}
	else if(!regExp.test(num.value) && num.value!==''){
		alert('请输入一个整数');
	}
	else if(num.value < 10 || num.value >100){
		alert('请输入10-100的整数');
	}
	else{
		var container = document.getElementById('container');
		var divs = container.children[0];
		var oDiv = document.createElement('div');
		oDiv.style.height = num.value + 'px';
		if(position == 'left'){
			container.insertBefore(oDiv, divs);
		}
		if(position == 'right'){
			container.appendChild(oDiv);
		}
	}
}


function removeNum(position){
	var container = document.getElementById('container');
	var firstDiv = container.children[0];
	var lastDiv = container.lastChild;
	
	if(container.children.length == 0){
		alert("队列没有元素");
	}
	else if(position == 'left'){
		var firstHeight = firstDiv.style.height.replace('px','');
		alert("删除最左元素：" + firstHeight);
		container.removeChild(firstDiv);
	}
	else if(position == 'right'){
		var lastHeight = lastDiv.style.height.replace('px','');
		alert('删除最右元素：' + lastHeight);
		container.removeChild(lastDiv);
	}
}

function sort(){
	var container = document.getElementById('container');
	var length = container.children.length;
	var i = 0, j = 1, timer = null, temp = 0;
	
	timer = setInterval(run, 10);
	
	function run (){
		if (i < length){
			if(j < length){
				var data1 = parseInt(container.children[i].style.height.replace('px', ''));
				var data2 = parseInt(container.children[j].style.height.replace('px', ''));
				if(data1 > data2){
					temp = data1;
					data1 = data2;
					data2 = temp;
					
					container.children[i].style.height = data1 + 'px';
					container.children[j].style.height = data2 + 'px';
				}
				j++;
			}else{
				i++;
				j = i + 1;
			}
		}else{
			clearInterval(timer);
		}
	}
}

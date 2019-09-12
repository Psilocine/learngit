var text = document.getElementsByTagName('textarea');
var container = document.getElementById('container');

var data = [];

window.onload = function(){
	
	var insert = document.getElementById('insert');
	var search = document.getElementById('search');
	
	insert.onclick = function(){
		var words =text[0].value;
		words = words.replace(/[^0-9a-zA-Z]/g, ' ');
		var arr = words.split(' ');
		for(var i = 0; i < arr.length; i++){
			var oDiv = document.createElement('div');
			oDiv.innerHTML = arr[i];
			container.appendChild(oDiv);
			data.push(arr[i]);
			
		}
	}
	
	search.onclick = function(){
		var input = document.getElementById('keyWord').value;
		container.innerHTML = data.map(function(d){
			if(input != null && input.length > 0){
				d = d.replace(new RegExp(input, 'g'), '<span class="found">' + input + '</span>');
			}
			return "<div>" + d + "</div>"
		}).join('');
		
	}
	
}

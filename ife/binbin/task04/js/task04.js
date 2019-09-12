/*事件绑定 兼容browser*/
function addEvent(element, event, listener){
	if(element.addEventListener){
		element.addEventListener(event, listener, false);
		}
		else if(element.attachEvent){
			element.attachEvent('on' + event, listener, false);
		}
		else {
			element['on' + event] = listener;
		}
}

function each(arr, fn){
	for(var cur = 0; cur < arr.length; cur++){
		fn(arr[cur], cur);
	}
}

window.onload = function(){
	var container = document.getElementById('container');
	var buttonList = document.getElementsByTagName('input');
	
	var queue = {
		str: [],
		
		leftPush: function(num){
			this.str.unshift(num);
			this.paint();
		},
		
		rightPush: function(num){
			this.str.push(num);
			this.paint();
		},
		
		isEmpty: function(){
			return (this.str.length == 0);
			
		},
		
		leftPop: function(){
			if(!this.isEmpty()){
				alert(this.str.shift());
				this.paint();
			}
			else{
				alert("队列以空");
			}
		},
	
		rightPop: function(){
			if (!this.isEmpty()) {
        alert(this.str.pop());
        this.paint();
      }
      else {
        alert("队列以空");
      }
		},
		
		paint: function(){
			var str = "";
			each(this.str, function(item){str += ('<div>' + parseInt(item) + '</div>')});
			container.innerHTML = str;
			addDivDelEvent();
		},
		
		deleteID: function(id){
			console.log(id);
			this.str.splice(id, 1);
			this.paint();
		}
		
	}
	
    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            
            //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
            addEvent(container.childNodes[cur], "click", function(cur) {
                return function(){return queue.deleteID(cur)};
            }(cur));
        }
    }
	
	addEvent(buttonList[1], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.leftPush(input);
        }
        else {
            alert("Please enter an interger!");
        }
    });
    addEvent(buttonList[2], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.rightPush(input);
        }
        else {
            alert("Please enter an interger!");
        }
    });
    addEvent(buttonList[3], "click", function(){queue.leftPop()});
    addEvent(buttonList[4], "click", function(){queue.rightPop()});
	
}



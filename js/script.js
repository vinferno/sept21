var game_unordered_list=document.getElementsByTagName('ul')[0];
var li_list = document.getElementsByTagName('li');
var games = document.getElementsByClassName('game_list_item');
var global_target;



var loop_all = function(){
	for (var i= 0; i < li_list.length; i++){
		li_list[i].addEventListener('click',function(){
			fu_click(this);
		});
		li_list[i].addEventListener('mouseover',function(){
			fu_hover(this);
		});
		li_list[i].addEventListener('mouseleave',function(){
			fu_mouse_leave(this);
		});
		li_list[i].addEventListener('mousedown', function(){
			fu_mouse_down(this);
		});
		li_list[i].addEventListener('mouseup', function(){
			global_target=this;
			fu_mouse_up(this);
		});
		li_list[i].addEventListener('touchstart', function(event){ 	
			fu_touch_start(event);
		});
		li_list[i].addEventListener('touchend', function(event){ 
			global_target=this;
			fu_touch_end(event);
		});
	}
	submit_listeners();
};
var fu_minus_click = function(){

	var minus_list = document.getElementsByClassName('minus');
	for (var i=0;i<minus_list.length;i++){
		minus_list[i].addEventListener('click',function(){
		global_target=this.parentNode;
		global_target.classList.add('deleted');
		document.getElementById('alert').classList.remove('hidden');
		document.getElementById('alert').innerText = "UNDO DELETE: " + global_target.innerText.replace('-','');
		fu_alert_box();
		});
	}

};
var loop_all_remove = function(){
	for (var i= 0; i < li_list.length; i++){
		var el = li_list[i],
    	elClone = el.cloneNode(true);
		el.parentNode.replaceChild(elClone, el);
	}
};
var fu_click= function(target){
	fu_undo_check(target);
};
var fu_hover= function(target){
	target.classList.add("hover");
	make_minus(target);
	fu_open_form(target);
	if (li_list[0] === target){
		target.classList.remove('hover');
	}
};
var fu_mouse_leave= function(target){
	target.classList.remove("hover");
	remove_minus(target);
	fu_close_form(target);
};
function make_minus(target){
	if (target.id === "alert"){return;}
	if (target.classList.contains('title') || target.classList.contains('form')){return;}
	if (target.children.length<1){
		var new_minus = document.createElement('div');
		target.appendChild(new_minus);
		new_minus.innerHTML = '<div class="minus_center"></div>'; 
		new_minus.classList.add("minus");
	}
	fu_minus_click();
}
function remove_minus(target){
	if (target.children.length==1) {
		target.removeChild(target.children[0]);
	}
}
function fu_open_form(target){
	if (target.classList.contains('title') || target.classList.contains('form')){
		li_list[1].classList.add('open');
		li_list[1].classList.remove('closed');
		document.getElementById("name_input_box").focus(); 
	}
}
function fu_close_form(target){
	document.getElementById("name_input_box").blur();
	if (target.classList.contains('form')){
		li_list[1].classList.remove('open');
		li_list[1].classList.add('closed');			
	}
}
function add_game(name_value){
   	var new_game = name_value.toUpperCase();
   	new_game = new_game.replace(/^\s+/, '').replace(/\s+$/, '');
   	if (new_game===''|| new_game===null){
   		return ;
   	}
   	for (var i = 0; i < games.length; i++) {   	
   		if (new_game === games[i].innerText){
   		document.getElementById('alert').innerText="YOU ALREADY HAVE THIS";
   		document.getElementById('alert').classList.remove('hidden');
   		fu_alert_box();
   		return;
   		}
   	}
   	var new_li = document.createElement('li');
   	new_li.innerText = name_value; 
	game_unordered_list.appendChild(new_li);
	new_li.innerText = name_value.toUpperCase(); 
	new_li.classList.toggle("game_list_item");
	document.getElementById("name_input_box").blur();
}
var submit_listeners = function(){
	document.getElementById('add_submit_button').addEventListener('click',function(){
		var name_value = document.getElementById("name_input_box").value;
		add_game(name_value);
		li_list[1].classList.toggle("closed");
		li_list[1].classList.toggle("open");
		document.getElementById("name_input_box").value='';
		loop_all_remove();
		loop_all();
	});
	document.getElementById("name_input_box").addEventListener('keydown', function(){    
        if(event.keyCode == 13) {
            document.getElementById('add_submit_button').click();       
    	}
	});

};

var fu_rename = function(){
	for (var i = 0; i< games.length; i++) {
		if (games[i].children.length === 2){
			var new_string =games[i].children[0].value.toUpperCase();
			games[i].innerHTML='';
			games[i].innerText=new_string;
		}
	}
};
//////////////////////////////////swipe///////////////////////////////////////////////////
var start_swipe = 0;
var end_swipe = 0;
var threshold = 100;
var y_threshold = 50;
var	start_swipe_y = 0;
var end_swipe_y = 0;
var fu_mouse_down = function(target){
	start_swipe = event.clientX;
	start_swipe_y = event.clientY;
};
var fu_mouse_up = function(target){
	end_swipe = event.clientX;
	end_swipe_y= event.clientY;
	if (start_swipe_y < end_swipe_y){
		if (end_swipe_y - start_swipe_y > y_threshold){
			//alert("crooked fingers");
			//alert(end_swipe_y - start_swipe_y);
		}
	} 
	if (start_swipe_y > end_swipe_y){
		if (start_swipe_y - end_swipe_y > y_threshold){
			//alert("crooked fingers");
			//alert(start_swipe_y - end_swipe_y)
		}
	}       			
	if (start_swipe + threshold< end_swipe ){
		global_target.classList.add('deleted');
		document.getElementById('alert').classList.remove('hidden');
		document.getElementById('alert').innerText = "UNDO DELETE: " + global_target.innerText.replace('-','');
		fu_alert_box();
		//global_target.remove(global_target);						
	}
	if (start_swipe > end_swipe + threshold){
		//alert('swipe left')
	}
};
var fu_touch_start = function(event){		
	start_swipe = event.touches[0].pageX;
	start_swipe_y = event.touches[0].pageY;
}; 
var fu_touch_end = function(event){
	end_swipe = event.changedTouches[0].pageX;
	end_swipe_y = event.changedTouches[0].pageY;
	if (start_swipe_y < end_swipe_y){
		if (end_swipe_y - start_swipe_y > y_threshold){
			//alert("crooked fingers");
			//alert(end_swipe_y - start_swipe_y);
		}
	} 
	if (start_swipe_y > end_swipe_y){
		if (start_swipe_y - end_swipe_y > y_threshold){
			//alert("crooked fingers");
			//alert(start_swipe_y - end_swipe_y)
		}
	}       			
	if (start_swipe + threshold< end_swipe ){
		if (global_target.classList.contains('game_list_item')){
			global_target.classList.add('deleted');
			document.getElementById('alert').classList.remove('hidden');
			document.getElementById('alert').innerText = "UNDO DELETE: " + global_target.innerText.replace('-','');
			fu_alert_box();
		}
				
	}
	if (start_swipe > end_swipe + threshold){
		//alert('swipe left')

		if(global_target.innerText === "RENAME"){return;}
		if (global_target.classList.contains('game_list_item')){
			for (var i = 0; i< games.length; i++) {
				if (games[i].children.length === 2){
					var new_string =games[i].children[0].value.toUpperCase();
					games[i].innerHTML='';
					games[i].innerText=new_string.toUpperCase();
				}
			}
		var new_text_box = document.createElement('input');
		var new_button = document.createElement('button');
		new_text_box.type = "text";
		new_button.type = 'submit';
		new_text_box.id = "rename";
		new_button.id = 'rename_button';
		new_text_box.value=global_target.innerText;
		new_button.innerText = "RENAME";
		global_target.innerText = '';
		global_target.appendChild(new_text_box);
		global_target.appendChild(new_button);
		new_button.addEventListener('click',fu_rename);
		}
	}
};
var fu_alert_box = function(){
	
	var alert_interval =setInterval(function(){	 	
		document.getElementById('alert').classList.add('hidden');
		clearInterval(alert_interval);
		for (var i=0;i<li_list.length;i++){
			if (li_list[i].classList.contains('deleted')){
				li_list[i].remove(li_list[i]);
			}
		}
	}, 4000);
};
var fu_undo_check = function(target){
	if (target.id === "alert"){
		for (var i=0;i<li_list.length;i++){
			if (li_list[i].classList.contains('deleted')){
				li_list[i].classList.remove('deleted');
			}
		}
		document.getElementById('alert').innerText = "UNDO SUCCESSFUL";
	}
};



loop_all();

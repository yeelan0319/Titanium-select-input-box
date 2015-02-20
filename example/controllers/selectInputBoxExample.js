var SelectInputBox = require('/selectInputBox');
var args = arguments[0] || {};

var opts = {
	data: ['choco', 'mika', 'tora', 'jack']
};

var selectInputBox = new SelectInputBox(opts);
var selectInputBox2 = new SelectInputBox(opts);
$.container.add(selectInputBox.getView());
$.container2.add(selectInputBox2.getView());

function inContainer(containerName, source){
	while(source){
		if(source.id === containerName){
			return true;
		}
		source = source.parent;
	}
	return false;
};
$.window.addEventListener("click", function(e){
	if(!inContainer("container", e.source)){
		selectInputBox.blur();
	}
	if(!inContainer("container2", e.source)){
		selectInputBox2.blur();
	}	
});

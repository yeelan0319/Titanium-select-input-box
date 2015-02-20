;(function() {
	function SelectInputBox(opts){
		var that = this;
		var data = opts.data;
		var matchedData = _.first(data, SelectInputBox.SELECT_ITEM_MAX_IN_VIEW);	
		var dataList = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: "vertical"
		});
		var textField = Ti.UI.createTextField({
			width : Ti.UI.FILL,
			height : 29,
			paddingLeft: "5px",
			textAlign : 'left',
			font : {
				fontSize : "13dp"
			},
			color : "#333",
			verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var textFieldSeparator = Ti.UI.createView({
			height : 1,
			left : 1,
			right : 1,
			borderWidth : 1,
			borderColor : '#ddd'
		});
		var textFieldView = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : 30,
			layout: "vertical"
		});
		var selectInputBox = Ti.UI.createView({
			top: 0,
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: "vertical"
		});
		
		// Bind requested event
		textField.addEventListener("focus", function(){
			that.renderDataList(matchedData);
			selectInputBox.add(dataList);
		});
		textField.addEventListener("blur", function(){
			selectInputBox.remove(dataList);
		});
		textField.addEventListener("change", function(e){
			matchedData = [];
			if(e.value.length !== 0){
				var regex = new RegExp('^' + e.value);
				for(var i = 0, l = data.length; i < l; i++){
					if(regex.test(data[i])){
						matchedData.push(data[i]);
					}
					if(matchedData.length >= SelectInputBox.SELECT_ITEM_MAX_IN_VIEW) break;
				}
			}
			else{
				console.log("here!!")
				matchedData = _.first(data, SelectInputBox.SELECT_ITEM_MAX_IN_VIEW);
			}
			that.renderDataList(matchedData);
		});
		
		textFieldView.add(textField);
		textFieldView.add(textFieldSeparator);		
		selectInputBox.add(textFieldView);
		
		this.data = data;
		this.dataList = dataList;
		this.textField = textField;
		this.selectInputBox = selectInputBox;
		return this;
	}
	
	SelectInputBox.SELECT_ITEM_HEIGHT = '44dp';
	SelectInputBox.SELECT_ITEM_MAX_IN_VIEW = 8;
	
	SelectInputBox.prototype.getView = function(){
		return this.selectInputBox;
	};
	SelectInputBox.prototype.getValue = function(){
		this.textField.getValue();
	};
	SelectInputBox.prototype.blur = function(){
		this.textField.blur();
	};
	SelectInputBox.prototype.renderDataList = function(data){
		var that = this;
		that.dataList.removeAllChildren();
		_.each(data, function(content){
			var label = Ti.UI.createLabel({
				left: "5px",
                textAlign : 'left',
				font : {
					fontSize : "13dp"
				},
				color : "#333",
				text: content
			});
			var view = Ti.UI.createView({
				width: Ti.UI.FILL,
                height: SelectInputBox.SELECT_ITEM_HEIGHT,
                borderWidth: "1px",
                borderColor: "#ccc"
			});
			view.addEventListener("singletap", function(){
				that.textField.setValue(content);
				that.textField.blur();
			});
			view.add(label);
			that.dataList.add(view);
		});
	};

	module.exports = SelectInputBox;
})(); 
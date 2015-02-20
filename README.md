# Titanium-select-input-box
This module simulates the HTML5 input that associate with a predefined datalist on the native mobile application using Titanium SDK

The inital idea is to have something work like the following picture.
![select input box](http://www.uitutorial.com/wp-content/uploads/2013/08/select-chosen-demo.png)

Basically it is a input box with some predefined datalist. As user input, the dropdown list will be filtered. However, it is still different from picker since it gives the user power to go beyond this list. In other word, the list is more like a suggestion or short-cut if it matches something in the list.


<br>

##How to use it
The module is written in CommonJS style.
Assuming you put it in the "/lib" folder under "/app" for an Alloy project.
Then simply require it as following.

    var SelectInputBox = require('/selectInputBox');
    
To create a new select input box instance, you can pass in the datalist.

	var opts = {
		data: ['Choco', 'Mika', 'Tora', 'Jack']  // The list of cats name
	};

	var selectInputBox = new SelectInputBox(opts);
	
	$.container.add(selectInputBox.getView());   //put the selectInputBox view in some container
	
The constructor function will return you a selectInputBox object with the following APIs.

<br>


##APIs
###getView()
Returns the select input box view, so you can inject into some container in your view.

Return: Ti.UI.View


###getValue()
Returns the value of the input box. 

Return: String

###blur()
Blur the input box. If may be useful when you try to bind a event to window, so if the user clicked other part of the screen it will blur the input box.

<br>
##Static Parameters
###SELECT_ITEM_HEIGHT
Set the default height of the selectable datalist view. 

Default: 44px

###SELECT_ITEM_MAX_IN_VIEW
Set the maxium number of selection shown. 

Default: 8


<br>
##Things need to be improved
####Android cannot hide the datalist properly
The current version works fine with iOS. 

However, it has some trouble dealing with android for the moment since android always try to auto-focus on the first input box it can find in the window. So when this happens to be the first input in the window, the datalist cannot be hidden properly. 

The current workaround is set a dummy textField off-screen, which you can see in the example file.

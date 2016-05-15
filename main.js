"use strict";

var form = document.forms.system,
	formEquation = document.forms.equation,
	systemDimensionEl = form.systemDimension,
	buttonFormEl = form.enterSystemDimension,
	buttonProcess = document.createElement("button");

/*
* Render inputs
*/
buttonFormEl.onclick = function(e){
	e.preventDefault();
	formEquation.innerHTML = '';

	for (var i = 1; i <= systemDimensionEl.value; i++) {
		var div = document.createElement("div");
		div.className += "equation-div";

		for (var j = 1; j <= systemDimensionEl.value; j++) {
			
			insertInput(div, "x" + i + j, "a[" + i + "][" + j + "]", i);

			// insert last b input	
			if(j == systemDimensionEl.value) {
				insertInput(div, "b" + i, "b[" + i + "]", i);
			}
		}

		formEquation.appendChild(div);
	}

	//append process button 
	
	buttonProcess.innerHTML = "Process!";
	buttonProcess.id = "process";
	formEquation.appendChild(buttonProcess);

}
buttonProcess.onclick = function(e) {
	e.preventDefault();
	var matrix = getMatrix();
}

/*
* Append inputs
*/
function insertInput(div, labelHTML, inputName, level) {
	var input = document.createElement("input");
	var label = document.createElement("label");
	var levelAttr = document.createAttribute("level");

	label.innerHTML = labelHTML;
	input.type = "number";
	label.for = input.name = input.id = inputName; 
	levelAttr.value = level;  
	input.setAttributeNode(levelAttr);

	div.appendChild(input);
	div.appendChild(label);
}

/* 
* Gets inserted values and returns array
*/
function getMatrix() {
	var inputs = formEquation.getElementsByTagName("input");
	var resultArray = [];
	for (var i = 0; i < inputs.length; i++) {		
		resultArray[inputs[i].getAttribute('level')] = [];
	}
	for (var i = 0; i < inputs.length; i++) {
		resultArray[inputs[i].getAttribute('level')].push(inputs[i].value);
	}
	
	return resultArray;
}
<<<<<<< HEAD
var form = document.forms.system;
	formEquation = document.forms.equation,
	systemDimensionEl = form.systemDimension,
	buttonFormEl = form.enterSystemDimension;

=======
"use strict";

var form = document.forms.system,
	formEquation = document.forms.equation,
	systemDimensionEl = form.systemDimension,
	buttonFormEl = form.enterSystemDimension,
	buttonProcess = document.createElement("button");

/*
* Render inputs
*/
>>>>>>> gh-pages
buttonFormEl.onclick = function(e){
	e.preventDefault();
	formEquation.innerHTML = '';

	for (var i = 1; i <= systemDimensionEl.value; i++) {
		var div = document.createElement("div");
		div.className += "equation-div";

		for (var j = 1; j <= systemDimensionEl.value; j++) {
<<<<<<< HEAD
			var input = document.createElement("input");
			var label = document.createElement("label");
			label.innerHTML = "x" + i + j;
			input.type = "number";
			label.for = input.name = input.id = "a[" + i + "][" + j + "]"; 
			
			div.appendChild(input);
			div.appendChild(label);


			// insert last b input	
			if(j == systemDimensionEl.value) {
				var input = document.createElement("input");
				var label = document.createElement("label");
				label.innerHTML = "b" + i;
				input.type = "number";
				label.for = input.name = input.id = "b[" + i + "]"; 
				div.appendChild(input);
				div.appendChild(label);
			}

=======
			
			insertInput(div, "x" + i + j, "a[" + i + "][" + j + "]", i);

			// insert last b input	
			if(j == systemDimensionEl.value) {
				insertInput(div, "b" + i, "b[" + i + "]", i);
			}
>>>>>>> gh-pages
		}

		formEquation.appendChild(div);
	}

<<<<<<< HEAD
	//insert process
	var buttonProcess = document.createElement("button");
=======
	//append process button 
	
>>>>>>> gh-pages
	buttonProcess.innerHTML = "Process!";
	buttonProcess.id = "process";
	formEquation.appendChild(buttonProcess);

<<<<<<< HEAD
=======
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
>>>>>>> gh-pages
}
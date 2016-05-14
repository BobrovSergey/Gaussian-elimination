var form = document.forms.system;
	formEquation = document.forms.equation,
	systemDimensionEl = form.systemDimension,
	buttonFormEl = form.enterSystemDimension;

buttonFormEl.onclick = function(e){
	e.preventDefault();
	formEquation.innerHTML = '';

	for (var i = 1; i <= systemDimensionEl.value; i++) {
		var div = document.createElement("div");
		div.className += "equation-div";

		for (var j = 1; j <= systemDimensionEl.value; j++) {
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

		}

		formEquation.appendChild(div);
	}

	//insert process
	var buttonProcess = document.createElement("button");
	buttonProcess.innerHTML = "Process!";
	buttonProcess.id = "process";
	formEquation.appendChild(buttonProcess);

}
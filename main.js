"use strict";

var form = document.forms.system,
	formEquation = document.forms.equation,
	systemDimensionEl = form.systemDimension,
	buttonFormEl = form.enterSystemDimension,
	buttonProcess = document.createElement("button"),
	resultEl = document.getElementById("result");

/*
* Render inputs
*/
buttonFormEl.onclick = function(e){
	e.preventDefault();
	formEquation.innerHTML = resultEl.innerHTML = '';

	for (var i = 1; i <= systemDimensionEl.value; i++) {
		var div = document.createElement("div");
		div.className += "equation-div";

		for (var j = 1; j <= systemDimensionEl.value; j++) {
			
			insertInput(div, "x" + i + j, "a[" + i + "][" + j + "]", i - 1);

			// insert last b input	
			if(j == systemDimensionEl.value) {
				insertInput(div, "b" + i, "b[" + i + "]", i - 1);
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
	resultEl.innerHTML = ''

	var matrix = getMatrix(),
		size = matrix.length,
		result = [];


	for(var step = 0; step < size - 1; step++) {
		 
		//if first element is 0
        if (matrix[step][step] == 0){
            matrix = changePosition(matrix, size, step);
        } 

        //division to get 1
        for(var i = size; i >= step; i--) {
            matrix[step][i] = matrix[step][i] / matrix[step][step];
        }
        for(var i = step + 1; i < size; i++) {
            for(var j = size; j >= step; j--) {
                matrix[i][j] = matrix[i][j] - matrix[step][j] * matrix[i][step];
            }
        }
    }


    //finding last x
    result[size-1] = Math.round(matrix[size-1][size] / matrix[size-1][size-1]);

    //finding another
    for(var i = size - 2; i >= 0 ; i--) {
        var temp = 0;
        for(var j = size - 1; j > i; j--) {
            temp = matrix[i][j] * result[j] + temp;
            result[i] = Math.round(matrix[i][size] - temp);
        }
        
    }

    //output results
    for (var i = 0; i < result.length; i++) {
    	var div = document.createElement("div");
    	var prefix = i + 1;
    	div.innerHTML = "x" + prefix + " = " + result[i];
    	resultEl.appendChild(div);
    }
    
}

/*
* Change equations positions if first elements (a1) equial 0
*/
function changePosition(matrix, size, step) {
    for(var i = step; i <= size; i++) {
        if(matrix[i][step-1] != 0) {
            for(var j = 0; j <= size; j++) {
            	//swap elements position
                var temp = matrix[i-1][j];
                matrix[i-1][j] = matrix[i][j];
                matrix[i][j] = temp;
            }
        } 
    }
    return matrix;
};

/*
* Append inputs
*/
function insertInput(div, labelHTML, inputName, level) {
	var input = document.createElement("input"),
		label = document.createElement("label"),
		levelAttr = document.createAttribute("level");

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
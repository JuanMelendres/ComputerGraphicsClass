function buttonOkEventListener(event)
{
	var msg = document.querySelector("input[name='camera']:checked").value;
	// The update scene goes here!
	if(document.getElementById("Points").checked)
	{
		primitiveType = gl.POINTS;
		msg = msg
	}
	if(document.getElementById("Lines").checked)
	{
		primitiveType = gl.LINE_LOOP;
		msg = msg
	}
	if(document.getElementById("Solid").checked)
	{
		primitiveType = gl.TRIANGLES;
		msg = msg
	}
	document.getElementById("p-msg").innerHTML = "Selected option: " + msg; // remove!
	renderFlag = true;
}

function sliderX1EventListener(event)
{
	var sliderValue = document.getElementById("slider-x1").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	vertices[0] = sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	renderFlag = true;
}

function sliderY1EventListener(event)
{
	var sliderValue = document.getElementById("slider-y1").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue; // remove!

	// The update scene goes here!
	vertices[1] = sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	renderFlag = true;
}

function sliderX2EventListener(event)
{
	var sliderValue = document.getElementById("slider-x2").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	vertices[3] = sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	renderFlag = true;
}

function sliderY2EventListener(event)
{
	var sliderValue = document.getElementById("slider-y2").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	vertices[4] = sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	renderFlag = true;
}

function sliderX3EventListener(event)
{
	var sliderValue = document.getElementById("slider-x3").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	vertices[6] = sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	renderFlag = true;
}

function sliderY3EventListener(event)
{
	var sliderValue = document.getElementById("slider-y3").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	vertices[7] = sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	renderFlag = true;
}

function sliderRV1EventListener(event)
{
	var sliderValue = document.getElementById("slider-RV1").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[0]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderGV1EventListener(event)
{
	var sliderValue = document.getElementById("slider-GV1").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[1]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderBV1EventListener(event)
{
	var sliderValue = document.getElementById("slider-BV1").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[2]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderRV2EventListener(event)
{
	var sliderValue = document.getElementById("slider-RV2").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[3]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderGV2EventListener(event)
{
	var sliderValue = document.getElementById("slider-GV2").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[4]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderBV2EventListener(event)
{
	var sliderValue = document.getElementById("slider-BV2").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[5]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderRV3EventListener(event)
{
	var sliderValue = document.getElementById("slider-RV3").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[6]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderGV3EventListener(event)
{
	var sliderValue = document.getElementById("slider-GV3").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[7]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function sliderBV3EventListener(event)
{
	var sliderValue = document.getElementById("slider-BV3").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;	// remove!

	// The update scene goes here!
	colors[8]=sliderValue/100;
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function initEventHandler(event)
{
	// Drawing mode Ok Button
	document.getElementById("btn-Ok").addEventListener("click", buttonOkEventListener, false);

	// Position Sliders
	document.getElementById("slider-x1").addEventListener("input", sliderX1EventListener, false);
	document.getElementById("slider-y1").addEventListener("input", sliderY1EventListener, false);
	document.getElementById("slider-x2").addEventListener("input", sliderX2EventListener, false);
	document.getElementById("slider-y2").addEventListener("input", sliderY2EventListener, false);
	document.getElementById("slider-x3").addEventListener("input", sliderX3EventListener, false);
	document.getElementById("slider-y3").addEventListener("input", sliderY3EventListener, false);
	
	// Vertex Color Sliders
	document.getElementById("slider-RV1").addEventListener("input", sliderRV1EventListener, false);
	document.getElementById("slider-GV1").addEventListener("input", sliderGV1EventListener, false);
	document.getElementById("slider-BV1").addEventListener("input", sliderBV1EventListener, false);
	document.getElementById("slider-RV2").addEventListener("input", sliderRV2EventListener, false);
	document.getElementById("slider-GV2").addEventListener("input", sliderGV2EventListener, false);
	document.getElementById("slider-BV2").addEventListener("input", sliderBV2EventListener, false);
	document.getElementById("slider-RV3").addEventListener("input", sliderRV3EventListener, false);
	document.getElementById("slider-GV3").addEventListener("input", sliderGV3EventListener, false);
	document.getElementById("slider-BV3").addEventListener("input", sliderBV3EventListener, false);
}


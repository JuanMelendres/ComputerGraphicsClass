function mouseDownEventListener(event)
{
	var x = event.clientX;
	var y = event.clientY;
	var msg = "Client-coords = (" + x + " ," + y + ")";

	var rect = event.target.getBoundingClientRect();
	msg = msg + "<p>Canvas-coords = (" + (x - rect.left) + " ," + (y - rect.top) + ")";

	var xClipp = 2 * (x - rect.left) / canvas.width - 1;
	var yClipp = 2 * (rect.top - y) / canvas.height + 1;
	msg = msg + "<p>Clipping-coords = (" + xClipp + " ," + yClipp + ")";

	document.getElementById("p-msg").innerHTML = msg;

	// update screen
	vertices[0] = xClipp;
	vertices[1] = yClipp;
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	renderFlag = true;
}

function initEventHandler()
{
	canvas.addEventListener("mousedown", mouseDownEventListener, false);
}



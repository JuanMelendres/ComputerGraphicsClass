function mouseMoveEventListener(event)
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
}

function initEventHandler()
{
	canvas.addEventListener("mousemove", mouseMoveEventListener, false);
}


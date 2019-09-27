function mouseDownEventListener(event)
{
	var msg = "mouse clicked!";
	document.getElementById("p-msg").innerHTML = msg;
}

function initEventHandler()
{
	canvas.addEventListener("mousedown", mouseDownEventListener, false);
}



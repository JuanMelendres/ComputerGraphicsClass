function keyDownEventListener(event)
{
	if(event.keyCode == 37)	// Left Arrow Key
	{
		document.getElementById("p-msg").innerHTML = "Left Arrow Down";
	}
	if(event.keyCode == 39)	// Right Arrow Key
	{
		document.getElementById("p-msg").innerHTML = "Right Arrow Down";
	}
	if(event.keyCode == 38)	// Up Arrow Key
	{
		document.getElementById("p-msg").innerHTML = "Up Arrow Up";
	}
	else if(event.keyCode == 40)	// Down Arrow Key
	{
		document.getElementById("p-msg").innerHTML = "Down Arrow Up";
	}
}

function initEventHandler()
{
	document.addEventListener("keydown", keyDownEventListener, false);
}



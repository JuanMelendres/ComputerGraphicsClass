function buttonPlayEventListener(event)
{
	msg = "Play button";
	document.getElementById("p-msg").innerHTML = msg;
  flagRender = true;
}

function buttonPauseEventListener(event)
{
	msg = "Pause button";
	document.getElementById("p-msg").innerHTML = msg;
  flagRender = false;
}

function rangeSpeedEventListener(event)
{
	var rangeValue = document.getElementById("range-speed").value;
  deltaTetha = rangeValue / 10;
	document.getElementById("p-msg").innerHTML = "Value: " + rangeValue;
}

function initEventHandler()
{
	document.getElementById("button-play").addEventListener("click", buttonPlayEventListener, false);
	document.getElementById("button-pause").addEventListener("click", buttonPauseEventListener, false);
	document.getElementById("range-speed").addEventListener("input", rangeSpeedEventListener, false);
}



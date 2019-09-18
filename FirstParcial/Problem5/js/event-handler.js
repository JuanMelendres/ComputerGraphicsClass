function rangeSpeedEventListener(event)
{
	var rangeValue = document.getElementById("angle-slider").value;
  deltaTetha = rangeValue; 
  document.getElementById("p-msg").innerHTML = "Value: " + rangeValue;
  flagRender = true;
}

function initEventHandler()
{
	document.getElementById("angle-slider").addEventListener("input", rangeSpeedEventListener, false);
}



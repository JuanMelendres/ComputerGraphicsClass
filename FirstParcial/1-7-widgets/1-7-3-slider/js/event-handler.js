function rangeEventListener(event)
{
	var sliderValue = document.getElementById("range-slider").value;
	document.getElementById("p-msg").innerHTML = "Value: " + sliderValue;
}

function initEventHandler(event)
{
	document.getElementById("range-slider").addEventListener("input", rangeEventListener, false);
}


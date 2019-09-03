function buttonClickEventListener(event)
{
	var msg;
	var dataValue = parseFloat(document.getElementById("text-value").value);
	msg = dataValue;
	document.getElementById("p-msg").innerHTML = msg;
}

function initEventHandler(event)
{
	document.getElementById("button-Ok").addEventListener("click", buttonClickEventListener, false);
}


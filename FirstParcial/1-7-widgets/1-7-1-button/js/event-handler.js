function buttonClickEventListener(event)
{
	document.getElementById("p-msg").innerHTML = "button clicked!";
}

function initEventHandler(event)
{
	document.getElementById("button-click").addEventListener("click", buttonClickEventListener, false);
}


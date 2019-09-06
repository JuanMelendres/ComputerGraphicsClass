
function buttonClickEventListener(event)
{
	var msg = document.querySelector("input[name='camera']:checked").value;
	document.getElementById("p-message").innerHTML = "Selected option: " + msg;

	renderScene();
}

function initEventHandler(event)
{
	document.getElementById("btn-click").addEventListener("click", buttonClickEventListener, false);
}
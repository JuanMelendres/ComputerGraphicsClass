function buttonClickEventListener(event)
{
	var msg = "";
	if(document.getElementById("chb-soccer").checked)
	{
		msg = msg + "soccer, "
	}
	if(document.getElementById("chb-baseball").checked)
	{
		msg = msg + "baseball, "
	}
	if(document.getElementById("chb-basketball").checked)
	{
		msg = msg + "basketball, "
	}
	if(msg == "")
	{
		msg = "None";
	}	
	document.getElementById("p-msg").innerHTML = "Selected options: " + msg;

	renderScene();
}

function initEventHandler(event)
{
	document.getElementById("btn-click").addEventListener("click", buttonClickEventListener, false);
}


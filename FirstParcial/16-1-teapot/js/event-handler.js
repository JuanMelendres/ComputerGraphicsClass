function keyDownEventListener(event)
{
	if(event.keyCode == 32)	// Space bar
	{
		if(multiview)
		{
			document.getElementById("p-msg").innerHTML = "Single view!";
		}
		else
		{
			document.getElementById("p-msg").innerHTML = "Multiview!";
		}
		multiview = !multiview;
	}
}

function mouseDownEventListener(event)
{
	dragging = true;
	var x = event.clientX;
	var y = event.clientY;
	var rect = event.target.getBoundingClientRect();
	x = x - rect.left;
	y = y - rect.top;
	xLast = x;
	yLast = y;
}

function mouseUpEventListener(event)
{
	dragging = false;	// mouse is released
}

function mouseMoveEventListener(event)
{
	if(dragging)
	{	
		var x = event.clientX;
		var y = event.clientY;
		var rect = event.target.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		dragMode = document.querySelector("input[name='camera']:checked").value;
		if(dragMode == "ROTATE")
		{
			var factor = 10. / canvas.height; // The rotation ratio
			var dx = factor * (x - xLast);
			var dy = factor * (y - yLast);
			// Limit x-axis rotation angle to [-90, 90] degrees
			rotX = Math.max(Math.min(rotX + dy, 90.), -90.);
			rotY = rotY + dx;

		} else if(dragMode == "PAN")
		{ 				
			var deltaX = (x - xLast) / 63.0;
			var deltaY = (y - yLast) / (-63.0);
			eyeX = eyeX + deltaX;
			eyeY = eyeY + deltaY;
			centerX = centerX + deltaX;
			centerY = centerY + deltaY;
			cameraRadius = Math.sqrt(eyeX * eyeX + eyeY * eyeY + eyeZ * eyeZ);
		} else if(dragMode == "ZOOM")
		{
			var difX = x - xLast;
			var difY = y - yLast;
			if (Math.abs(difX) > Math.abs(difY))
			{
				eyeZ = eyeZ + difX / 10.0;
			}
			else
			{
				eyeZ = eyeZ + difY / 10.0;
			}
			cameraRadius = Math.sqrt(eyeX * eyeX + eyeY * eyeY + eyeZ * eyeZ);
		}
		xLast = x;
		yLast = y;
	}
}

function buttonHomeClickEventListener(event)
{
	eyeX = eyeXo;
	eyeY = eyeYo;
	eyeZ = eyeZo;
	centerX = centerXo;
	centerY = centerYo;
	centerZ = centerZo;
	upX = upXo;
	upY = upYo;
	upZ = upZo;
	rotX = 0.;
	rotY = 0.;
	xLast = 0;
	yLast = 0;
	viewMatrix = mat4.create();	
	tetha = 0.;
	//eye = [eyeXo, eyeYo, eyeZo];
	//center = [centerXo, centerYo, centerZo];
	//up = [upXo, upYo, upZo];
	cameraRadius = Math.sqrt(eyeXo * eyeXo + eyeYo * eyeYo + eyeZo * eyeZo);
	cameraOrbit = false;
}

function buttonOrbitClickEventListener(event)
{
	cameraOrbit = !cameraOrbit;
}

function initEventHandler()
{
	document.addEventListener("keydown", keyDownEventListener, false);
	document.addEventListener("mousedown", mouseDownEventListener, false);
	document.addEventListener("mouseup", mouseUpEventListener, false);
	document.addEventListener("mousemove", mouseMoveEventListener, false);
	document.getElementById("btn-home").addEventListener("click", buttonHomeClickEventListener, false);
	document.getElementById("btn-orbit").addEventListener("click", buttonOrbitClickEventListener, false);
}






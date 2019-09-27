"use strict"
var canvas;	
var gl;		// WebGL context
var scene;

var cameraRadius;
var tetha;
var deltaTetha;

function renderLoop()
{
	scene.render();
	scene.camera.orbit();
	requestAnimationFrame(renderLoop);
}

function main()
{
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");
	if(!gl)
	{
		console.log("Initialization of Webgl context Failed!");
		return;
	}

	gl.clearColor(0., 0., 0., 1.);	// black

	scene = new Scene();
	var t1 = new Triangle();
	scene.addModel(t1);

	requestAnimationFrame(renderLoop);	// render loop
}


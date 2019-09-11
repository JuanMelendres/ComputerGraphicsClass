"use strict"
var canvas;	
var gl;		// WebGL context
var vertices;
var indices;
var primitiveType;
var verticesBuffer;
var renderFlag = false;
var colorsBuffer;
var colors;
var pointSize = 4.;

function init()
{
	// Initialize the 3D model (the scene)

	vertices = [ 0., 0.5, 0., 		// V0
		            -0.5, -0.5, 0.,	// v1
			         0.5, -0.5, 0.	// V2
				    ];

	indices = [0, 1, 2];

	colors = [1., 0., 0., 1.,
								0., 1., 0., 1.,
								0., 0., 1., 1
						];

	// Initialize the WebGL rendering context

	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");
	if(!gl)
	{
		console.log("Initialization of Webgl context Failed!");
		return;
	}
	gl.clearColor(0., 0., 0., 1.);	// black

	// Initialize the GPU shader program
	
	var vertexShaderSrc = document.getElementById("vertexShader").text;
	var fragmentShaderSrc = document.getElementById("fragmentShader").text;
	var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
	var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
	var shaderProgram = createShaderProgram(vertexShader, fragmentShader);

	// Initialize the GPU buffers

	// Vertices buffer
	verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Indices buffer
	var indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indices), gl.STATIC_DRAW);

	// Color buffer
	colorsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	// For vertex data we use the ARRAY_BUFFER binding. Because we're copying raw data to a device, JS values must be converted to a binary floating point values
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
				
	// Configure vertex shader attributes & uniforms


	// Attributes
				
	// "aPosition" attribute
	gl.useProgram(shaderProgram);
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	var aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
	var index = aPositionLocation;	// index of the vertex attribute
	var size = 3; 	// The number of components per vertex attribute
	var type = gl.FLOAT; // The data type of each component in the array
	var normalized = false; // Whether integer values should be normalized 
	var stride = 0; // Offset in bytes between consecutive vertex attributes
	var offset = 0;	// Offset in bytes of the first component
	gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
	gl.enableVertexAttribArray(aPositionLocation);

	var uPointSizeLocation = gl.getUniformLocation(shaderProgram, "uPointSize");
	gl.uniform1f(uPointSizeLocation, pointSize);

	// "uColor" 
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
	// "aColor" attribute configuration
	// Ask shader program the "aPosition" attribute location
	var aColorLocation = gl.getAttribLocation(shaderProgram, "aColor");
	// Attach current buffer to attribute location in the shader program, indicating the type and layout of the data
	var index = aColorLocation;	// index of the vertex attribute
	var size = 4; 	// The number of components per color attribute
	var type = gl.FLOAT; // The data type of each component in the array
	var normalized = false; // Whether integer values should be normalized
	var stride = 0; // Offset in bytes between consecutive vertex attributes
	var offset = 0;	// Offset in bytes of the first component
	gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
	// Enable this attribute for rendering
	gl.enableVertexAttribArray(aColorLocation);


	// Uniforms
	// None

	// Initial Model transformation
	// None

	// Initial Viewing transformation
	// None

	// Initial Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);

	// Init Event Handler
	initEventHandler();
}

function render()
{
	// Clear the framebuffer
	gl.clear(gl.COLOR_BUFFER_BIT);
	// Draw the scene
	if (renderFlag) {
		// Draw the scene
		var count = indices.length;			// Number of elements (indices) to be rendered
		var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
		var offset = 0; 					// Bytes offset in the element array buffer
		gl.drawElements(primitiveType, count, type, offset);	
	}		

	// Call Next Frame
	requestAnimationFrame(render);	
}

function main()
{
	init();
	requestAnimationFrame(render);
}


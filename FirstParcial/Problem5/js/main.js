"use strict"
var canvas;	
var gl;		// WebGL context
var vertices;
var indices;
var tetha;
var deltaTetha;
var uModelMatrixLocation;
var flagRender = false;
var uModelMatrixLocation;
var shaderProgram;

function init()
{
	// Initialize the 3D model (the scene)

	vertices = [ 0., 0.5, 0., 		// V0
		            -0.5, -0.5, 0.,	// v1
			         0.5, -0.5, 0.	// V2
				    ];

	indices = [0, 1, 2];

	tetha = 0;
	deltaTetha = 1 * Math.PI / 180;

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
	shaderProgram = createShaderProgram(vertexShader, fragmentShader);

	// Initialize the GPU buffers

	// Vertices buffer
	var verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Indices buffer
	var indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indices), gl.STATIC_DRAW);
				
	// Configure vertex shader attributes
				
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

	// Initial Model transformation
	var modelMatrix = mat4.create();

	// Initial Viewing transformation
	// None

	// Initial Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);

	// Configure uniforms
	uModelMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelMatrix");
	gl.uniformMatrix4fv(uModelMatrixLocation, false, modelMatrix);

	// Init Event Handler
	initEventHandler();
}

function render()
{
	// Clear the framebuffer
	gl.clear(gl.COLOR_BUFFER_BIT);
	if (flagRender) {
		// Update scene
		tetha = deltaTetha * Math.PI / 180;;
		var cosTetha = Math.cos(tetha);
		var sinTetha = Math.sin(tetha);
		var xq = -0.5;
		var yq = -0.5;
		var modelMatrix = mat4.create();
		mat4.set(modelMatrix, cosTetha, sinTetha, 0, 0,
													-sinTetha, cosTetha, 0, 0,
													0, 0, 1, 0,
													xq * (1-cosTetha) + yq * sinTetha, yq * (1-cosTetha) - xq * sinTetha, 0, 1);
		// Configure uniforms
		uModelMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelMatrix");
		gl.uniformMatrix4fv(uModelMatrixLocation, false, modelMatrix);
	}
	// Draw the scene
	var primitiveType = gl.TRIANGLES;	// Primitive type to be rendered
	var count = indices.length;			// Number of elements (indices) to be rendered
	var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
	var offset = 0; 					// Bytes offset in the element array buffer
	gl.drawElements(primitiveType, count, type, offset);

	// Call next Frame
	requestAnimationFrame(render);
}

function main()
{
	init();
	requestAnimationFrame(render);	// Render loop
}


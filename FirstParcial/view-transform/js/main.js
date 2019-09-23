"use strict"
var canvas;	
var gl;		// WebGL context
var vertices;
var indices;
var shaderProgram;

function init()
{
	// Init 3D model (the scene)

	vertices = [ 0., 0.5, 0., 		// V0
		            -0.5, -0.5, 0.,	// v1
			         0.5, -0.5, 0.	// V2
				    ];

	indices = [0, 1, 2];

	// Init WebGL rendering context

	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");
	if(!gl)
	{
		console.log("Initialization of Webgl context Failed!");
		return;
	}
	gl.clearColor(0., 0., 0., 1.);	// black

	// Init GPU shader program
	
	var vertexShaderSrc = document.getElementById("vertexShader").text;
	var fragmentShaderSrc = document.getElementById("fragmentShader").text;
	var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
	var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
	shaderProgram = createShaderProgram(vertexShader, fragmentShader);

	// Init GPU buffers

	// Vertices buffer
	var verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Indices buffer
	var indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indices), gl.STATIC_DRAW);

	// Init Model transformation
	var modelMatrix = mat4.create();

	// Init View transformation
	var viewMatrix = mat4.create();
	var eyeX = 0.;
	var eyeY = 0.;
	var eyeZ = 1.;

	var centerX = 0.;
	var centerY = 0.;
	var centerZ = 0.;

	var upX = 0.;
	var upY = 1.;
	var upZ = 0.;

	mat4.lookAt(viewMatrix, [eyeX, eyeY, eyeZ], [centerX, centerY, centerZ], [upX, upY, upZ]);

	// ModelView Transform
	var modelViewMatrix = mat4.create();

	mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

	// Init Projection transformation
	var projMatrix = mat4.create();
	var fovy = 60. * Math.PI / 180;
	var aspect = canvas.width / canvas.height;
	var near = 0.1;
	var far = 1000;
	mat4.perspective(projMatrix, fovy, aspect, near, far);
	var projModelViewMatrix = mat4.create();
	mat4.multiply(projModelViewMatrix, projMatrix, modelViewMatrix);

	// Init Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);

	// Init attributes & uniforms

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

	// Uniforms
	var uProjModelMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjViewModelMatrix");
	gl.uniformMatrix4fv(uProjModelMatrixLocation, false, projModelViewMatrix);


	// Init Event Handler
	initEventHandler();
}

function render(currentTime)
{
	// Clear framebuffer
	gl.clear(gl.COLOR_BUFFER_BIT);
				
	// Draw scene
	var primitiveType = gl.TRIANGLES;	// Primitive type to be rendered
	var count = indices.length;			// Number of elements (indices) to be rendered
	var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
	var offset = 0; 					// Bytes offset in the element array buffer
	gl.drawElements(primitiveType, count, type, offset);

	// Call Next Frame
	requestAnimationFrame(render);	
}

function main()
{
	init();
	requestAnimationFrame(render);	// render loop
}


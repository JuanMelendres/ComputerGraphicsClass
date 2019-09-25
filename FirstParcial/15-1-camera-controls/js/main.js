"use strict"
var canvas;	
var gl;		// WebGL context
var vertices;
var indices;
var shaderProgram;
var modelMatrix;
var viewMatrix;
var multiview = false;
var eyeXo, eyeYo, eyeZo;
var centerXo, centerYo, centerZo;
var upXo, upYo, upZo;
var eyeX, eyeY, eyeZ;
var centerX, centerY, centerZ;
var upX, upY, upZ;
var cameraRadius;
var tetha;
var deltaTetha;

var dragMode = "ROTATE";
var dragging = false;	// Dragging or not
var cameraOrbit = false;
						// Mouse's parameteres
var xLast = 0;			// Last position
var yLast = 0;			
var rotX = 0.;			// Acumlulation
var rotY = 0.;

function init()
{
	// Init 3D model (the scene)

	vertices = [ -1., 0., -1., 	// V0
		         -1., 0., 1.,	// v1
			     1., 0., 1.,	// V2
			     1., 0., -1.,	// V3
			     0., 1., 0.	// V4
			   ];

	indices = [0, 1, 2, 3, 0, 4, 3, 2, 4, 1];

	// init camera
	eyeXo = 1.;
	eyeYo = 1.;
	eyeZo = 3.;
	centerXo = 0.;
	centerYo = 0.;
	centerZo = 0.;
	upXo = 0.;
	upYo = 1.;
	upZo = 0.;
	eyeX = eyeXo;
	eyeY = eyeYo;
	eyeZ = eyeZo;
	centerX = centerXo;
	centerY = centerYo;
	centerZ = centerZo;
	upX = upXo;
	upY = upYo;
	upZ = upZo;
	cameraRadius = Math.sqrt(eyeXo * eyeXo + eyeYo * eyeYo + eyeZo * eyeZo);
	tetha = 0;
	deltaTetha = 2. * Math.PI / 180.;

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
	modelMatrix = mat4.create();

	// Init View transformation

	// Init View transformation
	
	var eye = [eyeXo, eyeYo, eyeZo];
	var center = [centerXo, centerYo, centerZo];
	var up = [upXo, upYo, upZo];

	viewMatrix = mat4.create();
	mat4.lookAt(viewMatrix, eye, center, up);

	// Init ModelView transformation

	// Init Projection transformation

	// Init ModelViewProjection transformation

	// Init Viewport transformation

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

	// Init Event Handler
	initEventHandler();
}

function render(currentTime)
{
	// Clear framebuffer
	gl.clear(gl.COLOR_BUFFER_BIT);

	if(multiview)
	{
		// View 1 (Perspective View)

		// View transformation
		var eye = [eyeX, eyeY, eyeZ];
		var center = [centerX, centerY, centerZ];
		var up = [upX, upY, upZ];

		mat4.lookAt(viewMatrix, eye, center, up);
		mat4.rotate(viewMatrix, viewMatrix, rotX, [1., 0., 0.]);
		mat4.rotate(viewMatrix, viewMatrix, rotY, [0., 1., 0.]);

		// ModelView transformation
		var modelViewMatrix = mat4.create();	
		mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);	// Mmodel-view = Mview Mmodel

		// Init Projection transformation
		// Perspective projection
		var fovy = 60. * Math.PI / 180;
		var aspect = canvas.width / canvas.height;
		var near = 0.1;
		var far = 1000.;
		var projMatrix = mat4.create();
		mat4.perspective(projMatrix, fovy, aspect, near, far);

		// Init ModelViewProjection transformation
		var modelViewProjMatrix = mat4.create();	
		mat4.multiply(modelViewProjMatrix, projMatrix, modelViewMatrix);	// Mmodel-view-proj = Mproj Mview Mmodel

		// Uniforms
		var uModelViewProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewProjMatrix");
		gl.uniformMatrix4fv(uModelViewProjMatrixLocation, false, modelViewProjMatrix);

		// Viewport Transformation
		gl.viewport(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
					
		// Draw scene
		var primitiveType = gl.LINE_STRIP;	// Primitive type to be rendered
		var count = indices.length;			// Number of elements (indices) to be rendered
		var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
		var offset = 0; 					// Bytes offset in the element array buffer
		gl.drawElements(primitiveType, count, type, offset);	

		// View 2 (Top View)

		// View transformation
		var eye = [0., 3., 0.];
		var center = [0., 0., 0.];
		var up = [0, 0., 1.];

		var viewMatrix2 = mat4.create();
		mat4.lookAt(viewMatrix2, eye, center, up);

		// ModelView transformation
		var modelViewMatrix = mat4.create();	
		mat4.multiply(modelViewMatrix, viewMatrix2, modelMatrix);	// Mmodel-view = Mview Mmodel

		// Init Projection transformation
		// Perspective projection
		var fovy = 60. * Math.PI / 180;
		var aspect = canvas.width / canvas.height;
		var near = 0.1;
		var far = 1000.;
		var projMatrix = mat4.create();
		mat4.perspective(projMatrix, fovy, aspect, near, far);

		// Init ModelViewProjection transformation
		var modelViewProjMatrix = mat4.create();	
		mat4.multiply(modelViewProjMatrix, projMatrix, modelViewMatrix);	// Mmodel-view-proj = Mproj Mview Mmodel

		// Uniforms
		var uModelViewProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewProjMatrix");
		gl.uniformMatrix4fv(uModelViewProjMatrixLocation, false, modelViewProjMatrix);

		// Viewport Transformation
		gl.viewport(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
					
		// Draw scene
		var primitiveType = gl.LINE_STRIP;	// Primitive type to be rendered
		var count = indices.length;			// Number of elements (indices) to be rendered
		var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
		var offset = 0; 					// Bytes offset in the element array buffer
		gl.drawElements(primitiveType, count, type, offset);	

		// View 3 (Front View)

		// View transformation
		var eye = [0., 0., 3.];
		var center = [0., 0., 0.];
		var up = [0, 1., 0.];

		var viewMatrix3 = mat4.create();
		mat4.lookAt(viewMatrix3, eye, center, up);

		// ModelView transformation
		var modelViewMatrix = mat4.create();	
		mat4.multiply(modelViewMatrix, viewMatrix3, modelMatrix);	// Mmodel-view = Mview Mmodel

		// Init Projection transformation
		// Perspective projection
		var fovy = 60. * Math.PI / 180;
		var aspect = canvas.width / canvas.height;
		var near = 0.1;
		var far = 1000.;
		var projMatrix = mat4.create();
		mat4.perspective(projMatrix, fovy, aspect, near, far);

		// Init ModelViewProjection transformation
		var modelViewProjMatrix = mat4.create();	
		mat4.multiply(modelViewProjMatrix, projMatrix, modelViewMatrix);	// Mmodel-view-proj = Mproj Mview Mmodel

		// Uniforms
		var uModelViewProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewProjMatrix");
		gl.uniformMatrix4fv(uModelViewProjMatrixLocation, false, modelViewProjMatrix);

		// Viewport Transformation
		gl.viewport(0, 0, canvas.width / 2, canvas.height / 2);
					
		// Draw scene
		var primitiveType = gl.LINE_STRIP;	// Primitive type to be rendered
		var count = indices.length;			// Number of elements (indices) to be rendered
		var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
		var offset = 0; 					// Bytes offset in the element array buffer
		gl.drawElements(primitiveType, count, type, offset);	

		// View 4 (Side View)

		// View transformation
		var eye = [3., 0., 0.];
		var center = [0., 0., 0.];
		var up = [0, 1., 0.];

		var viewMatrix4 = mat4.create();
		mat4.lookAt(viewMatrix4, eye, center, up);

		// ModelView transformation
		var modelViewMatrix = mat4.create();	
		mat4.multiply(modelViewMatrix, viewMatrix4, modelMatrix);	// Mmodel-view = Mview Mmodel

		// Init Projection transformation
		// Perspective projection
		var fovy = 60. * Math.PI / 180;
		var aspect = canvas.width / canvas.height;
		var near = 0.1;
		var far = 1000.;
		var projMatrix = mat4.create();
		mat4.perspective(projMatrix, fovy, aspect, near, far);

		// Init ModelViewProjection transformation
		var modelViewProjMatrix = mat4.create();	
		mat4.multiply(modelViewProjMatrix, projMatrix, modelViewMatrix);	// Mmodel-view-proj = Mproj Mview Mmodel

		// Uniforms
		var uModelViewProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewProjMatrix");
		gl.uniformMatrix4fv(uModelViewProjMatrixLocation, false, modelViewProjMatrix);

		// Viewport Transformation
		gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
					
		// Draw scene
		var primitiveType = gl.LINE_STRIP;	// Primitive type to be rendered
		var count = indices.length;			// Number of elements (indices) to be rendered
		var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
		var offset = 0; 					// Bytes offset in the element array buffer
		gl.drawElements(primitiveType, count, type, offset);	
	}
	else
	{
		// Perspective View

		// View transformation
		var eye = [eyeX, eyeY, eyeZ];
		var center = [centerX, centerY, centerZ];
		var up = [upX, upY, upZ];

		mat4.lookAt(viewMatrix, eye, center, up);
		mat4.rotate(viewMatrix, viewMatrix, rotX, [1., 0., 0.]);
		mat4.rotate(viewMatrix, viewMatrix, rotY, [0., 1., 0.]);

		// ModelView transformation
		var modelViewMatrix = mat4.create();	
		mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);	// Mmodel-view = Mview Mmodel

		// Init Projection transformation
		// Perspective projection
		var fovy = 60. * Math.PI / 180;
		var aspect = canvas.width / canvas.height;
		var near = 0.1;
		var far = 1000.;
		var projMatrix = mat4.create();
		mat4.perspective(projMatrix, fovy, aspect, near, far);

		// Init ModelViewProjection transformation
		var modelViewProjMatrix = mat4.create();	
		mat4.multiply(modelViewProjMatrix, projMatrix, modelViewMatrix);	// Mmodel-view-proj = Mproj Mview Mmodel

		// Uniforms
		var uModelViewProjMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewProjMatrix");
		gl.uniformMatrix4fv(uModelViewProjMatrixLocation, false, modelViewProjMatrix);

		// Viewport Transformation
		gl.viewport(0, 0, canvas.width, canvas.height);
					
		// Draw scene
		var primitiveType = gl.LINE_STRIP;	// Primitive type to be rendered
		var count = indices.length;			// Number of elements (indices) to be rendered
		var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
		var offset = 0; 					// Bytes offset in the element array buffer
		gl.drawElements(primitiveType, count, type, offset);		
	}

	if(cameraOrbit)
	{
		// Update scene
	  	tetha = tetha + deltaTetha;
	  	eyeX = cameraRadius * Math.sin(tetha);
	  	eyeZ = cameraRadius * Math.cos(tetha);
	}

	// Call Next Frame
	requestAnimationFrame(render);	
}

function main()
{
	init();
	requestAnimationFrame(render);	// render loop
}


"use strict"
var canvas;
var gl;		// WebGL context

function main()
{
	// Initialization code

	// 1. Initialize the 3D model (the scene)
	// For now, vertices are in clipping coordinates

	var i;
	var r = 0.5;
	var n = 20;
	var vertices = [3*n];
	var tetha = 0.;
	var deltaTetha = 2. * Math. PI / n;
	for(i = 0; i < 3*n; i++)
	{
		vertices[i] = r * Math.cos(tetha);
		i++;
		vertices[i] = r * Math.sin(tetha);
		i++;
		vertices[i] = 0;
		tetha = tetha + deltaTetha;
	}

	var indices = [n];
	for(i = 0; i < n; i++)
	{
		indices[i] = i;
	}

	var color = [0., 1., 1., 1.];	// green
	var pointSize = 3.;

	// 2. Initialize the WebGL rendering context
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");
	if(!gl)
	{
		console.log("Initialization of Webgl context Failed!");
		return;
	}
	// Set the framebuffer clear color
	gl.clearColor(0., 0., 0., 1.);	// black

	// 3. Initialize the GPU shader program
	// Get source code for vertex & fragment shaders
	var vertexShaderSrc = document.getElementById("vertexShader").text;
	var fragmentShaderSrc = document.getElementById("fragmentShader").text;
	// Create compile and load vertex and fargments shaders onto the GPU
	var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
	var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
	// Link both shaders into a shader program
	var shaderProgram = createShaderProgram(vertexShader, fragmentShader);

	// 4. Initialize the GPU buffers
	// Vertices buffer
	var verticesBuffer = gl.createBuffer();
	// Copy vertex data from the CPU to the GPU
	// First, we bind it as the current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	// For vertex data we use the ARRAY_BUFFER binding. Because we're copying raw data to a device, JS values must be converted to a binary floating point values
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	// Indices buffer
	var indicesBuffer = gl.createBuffer();
	// Copy indices (element) data from the CPU to the GPU
	// First, we bind it as the current buffer
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	// For indices (element) data we use the ELEMENT_BUFFER binding. Because we're copying raw data to a device, JS values must be converted to a binary integer values
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(indices), gl.STATIC_DRAW);

	// 5. Configure vertex shader attributes
	// Shader program doesn't know how to interpret the GPU vertex data
	// Set the current shader program
	gl.useProgram(shaderProgram);
	// Set the the current buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	// "aPosition" attribute configuration
	// Ask shader program the "aPosition" attribute location
	var aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");
	// Attach current buffer to attribute location in the shader program, indicating the type and layout of the data
	var index = aPositionLocation;	// index of the vertex attribute
	var size = 3; 	// The number of components per vertex attribute
	var type = gl.FLOAT; // The data type of each component in the array
	var normalized = false; // Whether integer values should be normalized
	var stride = 0; // Offset in bytes between consecutive vertex attributes
	var offset = 0;	// Offset in bytes of the first component
	gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
	// Enable this attribute for rendering
	gl.enableVertexAttribArray(aPositionLocation);

	// 5.1 Set uniform variables
	// "uColor"
	var uColorLocation = gl.getUniformLocation(shaderProgram, "uColor");
	gl.uniform4fv(uColorLocation, color);
	// "uPointSize"
	var uPointSizeLocation = gl.getUniformLocation(shaderProgram, "uPointSize");
	gl.uniform1f(uPointSizeLocation, pointSize);

	// Initialization code ends here!

	// Rendering code
	// 6. Model transformation

	// 7. Viewing transformation

	// 8. Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);

	// 9. Clear the framebuffer using the specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);

	// 10. Draw the scene
	// Any drawing commands will use the current shader program, the current buffer object, and the currently-enabled attributes
	var primitiveType = gl.TRIANGLE_FAN;	// Primitive type to be rendered
	var count = indices.length;			// Number of elements (indices) to be rendered
	var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
	var offset = 0; 					// Bytes offset in the element array buffer
	gl.drawElements(primitiveType, count, type, offset);
}

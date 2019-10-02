class WireframeMaterial extends Material
{
	constructor(model)
	{
		super(model, "wireframeVertexShader", "wireframeFragmentShader");
		this.type = Material.WIREFRAME;

		// Initialize buffers
		

		// The Indices Buffer
		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(model.indices_LINES), gl.STATIC_DRAW);

		this.mode = gl.LINES;	// The type primitive to render
		this.indicesCount = this.model.indices_LINES.length;	// the number of elements to be rendered
	}
}


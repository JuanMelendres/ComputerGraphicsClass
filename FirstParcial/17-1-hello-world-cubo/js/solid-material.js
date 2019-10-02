class SolidMaterial extends Material
{
	constructor(model)
	{
		super(model, "solidVertexShader", "solidFragmentShader");
		this.type = Material.SOLID;

		// Initialize buffers
		
		// The Indices Buffer
		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(model.indices_TRIANGLES), gl.STATIC_DRAW);

		this.mode = gl.TRIANGLES;	// The type primitive to render
		this.indicesCount = this.model.indices_TRIANGLES.length;	// the number of elements to be rendered
	}
}


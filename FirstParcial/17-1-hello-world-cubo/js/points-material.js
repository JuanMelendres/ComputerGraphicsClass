class PointsMaterial extends Material
{
	constructor(model)
	{
		super(model, "pointsVertexShader", "pointsFragmentShader");
		this.type = Material.POINTS;

		// Initialize buffers
		
		// Indices Buffer
		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(model.indices_POINTS), gl.STATIC_DRAW);

		this.mode = gl.POINTS;	// The type primitive to render
		this.indicesCount = this.model.indices_POINTS.length;	// the number of elements to be rendered
	}
}

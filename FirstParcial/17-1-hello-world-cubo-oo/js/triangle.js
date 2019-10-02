class Triangle extends Model
{
	constructor()
	{
		super();

		this.positions = [ 0., 0.5, 0., 	// V0
					      -0.5, -0.5, 0.,	// v1
				          0.5, -0.5, 0.		// V2
					     ];

		this.indices_POINTS = [0, 1, 2];
		this.indices_LINES = [0,1, 1,2, 2,0];
		this.indices_TRIANGLES = [0, 1, 2];

		// Positions Buffer
		this.positionsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

		this.material = new WireframeMaterial(this);
	}
}


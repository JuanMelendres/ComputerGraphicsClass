class Model
{
	constructor()
	{
		this.modelMatrix = mat4.create();
		this.material = null;		// asigned until Geometry is created
	}

	translate(tx, ty, tz)
	{
		mat4.translate(this.modelMatrix, this.modelMatrix, [tx, ty, tz]);
	}

	scale(sx, sy, sz)
	{
		mat4.scale(this.modelMatrix, this.modelMatrix, [sx, sy, sz]);
	}

	rotate(tetha, rotAxis)
	{
		mat4.rotate(this.modelMatrix, this.modelMatrix, tetha, rotAxis);
	}

	setPointsMaterial()
	{
		this.material = new PointsMaterial(this);
	}

	setWireframeMaterial()
	{
		this.material = new WireframeMaterial(this);
	}

	setSolidMaterial()
	{
		this.material = new SolidMaterial(this);
	}

	setInterpolatedColorMaterial()
	{
		this.material = new InterpolatedColorMaterial(this);
		//this.material = new SolidMaterial(this);
	}

	setColor(r, g, b, a = 1.)
	{
		this.material.setColor(r, g, b, a);
	}

	setRed()
	{
		this.material.setRed();
	}

	setGreen()
	{
		this.material.setGreen();
	}

	setBlue()
	{
		this.material.setBlue();
	}

	render(viewProjMatrix)
	{
		// Uniforms
		// Model-View-Proj Matrix
		var mvpMatrix = mat4.create();
		mat4.multiply(mvpMatrix, viewProjMatrix, this.modelMatrix);

		gl.useProgram(this.material.shaderProgram);
		var uMVPMatrixLocation = gl.getUniformLocation(this.material.shaderProgram, "uMVPMatrix");
		gl.uniformMatrix4fv(uMVPMatrixLocation, false, mvpMatrix);

		// uColor
		var uColorLocation = gl.getUniformLocation(this.material.shaderProgram, "uColor");
		gl.uniform4fv(uColorLocation, this.material.color);

		// Configure vertex attributes
		// Positions
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer);
		var aPositionLocation = gl.getAttribLocation(this.material.shaderProgram, "aPosition");
		var index = aPositionLocation;	// The index of the vertex attribute
		var size = 3; 	// The number of components per vertex attribute
		var type = gl.FLOAT; // The data type of each component in the array
		var normalized = false; // Whether integer values should be normalized 
		var stride = 0; // Offset in bytes between consecutive vertex attributes
		var offset = 0;	// Offset in bytes of the first component
		gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
		gl.enableVertexAttribArray(aPositionLocation);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.material.indicesBuffer);

		var type = gl.UNSIGNED_SHORT; // the type of the values in the element array buffer
		var offset = 0; 	// Bytes offset in the element array buffer
		gl.drawElements(this.material.mode, this.material.indicesCount, type, offset);
	}
}


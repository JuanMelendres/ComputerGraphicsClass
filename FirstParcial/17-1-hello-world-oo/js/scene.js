class Scene
{
	constructor()
	{
		this.modelList = [];
		this.camera = new Camera();
	}

	addModel(model)
	{
		this.modelList.push(model);
	}

	addCamera(camera)
	{
		this.camera = camera;
	}

	render()
	{	
		// Clear the framebuffer using the specified clear color
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Mapping from clip-space coords to the viewport
		gl.viewport(0, 0, canvas.width, canvas.height);

		// View-Proj Matrix
		var viewProjMatrix = mat4.create();
		mat4.multiply(viewProjMatrix, this.camera.projMatrix, this.camera.viewMatrix);

		for(var i = 0; i < this.modelList.length; i++)
		{
			this.modelList[i].render(viewProjMatrix);
		}
	}
}

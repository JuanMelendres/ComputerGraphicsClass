class Material
{
	constructor(model, vertexShaderName, fragmentShaderName)
	{
		this.model = model;

		Material.POINTS = 1;
		Material.WIREFRAME = 2;
		Material.SOLID = 3;

		this.type = Material.WIREFRAME;
		this.color = [1., 1., 1., 1.];	// RGBA Color (default: white)

		// Initialize the GLSL shader program
		var vertexShaderSrc = document.getElementById(vertexShaderName).text;
		var fragmentShaderSrc = document.getElementById(fragmentShaderName).text;
		var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
		var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);

		this.shaderProgram = createShaderProgram(vertexShader, fragmentShader);
	}

	setColor(r, g, b, a = 1.)
	{
		this.color = [r, g, b, a];
	}

	setRed()
	{
		this.color = [1., 0., 0., 1.];	
	}

	setGreen()
	{
		this.color = [0., 1., 0., 1.];	
	}

	setBlue()
	{
		this.color = [0., 0., 1., 1.];	
	}
}



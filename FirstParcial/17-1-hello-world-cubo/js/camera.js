class Camera
{
	constructor()
	{
		this.eyeXo = 1.;
		this.eyeYo = 1.;
		this.eyeZo = 3.;
		this.centerXo = 0.;
		this.centerYo = 0.;
		this.centerZo = 0.;
		this.upXo = 0.;
		this.upYo = 1.;
		this.upZo = 0.;

		this.currentTetha = 0.;
		this.deltaTetha = 0.5 * Math.PI / 180.;
		this.cameraRadius = Math.sqrt(this.eyeXo * this.eyeXo + this.eyeYo * this.eyeYo + this.eyeZo * this.eyeZo);

		this.home();
		this.setPerspective();
	} 

	home()
	{
		this.eye = [this.eyeXo, this.eyeYo, this.eyeZo];
		this.center = [this.centerXo, this.centerXo, this.centerZo];
		this.up = [this.upXo, this.upYo, this.upZo];

		this.viewMatrix = mat4.create();
		mat4.lookAt(this.viewMatrix, this.eye, this.center, this.up);
	}

	setPerspective()
	{
		this.projMatrix = mat4.create();
		var fovy = 60.;	// degrees
		fovy = fovy * Math.PI / 180.;
		var aspect = canvas.width / canvas.height;
		var near = 0.1;
		var far = 1000.;
		mat4.set(this.projMatrix, 1./(aspect*Math.tan(fovy/2.)),0.,0.,0.,0.,1./Math.tan(fovy/2.),0.,0.,0.,0.,(near+far)/(near-far),-1.,0.,0.,2*near*far/(near-far), 0.);
	}

	orbit()
	{
		this.currentTetha = this.currentTetha + this.deltaTetha;
		this.eye[0] = this.cameraRadius * Math.sin(this.currentTetha);
		this.eye[2] = this.cameraRadius * Math.cos(this.currentTetha);
		mat4.lookAt(this.viewMatrix, this.eye, this.center, this.up);
	}
}


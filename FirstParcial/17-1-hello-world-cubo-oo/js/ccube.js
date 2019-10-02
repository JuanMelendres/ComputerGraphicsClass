class CCube extends CompositeModel
{
 constructor()
 {
  super();

  this.front = new Square();
  this.back = new Square();
  this.left = new Square();
  this.right = new Square();
  this.top = new Square();
  this.bottom = new Square();

  // front
  this.front.translate(0., 0., 0.5);
  // back
  this.back.translate(0., 0., -0.5);
  // right
  this.right.translate(0.5, 0., 0.);
  this.right.rotate(Math.PI/2., [0., 1., 0.]);
  // left
  this.left.translate(-0.5, 0., 0.);
  this.left.rotate(-Math.PI/2., [0., 1., 0.]);
  // top
  this.top.translate(0., 0.5, 0.);
  this.top.rotate(-Math.PI/2., [1., 0., 0.]);
  // bottom
  this.bottom.translate(0., -0.5, 0.);
  this.bottom.rotate(-Math.PI/2., [1., 0., 0.]);

  this.addChild(this.front);
  this.addChild(this.back);
  this.addChild(this.right);
  this.addChild(this.left);
  this.addChild(this.top);
  this.addChild(this.bottom);
 }
}
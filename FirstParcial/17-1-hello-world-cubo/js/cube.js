class Cube extends Model
{
 constructor()
 {
  super();

  this.positions = [ -1., -1., -1.,  // V0
           -1., -1., 1., // v1
        1., -1., 1., // V2
        1., -1., -1., // V3
        -1., 1., -1., // V4
        -1., 1., 1., // V5
        1., 1., 1., // V6
        1., 1., -1., // V7
      ];

  this.indices_POINTS = [0, 1, 2, 3, 4, 5, 6, 7];
  this.indices_LINES = [0,1, 1,2, 2,3, 3,0, 4,0, 5,1, 6,2, 7,3, 4,5, 5,6, 6,7, 7,4];
  this.indices_TRIANGLES = [0,2,1, 0,3,2, 1,2,4, 2,3,4, 0,3,4, 0,4,1];

  // Positions Buffer
  this.positionsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

  this.material = new WireframeMaterial(this);
 }
}
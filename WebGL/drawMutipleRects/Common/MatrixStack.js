/* 
 * MatrixStack - class to emulate matrix stack of early OpenGL
 *   
 * @author Mike Goss (mikegoss@cs.du.edu)
 */

/**
 * Constructor - returns stack with single entry, identity matrix
 * 
 * @returns {MatrixStack}
 */
function MatrixStack() {
  this.matrixStack = [ mat4() ];
}

/**
 * Top - get matrix on top of stack
 * 
 * @returns matrix on top of stack
 */
MatrixStack.prototype.Top = function() {
  return this.matrixStack[this.matrixStack.length-1];
};

/**
 * LoadMatrix - replace matrix on stack top
 * 
 * @param m matrix to replace top of stack
 * @returns m
 */
MatrixStack.prototype.LoadMatrix = function(m) {
  this.matrixStack[this.matrixStack.length-1] = m;
  return m;
};

/**
 * PushMatrix - push a duplicate of the stack top onto the stack
 * 
 */
MatrixStack.prototype.PushMatrix = function() {
  var stackTop = this.Top();
  var newTop = mat4();
  for (var row = 0; row < 4; ++row) {
    for (var col = 0; col < 4; ++col) {
      newTop[row][col] = stackTop[row][col];
    }
  }
  this.matrixStack.push(newTop);
};

/**
 * PopMatrix - remove and return matrix at top of stack
 * 
 * @returns matrix formerly at top of stack
 */
MatrixStack.prototype.PopMatrix = function() {
  return this.matrixStack.pop();
};

/**
 * MultMatrix - post-multiply top of stack by argument, and replace top
 *   of stack with result.
 *   
 * @param m matrix to post-multiply by top of stack
 * @returns the product now on top of the stack
 */
MatrixStack.prototype.MultMatrix = function(m) {
  return this.LoadMatrix(mult(this.Top(), m));
};
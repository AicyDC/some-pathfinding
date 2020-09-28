//define vectors
var Vector = function(x, y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(vector) {
	return new Vector (this.x + vector.x, this.y + vector.y);
};
Vector.prototype.minus = function(vector) {
	return new Vector (this.x - vector.x, this.y - vector.y);
};
Vector.prototype.mul = function(scalar) {
	var answer = new Vector (this.x*scalar, this.y*scalar);
	return answer;
};
Vector.prototype.div = function(scalar) {
	return new Vector (this.x/scalar, this.y/scalar);
};
Vector.prototype.magnitude = function() {
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};
Vector.prototype.norm = function() {
	var magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	return new Vector (this.x/magnitude, this.y/magnitude)
};
Vector.prototype.distanceTo = function(vector) {
	return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2))
};
Vector.prototype.angle = function() {
	//all y values have a negative in front to match traditional coordinates
	if (this.x == 0) {
		if (this.y > 0) {
			var answer = Math.PI/2;
		} else {
			var answer = -Math.PI/2;
		}
	}
	if (this.x > 0){
		var answer = Math.atan(this.y / this.x);
	}
	if (this.x < 0){
		var answer = Math.atan(this.y / this.x) + Math.PI ;
	}
	return answer;
};
Vector.prototype.floor = function() {
	return new Vector (Math.floor(this.x), Math.floor(this.y));
}

var zeroVector = new Vector (0, 0); // this is bad



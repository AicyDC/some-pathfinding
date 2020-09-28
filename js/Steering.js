//Helper method. Returns true if this grid location in bounds
function isInBounds(x, y, gridWidth, gridHeight) {
    return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
    // return y >= 0;
}

//Helper method. Returns true if this grid location is on the grid and not impassable
function isValid(x, y, gridWidth, gridHeight, cells) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight && cells[x][y].distance != Number.MAX_VALUE;
}

function steeringBehaviourFlowField(agent, grid) {
	//Work out the force to apply to us based on the flow field grid cells we are on.
	//we apply bilinear interpolation on the 4 grid square cells directions nearest to us to work out our force
    // http://en.wikipedia.org/wiki/Bilinear_interpolation#Nonlinear
    
    const gridWidth = grid.width;
    const gridHeight = grid.height;

	var floor = agent.floor(); //Coordinate of the top left square centre out of the 4
	var x = floor.x;
	var y = floor.y;

	//The 4 weights we'll interpolate, first setting to 0 incase they aren't in bounds
	var f00 = zeroVector;
	var f01 = zeroVector;
	var f10 = zeroVector;
    var f11 = zeroVector;

	//If statements to check for going out of bounds
	if (isInBounds(x, y, gridWidth, gridHeight)) {
		f00 = grid.cells[floor.x][floor.y].direction;
	};
	if (isInBounds(x, y + 1, gridWidth, gridHeight)) {
		f01 = grid.cells[floor.x][floor.y + 1].direction;
	}
	if (isInBounds(x + 1, y, gridWidth, gridHeight))  {
		f10 = grid.cells[floor.x +1][floor.y].direction; 
	}
	if (isInBounds(x + 1, y + 1, gridWidth, gridHeight)) {
		f11 = grid.cells[floor.x + 1][floor.y + 1].direction;
	}
	//Do the x interpolations
	var xWeight = agent.x - floor.x;

	var top = f00.mul(1 - xWeight).plus(f10.mul(xWeight)); // f00*(1-w) + f10*(w)
	var bottom = f01.mul(1 - xWeight).plus(f11.mul(xWeight)) //f01*(1-w) + f11*(w)

	//Do the y interpolation
	var yWeight = agent.y - floor.y;

	//This is now the direction we want to be travelling in
	var direction = top.mul(1 - yWeight).plus(bottom.mul(yWeight)).norm();

	//If we are centered on a grid square with no vector this will happen
	if (isNaN(direction.magnitude())) {
		return zeroVector;
	}
	var desiredVelocity = direction.mul(agent.maxSpeed);

	//The velocity change we want
	var velocityChange = desiredVelocity.minus(agent.velocity);
	//Convert to a force
	return velocityChange.mul(agent.maxForce / agent.maxSpeed);
}

function steeringBehaviourLowestCost(agent, grid) {
    // const gridWidth = grid.width;
    // const gridHeight = grid.height;

	//Do nothing if the agent isn't moving
	if (agent.velocity.magnitude() == 0) {
		return zeroVector;
	}
	var floor = agent.floor(); //Coordinate of the top left square centre out of the 4
	var x = floor.x;
	var y = floor.y;

	//Find our 4 closest neighbours and get their distance value
	var f00 = Number.MAX_VALUE;
	var f01 = Number.MAX_VALUE;
	var f10 = Number.MAX_VALUE;
    var f11 = Number.MAX_VALUE;

	if (isValid(x, y, grid.width, grid.height, grid.cells)) {
		f00 = grid.cells[x][y].distance;
	};
	if (isValid(x, y + 1, grid.width, grid.height, grid.cells)) {
		f01 = grid.cells[x][y + 1].distance;
	}
	if (isValid(x + 1, y, grid.width, grid.height, grid.cells))  {
		f10 = grid.cells[x +1][y].distance; 
	}
	if (isValid(x + 1, y + 1, grid.width, grid.height, grid.cells)) {
		f11 = grid.cells[x + 1][y + 1].distance;
	}

	//Find the position(s) of the lowest, there may be multiple
	var minVal = Math.min(f00, f01, f10, f11);
	var minCoord = [];

	if (f00 == minVal) {
		minCoord.push(floor.plus(new Vector(0, 0)));
	}
	if (f01 == minVal) {
		minCoord.push(floor.plus(new Vector(0, 1)));
	}
	if (f10 == minVal) {
		minCoord.push(floor.plus(new Vector(1, 0)));
	}
	if (f11 == minVal) {
		minCoord.push(floor.plus(new Vector(1, 1)));
	} 


	//Tie-break by choosing the one we are most aligned with
	var currentDirection = agent.velocity.norm();
	var desiredDirection =  zeroVector;
	minVal = Number.MAX_VALUE;
	for (var i = 0; i < minCoord.length; i++) {
		//the direction to the coord from the agent
		var directionTo = minCoord[i].minus(agent).norm();
		//the magnitude of difference from the current vector to direction of the coord from the agent
		var magnitude = directionTo.minus(currentDirection).magnitude();
		//if it's the smallest magnitude, set it as the desiredDirection
		if (magnitude < minVal) {
			minVal = magnitude;
			desiredDirection = directionTo;
		}
	}

	//Convert to a force
	var force = desiredDirection.mul(agent.maxForce / agent.maxSpeed);
	return force;
}
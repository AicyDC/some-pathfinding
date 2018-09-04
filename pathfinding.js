//Helper method. Returns true if this grid location in bounds
function isInBounds(x, y) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;
}


//function that finds adjacent (but not diagonal) cells and returns an array of them
function neighboursOf(vector) {
	var v = vector;
	var x = v.x;
	var y = v.y;
	var neighbours = new Array();

	if (isInBounds(x - 1, y)){
		neighbours.push(grid[x - 1][y]);
	} 
	if (isInBounds(x, y - 1)){
		neighbours.push(grid[x][y - 1]);
	} 
	if (isInBounds(x + 1, y)){
		neighbours.push(grid[x + 1][y]);
	
	} 
	if (isInBounds(x, y + 1)){
		neighbours.push(grid[x][y + 1]);
	}
	return neighbours;
}



//Helper method. Returns true if this grid location is on the grid and not impassable
function isValid(x, y) {
	return x >= 0 && y >= 0 && x < gridWidth && y < gridHeight && grid[x][y].distance != Number.MAX_VALUE;
}


//Returns the non-obstructed neighbours of the given grid location.
//Diagonals are only included if their neighbours are also not obstructed
function allNeighboursOf(v) {
	var res = [],
		x = v.x,
		y = v.y;

	var left = isValid(x - 1, y),
		up = isValid(x, y - 1),
		right = isValid(x + 1, y),
		down = isValid(x, y + 1);
		

	//We test each straight direction, then subtest the next one clockwise

	if (left) {
		res.push(grid[x - 1][y]);

		//left up
		if (up && isValid(x - 1, y - 1)) {
			res.push(grid[x - 1][y - 1]);
		}
	}
	if (up) {
		res.push(grid[x][y - 1])

		//up right
		if (right && isValid(x + 1, y- 1)) {
			res.push(grid[x + 1][y - 1]);
		}
	}
	if (right) {
		res.push(grid[x + 1][y])

		//right down
		if (down && isValid(x + 1, y + 1)) {
			res.push(grid[x + 1][y + 1]);
		}
	}
	if (down) {
		res.push(grid[x][y + 1])

		//down left
		if (left && isValid(x - 1, y + 1)) {
			res.push(grid[x - 1][y + 1]);
		}
	}

	return res;
}

function allNeighboursOfPlus(v) {
	var res = [],
		x = v.x,
		y = v.y;

	var up = isValid(x, y - 1),
		upUp = isValid(x, y -2),
		down = isValid(x, y + 1);
		downDown = isValid(x, y + 2);
		left = isValid(x - 1, y),
		right = isValid(x + 1, y),
		checkThese = [up, down,];

	//go top to bottom, then inside each go out in each lengthways direction
	for (var i = 0; i < checkThese.length; i++) {
		if (checkThese[i]) {
			res.push(grid[x][y - 2 + i])

			//check topTop and downDown if top and down are valid
			if (i = 0) {
				
			}
			if (i = 1) {
				
			}

			if (left) {//left
				if (isValid(x-1, y -2 + i)){
					res.push(grid[x-1][y -2 + i]);
				} //leftleft
				if (isValid(x -2, y - 2 + i)) {
					res.push(grid[x-2][y - 2 + i]);
				}
			} 
			if (right) {//right
				if (isValid(x+1, y - 2 + i)) {
					res.push(grid[x + 1][y - 2 + i]);
				} //rightright
				if (isValid(x + 2, y -2 + i)) {
					res.push(grid[x + 2][y -2 + i]);
				}
			}

		}
	}
	return res;
}


//Give each cell a distance from the pathEnd using a dijkstra grid
function generateDijkstraGrid(pathEnd) {
	//Set all places where towers are as being weight MAXINT, which will stand for not being able to go there
	var toVisit = [pathEnd]; //array which will have more cells added to it

	//reset distances
	for (var x = 0; x < gridWidth; x++) {
			for (var y = 0; y < gridHeight; y++) {
				n = grid[x][y];
				n.distance = null;
			}
		}
	//make the towers impassable 
	for (var i = 0; i < towers.length; i++) {
		var t = towers[i];
		grid[t.x][t.y].distance = Number.MAX_VALUE;
	}
		
	pathEnd.distance = 0;

	//for each node we need to visit, starting with the pathEnd
	for (i = 0; i < toVisit.length; i++) {
		var neighbours = neighboursOf(toVisit[i]);

		//for each neighbour of this cell
		for (var j = 0; j < neighbours.length; j++) {
			var n = neighbours[j];

			//if unvisted make it's distance the current cell being visted plus one
			if (n.distance == null) {
				n.distance = toVisit[i].distance + 1;
				toVisit.push(n);
			}
		}
	}
}


function generateFlowField() {
	for (var x = 0; x < gridWidth; x++) {
		for (var y = 0; y < gridHeight; y++) {

			var cell = grid[x][y]

			//Obstacles have no flow value; leave the direction as the zero vector
			if (cell.distance == Number.MAX_VALUE) {
				continue;
			}

			var neighbours = allNeighboursOf(cell);

			//Go through all neighbours and find the one with the lowest distance
			var min = null;
			var minDist = 0;
			for (var i = 0; i < neighbours.length; i++) {
				var n = neighbours[i];
				var dist = n.distance - cell.distance;

				if (dist < minDist && n.distance != null) {
					min = n;
					minDist = dist;
				}
			}
			//If we found a valid neighbour, point in its direction
			if (min != null) {
				cell.direction = min.minus(cell).norm();
			}
		}
	}
}


function steeringBehaviourFlowField(agent) {
	//Work out the force to apply to us based on the flow field grid cells we are on.
	//we apply bilinear interpolation on the 4 grid square cells directions nearest to us to work out our force
	// http://en.wikipedia.org/wiki/Bilinear_interpolation#Nonlinear

	var floor = agent.floor(); //Coordinate of the top left square centre out of the 4
	var x = floor.x;
	var y = floor.y;

	//The 4 weights we'll interpolate, first setting to 0 incase they aren't in bounds
	var f00 = zeroVector;
	var f01 = zeroVector;
	var f10 = zeroVector;
	var f11 = zeroVector;
	//If statements to check for going out of bounds
	if (isInBounds(x, y)) {
		f00 = grid[floor.x][floor.y].direction;
	};
	if (isInBounds(x, y + 1)) {
		f01 = grid[floor.x][floor.y + 1].direction;
	}
	if (isInBounds(x + 1, y))  {
		f10 = grid[floor.x +1][floor.y].direction; 
	}
	if (isInBounds(x + 1, y + 1)) {
		f11 = grid[floor.x + 1][floor.y + 1].direction;
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

//Steers the agent towards grid cells with lower cost
function steeringBehaviourLowestCost(agent) {

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

	if (isValid(x, y)) {
		f00 = grid[x][y].distance;
	};
	if (isValid(x, y + 1)) {
		f01 = grid[x][y + 1].distance;
	}
	if (isValid(x + 1, y))  {
		f10 = grid[x +1][y].distance; 
	}
	if (isValid(x + 1, y + 1)) {
		f11 = grid[x + 1][y + 1].distance;
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
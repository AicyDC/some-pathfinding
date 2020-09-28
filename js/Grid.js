class Cell extends Vector{
    constructor(x,y) {
        super(x,y)
        this.distance = null ; //the distance from the target cell
        // this.direction =zeroVector  // the direction vector to the neighbouring cell with the least distance
        this.direction = new Vector(1,0);  // the direction vector to the neighbouring cell with the least distance
    }
    neighboursOf() {

    }
}

class Tower extends Vector{
    constructor(x,y) {
        super(x,y)
    }
    // Should I be adding the draw methods in seeing as they will need to be seperated back out for C++?
    draw() {
    }
}

class Grid {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvasWidth = canvas.width; // use this to dynamically size
        this.canvasHeight = canvas.height; // use this to dynamically size
        this.cells = new Array();
        this.towers= [];

    } 
    generate_cells() {
        for (let x = 0; x < this.width; x++) {
			let arr = new Array();
			for (let y = 0; y < this.height; y++) {
				arr[y] = new Cell(x,y);
			}
			this.cells[x] = arr;
		}
    }

    //buildTowers(grid.towers, gridWidth, gridHeight, game.agents, pathEnd);
    add_tower(agents) {
		const x = parseInt(Math.random()*this.width);
		const y = parseInt(Math.random()*this.height);
        var validSpot = true;
		for (var j = 0; j < agents.length; j++) {
			if (agents[j].x == x && agents[j].y == y) {
				validSpot = false;
            }
            if (validSpot) {
                this.towers.push(new Tower(x, y));
            }
        }
    }
    

    draw() {
        this.ctx.strokeStyle = "black";
        for (var x = 0; x < this.width; x++){
            this.ctx.beginPath();
            this.ctx.moveTo(x*35, 0);
            this.ctx.lineTo(x*35, this.height*35);
            this.ctx.stroke();
            }
        for (var y = 0; y < this.height; y++){
            this.ctx.beginPath();
            this.ctx.moveTo(0, y*35);
            this.ctx.lineTo(this.width*35, y*35);
            this.ctx.stroke();
            }
    }
}
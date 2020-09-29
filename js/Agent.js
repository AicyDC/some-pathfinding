class Agent extends Vector {
    constructor(x,y) {
        super(x,y);
        this.velocity = zeroVector;
        this.rotation = 0;
        this.maxForce = 2;
        this.maxSpeed = 2;
        this.radius = 12;
        this.width = 30;
		this.height = 30;
		this.draw();
    }

    // draw() {
	// 	//save the state
	// 	ctx.save();

	// 	//draw a circle
	// 	ctx.beginPath();
	// 	ctx.arc(this.x*35 + 17.5, this.y*35 + 17.5, this.radius, 0, 2*Math.PI,true);
	// 	ctx.closePath();
	// 	ctx.lineWidth = 2
	// 	ctx.strokeStyle = "black";
	// 	ctx.stroke()

	// 	//draw an arrow inside to indicate velocity
	// 	//arrow line
		// ctx.beginPath();
		// ctx.moveTo(this.x*35 + 17.5, this.y*35 + 17.5);
		// ctx.lineTo(this.x*35 + 17.5 + this.radius*Math.cos(this.rotation), this.y*35 + 17.5 + this.radius*Math.sin(this.rotation));
		// ctx.stroke();
	// 	//arrow head

	// 	//restore back to original stage
	// 	ctx.restore();
	// }
	
	// could put this in constructer
	draw() {
		// draw a circle
		let circle = new PIXI.Graphics();
		circle.beginFill(0xFFA500);
		circle.drawCircle(this.x*35 + 17.5, this.y*35 + 17.5, this.radius);
		circle.endFill();
		app.stage.addChild(circle);
		this.sprite = circle;

		// // draw an arrow inside to indicate velocity
		// let line = new PIXI.Graphics();
		// line.lineStyle(2, 0x000000, 1);
		// line.moveTo(this.x*35 + 17.5, this.y*35 + 17.5);
		// line.lineTo(this.x*35 + 17.5 + this.radius*Math.cos(this.rotation), this.y*35 + 17.5 + this.radius*Math.sin(this.rotation));
		// // line.anchor.x = 0;
		// // line.anchor.y = 0;
		// app.stage.addChild(line)
		// this.sprite_line = line;
	}
}
class Agent extends Vector {
    constructor(x,y) {
        super(x,y);
        this.velocity = zeroVector;
        this.rotation = 0;
        this.maxForce = 0.075;
        this.maxSpeed = 0.075;
        this.radius = 12;
        this.width = 30;
        this.height = 30;
    }

    draw() {
		//save the state
		ctx.save();

		//draw a circle
		ctx.beginPath();
		ctx.arc(this.x*35 + 17.5, this.y*35 + 17.5, this.radius, 0, 2*Math.PI,true);
		ctx.closePath();
		ctx.lineWidth = 2
		ctx.strokeStyle = "black";
		ctx.stroke()

		//draw an arrow inside to indicate velocity
		//arrow line
		ctx.beginPath();
		ctx.moveTo(this.x*35 + 17.5, this.y*35 + 17.5);
		ctx.lineTo(this.x*35 + 17.5 + this.radius*Math.cos(this.rotation), this.y*35 + 17.5 + this.radius*Math.sin(this.rotation));
		ctx.stroke();
		//arrow head

		//restore back to original stage
		ctx.restore();
    }
}
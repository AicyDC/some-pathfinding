class Game { 
    constructor() {
        this.agents=[];
    }

    draw_agents() {
        for (var i = 0; i < this.agents.length; i++) {
            this.agents[i].draw();
        }
    }
}
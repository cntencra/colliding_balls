class Ball {
    
    constructor(obj_id) {

        this.obj = document.getElementById(obj_id);
        this.obj_id = obj_id;
        
        //start time
        this.time = new Date().getTime()/1000;

        //circle width
        this.circle_width = this.obj.offsetWidth;
        this.circle_height = this.obj.offsetHeight;

        //background div width
        this.div_width = this.obj.offsetParent.offsetWidth;
        //remove the width of the circle from area
        this.div_width = this.div_width - this.circle_width;
        const round_width = Math.round(this.div_width);

        //background div height
        this.div_height = this.obj.offsetParent.offsetHeight;
        //remove the width of the circle from area
        this.div_height = this.div_height - this.circle_height; 
        const round_height = Math.round(this.div_height);

        //Initial location of the centre of the circle
        this.circle_x = Math.floor(Math.random() * round_width);
        this.circle_y = Math.floor(Math.random() * round_height);
        
        this.speed = Math.floor(Math.random() * 120)
        //this.speed_y = speed;
        //this.speed_x = speed;
    };

    getobj_id() {
        return this.obj_id;
    }

    move() {

        var now = new Date().getTime()/1000;
        var dt = now - this.time ;

        this.bounce();

        if (!this.bounced_x) {
            this.circle_x = this.circle_x + (this.speed * dt);
        }
        
    
        if (this.bounced_x) {
            this.circle_x = this.circle_x - (this.speed * dt);
        }

        if (!this.bounced_y) {
            this.circle_y = this.circle_y + (this.speed * dt);
        }
        
    
        if (this.bounced_y) {
            this.circle_y = this.circle_y - (this.speed * dt);
        }

        this.time = now;

        this.obj.style.left = this.circle_x + "px";
        this.obj.style.top = this.circle_y + "px";

    };

    //checks if circle has bounced off the wall
    bounce () {
        if (this.circle_x > this.div_width) {
            this.bounced_x = true;
        };

        if (this.circle_x <= 0) {
            this.bounced_x = false;
        };

        if (this.circle_y > this.div_height) {
            this.bounced_y = true;
        };

        if (this.circle_y <= 0) {
            this.bounced_y = false;
        };
    };
};

const balls = [];
const no_balls = 5;

for (let i = 1; i <= no_balls; i++) {
    let new_ball = new Ball(`ball_${i}`);
    balls.push(new_ball);
  }

for (const ball_obj of balls) {                                                                           
    window.setInterval(ball_obj.move.bind(ball_obj), 1);
  }
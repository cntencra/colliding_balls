class Ball {
    
    constructor(obj_id) {

        this.obj = document.getElementById(obj_id);
        this.obj_id = obj_id;
        
        //start time
        this.time = new Date().getTime()/1000;

        //circle width
        this.circle_width = this.obj.offsetWidth;
        //circle height
        this.circle_height = this.obj.offsetHeight;

        //background div width
        this.div_width = this.obj.parentElement.clientWidth;
        //background div left position
        this.div_left = this.obj.parentElement.offsetLeft;

        //remove the width of the circle from area and add the offset from the parent div
        this.div_width = this.div_width - this.circle_width + this.div_left;
        const round_divwidth = Math.round(this.div_width);

        //background div height
        this.div_height = this.obj.parentElement.clientHeight;
        //background div top position
        this.div_top = this.obj.parentElement.offsetTop;
        //remove the width of the circle from area
        this.div_height = this.div_height - this.circle_height + this.div_top; 
        const round_divheight = Math.round(this.div_height);

        //Initial location of the centre of the circle
        this.circle_x = Math.floor(Math.random() * round_divwidth);
        this.circle_y = Math.floor(Math.random() * round_divheight);

        if (this.circle_x < this.div_left) {
            this.circle_x = this.div_left + this.circle_height;
        }
        if (this.circle_y < this.div_top) {
            this.circle_y = this.div_top + this.circle_width;
        }
        
        this.speed_y = Math.floor(Math.random() * 200)
        this.speed_x = Math.floor(Math.random() * 200)
    };

    getobj_id() {
        return this.obj_id;
    }

    move() {
        var now = new Date().getTime()/1000;
        var dt = now - this.time ;

        this.wall_collision();

        this.circle_x = this.circle_x + (this.speed_x * dt);
        this.circle_y = this.circle_y + (this.speed_y * dt);

        this.time = now;

        this.obj.style.left = this.circle_x + "px";
        this.obj.style.top = this.circle_y + "px";

    };

    wall_collision () {
        if (this.circle_x > this.div_width) {
            if (this.speed_x >= 0) {
                this.speed_x = this.speed_x * -1; //convert to negative
            };
        };
        if (this.circle_x <= this.div_left) {
            if (this.speed_x <=0) {
                this.speed_x = this.speed_x * -1; //convert to positive
            }; 
        };
        if (this.circle_y > this.div_height) {
            if (this.speed_y >= 0) {
                this.speed_y = this.speed_y * -1; //convert to negative
            }
        };
        if (this.circle_y <= this.div_top) {
            if (this.speed_y <= 0) {
            this.speed_y = this.speed_y * -1; //convert to positive
            };
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
    window.setInterval(ball_obj.move.bind(ball_obj), 0.5);
  }
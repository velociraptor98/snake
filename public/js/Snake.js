export default class Snake{
    constructor(Scene)
    {
        this.scene=Scene;
        this.lastMoveTime=0;
        this.moveInterval=100;//1000 milliseconds == 1 second
        this.direction=Phaser.Math.Vector2.RIGHT;
        this.body=[];
        this.SnakeSize=16;
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width/2,this.scene.game.config.height/2,this.SnakeSize,this.SnakeSize,0xffffff).setOrigin(0));
        this.apple=this.scene.add.rectangle(100,100,this.SnakeSize,this.SnakeSize,0x0000ff).setOrigin(0);
        this.RandomApple();
        this.scene.input.keyboard.on('keydown',e => {this.keydown(e);});
    }

    RandomApple()
    {
        //ensure to keep it a multiple of 16 to ensure snake can actually reach it
        this.apple.x=Math.floor(Math.random()*this.scene.game.config.width/this.SnakeSize)*this.SnakeSize;
        this.apple.y=Math.floor(Math.random()*this.scene.game.config.height/this.SnakeSize)*this.SnakeSize;
    }

    keydown(event)
    {
        switch(event.keyCode)
        {
            //37 for left arrow
            case 37:
                this.direction=Phaser.Math.Vector2.LEFT;
                break;
            //38 for up arrow
            case 38:
                    this.direction=Phaser.Math.Vector2.UP;
                break;
            //39 for right arrow
            case 39:
                this.direction=Phaser.Math.Vector2.RIGHT;
                break;
            //40 for down arrow
            case 40:
                this.direction=Phaser.Math.Vector2.DOWN;
                break;

        }
    }
    update(time)
    {
        if(time>=this.lastMoveTime+this.moveInterval)
        {
            this.lastMoveTime=time;
            this.draw();
        }
    }

    draw()
    {
        var x =this.body[0].x;
        var y=this.body[0].y;

        //check for objective consumed or not
        if(this.apple.x === x && this.apple.y===y)
        {
            this.body.push(this.scene.add.rectangle(0,0,this.SnakeSize,this.SnakeSize,0xffffff).setOrigin(0));
            this.RandomApple();
        }
        for(var index=this.body.length-1;index>0;--index)
        {
            this.body[index].x=this.body[index-1].x;
            this.body[index].y=this.body[index-1].y;
        }
        this.body[0].x+=this.direction.x*this.SnakeSize;
        this.body[0].y+=this.direction.y*this.SnakeSize;
        if(this.body[0].x<0 || this.body[0]>this.scene.game.config.width || this.body[0].y<0 || this.body[0].y>this.scene.game.config.height)
        {
            //out of bounds
            this.scene.scene.restart();
        }
        //check if tail collides with snake head
        var tail=this.body.slice(1);
        if(tail.filter(s => s.x === this.body[0].x && s.y === this.body[0].y).length>0)
        {
            this.scene.scene.restart();
        }
    }
}
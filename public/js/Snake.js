export default class Snake{
    constructor(Scene)
    {
        this.scene=Scene;
        this.direction=Phaser.Math.Vector2.RIGHT;

        this.body=[];
        this.body.push(this.scene.add.rectangle(0,0,16,16,0xffffff).setOrigin(0));
        this.scene.input.keyboard.on('keydown',e => {this.keydown(e);});
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
        this.body[0].x+=this.direction.x;
        this.body[0].y+=this.direction.y;
    }
}
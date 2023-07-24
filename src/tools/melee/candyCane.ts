import Phaser from "phaser";
import Melee from "./closeRange";

export default class CandyCane extends Melee{
    body!: Phaser.Physics.Arcade.Body;
    public ball1!: Phaser.Physics.Arcade.Image;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.setScale(.5, 5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        // this.scene.physics.world.remove(this.body);
        //this.scene.physics.world.enable(this);
        //this.body.setAllowGravity(false);
       
        this.body.pushable = false;
        this.body.debugBodyColor= 0xadfefe;
        this.body.setSize(5);

    }
    stab(mousePos: {x: number, y: number}, aimAngle: number, oldpos: Phaser.Math.Vector2){
        //let directionAngle = Phaser.Math.Angle.Between(this.x, this.y, mousePos.x, mousePos.y);
        //let target = {x: 10*(Math.cos(directionAngle)+this.x), y: 10*(Math.sin(directionAngle)+this.y)};
        //this.scene.physics.moveTo(this, mousePos.x, mousePos.y, 10);
        //this.body.velocity = this.scene.physics.velocityFromAngle(aimAngle, 100);
         let aim = Phaser.Math.Angle.BetweenPoints(this.body.position, mousePos);
        
        // let newvel = this.scene.physics.velocityFromAngle(aim * 180 / Math.PI, 100);
        
        // console.log(aim * 180 / Math.PI)
        // console.log("comparing ", this.body.position, " to ", mousePos)
        // console.log("newvel is ", newvel);
        
        // this.scene.tweens.add({
        //     targets: this.body.velocity,
        //     x: newvel.x,
        //     y: newvel.y,
        //     duration: 100,
        //     ease: 'Stepped',
        //     yoyo: true,
        //     onComplete: () => {
        //         this.body.velocity = new Phaser.Math.Vector2(0,0);
        //         this.body.position = oldpos;
        //     }
        // });
        // this.scene.tweens.add({
        //     targets: this.body,
        //     enable: false,
        //     ease: 'Stepped',
        //     duration: 10000,
        // });
         let coord = {x: 0, y: 0};
         this.getBottomCenter(coord,true);
        // console.log("stabbing at ", coord);
        
        // // this.body.enable = true;
        // // this.scene.time.delayedCall(1000, () => {
        // //     this.body.enable = false;
        // // });
        const ball1 = this.scene.physics.add.image(coord.x, coord.y, 'wizball');
        ball1.body.setAllowGravity(false);
        const spear = this
        const x = Math.sin(aimAngle)
        const y = Math.cos(aimAngle)

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            //ease: Phaser.Math.Easing.Sine.Out,
            yoyo: true,
            onStart: () => {
                
               
            },
            onUpdate: e => {
                let offsetx = -x * e.getValue()
                let offsety = y * e.getValue()
                this.x = offsetx 
                this.y = offsety
                
                ball1.body.x = coord.x 
                ball1.body.y = coord.y
                
                 
            },
            onComplete() {

                
            },
            
            duration: 150,
        })

        ball1.body.x = coord.x;
        ball1.body.y = coord.y;
    }   
}
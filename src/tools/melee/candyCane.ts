import Phaser from "phaser";
import Melee from "./closeRange";

export default class CandyCane extends Melee{
    body!: Phaser.Physics.Arcade.Body;
    public ball1!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.setScale(.5, 6);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        // this.scene.physics.world.remove(this.body);
        //this.scene.physics.world.enable(this);
        //this.body.setAllowGravity(false);
       
        this.body.pushable = false;
        this.body.debugBodyColor= 0xadfefe;
        this.body.setSize(5);
        let coord = {x: 0, y: 0};
        
        this.getBottomCenter(coord,true);
        this.ball1 = this.scene.physics.add.image(coord.x, coord.y, 'wizball');
        this.ball1.body.setAllowGravity(false);
        this.ball1.body.setSize(1)
        this.ball1.body.pushable = false;
    }
    stab(mousePos: {x: number, y: number}, aimAngle: number, oldpos: Phaser.Math.Vector2){
   
         
        // console.log("stabbing at ", coord);
        
     
        let coord = {x: 0, y: 0};
        
        const x = Math.sin(aimAngle)
        const y = Math.cos(aimAngle)

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            //ease: Phaser.Math.Easing.Sine.Out,
            yoyo: true,
            onStart: () => {
                this.scene.physics.world.enable(this.ball1);
                this.ball1.enableBody(true)
            },
            onUpdate: e => {
                this.getBottomCenter(coord,true);
                this.ball1.x = coord.x
                this.ball1.y = coord.y 
                let offsetx = -x * e.getValue()
                let offsety = y * e.getValue()
                this.x = offsetx 
                this.y = offsety
                
                
                
                
                 
            },
            onComplete: () => {
                this.ball1.x = -1000
                this.ball1.enableBody(false)
                this.scene.physics.world.remove(this.ball1.body);
            },
            
            duration: 200,
        })

        
    }   
}
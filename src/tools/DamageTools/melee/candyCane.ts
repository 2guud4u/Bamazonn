import Phaser from "phaser";
import Melee from "./Melee";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
const CANDY_CANE_DAMAGE = 10;
const FIRE_RATE = 500;
export default class CandyCane extends Melee{
    body!: Phaser.Physics.Arcade.Body;
    scene!: HelloWorldScene;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, CANDY_CANE_DAMAGE, FIRE_RATE);

        this.scene = scene as HelloWorldScene;
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
       
        
        this.attackbox.body.setSize(1)
        this.scene.damageEntityStore.attackboxes.add(this.attackbox)
        
    }
    public attack(aimAngle: number){
   
         
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
                this.scene.physics.world.enable(this.attackbox);
                this.attackbox.enableBody(true)
            },
            onUpdate: e => {
                this.getBottomCenter(coord,true);
                this.attackbox.setPosition(coord.x, coord.y)
                let offsetx = -x * e.getValue()
                let offsety = y * e.getValue()
                this.x = offsetx 
                this.y = offsety
                
                
                
                
                 
            },
            onComplete: () => {
                this.attackbox.x = -1000
                this.attackbox.enableBody(false)
                this.scene.physics.world.remove(this.attackbox.body);
            },
            
            duration: 200,
        })

        
    }   
}
import Phaser from "phaser";
import Melee from "./Melee";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
import { time } from "console";
import {CandyCane_Stats} from "../../../constants/entityConst";
export default class CandyCane extends Melee{
    body!: Phaser.Physics.Arcade.Body;
    scene!: HelloWorldScene;
   
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, "candycane", CandyCane_Stats);

        this.scene = scene as HelloWorldScene;
        this.setScale(1.5);
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
       
        texture = "candycane"
        this.attackbox.body.setSize(1)
        //this.scene.damageEntityStore.addAttackbox(this.attackbox)
        
    }
    public attack(aimAngle: number, timeSinceLastFire: number){
   
         
        //return if the player is attacking too fast
        if(this.scene.time.now - timeSinceLastFire  < this.getFireRate())
            return timeSinceLastFire;
        
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
                
                this.attackbox.setPosition(-1000,-1000) 
                
            },
            
            duration: 200,
        })
        return this.scene.time.now;
        
    }   
}
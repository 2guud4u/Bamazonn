import Phaser from "phaser";
import Melee from "./Melee";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
import { time } from "console";

const FIST_DAMAGE = 1;
const FIRE_RATE = 300;
const STUN_STRENGTH = 100;
const KNOCKBACK_STRENGTH = 100;
export default class Fist extends Melee {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, FIST_DAMAGE, FIRE_RATE, KNOCKBACK_STRENGTH, STUN_STRENGTH);
        this.scene = scene as HelloWorldScene;  
        this.setScale(.5, .5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        // this.scene.physics.world.remove(this.body);
        //this.scene.physics.world.enable(this);
        //this.body.setAllowGravity(false);
       
        this.body.pushable = false;
        
    }
    public attack(aimAngle: number, timeSinceLastFire: number){
        if(this.scene.time.now - timeSinceLastFire  < this.getFireRate())
            return timeSinceLastFire;
            let coord = {x: 0, y: 0};
        
            const x = Math.sin(aimAngle)
            const y = Math.cos(aimAngle)
    
            this.scene.tweens.addCounter({
                from: 0,
                to: 50,
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
            return this.scene.time.now;
    }
}
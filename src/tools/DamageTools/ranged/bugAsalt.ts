import Phaser from "phaser";
import Ranged from "./Ranged";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
import BugASalt from "./projectile/BugASalt";
import {BugASalt_Stats} from "../../../constants/entityConst";
export default class BugAsalt extends Ranged {
    body: Phaser.Physics.Arcade.Body;
    scene: HelloWorldScene
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, BugASalt_Stats.FIRE_RATE);
        this.scene = scene as HelloWorldScene;
        this.setScale(1, 4);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        this.body.setSize(2);
        this.body.setAllowGravity(false);
        
    }
    public shoot(timeSinceLastFire: number, shootToPos: {x:number, y:number}, shootFromPos: {x:number, y:number}){
        
        if (this.scene.time.now- timeSinceLastFire  < BugASalt_Stats.FIRE_RATE) {
            return timeSinceLastFire;
        }
            const Projectile1 = new BugASalt(this.scene, shootFromPos.x, shootFromPos.y, 'Projectile-key');
    
            
            this.scene.damageEntityStore.addProjectile(Projectile1);
            Projectile1.setProjectileDirection(shootToPos);
            
            return this.scene.time.now;
        
    }
}
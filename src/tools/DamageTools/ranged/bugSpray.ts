import Phaser from "phaser";
import Ranged from "./Ranged";
import BugSpray_Projectile from "./projectile/BugSpray";
import HelloWorldScene from "../../../scenes/HelloWorldScene";
import {BugSpray_Stats} from "../../../constants/entityConst"


export default class bugSpray extends Ranged {
    body: Phaser.Physics.Arcade.Body;
    scene: HelloWorldScene
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture,  BugSpray_Stats.FIRE_RATE);
        this.scene = scene as HelloWorldScene;
        this.setScale(1);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        this.body.setSize(2);
    }
    public shoot(timeSinceLastFire: number, shootToPos: {x:number, y:number}, shootFromPos: {x:number, y:number}){
        
        if (this.scene.time.now- timeSinceLastFire  < BugSpray_Stats.FIRE_RATE) {
            return timeSinceLastFire;
        }
        const Projectile1 = new BugSpray_Projectile(this.scene, shootFromPos.x, shootFromPos.y, 'Projectile-key');
        const Projectile2 = new BugSpray_Projectile(this.scene, shootFromPos.x, shootFromPos.y - 20, 'Projectile-key');
        const Projectile3 = new BugSpray_Projectile(this.scene, shootFromPos.x, shootFromPos.y + 20, 'Projectile-key');
        
        //add to store
        this.scene.damageEntityStore.addProjectile(Projectile1);
        this.scene.damageEntityStore.addProjectile(Projectile2);
        this.scene.damageEntityStore.addProjectile(Projectile3);

        Projectile1.setProjectileDirection(shootToPos);
        Projectile2.setProjectileDirection(shootToPos);
        Projectile3.setProjectileDirection(shootToPos);
        return this.scene.time.now;
            
        
    }
}
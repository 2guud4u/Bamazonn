import Phaser from "phaser";
import Ranged from "./Ranged";

const BUG_SPRAY_DAMAGE = 1;
const FIRE_RATE = 1000;
export default class BugSpray extends Ranged {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, BUG_SPRAY_DAMAGE, FIRE_RATE);
        this.scene = scene;
        this.setScale(1,2);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        this.body.setSize(2);
    }
    public shoot(timeSinceLastFire: number, pointer_position: {x:number, y:number}, shootFromPos: {x:number, y:number}){
        if (info.scene.time.now- info.timeSinceLastFire  > FIRE_RATE) {

            const Projectile1 = new BugASalt(info.scene, info.shootFromPos.x, info.shootFromPos.y, 'Projectile-key');
    
            info.Projectiles.add(Projectile1);
    
            Projectile1.setProjectileDirection(info.shootToPos);
            return true;
        } else {
            return false;
        }
    }
}
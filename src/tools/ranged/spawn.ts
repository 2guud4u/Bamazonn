import Phaser from 'phaser'
import BugSpray from '../ranged/BugSpray'
import BugASalt from '../ranged/BugASalt'
import { Weapon } from '../../entities/States/Weapon'
//handle projectile spawning logic
class ProjectileInfo{
    public Projectiles: Phaser.Physics.Arcade.Group;
    public scene: Phaser.Scene;
    public timeSinceLastFire: number;
    public shootToPos: { x: number; y: number };
    public shootFromPos: { x: number; y: number };
    
    constructor(
                Projectiles: Phaser.Physics.Arcade.Group,
                scene: Phaser.Scene,
                timeSinceLastFire: number,
                shootToPos: { x: number; y: number },
                shootFromPos: { x: number; y: number }){
            this.Projectiles = Projectiles;
            this.scene = scene;
            this.timeSinceLastFire = timeSinceLastFire;
            this.shootToPos = shootToPos;
            this.shootFromPos = shootFromPos;
        }
}
export default function fireProjectile(
    equipment: Weapon,
    Projectiles: Phaser.Physics.Arcade.Group,
    scene: Phaser.Scene,
    timeSinceLastFire: number,
    shootToPos: { x: number; y: number },
    shootFromPos: { x: number; y: number }) {
    let shot = false;
    let projectileInfo = new ProjectileInfo(Projectiles, scene, timeSinceLastFire, shootToPos, shootFromPos);            
    switch (equipment) {
        case Weapon.BugSpray:
            shot = fireBugSpray(projectileInfo);
            break;
        case Weapon.BugASalt:
            shot = fireBugASalt(projectileInfo);
            break;
        default:
            break;
    }
    return shot;
}
function fireBugSpray(info: ProjectileInfo) {
    //fire rate
    const fireRate = 1000;
    if (info.scene.time.now- info.timeSinceLastFire  > fireRate) {
        const Projectile1 = new BugSpray(info.scene, info.shootFromPos.x, info.shootFromPos.y, 'Projectile-key');
        const Projectile2 = new BugSpray(info.scene, info.shootFromPos.x, info.shootFromPos.y - 20, 'Projectile-key');
        const Projectile3 = new BugSpray(info.scene, info.shootFromPos.x, info.shootFromPos.y + 20, 'Projectile-key');
        info.Projectiles.add(Projectile1);
        info.Projectiles.add(Projectile2);
        info.Projectiles.add(Projectile3);
        Projectile1.setProjectileDirection(info.shootToPos);
        Projectile2.setProjectileDirection(info.shootToPos);
        Projectile3.setProjectileDirection(info.shootToPos);
        return true;
        
    } else {
        return false;
    }
   
    
    
}
function fireBugASalt(info: ProjectileInfo) {
    //fire rate
    const fireRate = 500;
    if (info.scene.time.now- info.timeSinceLastFire  > fireRate) {

        const Projectile1 = new BugASalt(info.scene, info.shootFromPos.x, info.shootFromPos.y, 'Projectile-key');

        info.Projectiles.add(Projectile1);

        Projectile1.setProjectileDirection(info.shootToPos);
        return true;
    } else {
        return false;
    }
}

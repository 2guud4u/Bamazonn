import Phaser from "phaser";
import Projectile from "../tools/DamageTools/ranged/projectile/projectile";
export default class damageEntityStore{
    private attackboxes: Phaser.Physics.Arcade.Group;
    private projectiles: Phaser.Physics.Arcade.Group;
    constructor(scene: Phaser.Scene){
        this.attackboxes = scene.physics.add.group({
            classType: Projectile,
            runChildUpdate: true,
        });
        this.projectiles = scene.physics.add.group({
            classType: Projectile,
            runChildUpdate: true,
        });
    }
    public addAttackbox(attackbox: Phaser.Types.Physics.Arcade.ImageWithDynamicBody){
        this.attackboxes.add(attackbox);
    }
    public addProjectile(projectile: Projectile){
        console.log("added")
        this.projectiles.add(projectile);
    }
    public getAttackboxes(){
        return this.attackboxes;
    }
    public getProjectiles(){
        return this.projectiles;
    }
}
import Phaser from "phaser";
import Projectile from "../tools/DamageTools/ranged/projectile/projectile";
export default class damageEntityStore{
    public attackboxes: Phaser.Physics.Arcade.Group;
    public projectiles: Phaser.Physics.Arcade.Group;
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
}
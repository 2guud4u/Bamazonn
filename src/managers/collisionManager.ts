import Phaser from "phaser";
import PlayerContainer from "../entities/playerContainer";
import Mob from "../entities/mob";

import projectile from "../tools/DamageTools/ranged/projectile/projectile";
import AttackBox from "../tools/DamageTools/melee/attackbox/attackbox";
import HelloWorldScene from "../scenes/HelloWorldScene";

export default function startCollisions(scene: HelloWorldScene){
    
    entitiesToPlayer(scene, scene.playerContainer, scene.mobs);
    entitiesToMelee(scene, scene.damageEntityStore.getAttackboxes(), scene.mobs);
    entitiesToProjectile(scene, scene.damageEntityStore.getProjectiles(), scene.mobs);
    envToEntities(scene, scene.mobs, scene.platforms);
    envToPlayer(scene, scene.playerContainer, scene.platforms);

}

export function entitiesToPlayer(scene: Phaser.Scene, player:PlayerContainer, mobs: Phaser.Physics.Arcade.Group){
    scene.physics.add.collider(player, mobs , handleEntityPlayer as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, undefined);

}

export function entitiesToMelee(scene: Phaser.Scene, melee: Phaser.Physics.Arcade.Group ,mobs: Phaser.Physics.Arcade.Group){
    
    scene.physics.add.collider(melee, mobs , handleEntityMelee as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, undefined);
}

export function entitiesToProjectile(scene: Phaser.Scene, Projectiles: Phaser.Physics.Arcade.Group, mobs: Phaser.Physics.Arcade.Group){
    scene.physics.add.collider(Projectiles, mobs , handleEntityProjectile as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, undefined);
}

export function envToEntities(scene: Phaser.Scene, mobs: Phaser.Physics.Arcade.Group, env: Phaser.Tilemaps.TilemapLayer){
    scene.physics.add.collider(mobs, env);
}
export function envToPlayer(scene: Phaser.Scene, player: PlayerContainer, env: Phaser.Tilemaps.TilemapLayer){
    scene.physics.add.collider(player, env);
}


function handleEntityProjectile(projectile: projectile, entity: Mob){
    takeDamage(entity, projectile);
    knockBack(entity, projectile);
    
    projectile.destroy();
    console.log("projectile hit")
}
function handleEntityMelee(attackbox: AttackBox, entity: Mob){
    takeDamage(entity, attackbox);
    knockBack(entity, attackbox);
    console.log("melee hit")
}

function handleEntityPlayer(player: PlayerContainer, entity: Mob){
    takeDamage(player, entity);
    knockBack(player, entity);
}

function takeDamage(victim: PlayerContainer|Mob, attacker: projectile | AttackBox | Mob){
    victim.setHealth(victim.getHealth() - attacker.getDamage())
}

function knockBack(victim: PlayerContainer | Mob, attacker: projectile | AttackBox | Mob) {
    
    victim.setStun(true);
    if(victim.body.touching.left){
        
        victim.body.setVelocityX(400) ;
    }
    victim.scene.time.delayedCall(100, () => {victim.setStun(false)}, null, victim.scene);

    console.log("knockback")
}
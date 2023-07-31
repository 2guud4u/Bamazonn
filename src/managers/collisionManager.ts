import Phaser from "phaser";
import PlayerContainer from "../entities/playerContainer";
import Mob from "../entities/mob";

import projectile from "../tools/DamageTools/ranged/projectile/projectile";
import HelloWorldScene from "../scenes/HelloWorldScene";
import Melee from "../tools/DamageTools/melee/Melee";
import Tool from "../tools/Tool";
import damageEntityStore from "../stores/damageEntityStore";
export default function startCollisions(scene: HelloWorldScene){
    
    entitiesToPlayer(scene, scene.playerContainer, scene.mobs);
    entitiesToMelee(scene, scene.damageEntityStore.attackboxes, scene.mobs);
    entitiesToProjectile(scene, scene.damageEntityStore.projectiles, scene.mobs);
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
    knockBack(entity);
    projectile.destroy();
    console.log("projectile hit")
}
function handleEntityMelee(attackbox: any, entity: Mob){
    takeDamage(entity, attackbox);
    knockBack(entity);
    console.log("melee hit")
}

function handleEntityPlayer(player: PlayerContainer, entity: Mob){
    takeDamage(player, entity);
    knockBack(player);
}

function takeDamage(victim: any, attacker:any){
    victim.setHealth(victim.getHealth() - attacker.getDamage())
}

function knockBack(victim: any) {
    // if(victim.body.blocked.left){
    //       victim.setVelocityX(100);
    // }
      

    console.log("knockback")
}
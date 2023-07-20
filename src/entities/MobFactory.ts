import Mosquito from '../entities/mosquito';
import Bear from '../entities/bear';
import Mob from '../entities/mob';
import PlayerContainer from '../entities/playerContainer';
import Phaser from 'phaser';
export function spawnBear(scene:Phaser.Scene, x:number, y:number, group: Phaser.Physics.Arcade.Group) {
    const bear = new Bear(scene, x, y, 'bear');
    group.add(bear);
}

export function spawnMosquito(scene: Phaser.Scene, x:number, y:number, group: Phaser.Physics.Arcade.Group) {
    const mosquito = new Mosquito(scene, x, y, 'mosquito');
    group.add(mosquito);
}

export function moveMobs(player: PlayerContainer, mobs: Phaser.Physics.Arcade.Group){
    mobs.children.iterate((child) => {
        if(child instanceof Mob){
            child.updatePlayerPos(player);
            child.update();
        }
    });
}
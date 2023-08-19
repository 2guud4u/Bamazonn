import Phaser from "phaser";
import Tool from "../../Tool";
import DamageTools from "../DamageTool";

export default class Ranged extends DamageTools {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, fireRate: number) {
        super(scene, x, y, texture, fireRate);
        
    }
    public shoot(timeSinceLastFire: number, shootToPos: {x:number, y:number}, shootFromPos: {x:number, y:number}){
        return timeSinceLastFire;
    }
}
import Phaser from "phaser";
import Tool from "../Tool";
export default class DamageTools extends Tool {
    
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, fireRate: number) {
        super(scene, x, y, texture, fireRate);
        
    }
   
    
    
}
import Phaser from "phaser";
import Projectile from "./projectile";

export default class BugSpray_Projectile extends Projectile{
    private growthRate: number = 0.001;
    private stationaryTime: number = 0;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, 400, 1);
        this.setScale(.4);
        
        
        
    }
    update() {
        console.log("shoot")
        if (this.x > this.scene.sys.canvas.width || 
            this.y < 0 ||
            this.x < 0 ||
            this.y > this.scene.sys.canvas.height) {
            this.destroy(); // Remove the bullet from the scene
        }
        this.spread();
        
    }
    private spread(){
        if(this && this.active){

        
            if(this.scaleX < 1.5){
                const newScale = this.scaleX + (this.growthRate * this.scene.sys.game.loop.delta);
                this.setScale(newScale);
            }
            //stop movement
            if(this.scaleX > 1){
                this.setVelocity(0,0);
                (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;

            }
             if(this.stationaryTime > 100){
                
                this.destroy();
            }
        }
        
        this.stationaryTime ++;
    } 
}
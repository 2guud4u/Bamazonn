import Phaser from "phaser";
import Player from "./player";

export default class PlayerContainer extends Phaser.GameObjects.Container {
    private graphics: Phaser.GameObjects.Graphics;
    constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
        super(scene, x, y);
        this.add(player)
        //scene.physics.world.enable(this);
        scene.add.existing(this);
        this.graphics = scene.add.graphics();
        
    }
    update() {
        
        
        // Set the line style for the outline
        const lineColor = 0xff0000;
        const lineWidth = 2;
        this.graphics.clear();
        this.graphics.lineStyle(lineWidth, lineColor);
    
        // Draw a rectangle around the container
        const containerWidth = this.getBounds().width;
        const containerHeight = this.getBounds().height;
        const containerX = this.x - containerWidth * this.originX;
        const containerY = this.y - containerHeight * this.originY;
        this.graphics.strokeRect(containerX, containerY, containerWidth, containerHeight);
      }
}    
import Phaser from 'phaser';
import Spray from './spray';
export default class Player extends Phaser.Physics.Arcade.Sprite {
    private Sprays: Phaser.GameObjects.Group;
    private wKey!: Phaser.Input.Keyboard.Key;
    private aKey!: Phaser.Input.Keyboard.Key;
    private dKey!: Phaser.Input.Keyboard.Key;
    private timeSinceLastFire: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true); 
        // movement keys
        this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // projectile keys
       
        this.Sprays = this.scene.add.group({
            classType: Spray,
            runChildUpdate: true
          });
        this.scene.input.mouse.disableContextMenu();

    }
    
    update() {
        // Define player movement speed
        const playerSpeed = 200;
        const playerJumpSpeed = 200;
        const pointer = this.scene.input.activePointer;
        
        // Handle player movement logic based on WASD input
        if (this.aKey.isDown) {
        this.setVelocityX(-playerSpeed);
        } else if (this.dKey.isDown) {
        this.setVelocityX(playerSpeed);
        } else{
        this.setVelocityX(0);
        }
    
     
        if (this.wKey.isDown && this.body.blocked.down) { 
        console.log("jump");
        this.setVelocityY(-playerJumpSpeed);
        }

        // Handle player shooting logic
        if (pointer.leftButtonDown()) {
            this.fireSpray(this.timeSinceLastFire, pointer.position);
          }
        // fire rate logic
        this.timeSinceLastFire += this.scene.sys.game.loop.delta;
        console.log(this.timeSinceLastFire);

    }
    
    public getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
    private fireSpray(timeSinceLastFire: number, shootPos: {x: number, y: number}) {
        if(timeSinceLastFire > 1000){
            const spray = this.Sprays.create(this.x, this.y, 'spray-key') as Spray;
            spray.setSprayDirection(shootPos);
        
            this.timeSinceLastFire = 0;
        }
    }

}
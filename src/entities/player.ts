import Phaser from 'phaser';
import Spray from './spray';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public Sprays: Phaser.Physics.Arcade.Group;
  private wKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;
  private timeSinceLastFire: number = 0;
  private spriteX = 1;
  private spriteY = 2;
  private pointer!: Phaser.Input.Pointer;
    public health = 100;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setBounce(.2);
    this.setCollideWorldBounds(true);

    this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.Sprays = scene.physics.add.group({
      classType: Spray,
      runChildUpdate: true,
    });
    //chracter sizing
    this.setScale(this.spriteX, this.spriteY); // Scale the player sprite
    
    const newWidth = this.width * this.spriteX;
    const newHeight = this.height * this.spriteY;
    this.setDisplaySize(newWidth, newHeight);

    // Update the size of the physics body to match the new scale
    this.body.setSize(newWidth, newHeight);
    scene.input.mouse.disableContextMenu();
    this.pointer = this.scene.input.activePointer; 
}

  update() {
    if (!this || !this.active) {
        return;
      }
    const playerSpeed = 200;
    const playerJumpSpeed = 200;
    
   
    
    

    if (this.aKey.isDown) {
      this.setVelocityX(-playerSpeed);
    } else if (this.dKey.isDown) {
      this.setVelocityX(playerSpeed);
    } else {
      this.setVelocityX(0);
    }

    if (this.wKey.isDown && this.body.blocked.down) {
      this.setVelocityY(-playerJumpSpeed);
    }

    if (this.pointer.leftButtonDown()) {
      this.fireSpray(this.timeSinceLastFire, this.pointer.position);
    }

    this.timeSinceLastFire += this.scene.sys.game.loop.delta;
    //console.log('Numbers of shots', this.Sprays.getLength())
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
  public damaged(movement: number, damage: number){
    if(this.health <= 1){
        this.destroy();
        return
    }
    this.health -= damage;
    console.log(this.health);
    this.x = this.x + 20*(Math.sign(movement));
}

  private fireSpray(timeSinceLastFire: number, shootPos: { x: number; y: number }) {
    if (timeSinceLastFire > 1000) {
      const spray1 = this.Sprays.create(this.x, this.y, 'spray-key') as Spray;
      const spray2 = this.Sprays.create(this.x, this.y-20, 'spray-key') as Spray;
      spray1.setSprayDirection(shootPos);
      spray2.setSprayDirection(shootPos);
      this.timeSinceLastFire = 0;
    }
  }
}

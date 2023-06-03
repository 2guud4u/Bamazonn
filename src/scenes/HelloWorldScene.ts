import Phaser from 'phaser'
import Player from '../entities/player';
import Mosquito from '../entities/mosquito';
import Projectile from '../tools/ranged/projectile';
export default class HelloWorldScene extends Phaser.Scene {
  private spacebar!: Phaser.Input.Keyboard.Key;
  private player!: Player;
  private mosquito!: Mosquito;
  private debug: boolean = false;
  private mobs!: Phaser.Physics.Arcade.Group;
  constructor() {
    super('helloworld')
  }

  preload() {
    

    this.load.image('logo', 'assets/logo192.png')
    this.load.image('red', 'assets/logo192.png')
  }

  create() {
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.mosquito = new Mosquito(this, 400, 450, 'player-key');
    const mosquito2 = new Mosquito(this, 400, 600, 'player-key');
    // Create your square player sprite and initialize its properties
    this.player = new Player(this, 100, 450, 'player-key');
    this.mobs = this.physics.add.group(
      {
        classType: Mosquito
      }

    );

    this.physics.world.enable([this.player, this.mosquito]);
    this.add.existing(this.player);
    this.add.existing(this.mosquito); 
    // Enable physics for entitiesGroup and player.Spraysd
    this.mobs.add(this.mosquito);
    this.mobs.add(mosquito2);
    this.physics.world.enable(this.player.Projectiles);

    this.physics.add.collider(this.player.Projectiles, this.mobs , this.handleCollision as any, undefined, this);
    this.physics.add.collider(this.player, this.mobs , this.handlePlayerCollision as any, undefined, this);
    
     
  }
  update() {
    if(this.spacebar.isDown){
      this.debug = !this.debug;
    }

    if(this.player !== undefined){
      this.player.update();
    }
    
    if(!this.debug){
      this.mobs.getChildren().forEach((mosquito) => {
      mosquito.update(this.player.getPosition());
    });
    }
    
    
    
    // console.log('Numbers of sprites', this.entitiesGroup.getLength())
    console.log('Numbers of shots', this.player.Projectiles.getLength())

 

  

  }
  private handleCollision( spray:any, mosquito:Mosquito) {
    console.log('Collision');
    console.log(mosquito);
    mosquito.damaged(spray.getDamage());
    spray.destroy();
  
  }

  private handlePlayerCollision(player:any, mosquito:any) {
    console.log('Collision');
    console.log(mosquito);
    console.log(player.health);
    const hitDirection = player.x - mosquito.x;
    console.log(mosquito.attackDamage)
    player.damaged(hitDirection, mosquito.attackDamage);
    
  
  }
  


}

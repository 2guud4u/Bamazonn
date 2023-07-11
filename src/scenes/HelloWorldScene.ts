import Phaser from 'phaser'
import Player from '../entities/player';
import Mosquito from '../entities/mosquito';
import Projectile from '../tools/ranged/projectile';
import Bear from '../entities/bear';
import Mob from '../entities/mob';
import {spawnBear, spawnMosquito} from '../entities/MobFactory';
import PlayerContainer from '../entities/playerContainer';

export default class HelloWorldScene extends Phaser.Scene {
  private spacebar!: Phaser.Input.Keyboard.Key;
  private player!: Player;
  private mosquito!: Mosquito;
  private debug: boolean = false;
  private mobs!: Phaser.Physics.Arcade.Group;
  private playerContainer!: PlayerContainer;
  private container!: Phaser.GameObjects.Container;
  constructor() {
    super('helloworld')
  }

  preload() {
    

    this.load.image('logo', 'assets/logo192.png')
    this.load.image('red', 'assets/logo192.png')
  }

  create() {
    
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    
    //const bear = new Bear(this, 800, 600, 'player-key');
    // Create your square player sprite and initialize its properties
    this.player = new Player(this, 100, 450, 'player-key');
    this.playerContainer = new PlayerContainer(this, 100, 450, this.player);
    this.mobs = this.physics.add.group(
      {
        classType: Mob,
        collideWorldBounds: true,
      }
      
    );
    
    const image1 = this.add.image(0, -30, 'mushroom');
    this.container = this.add.container(100, 100, [ image1 ]);

  
    
    
    
    // spawnBear(this, 800, 600, this.mobs);
     spawnMosquito(this, 100, 100, this.mobs);
    
   
     
 
    
    

    this.physics.add.collider(this.player.Projectiles, this.mobs , this.handleCollision as any, undefined, this);
    this.physics.add.collider(this.player, this.mobs , this.handlePlayerCollision as any, undefined, this);
    

  }
  update() {
    if(this.spacebar.isDown){
      this.debug = !this.debug;
    }

    if(this.player !== undefined){
      this.player.update();
      this.playerContainer.update();
    }
    
    if(!this.debug){
      this.mobs.getChildren().forEach((mob) => {
      mob.update(this.player.getPosition());
    });

    }
    


    
    
    
   

 

  

  }
  private handleCollision( spray:any, mosquito:Mosquito) {
    
    console.log(mosquito);
    mosquito.damaged(spray.getDamage());
    spray.destroy();
  
  }

  private handlePlayerCollision(player:any, mosquito:any) {
    
    console.log(mosquito);
    console.log(player.health);
    const hitDirection = player.x - mosquito.x;
    console.log(mosquito.attackDamage)
    player.damaged(hitDirection, mosquito.attackDamage);
    
  
  }
  


}

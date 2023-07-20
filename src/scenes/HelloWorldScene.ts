import Phaser from 'phaser'
import Player from '../entities/player';
import Mosquito from '../entities/mosquito';
import Projectile from '../tools/ranged/projectile';
import Bear from '../entities/bear';
import Mob from '../entities/mob';
import {spawnBear, spawnMosquito, moveMobs} from '../entities/MobFactory';
import PlayerContainer from '../entities/playerContainer';

export default class HelloWorldScene extends Phaser.Scene {
  private spacebar!: Phaser.Input.Keyboard.Key;
  private player!: Player;
  private mosquito!: Mosquito;
  private debug: boolean = false;
  private mobs!: Phaser.Physics.Arcade.Group;
  private playerContainer!: PlayerContainer;
  public playerPos!: {x: number, y: number};
  constructor() {
    super('helloworld')
  }

  preload() {
    
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/First.json');
    this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
    this.load.image('logo', 'assets/logo192.png')
    this.load.image('red', 'assets/logo192.png')
  }

  create() {
    //make map
    const map = this.make.tilemap({ key: 'map' });
     const tileset = map.addTilesetImage('tileset', 'tiles');
     const platforms = map.createLayer('top', tileset, 10,250);
    platforms.setCollisionByExclusion([-1], true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    
    //const bear = new Bear(this, 800, 600, 'player-key');
    // Create your square player sprite and initialize its properties
    //this.player = new Player(this, 100, 450, 'player-key');
    this.playerContainer = new PlayerContainer(this, 100, 450);
    this.mobs = this.physics.add.group(
      {
        classType: Mob,
        collideWorldBounds: true,
      }
      
    );
    
    

  
    
    
    
    //spawnBear(this, 800, 600, this.mobs);
     spawnMosquito(this, 100, 100, this.mobs);
    
   
     
 
    
    
    this.physics.add.collider(this.playerContainer, platforms);
    this.physics.add.collider(this.mobs, platforms);
    this.physics.add.collider(this.playerContainer.Projectiles, this.mobs , this.handleCollision as any, undefined, this);
    //this.physics.add.collider(this.player, this.mobs , this.handlePlayerCollision as any, undefined, this);
    

  }
  update() {
    if(this.spacebar.isDown){
      this.debug = !this.debug;
    }
    this.playerContainer.update();
    // if(this.player !== undefined){
    //   this.player.update();
    //   this.playerContainer.update();
    // }
    
    moveMobs(this.playerContainer, this.mobs);

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

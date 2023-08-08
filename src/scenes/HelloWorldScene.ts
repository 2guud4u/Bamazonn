import Phaser from 'phaser'

import Mosquito from '../entities/mosquito';
import Projectile from '../tools/DamageTools/ranged/projectile/projectile';
import Bear from '../entities/bear';
import Mob from '../entities/mob';
import {spawnBear, spawnMosquito, moveMobs} from '../entities/MobFactory';
import PlayerContainer from '../entities/playerContainer';
import startCollisions from '../managers/collisionManager';
import loadAssets from '../preload/loadTools';
import damageEntityStore from '../stores/damageEntityStore';

export default class HelloWorldScene extends Phaser.Scene {
  private spacebar!: Phaser.Input.Keyboard.Key;

  private mosquito!: Mosquito;
  private debug: boolean = false;
  public mobs!: Phaser.Physics.Arcade.Group;
  public playerContainer!: PlayerContainer;
  public playerPos!: {x: number, y: number};
  public platforms!: Phaser.Tilemaps.TilemapLayer;
  public toolsDict!: Map<string, any>;
  public damageEntityStore!: damageEntityStore;
  
  constructor() {
    super('helloworld')
  }

  preload() {
    
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/First.json');
    this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
    this.damageEntityStore = new damageEntityStore(this);
    this.toolsDict = new Map();
    loadAssets(this);
  }

  create() {
    //make map
    
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    this.platforms = map.createLayer('top', tileset, 10,250);
    this.platforms.setCollisionByExclusion([-1], true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    
    
    this.playerContainer = new PlayerContainer(this, 100, 450);
    this.mobs = this.physics.add.group(
      {
        classType: Mob,
        collideWorldBounds: true,
      }
      
    );
    
    startCollisions(this);
    
    spawnBear(this, 800, 600, this.mobs);
     spawnMosquito(this, 100, 100, this.mobs);

      
     
 
    
    
    
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
    


    
    
    
   

 

  private hello(){
    console.log("hello");
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

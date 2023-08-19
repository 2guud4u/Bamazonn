export type ProjectileConst = {
    DAMAGE : number,
    FIRE_RATE : number,
    STUN_STRENGTH : number,
    KNOCKBACK_STRENGTH : number,
    PROJECTILE_SPEED : number,
}

export type MeleeConst = {
    DAMAGE : number,
    FIRE_RATE : number,
    STUN_STRENGTH : number,
    KNOCKBACK_STRENGTH : number,
}
export const Fist_Stat: MeleeConst = {
    DAMAGE : 1,
    FIRE_RATE : 300,
    STUN_STRENGTH : 100,
    KNOCKBACK_STRENGTH : 100,
  
};

export const BugSpray_Stats: ProjectileConst = {
    DAMAGE : 1,
    FIRE_RATE : 1000,
    STUN_STRENGTH : 800,
    KNOCKBACK_STRENGTH : 150,
    PROJECTILE_SPEED: 300,
}
export const BugASalt_Stats: ProjectileConst = {
    DAMAGE : 1,
    FIRE_RATE : 1000,
    STUN_STRENGTH : 150,
    KNOCKBACK_STRENGTH : 700,
    PROJECTILE_SPEED : 1000,
}

export const CandyCane_Stats: MeleeConst = {
    DAMAGE : 10,
    FIRE_RATE : 700,
    STUN_STRENGTH : 120,
    KNOCKBACK_STRENGTH : 750,
}

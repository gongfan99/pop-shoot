import { game } from '../../app.js';
import { Debris } from '../Lasers/Friendly/Debris.js';
import { randomInRange } from '../Logic/Helpers.js';

import {
    BOMBS_NOTIFICATION,
    CLOCK_NOTIFICATION,
    DAMAGE_NOTIFICATION,
    BOMBS_PAUSE,
    CLOCK_PAUSE,
    DAMAGE_PAUSE,
    EMP_PAUSE,
    LOOPERS_PAUSE,
    METALSHIELD_PAUSE,
    NITROGEN_PAUSE,
    DARTS_PAUSE,
    ROCKET_PAUSE,
    SEEKERS_PAUSE,
    SPRAY_PAUSE,
    TIMEFREEZE_PAUSE,
    URANIUM_PAUSE,
    EMP_NOTIFICATION,
    BOMBS_ICON,
    CLOCK_ICON,
    DAMAGE_ICON,
    EMP_ICON,
    LOOPERS_ICON,
    METALSHIELD_ICON,
    NITROGEN_ICON,
    DARTS_ICON,
    ROCKET_ICON,
    SEEKERS_ICON,
    SPRAY_ICON,
    TIMEFREEZE_ICON,
    URANIUM_ICON,
    LOOPERS_NOTIFICATION,
    METALSHIELD_NOTIFICATION,
    NITROGEN_NOTIFICATION,
    DARTS_NOTIFICATION,
    ROCKET_NOTIFICATION,
    SEEKERS_NOTIFICATION,
    SPRAY_NOTIFICATION,
    TIMEFREEZE_NOTIFICATION,
    URANIUM_NOTIFICATION,
    GREED_ICON,
    GREED_PAUSE,
    GREED_NOTIFICATION,
    MACHINEGUN_ICON,
    MACHINEGUN_PAUSE,
    MACHINEGUN_NOTIFICATION,
    TOXIC_ICON,
    TOXIC_NOTIFICATION,
    TOXIC_PAUSE,
    DRONES_ICON,
    DRONES_NOTIFICATION,
    DRONES_PAUSE,
    AIRSTRIKE_ICON,
    AIRSTRIKE_PAUSE,
    AIRSTRIKE_NOTIFICATION,
    DEBRIS_ICON,
    DEBRIS_PAUSE,
    DEBRIS_NOTIFICATION,
} from '../Assets/Hud.js';

export const ITEMS = {
    darts: {
        name: 'darts',
        activate: () => (game.state.variables.darts = true),
        icon: DARTS_ICON,
        pause: DARTS_PAUSE,
        notification: DARTS_NOTIFICATION,
    },
    bomb: {
        name: 'bomb',
        activate: () => (game.state.variables.bomb = true),
        icon: BOMBS_ICON,
        pause: BOMBS_PAUSE,
        notification: BOMBS_NOTIFICATION,
    },
    drones: {
        name: 'drones',
        activate: () => (game.state.variables.drones = true),
        icon: DRONES_ICON,
        pause: DRONES_PAUSE,
        notification: DRONES_NOTIFICATION,
    },
    toxic: {
        name: 'toxic',
        activate: () => {
            game.state.variables.toxic = true;

            setInterval(() => {
                if (game.state.slowmo && game.state.variables.toxic) {
                    game.enemies.damageAll(
                        randomInRange(2, 6) * game.state.variables.damageMultiplier * game.state.variables.toxicrate
                    );
                }
            }, 500);
        },
        icon: TOXIC_ICON,
        pause: TOXIC_PAUSE,
        notification: TOXIC_NOTIFICATION,
    },
    machinegun: {
        name: 'machinegun',
        activate: () => (game.state.variables.machinegun = true),
        icon: MACHINEGUN_ICON,
        pause: MACHINEGUN_PAUSE,
        notification: MACHINEGUN_NOTIFICATION,
    },
    greed: {
        name: 'greed',
        activate: () => (game.state.variables.greed = true),
        icon: GREED_ICON,
        pause: GREED_PAUSE,
        notification: GREED_NOTIFICATION,
    },
    loopers: {
        name: 'loopers',
        activate: () => (game.state.variables.loopers = true),
        icon: LOOPERS_ICON,
        pause: LOOPERS_PAUSE,
        notification: LOOPERS_NOTIFICATION,
    },
    uranium: {
        name: 'uranium',
        activate: () => (game.state.variables.uranium = true),
        icon: URANIUM_ICON,
        pause: URANIUM_PAUSE,
        notification: URANIUM_NOTIFICATION,
    },
    timefreeze: {
        name: 'timefreeze',
        activate: () => (game.state.variables.slowmorate = 0.05),
        icon: TIMEFREEZE_ICON,
        pause: TIMEFREEZE_PAUSE,
        notification: TIMEFREEZE_NOTIFICATION,
    },
    emp: {
        name: 'emp',
        activate: () => (game.state.variables.emp = true),
        icon: EMP_ICON,
        pause: EMP_PAUSE,
        notification: EMP_NOTIFICATION,
    },
    multiplydamage: {
        name: 'multiplydamage',
        activate: () => game.state.variables.incrementDamageMultiplier(),
        icon: DAMAGE_ICON,
        pause: DAMAGE_PAUSE,
        notification: DAMAGE_NOTIFICATION,
    },
    spray: {
        name: 'spray',
        activate: () => game.state.variables.spray++,
        icon: SPRAY_ICON,
        pause: SPRAY_PAUSE,
        notification: SPRAY_NOTIFICATION,
    },
    metalshield: {
        name: 'metalshield',
        activate: () => (game.state.variables.metalshield = true),
        icon: METALSHIELD_ICON,
        pause: METALSHIELD_PAUSE,
        notification: METALSHIELD_NOTIFICATION,
    },
    nitrogen: {
        name: 'nitrogen',
        activate: () => (game.state.variables.nitrogen = true),
        icon: NITROGEN_ICON,
        pause: NITROGEN_PAUSE,
        notification: NITROGEN_NOTIFICATION,
    },
    rocket: {
        name: 'rocket',
        activate: () => (game.state.variables.rocket = true),
        icon: ROCKET_ICON,
        pause: ROCKET_PAUSE,
        notification: ROCKET_NOTIFICATION,
    },
    seekers: {
        name: 'seekers',
        activate: () => (game.state.variables.seekers = true),
        icon: SEEKERS_ICON,
        pause: SEEKERS_PAUSE,
        notification: SEEKERS_NOTIFICATION,
    },
    clock: {
        name: 'clock',
        activate: () => (game.player.clock.owned = true),
        icon: CLOCK_ICON,
        pause: CLOCK_PAUSE,
        notification: CLOCK_NOTIFICATION,
    },
    airstrike: {
        name: 'airstrike',
        activate: () => (game.state.variables.airstrike = true),
        icon: AIRSTRIKE_ICON,
        pause: AIRSTRIKE_PAUSE,
        notification: AIRSTRIKE_NOTIFICATION,
    },
    debris: {
        name: 'debris',
        activate: () => {
            setInterval(() => {
                if (Debris.count < Debris.maxDebris) {
                    game.bluelasers.add(new Debris());
                    Debris.count++;
                }
            }, Debris.respawnRate);
        },
        icon: DEBRIS_ICON,
        pause: DEBRIS_PAUSE,
        notification: DEBRIS_NOTIFICATION,
    },
};

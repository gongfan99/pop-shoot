import { game } from '../../../app.js';
import { BLACKSCREENSPRITE, HIEROGLYPHSPRITE } from '../../Assets/Effects.js';
import {
    CANVAS,
    FOG,
    FOGGREEN,
    S0BACK,
    S0FRONT,
    S0MID,
    S1BACK,
    S1FRONT,
    S1MID,
    S2BACK,
    S2FRONT,
    S2MID,
    S3BACK,
    S3FRONT,
    S4BACK,
    S4FRONT,
} from '../../Assets/Other.js';
import { Vortex } from '../../Effects/Weather/Vortex.js';

const BACKGROUNDS = {
    stage0: { back: S0BACK, mid: S0MID, front: S0FRONT },
    stage1: { back: S1BACK, mid: S1MID, front: S1FRONT },
    stage2: { back: S2BACK, mid: S2MID, front: S2FRONT },
    stage3: { back: S3BACK, front: S3FRONT },
    stage4: { back: S4BACK, front: S4FRONT },
};

const PARALLAX_SPEED = 3;

export class BackgroundGfx {
    static drawBack() {
        // stars
        game.scene.ctx.drawImage(
            BACKGROUNDS[`stage${game.state.stage}`].back,
            game.scene.bgScrollOffset + game.scene.shake,
            game.scene.shake
        );
        game.scene.ctx.drawImage(
            BACKGROUNDS[`stage${game.state.stage}`].back,
            game.scene.bgScrollOffset + CANVAS.width + game.scene.shake,
            game.scene.shake
        );

        // reset offset in case the stars-sprite reaches the end while scrolling
        if (game.scene.bgScrollOffset <= -CANVAS.width) {
            game.scene.bgScrollOffset = 0;
        }

        // darkness
        if (game.weathercontroller.weatherActive) {
            game.scene.ctx.drawImage(BLACKSCREENSPRITE, 0, 0);
        }
    }

    static drawMid() {
        if (game.state.boss) {
            game.scene.ctx.drawImage(BACKGROUNDS[`stage${game.state.stage}`].mid, game.scene.shake, game.scene.shake);
        }
    }

    static drawFront() {
        game.scene.ctx.drawImage(BACKGROUNDS[`stage${game.state.stage}`].front, game.scene.shake, game.scene.shake);

        // only in Vortex
        if (game.weathercontroller.weatherActive.constructor === Vortex) {
            game.scene.ctx.drawImage(HIEROGLYPHSPRITE, game.scene.shake, game.scene.shake);
        }
    }

    static drawFog() {
        const fogtype = game.itemactioncontroller.toxic ? FOGGREEN : FOG;

        if (game.state.slowmo || !game.state.time) {
            game.scene.ctx.drawImage(fogtype, -game.scene.bgScrollOffset - CANVAS.width, 0);
            game.scene.ctx.drawImage(fogtype, -game.scene.bgScrollOffset, 0);
        }
    }

    static updateScrollOffset() {
        if (game.state.slowmo || !game.state.time || game.player.clock.active) {
            game.scene.bgScrollOffset -= game.slowmocontroller.slowmorate;
        } else {
            game.scene.bgScrollOffset -= PARALLAX_SPEED;
        }
    }
}

import { game } from '../../../app.js';
import { RedPackage } from '../../Actors/Packages/RedPackage.js';

const FIRSTPACKAGE = 50;
const NEXT_MULTIPLIER = 1.5;

// next & previous refer to cash required for next & previous package
export class CashController {
    constructor() {
        this.cash = 0;
        this.previous = 0;
        this.next = FIRSTPACKAGE;

        // track the number of package dropped
        this.shipmentnumber = 1;
    }

    checkPlayerCash() {
        if (this.cash === this.next) {
            this.previous = this.next;
            this.next += Math.round(FIRSTPACKAGE * (game.state.stage + NEXT_MULTIPLIER));
            this.shipmentnumber++;
            game.enemies.add(new RedPackage());
        }
    }

    incrementCash() {
        this.cash++;
        this.checkPlayerCash();
    }

    get levelBarPercentage() {
        return (this.cash - this.previous) / (this.next - this.previous);
    }
}

import Reel from './ReelContainer.js';
import Config from './Config.js';

export default class ReelsContainer extends PIXI.Container {

    constructor(game, application) {
        super();
        this.game = game;
        this.reelStopCounter = 0;
        this.application = application;
        this.reels = [];
        this.reelsLength;
        this.buildReels();
    }

    buildReels() {
        for (let i = 0; i < 5; i++) {
            let reel = new Reel(this.application, 3, this);
            this.reels.push(reel);
            reel.x = i * reel.width;
            this.addChild(reel);
        }
        this.reelsLength = this.reels.length;
    }

    spin() {
        for (let i = 0; i < this.reels.length; i++) {
            let r = this.reels[i];
            r.reelNumber = i;
            r.spin();
        }
    }

    stop(stopData) {
        this.stopData = stopData;
        this.stopReel(0);
    }

    stopReel(reelNumber) {
        let interval = 100;
        let r = this.reels[reelNumber];
        r.stop(this.stopData[reelNumber]);

        if (reelNumber < this.reels.length - 1) {
            setTimeout(() => {
                this.stopReel(reelNumber + 1)
            }, (reelNumber + 1) * interval);
        }
    }

    onStopReelComplete(reelNumber) {
        this.reelStopCounter++;
        if (this.reelStopCounter == 5) {
            this.reelStopCounter = 0;
            this.game.allReelsStoped();
        }

    }

    showWinning(lines) {
        this.showLineWinning(lines, 0);
    }

    showLineWinning(lines, lineIndex) {
        for (let j = 0; j < lines[lineIndex].amount; j++) {
            this.reels[j].animateIconIndex(Config.LINES[lines[lineIndex].line][j]);
        }
        if (lineIndex + 1 <= lines.length - 1) {
            setTimeout(() => { this.showLineWinning(lines, lineIndex + 1); }, 2000);
        }
    }

    ticker() {
        for (let i = 0; i < this.reelsLength; i++) {
            this.reels[i].ticker();
        }
    }

}



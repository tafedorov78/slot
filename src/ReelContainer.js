import Icon from './IconContainer.js';
import TweenMax from './TweenMax.min.js';
import Config from './Config.js';

export default class ReelContainer extends PIXI.Container {

    constructor(application, visibleSize, container) {
        super();
        this.container = container;
        this.application = application;
        this.visibleSize = visibleSize;
        this.pool = [];
        this.icons = [];
        this.speed = Number(Config.SPIN_SPEED);
        this.symbolCounter = 0;
        this.symbolsOnTop = 0;
        this.bottomSymbol;
        this.stopData = [];
        this.reelNumber = 0;
        this.buildIcons();
        this.iconHeight = 150;
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.stop();
        this.ticker.add((deltaTime) => {
            this.update();
        });
        this.filter = new PIXI.filters.BlurYFilter();
        this.filter.strength = 20;

    }

    generateRandomTexture() {
        return Math.round(Math.random() * 10);
    }
    buildIcons() {
        for (let i = 0; i < this.visibleSize + 2; i++) {
            let icon = new Icon(this.generateRandomTexture());
            icon.y = i * icon.height;
            this.icons.push(icon);
            this.addChild(icon);
        }
    }

    spin() {
        let td = '-=' + Config.START_GAP;
        TweenMax.to(this.icons, 0.3, { y: td, ease: Power2.easeOut, onComplete: this.onStartComplete.bind(this) });
        console.log('spin', this.reelNumber, ' started');
    }

    onStartComplete() {
        this.filters = [this.filter];
        this.bottomSymbol = this.icons[this.icons.length - 1];
        this.ticker.start();
    }

    stop(data) {
        this.stopData = data.slice(0);
        this.stopData.unshift(this.generateRandomTexture());
        this.addSymbolsOnTop(this.stopData);
        let distance = Math.abs(this.icons[1].y) + this.iconHeight + 60;
        let t = (distance / (this.speed * 60));
        let td = '+=' + String(distance);
        this.ticker.stop();
        TweenMax.to(this.icons, t, { y: td, onComplete: this.onStopTweenComplete.bind(this) });
    }

    onStopTweenComplete() {
        let td = '-=' + Config.START_GAP;
        this.filters = null;
        TweenMax.to(this.icons, 0.2, { y: td, ease: Power2.easeOut, onComplete: this.onStopSpinningComplete.bind(this) });
    }

    onStopSpinningComplete() {
        let amount = this.icons.length - 5;
        for (let i = 0; i < amount; i++) {
            this.poolIn(this.icons.pop());
        }
        this.container.onStopReelComplete(this.reelNumber);
    }

    bottomChecking() {
        if (this.bottomSymbol.y > 600) {
            this.bottomSymbol.y = this.icons[0].y - this.iconHeight;
            this.icons.unshift(this.icons.pop());
            this.bottomSymbol = this.icons[this.icons.length - 1];
            this.bottomSymbol.setFrame(this.generateRandomTexture());
        }
    }

    addSymbolsOnTop(data) {
        let s;
        for (let i = data.length - 1; i >= 0; i--) {
            s = this.poolOut(data[i]);
            this.addChild(s);
            s.y = this.icons[0].y - this.iconHeight;
            this.icons.unshift(s);
        }
    }

    animateIconIndex(index) {
        this.icons[index + 1].animate();
    }


    poolIn(icon) {
        this.removeChild(icon);
        this.pool.push(icon);
    }

    poolOut(index = -1) {
        let textureIndex = index > -1 ? index : this.generateRandomTexture();
        if (this.pool.length > 0) {
            let icon = this.pool.pop();
            icon.setFrame(textureIndex);
            return icon;
        } else {
            let icon = new Icon(textureIndex);
            this.addChild(icon);
            return icon;
        }
    }

    do() {
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].y += this.speed;
        }
        this.bottomChecking();
    }

    update() {
        this.do();
    }

}



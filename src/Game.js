import Reels from './ReelsContainer.js';
import InterfaceContainer from './InterfaceContainer.js';
import Config from './Config.js';


export default class Game extends PIXI.Container {

    constructor(application) {
        super();
        this.application = application;
        this.loadAssets();
        this.stopData1 = [
            [6, 1, 7],
            [6, 6, 7],
            [6, 1, 6],
            [6, 6, 7],
            [6, 5, 7]
        ];
    }


    generateStopData() {
        let res = [];
        let res2 = [];
        for (let i = 0; i < Config.REELS; i++) {
            res2 = [];
            for (let j = 0; j < Config.VISIBLE_ICONS; j++) {
                let element = Math.round(Math.random() * Number(Config.TOTAL_ICONS));
                res2.push(element);
            }
            res.push(res2);

        }
        return res;
    }

    loadAssets() {
        const loader = new PIXI.loaders.Loader();
        loader
            .add('image0', './assets/wild.png')
            .add('image1', './assets/highwin_bell.png')
            .add('image2', './assets/highwin_cherry.png')
            .add('image3', './assets/highwin_diamond.png')
            .add('image4', './assets/highwin_lemon.png')
            .add('image5', './assets/highwin_seven.png')
            .add('image6', './assets/lowwin_club.png')
            .add('image7', './assets/lowwin_diamond.png')
            .add('image8', './assets/lowwin_heart.png')
            .add('image9', './assets/lowwin_spade.png')
            .add('image10', './assets/lowwin_star.png');

        loader.load((loader, resources) => {
            this.onLoadedAssets();
        });
    }

    onLoadedAssets() {
        this.reels = new Reels(this, this.application);
        this.addChild(this.reels);
        this.reels.y = 100;
        this.reels.x = 200;

        this.interfaceContainer = new InterfaceContainer(this.interfaceHandler.bind(this));
        this.addChild(this.interfaceContainer);
        this.interfaceContainer.y = 300;
        this.interfaceContainer.x = 1000;
        let mask = new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRect(200, 250, 1500, 450);
        this.addChild(mask);
        this.mask = mask;
    }

    interfaceHandler(btn) {
        if (btn == 'spin') {
            this.stopData = this.stopData1;//this.generateStopData();
            this.reels.spin();
            setTimeout(() => { this.reels.stop(this.stopData); }, Config.MIN_TIME_SPIN);
        }
    }

    checkForWinnig() {
        let amount = 0;
        let winLines = [];
        let icon;
        for (let i = 0; i < Config.LINES.length; i++) {
            icon = this.stopData[i][Config.LINES[i][0]];
            amount = 0;
            for (let j = 0; j < Config.LINES[i].length; j++) {
                if (this.stopData[j][Config.LINES[i][j]] == icon) {
                    amount++;
                    if (amount == Config.LINES[i].length) {
                        winLines.push({
                            "line": i,
                            "amount": amount
                        });
                        amount = 0;
                    }
                } else {
                    if (amount > 2) {
                        winLines.push({
                            "line": i,
                            "amount": amount
                        });
                        amount = 0;
                    }
                    continue;
                }
            }
        }
        return winLines;
    }

    allReelsStoped() {
        let winLines = this.checkForWinnig();
        if (winLines.length > 0) {
            this.reels.showWinning(winLines);
        }

        this.interfaceContainer.enableButtons();
    }

}



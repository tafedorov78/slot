export default class SpinButton extends PIXI.Container {

    constructor(callback) {
        super();
        this.callback = callback;
        this.init();
    }

    init() {
        this.textureButton = new PIXI.Graphics()
            .beginFill(0xf46b41)
            .drawCircle(0, 0, 50)
            .endFill().generateCanvasTexture();

        this.textureButtonDown = new PIXI.Graphics()
            .beginFill(0xf49b42)
            .drawCircle(0, 0, 50)
            .endFill().generateCanvasTexture();

        this.textureButtonOver = new PIXI.Graphics()
            .beginFill(0xf4cd41)
            .drawCircle(0, 0, 50)
            .endFill().generateCanvasTexture();

        this.button = new PIXI.Sprite(this.textureButton);
        this.button.buttonMode = true;

        this.button.anchor.set(0.5);
        this.button.x = 100;
        this.button.y = 100;

        this.button.interactive = true;
        this.button.buttonMode = true;

        this.button
            .on('pointerdown', this.onButtonDown.bind(this))
            .on('pointerup', this.onButtonUp.bind(this))
            .on('pointerupoutside', this.onButtonUp.bind(this))
            .on('pointerover', this.onButtonOver.bind(this))
            .on('pointerout', this.onButtonOut.bind(this));

        this.addChild(this.button);

        var spinText = new PIXI.Text('SPIN');
        spinText.x = 70;
        spinText.y = 80;

        this.addChild(spinText);
    }


    onButtonDown() {
        this.isdown = true;
        this.button.texture = this.textureButtonDown;
        this.alpha = 1;
        this.callback('down');
    }

    onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            this.button.texture = this.textureButtonOver;
        }
        else {
            this.button.texture = this.textureButton;
        }
        this.callback('up');
    }

    onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.button.texture = this.textureButtonOver;
        this.callback('over');
    }

    onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.button.texture = this.textureButton;
        this.callback('out');
    }

}





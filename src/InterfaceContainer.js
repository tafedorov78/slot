import SpinButton from "./SpinButton.js";

export default class InterfaceContainer extends PIXI.Container {

    constructor(callback) {
        super();
        this.callback = callback;
        this.buildButtons();
    }

    buildButtons() {
        this.spinButton = new SpinButton(this.onSpinButtonHandler.bind(this));
        this.addChild(this.spinButton);
    }

    onSpinButtonHandler(state) {
        console.log(state);
        if (state == 'up') {
            this.callback('spin');
            this.spinButton.button.interactive = false;
            this.spinButton.button.buttonMode = false;
        }
    }

    enableButtons() {
        this.spinButton.button.interactive = true;
        this.spinButton.button.buttonMode = true;
    }


}





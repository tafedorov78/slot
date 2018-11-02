import TweenMax from './TweenMax.min.js';


export default class IconContainer extends PIXI.Container {

    constructor(index) {
        super();
        this.frameName;
        this.spr = PIXI.Sprite.from('image' + index);
        this.addChild(this.spr);
    }

    setFrame(index) {
        this.frameName = PIXI.Texture.from('image' + index);
        this.spr.texture = this.frameName;
    }



    animate() {
        TweenMax.to(this.spr, 0.5, { alpha: 0, repeat: 2, yoyo: true, onComplete: this.onCompleteAnimation.bind(this) });
    }


    onCompleteAnimation() {
        this.spr.alpha = 1;
    }
}





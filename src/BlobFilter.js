import * as PIXI from 'pixi.js'

export default class BlobFilter extends PIXI.Filter {
	constructor() {
		const vertSrc = `

			attribute vec2 aVertexPosition;
			attribute vec2 aTextureCoord;

			uniform mat3 projectionMatrix;

			varying vec2 vTextureCoord;

			void main(void)
			{
				gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
				vTextureCoord = aTextureCoord;
				 
			}

		`;

		const fragSrc = `
		
		varying vec2 vTextureCoord;
		
		uniform sampler2D uSampler;
		
		
		void main(void) {
		
			vec4 color = texture2D(uSampler, vTextureCoord);
			
			float alphaStrength = color.a;
			float alpha = 0.;
			
			if(alphaStrength > 0.5) 
			{
				alpha = 1.;
			}
			else 
			{
				alpha = 0.;
			}
			
			gl_FragColor = vec4(0., 0., 0., 1.) * alpha;
			
		}
		`;

		super(vertSrc, fragSrc);


	}
}
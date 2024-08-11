import alea from 'https://cdn.skypack.dev/alea';

export class PlanetType {
    constructor(seed,baseWidth,baseHeight) {
        this.seed = seed;
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.noiseDimension = 1;
    }

    colorFromHeightLatLongLandscape(height,lat,long,palette) {
        return [height*255,height*255,height*255,0]; // placeholder if things break
    }

    colorFromHeightLatLongBoundary(height,lat,long,palette) {
        return [height*255,height*255,height*255,0]; // placeholder if things break
    }

    generateHeight(x,y,z,noise3D) {
        return 0.; // placeholder if things break
    }

    setSeed(seed) {
        this.seed = seed;
    }
}

export class EarthPlanet extends PlanetType {
    constructor(seed,baseWidth,baseHeight) {
        super(seed,baseWidth,baseHeight);
        this.seaHeight = 0.6;
    }

    generateHeight(x,y,z,noise3D) {
        // let scales = [0.03,0.01,0.007,0.002,0.0002];
        // let weights = [0.05,0.2,.2,1.,.5];
        let scales = [0.1,0.03,0.01,0.007,0.002,0.0002];
        let weights = [0.02,0.06,0.2,.2,1.,.1];
        
        let totalValue = 0.;
        let norm = 0.;

        const fineNoiseVariationScale = 0.0002;
        weights[0]*=noise3D(x*fineNoiseVariationScale,y*fineNoiseVariationScale,z*fineNoiseVariationScale)+1.;

        for ( let ispec=0; ispec<weights.length; ispec++ ) {
            norm+=weights[ispec];
            totalValue+=noise3D(x*scales[ispec],y*scales[ispec],z*scales[ispec])*weights[ispec];
        }
        totalValue/=norm;
        totalValue=(totalValue+1)/2.;// from -1 to 1 to 0-1

        return totalValue;
    }

    colorFromHeightLatLongLandscape(height,lat,long) {
        const temperatureCutoff = 0.8;
        let outColor = [0,0,0,255];

        if ( height<this.seaHeight ) {
            height=height/this.seaHeight;
            outColor[0]=height*50;
            outColor[1]=height*50;
            outColor[2]=150+100*height;
        } else {
            height = ((height-this.seaHeight)/(1-this.seaHeight))**2;
            let temperature = Math.max(Math.min(Math.cos(lat)+height*0.2,1)-0.1,0)/0.9;

            let sand = [180,133,63];
            let lush = [34,139,34];
            let cold = [240,248,255];

            if ( temperature>temperatureCutoff ) {
                let interp = (temperature-temperatureCutoff)/(1-temperatureCutoff);
                for ( let ic = 0 ; ic<3 ; ic++ ) {
                    outColor[ic] = sand[ic]*interp + lush[ic]*(1-interp);
                }
            } else {
                let interp = temperature/temperatureCutoff;
                for ( let ic = 0 ; ic<3 ; ic++ ) {
                    outColor[ic] = lush[ic]*interp + cold[ic]*(1-interp);
                }
            }
            for ( let ic = 0 ; ic<3 ; ic++ ) {
                outColor[ic] += height * (240-outColor[ic])
            }
        }
        return outColor;
    }

    colorFromHeightLatLongBoundary(height,lat,long) {
        if ( height>this.seaHeight ) {
            return [127,127,127,255];
        } else {
            return [255,255,255,255];
        }
    }
}

export class JupiterPlanet extends PlanetType {
    constructor(seed,baseWidth,baseHeight) {
        super(seed,baseWidth,baseHeight);
        this.seaHeight = 0.2;
        this.setSeed(seed);
    }

    setSeed(seed) {
        this.seed = seed;

        let band_palette = [
            [209,167,127],
            [180,167,158],
            [227,220,203],
            [165,145,134],
            [235,243,246],
            [227,220,203]
        ];

        let prng = new alea(this.seed);

        let nbands = Math.floor(prng() * 10)+8;

        this.band_colors = new Array(nbands);
        for ( let ib=0 ; ib<nbands ; ib++ ) {
            let band_c = Math.floor(prng() * band_palette.length);
            this.band_colors[ib] = new Array(3)
            for ( let ic = 0 ; ic<3 ; ic++ ) {
                this.band_colors[ib][ic] = band_palette[band_c][ic]+Math.floor(prng()*10)-5;
            }
        }

    }

    simpleSimplex(x,y,z,noise3D,scales,weights) {
        let totalValue = 0.;
        let norm = 0.;

        for ( let ispec=0; ispec<weights.length; ispec++ ) {
            norm+=weights[ispec];
            totalValue+=noise3D(x*scales[ispec],y*scales[ispec],z*scales[ispec])*weights[ispec];
        }
        totalValue/=norm;
        totalValue=(totalValue+1)/2.;// from -1 to 1 to 0-1, ish
        return totalValue;
    }

    generateHeight(x,y,z,noise3D) {
        let scales = [0.05,0.005];
        let weights = [0.02,1.];
        
        let bandwaver = this.simpleSimplex(x,y,z,noise3D,scales,weights);

        let x2 = x+5;

        scales = [0.01,0.001];
        weights = [0.2,0.02];
        let littlewibble = this.simpleSimplex(x2,y,z,noise3D,scales,weights);

        return [bandwaver,littlewibble];
    }

    colorFromHeightLatLongLandscape(height,lat,long) {
        let outColor = [0,255,0,255];
        let bandoutliercutoff = 0.8;

        // let band_brown = [209,167,127];
        // let band_beige = [180,167,158];
        // let band_brown = [200,200,200];
        // let band_beige = [100,100,100];
        // let dot_color = [227,220,203];

        // let band_colors = [
        //     [209,167,127],
        //     [180,167,158],
        //     [227,220,203],
        //     [165,145,134],
        //     [235,243,246],
        //     [227,220,203]
        // ];

        // const dotpeak = 0.9;

        // let band_magnitude = Math.pow(Math.cos((lat+(height-.5)*0.2)*5),2);
        let bandf = (lat/Math.PI+0.5) + (height[0]-0.5)*0.1;
        let nband = Math.floor(bandf*this.band_colors.length);
        let fband = 0.;
        let nband2 = nband;
        nband = Math.max(nband,0);
        nband = Math.min(this.band_colors.length-1,nband);

        if ( height[1]>bandoutliercutoff) {
            if ( height[1]>(1-bandoutliercutoff)/2 ) {
                nband2=nband+1;
            } else {
                nband2=band-1;
            }
            fband = 1.;//Math.abs(height[1]-bandoutliercutoff)/(1-bandoutliercutoff);
        }
        else {
            if ( height[1]>bandoutliercutoff/2 ) {
                nband2=nband+1;
            } else {
                nband2=nband-1;
            }
            fband = 0.;//Math.pow(height[1]/bandoutliercutoff,3);
        }
        nband2 = Math.max(nband2,0);
        nband2 = Math.min(this.band_colors.length-1,nband2);



        // let dot_magnitude = 0.;//(Math.max(dotpeak,height[0])-dotpeak)/(1-dotpeak);
        
        // (
        //     Math.pow(Math.cos(lat*10.+height*Math.PI),2)
        //     + (Math.max(0.9,height)-0.9)*100.
        //         );

        for ( let ic = 0 ; ic<3 ; ic++ ) {
            outColor[ic] = this.band_colors[nband][ic]*(1-fband) +
                            this.band_colors[nband2][ic]*fband
            // outColor[ic] = band_brown[ic] * band_magnitude +
            //                     band_beige[ic] * (1-band_magnitude);
            // outColor[ic] = dot_color[ic] * dot_magnitude +
            //                     outColor[ic] * (1-dot_magnitude);
            // outColor[ic] = height*255;
        }
        // outColor[0]+=Math.sin((height[1]-0.5)*Math.PI*2)*5;
        // outColor[1]+=Math.cos((height[1]-0.5)*Math.PI*2)*5;

        return outColor;
    }

    colorFromHeightLatLongBoundary(height,lat,long) {
        return colorFromHeightLatLongLandscape(height,lat,long); //placeholder
        // let band_magnitude = (
        //     Math.pow(Math.cos(lat*10.+height*Math.PI),2)
        //         );

        // if ( band_magnitude<this.seaHeight ) {
        //     return [127,127,127,255];
        // } else {
        //     return [255,255,255,255];
        // }
    }
}
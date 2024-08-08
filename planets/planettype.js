export class PlanetType {
    constructor(seed,baseWidth,baseHeight) {
        this.seed = seed;
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
    }

    colorFromHeightLatLongLandscape(height,lat,long,palette) {
        return [height*255,height*255,height*255,0]; // placeholder if things break
    }

    colorFromHeightLatLongBoundary(height,lat,long,palette) {
        return [height*255,height*255,height*255,0]; // placeholder if things break
    }

    simplexPowerSpectrumSum(x,y,z,noise3D) {
        return 0.; // placeholder if things break
    }
}

export class EarthPlanet extends PlanetType {
    constructor(seed,baseWidth,baseHeight) {
        super(seed,baseWidth,baseHeight);
        // this.seed = seed;
        // this.baseWidth = baseWidth;
        // this.baseHeight = baseHeight;
        this.seaHeight = 0.6;
    }

    simplexPowerSpectrumSum(x,y,z,noise3D) {
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
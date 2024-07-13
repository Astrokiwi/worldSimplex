import {createNoise3D} from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import alea from 'https://cdn.skypack.dev/alea';

export class WorldMap {
    constructor(seed) {
        this.seed = seed;
        this.baseWidth = 1024;
        this.baseHeight = 512;

        this.baseHeightMap = new Array(this.baseWidth*this.baseHeight);
    }

    simplexPowerSpectrumSum(x,y,z,noise3D) {
        let scales = [0.03,0.01,0.007,0.002,0.0002];
        let weights = [0.05,0.2,.2,1.,.5];
        
        let totalValue = 0.;
        let norm = 0.;

        for ( let ispec=0; ispec<weights.length; ispec++ ) {
            norm+=weights[ispec];
            totalValue+=noise3D(x*scales[ispec],y*scales[ispec],z*scales[ispec])*weights[ispec];
        }
        totalValue/=norm;
        totalValue=(totalValue+1)/2.;// from -1 to 1 to 0-1

        return totalValue;
    }

    latLongTo3D(lat,long,radius) {
        let z = Math.sin(lat);
        let sliceRadius = Math.sqrt(1-z**2);
        let x = Math.sin(long)*sliceRadius;
        let y = Math.cos(long)*sliceRadius;

        return [x*radius,y*radius,z*radius];
    }

    colorFromHeightLatLong(height,lat,long) {
        const seaHeight = 0.6;
        const temperatureCutoff = 0.8;

        let outColor = [0,0,0,255];

        if ( height<seaHeight ) {
            height=height/seaHeight;
            outColor[0]=height*50;
            outColor[1]=height*50;
            outColor[2]=150+100*height;
        } else {
            height = ((height-seaHeight)/(1-seaHeight))**2;
            let temperature = Math.min(Math.cos(lat)+height*0.2,1);

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

    gridCoordToLatLong(ix,iy,width,height,projection) {
        let lat,long;

        projection = projection.toLowerCase().replace(/\s+/g, '');

        switch(projection) {
            case 'equirectangular':
                long = ix/width*2*Math.PI;
                lat = (iy-height/2)/height*Math.PI;
                break; 
            case 'orthographic':
                let x;
                if (ix<width/2) {
                    x = (ix-width/4)/height*2;
                } else {
                    x = (ix-3*width/4)/height*2;
                }
                let z = (iy/height-0.5)*2;

                let y = Math.sqrt(1.-x*x-z*z);

                // let r = Math.sqrt(x*x+y*y);
                lat = Math.asin(z);

                if (ix<width/2) {
                    long = Math.atan2(x,y)+rotationOffset;
                } else {
                    long = Math.atan2(-x,-y)+rotationOffset;
                }
                if ( long<0. ) {
                    long+=2.*Math.PI;
                }
                long = long%(2.*Math.PI);

                break;
        }
        return [lat,long];
    }

    generateBaseMap(seed) {
        const radius = 512;
        this.seed = seed;

        // let baseMapImage = new ImageData();
        
        let prng = new alea(this.seed);
        const noise3D = createNoise3D(prng);

        // long 0 to 2pi, lat -pi/2 to pi/2
        for (let ix=0 ; ix<this.baseWidth ; ix++ ) {
            for ( let iy = 0 ; iy<this.baseHeight ; iy++ ) {
                let long = ix*2.*Math.PI/this.baseWidth;
                let lat = iy*Math.PI/this.baseHeight-Math.PI/2.;

                let coords3d = this.latLongTo3D(lat,long,radius);

                this.baseHeightMap[ix+iy*this.baseWidth] = this.simplexPowerSpectrumSum(coords3d[0],coords3d[1],coords3d[2],noise3D);
            }
        }
    }

    generateColorMap(width,height,projection) {
        let chartImage = new ImageData(width,height);
        let chartColorMap = chartImage.data;

        let lat;
        let long;

        for (let ix=0 ; ix<width ; ix++ ) {
            for ( let iy = 0 ; iy<height ; iy++ ) {
                [lat,long] = this.gridCoordToLatLong(ix,iy,width,height,projection);
                if (!isFinite(lat) || !isFinite(long) ) {
                        for ( let ic=0 ; ic<3 ; ic++ ) {
                            chartColorMap[(ix+iy*width)*4+ic]=0;
                        }
                        chartColorMap[(ix+iy*width)*4+3]=255;
                        continue;
                }

                let xmap = Math.floor(long*this.baseWidth/(2.*Math.PI));
                let ymap = Math.floor((lat+Math.PI/2.)/(Math.PI)*this.baseHeight);

                let cellHeight = this.baseHeightMap[xmap+ymap*this.baseWidth];

                let cellColor = this.colorFromHeightLatLong(cellHeight,lat,long);
                for ( let ic=0 ; ic<4 ; ic++ ) {
                    chartColorMap[(ix+iy*width)*4+ic]=cellColor[ic];
                }
            }
        }
        return chartImage;
    }
}
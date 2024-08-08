import {createNoise3D} from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import alea from 'https://cdn.skypack.dev/alea';
import {PlanetType, EarthPlanet} from "./planettype.js"

export class WorldMap {
    constructor(seed) {
        this.seed = seed;
        this.baseWidth = 1024;
        this.baseHeight = 512;

        this.baseHeightMap = new Array(this.baseWidth*this.baseHeight);

        this.planetType = new EarthPlanet(this.seed,this.baseWidth,this.baseHeight);
    }

    heightFromLat(lat,long) {
        // Simple linear 2d interpolation
        let x = long*this.baseWidth/(2.*Math.PI);
        let y = (lat+Math.PI/2.)/(Math.PI)*this.baseHeight;

        let x0=Math.floor(x);
        let y0=Math.floor(y);
        let x1=(x0+1)%this.baseWidth;
        let y1=(y0+1)%this.baseHeight;
        let xf=x-x0;
        let yf=y-y0;

        let h00 = this.baseHeightMap[x0+y0*this.baseWidth]
        let h10 = this.baseHeightMap[x1+y0*this.baseWidth]
        let h01 = this.baseHeightMap[x0+y1*this.baseWidth]
        let h11 = this.baseHeightMap[x1+y1*this.baseWidth]

        let cellHeight = h00*(1-xf)*(1-yf) + h10*xf*(1-yf) + h01*(1-xf)*yf + h11*xf*yf;

        // let xmap = Math.floor(long*this.baseWidth/(2.*Math.PI));
        // let ymap = Math.floor((lat+Math.PI/2.)/(Math.PI)*this.baseHeight);

        // let cellHeight = this.baseHeightMap[xmap+ymap*this.baseWidth];
        return cellHeight;
    }


    latLongTo3D(lat,long,radius) {
        let z = Math.sin(lat);
        let sliceRadius = Math.sqrt(1-z**2);
        let x = Math.sin(long)*sliceRadius;
        let y = Math.cos(long)*sliceRadius;

        return [x*radius,y*radius,z*radius];
    }

    colorFromHeightLatLong(height,lat,long,palette) {
        switch (palette) {
            case 'landscape':
                return this.planetType.colorFromHeightLatLongLandscape(height,lat,long);
            case 'boundary':            
                return this.planetType.colorFromHeightLatLongBoundary(height,lat,long);
        }
        return [height*255,height*255,height*255,0]; // placeholder if things break
    }

    gridCoordToLatLong(ix,iy,width,height,projection) {
        let lat,long;

        projection = projection.toLowerCase().replace(/\s+/g, '');

        switch(projection) {
            case 'equirectangular':
                long = ix/width*2*Math.PI;
                lat = (iy-height/2)/height*Math.PI;
                break; 
            case 'mercator':
                long = ix/width*2*Math.PI;
                lat = 2.*Math.atan(Math.exp((iy-height/2)/height*4)) - Math.PI/2.;
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

                this.baseHeightMap[ix+iy*this.baseWidth] = this.planetType.simplexPowerSpectrumSum(coords3d[0],coords3d[1],coords3d[2],noise3D);//planettype
            }
        }
    }

    generateColorMap(width,height,projection,palette) {
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

                let cellHeight = this.heightFromLat(lat,long);
                let cellColor = this.colorFromHeightLatLong(cellHeight,lat,long,palette);
                for ( let ic=0 ; ic<4 ; ic++ ) {
                    chartColorMap[(ix+iy*width)*4+ic]=cellColor[ic];
                }
            }
        }
        return chartImage;
    }
}
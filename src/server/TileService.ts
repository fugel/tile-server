import MBTiles from "@mapbox/mbtiles";
const path = require('path');

const MBTILES = "osm-2017-07-03-v3.6.1-great-britain_england.mbtiles"

class myMbtiles {
  mbtiles: any;

  constructor() {
    this.mbtiles = new MBTiles(path.resolve(__dirname, MBTILES+"?mode=ro"), function (
      err: any
    ) {
      // console.log(mbtiles) // mbtiles object with methods listed below
      if (err) return console.log(err);
      console.log("mbtiles ready");
    });
  }

  getTile(z: number, x: number, y: number, cb: any) {
    this.mbtiles.getTile(z, x, y, function (
      err: string,
      data: string,
      headers: any
    ) {
      if (err) return console.log(err);
      // `data` is your gzipped buffer - use zlib to gunzip or inflate
      const res:object = {
          headers: headers,
          tile: data
      }
      cb(res);
    });
  }
}

export const tiles = new myMbtiles();
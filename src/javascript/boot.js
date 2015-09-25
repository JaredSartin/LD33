require("./vendor/lge/dist/lge.min.js");

var opts = {
  preload: {
    sound: [
    //   {fileName: "music_loop", types: ["ogg", "mp3"], id: "music"},
    ],
    data: [
    //   "images/play.png"
    ],
    font: [
      "silkscreennormal",
    ]
  },
  settings: {
    layout: {
      width: 320,
      height: 240,
      orientation: "portrait", // landscape | portrait
      scaling: "fit", // fit | fill | stretch | none/undefined",
    }
  }
}

// DEFINE LOCALES PRIOR!
// Preloaders will kick in here and load the default and current!
L.Setup(opts);

require("./game/main");

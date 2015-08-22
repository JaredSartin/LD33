require("./vendor/lge/dist/lge.min.js");

var opts = {
  preload: {
    // sound: [
    //   {fileName: "music_loop", types: ["ogg", "mp3"], id: "music"},
    // ],
    data: [
      "images/play.png"
    ],
    // font: [
    //   "FlappyBird",
    // ]
  },
  settings: {}
}

// DEFINE LOCALES PRIOR!
// Preloaders will kick in here and load the default and current!
L.Setup(opts);

L.SceneManager.addScene(L.preloaderScene);
L.SceneManager.setCurrentScene("preloader");

L.preloaderScene.on("finished", function() {
  console.log("Starting Game...");
  require("./game/main");

  // @if BUILD='demo'
  console.log("Trial build");
  // @endif 
  // @if BUILD='full'
  console.log("Full build");
  // @endif 
});

var runnerScene = require("./scenes/runner");

module.exports = new (L.GameLoop.extend({
	setup: function() {
		L.SceneManager.addScene(runnerScene);
		L.SceneManager.setCurrentScene("runner");
		// L.SceneManager.addScene(L.preloaderScene);
		// L.SceneManager.setCurrentScene("preloader");
    //
		// L.preloaderScene.on("finished", function() {
		// 	L.SceneManager.addScene(runnerScene);
		// 	L.SceneManager.setCurrentScene("runner");
		// });

	},
	update: function() {
		L.SceneManager.updateCurrentScene();
		// Global logic goes here, else in
		// the scene update function
		// Called every ~1/60 of a second
	},
	draw: function() {
		L.SceneManager.renderCurrentScene();
		// Global render goes here, else in
		// the scene render function
		// Called every frame
	}
}))();

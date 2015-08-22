var mainMenuScene = require("./scenes/mainMenu");
var levelSelectScene = require("./scenes/levelSelect");
var gameScene = require("./scenes/game");

module.exports = new (L.GameLoop.extend({
	setup: function() {
		L.SceneManager.addScene(mainMenuScene);
		L.SceneManager.addScene(gameScene);
		L.SceneManager.addScene(levelSelectScene);

		L.SceneManager.setCurrentScene("main-menu");

		if(L.settings.debug)
			L.Stats.show();
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

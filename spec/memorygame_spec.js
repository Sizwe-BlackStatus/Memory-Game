const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf-8");

const { document } = new JSDOM(html).window;
global.document = document;

const { shuffleCard } = require("../src/script.js");
const cardArray = [
  "pics/BatmanPose.png",
  "pics/BatmanShadow.png",
  "pics/JokerPose.png",
  "pics/JokerShadow.png",
  "pics/JokerWins.png",
  "pics/Stalement.png",
];
describe("Memory Game", function () {
  var htmlFile;
  beforeEach(function (done) {
    JSDOM.fromFile("index.html", {}).then(function (result) {
      htmlFile = result;
      done();
    });
  });
  afterEach(function () {
    htmlFile.window.close();
  });
  it("cards should flip if a card is clicked", function () {
    cardFlipped = false;
    htmlFile.window.onModulesLoaded = function () {
      var imgSrc = htmlFile.window.document.getElementsByTagName("img");
      var eventListener = new htmlFile.window.MouseEvent("click");
      if (imgSrc.dispatchEvent(eventListener)) {
        cardFlipped = true;
      }
      expect(cardFlipped).toBe(true);
    };
  });
  it("should reset page", function () {
    reset = false;
    htmlFile.window.onModulesLoaded = function () {
      var btn = htmlFile.window.document.getElementsByClassName("reset-game");
      var eventListener = new htmlFile.window.MouseEvent("click");
      if (btn.dispatchEvent(eventListener)) {
        reset = true;
      }
      expect(reset).toBe(true);
    };
  });
  it("should define shuffle function", function () {
    expect(shuffleCard(cardArray)).toBeDefined();
  });
  it("should randomise cardArray", function () {
    oldCardArray = shuffleCard(cardArray).toString();
    newCardArray = shuffleCard(cardArray).toString();
    expect(oldCardArray == newCardArray).toBe(false);
  });
});

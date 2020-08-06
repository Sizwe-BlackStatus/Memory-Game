// const {shuffleCard} = require("../script.js")
const {JSDOM} = require('jsdom')
describe('Card elements on the board', function(){
    var htmlFile;
    beforeEach(function(done){
        JSDOM.fromFile('index.html', {

        }).then(function(result){
            htmlFile = result;
            done();
        })
    })
    afterEach(function(){
        htmlFile.window.close()
    })
    it('should flip when card is clicked', function(){
        cardFlipped = false
        htmlFile.window.onModulesLoaded = function(){
            var imgSrc = htmlFile.window.document.getElementsByTagName("img")
            var eventListener = new htmlFile.window.MouseEvent('click');
            if(imgSrc.dispatchEvent(eventListener)){
                cardFlipped = true
            }
            expect(cardFlipped).toBe(true)
        }
    })
    it('should shuffle cards', function(){
        function shuffleCard(cardArrayCopy) {
            for (
              var currentIndex = cardArrayCopy.length - 1;
              currentIndex > 0;
              currentIndex--
            ) {
              var randomIndex = Math.floor(Math.random() * cardArrayCopy.length);
              var temporaryValue = cardArrayCopy[currentIndex];
              cardArrayCopy[currentIndex] = cardArrayCopy[randomIndex];
              cardArrayCopy[randomIndex] = temporaryValue;
            }
            return cardArrayCopy;
          }
        const cardArray = [
            "pics/BatmanPose.png",
            "pics/BatmanShadow.png",
            "pics/JokerPose.png",
            "pics/JokerShadow.png",
            "pics/JokerWins.png",
            "pics/Stalement.png",
          ];
          const cardArrayCopy = cardArray.concat(cardArray);
          shuffleCardNew = shuffleCard(cardArrayCopy).toString()
          shuffleCardOld = shuffleCard(cardArrayCopy).toString()
          expect(shuffleCardNew == shuffleCardOld).toBe(false)
    })
})

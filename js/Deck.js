class Deck{

    constructor(cardOrder, playerPos, playerNames){
        this.playerPos = playerPos;
        // this.sideOffset = 30 * mainScale;
        // this.topOffset = 30 * mainScale;
        // this.bottomOffset = 50 * mainScale;

        this.sideOffset = 0;
        this.topOffset = 0;
        this.bottomOffset = 50 * mainScale;




        this.playVerticalOffset =  0.30 * mainh;
        this.playHorizontalOffset = 0.30 * mainw;

        this.deckValue = [[],[],[],[]];
        this.deck = [[],[],[],[]];
        this.cardOrder = cardOrder;
        this.playedCardPosX = [];
        this.playedCardPosY = [];
        this.centerPosX = [];
        this.centerPosY = [];
        this.inCanvasW = mainw;
        this.inCanvasH = mainh;
        this.textContainer = [];
        this.rectangles = [];

        this.handFirstSuit = 0;
        this.myCardIds = [];
        this.playedCardsInHand = [];
        this.ourScore = 0;
        this.opponentScore = 0;

        this.inPlayerNames = playerNames;
        this.currentMovingPlayerPos = (4 - playerPos) % 4;

        this.isMyChance = false;
        if(playerPos == 0)
        this.isMyChance = true;
        this.movesMade = 0;

        this.suitInfoContainer;
        this.messageContainer;

        this.mainSuit = 0;

        console.log("Is My Chance = "+this.isMyChance);

        this.makeDeck();

        

        //InGame
        



    }

    makeDeck = function(){

        console.log("let's make the deck");
        this.setDeckValue();

        //MakePlayedCardPos       
        this.playedCardPosX = [];
        this.playedCardPosY = [];
        this.centerPosX = [];
        this.centerPosY = [];
        
        // this.playedCardPosX.push(this.inCanvasW/2);
        // this.playedCardPosY.push(this.inCanvasH - 2*this.bottomOffset);
        // this.playedCardPosX.push(this.inCanvasW - 2*this.sideOffset);
        // this.playedCardPosY.push(this.inCanvasH/2);
        // this.playedCardPosX.push(this.inCanvasW/2);
        // this.playedCardPosY.push(2*this.topOffset);
        // this.playedCardPosX.push(2*this.sideOffset);
        // this.playedCardPosY.push(this.inCanvasH/2);

        this.playedCardPosX.push(this.inCanvasW/2);
        this.playedCardPosY.push(this.inCanvasH - this.playVerticalOffset);
        this.playedCardPosX.push(this.inCanvasW - this.playHorizontalOffset);
        this.playedCardPosY.push(this.inCanvasH/2);
        this.playedCardPosX.push(this.inCanvasW/2);
        this.playedCardPosY.push(this.playVerticalOffset);
        this.playedCardPosX.push(this.playHorizontalOffset);
        this.playedCardPosY.push(this.inCanvasH/2);

        this.centerPosX.push(this.inCanvasW/2);
        this.centerPosY.push(this.inCanvasH - this.bottomOffset);
        this.centerPosX.push(this.inCanvasW - this.sideOffset);
        this.centerPosY.push(this.inCanvasH/2);
        this.centerPosX.push(this.inCanvasW/2);
        this.centerPosY.push(this.topOffset);
        this.centerPosX.push(this.sideOffset);
        this.centerPosY.push(this.inCanvasH/2);

        var tempCardWidth = mainCardWidth * mainScale;
        var tempCardHeight = mainCardHeight * mainScale;

        //Make Background Rectangle

        this.rectangles = [];
        for(var i = 0; i<4 ; i++){
            this.rectangles.push(new createjs.Shape());
        }
 
        this.rectangles[0].graphics.f("#E5E07F").rr(this.centerPosX[0] - 4*tempCardWidth , this.inCanvasH - 2 * tempCardHeight , 8 * tempCardWidth, 5 / 2 * tempCardHeight , 10*mainScale);
        this.rectangles[1].graphics.f("#E5E07F").rr(this.centerPosX[1] - 10*mainScale - tempCardHeight/2 , this.centerPosY[1] - 4*tempCardWidth , 20*mainScale + tempCardHeight, 8*tempCardWidth, 10*mainScale);
        this.rectangles[2].graphics.f("#E5E07F").rr(this.centerPosX[2] - 4*tempCardWidth , this.centerPosY[2] - 10*mainScale - tempCardHeight/2 ,8*tempCardWidth, 20*mainScale + tempCardHeight, 10*mainScale);
        this.rectangles[3].graphics.f("#E5E07F").rr(this.centerPosX[3] - 10*mainScale - tempCardHeight/2 , this.centerPosY[3] - 4*tempCardWidth , 20*mainScale + tempCardHeight, 8*tempCardWidth, 10*mainScale);

        for(var i = 0; i<4 ; i++){
            this.rectangles[i].alpha = 0.5;
            mainStage.addChild(this.rectangles[i]);
            this.rectangles[i].visible = false;
        }
        console.log(this.rectangles[0]);   
        console.log(this.rectangles[1]);     
        
        this.rectangles[this.currentMovingPlayerPos].visible = true;

        //MakeDeck
        this.deck = [[],[],[],[]]; 

        for( var i = 0; i< this.deckValue.length; i++){
            var iniX = this.centerPosX[i];
            var iniY = this.centerPosY[i];
            if(i % 2 == 0){
                iniX = iniX - tempCardWidth * 3;
            }
            else{
                iniY = iniY - tempCardWidth * 3;
            }

            if(i == 0){
                var extX = this.centerPosX[0] - (tempCardWidth * 35 / 16);
                var extY = mainh - (1.75 * tempCardHeight / 2 ); 
                for(var pp = 0; pp <6; pp ++){

                    var tempCardId = this.deckValue[i][pp].toString();
                    var tempCard = new Card(tempCardId, i, extX, extY, this.playedCardPosX[i], this.playedCardPosY[i]);
                    this.initialiseIndiClick(tempCard);
                    this.deck[i][pp] = tempCard;
                    extX = extX + (7 / 8 * tempCardWidth);
                }

                extX = this.centerPosX[0] - (21 / 8 * tempCardWidth);
                extY = mainh;

                for(var pp = 6; pp <13; pp ++){

                    var tempCardId = this.deckValue[i][pp].toString();
                    var tempCard = new Card(tempCardId, i, extX, extY, this.playedCardPosX[i], this.playedCardPosY[i]);
                    this.initialiseIndiClick(tempCard);
                    this.deck[i][pp] = tempCard;
                    extX = extX + (7 / 8 * tempCardWidth);
                }

            }
            else
            for( var j = 0; j < this.deckValue[i].length; j++){
                
                var tempCardId = this.deckValue[i][j].toString();

                //this.deck[i][j] = new Card(tempCardId, i, iniX, iniY, this.playedCardPosX[i], this.playedCardPosY[i]);
                var tempCard = new Card(tempCardId, i, iniX, iniY, this.playedCardPosX[i], this.playedCardPosY[i]);

                if(i == 0)
                this.initialiseIndiClick(tempCard);

                this.deck[i][j] = tempCard;

                if(i % 2 == 0){
                    iniX = iniX + tempCardWidth / 2;
                }
                else{
                    iniY = iniY + tempCardWidth / 2;
                }
            }
        }

        //this.initialiseOnClicks();

        //ShowNames
        this.textContainer = [];
        var text = [];
        var rects = [];
        var bds = [];
        var temptext;
        globalThis.partner = this.inPlayerNames[ (2+this.playerPos)%4 ];
        for(var i = 0; i<4; i++){
            var size = Math.ceil((20 * mainScale)).toString();
            this.textContainer.push(new createjs.Container());
            temptext = new createjs.Text(" "+this.inPlayerNames[ (i+this.playerPos)%4 ]+" ", size+"px corben", "#ffffff" );
            console.log(temptext.getBounds());
            temptext.regX = temptext.getBounds().width/2;
            temptext.regY = temptext.getBounds().height/2;
            text.push(temptext);
            bds.push(temptext.getBounds());
            // rects.push(new createjs.Shape());
        }
        
        text[0].x = this.centerPosX[0];
        text[0].y = this.inCanvasH - tempCardHeight*2.2;
        

        text[1].x = this.centerPosX[1] - tempCardHeight*0.9;
        text[1].y = this.centerPosY[1];
        text[1].setTransform(text[1].x, text[1].y, 1, 1, 90,0 , 0, text[1].regX, text[1].regY);

        text[2].x = this.centerPosX[2];
        text[2].y = this.centerPosY[2] + tempCardHeight*0.9;



        text[3].x = this.centerPosX[3] + tempCardHeight*0.9;
        text[3].y = this.centerPosY[3];
        text[3].setTransform(text[3].x, text[3].y, 1, 1, 270 ,0 , 0, text[3].regX, text[3].regY);


        

        var rotation = 0;
        for(var i =0; i<4;i++){
            var tmprect1 = new createjs.Shape();
            if(i%2==0)
            tmprect1.graphics.beginFill('#cccccc').drawRect(text[i].x - text[i].regX , text[i].y - text[i].regY, text[i].regX * 2, text[i].regY*2);
            else
            tmprect1.graphics.beginFill('#cccccc').drawRect( text[i].x - text[i].regY, text[i].y - text[i].regX, text[i].regY*2 , text[i].regX * 2);
            rects.push(tmprect1);
            rects[i].alpha = 0.3;
            //this.textContainer[i].addChild(rects[i]);
            this.textContainer[i].addChild(text[i]);
            mainStage.addChild(this.textContainer[i]);

            rotation = rotation + 90;
        }


        
        



        // mainStage.addChild(this.text[0]);
        // mainStage.addChild(this.text[1]);
        // mainStage.addChild(this.text[2]);
        // mainStage.addChild(this.text[3]);
    }

    setDeckValue = function(){

        //SetCardsRespectiveToPlayerPosition
        //Player0 is the user

        

        console.log("Let's set the deck");

        var i = 0;

        var cards = this.cardOrder.split(" ");
        var start = (4 - this.playerPos) % 4 ;
        var cardNo = 0;

        //Setting suit
        var card1 = Math.ceil(parseInt(cards[0]) / 13); 
        var srcSuit;
        this.mainSuit = card1;
        if(card1 == 1){
            srcSuit = mainQueue.getResult("suit_spades");
        }
        if(card1 == 2){
            srcSuit = mainQueue.getResult("suit_hearts");
        }
        if(card1 == 3){
            srcSuit = mainQueue.getResult("suit_clubs");
        }
        if(card1 == 4){
            srcSuit = mainQueue.getResult("suit_diamonds");
        }

        this.suitInfoContainer = new createjs.Container();
        var cw = (mainCardHeight / 2 * mainScale) * 3;
        var ch = (mainCardHeight / 2 * mainScale) * 5;
        this.suitInfoContainer.setBounds(mainw/2 - cw/2, mainh/2 - ch/2 , cw, ch);

        var rect = new createjs.Shape();
        rect.graphics.beginFill('#cccccc').drawRect(mainw/2 - (mainCardHeight / 4 * mainScale), mainh/2 + (mainCardHeight / 2 * mainScale * 0.3), (mainCardHeight / 2 * mainScale),(mainCardHeight / 2 * mainScale * 0.9));
        rect.alpha = 0.3;
        this.suitInfoContainer.addChild(rect);

        var size = Math.ceil(20 * mainScale).toString();
        var colorSuitText = (new createjs.Text("Trump\nSuit", "bold "+size+"px corben", "#ffffff" ));
        var b = colorSuitText.getBounds();
        colorSuitText.x = mainw/2;
        colorSuitText.y = mainh/2 - b.height/2 - (mainCardHeight / 2 * mainScale) * 0.3;
        colorSuitText.textAlign = 'center';
        
        var cstw = colorSuitText.getBounds().width;
        var csth = colorSuitText.getBounds().height;

        var textbck = new createjs.Shape();
        textbck.graphics.beginFill("#cccccc").drawRect(mainw/2 - cstw/2 , mainh/2-csth/2- (mainCardHeight / 2 * mainScale) * 0.3, cstw, csth);
        textbck.alpha = 0.3;
        //this.suitInfoContainer.addChild(textbck);

        this.suitInfoContainer.addChild(colorSuitText);

        var suitbmp = new createjs.Bitmap(srcSuit);
        suitbmp.scaleX = (mainCardHeight / 2 * mainScale) / (srcSuit.width) ;
        suitbmp.scaleY = (mainCardHeight / 2 * mainScale) / (srcSuit.height) ;
        suitbmp.x = mainw/2 - (mainCardHeight / 4 * mainScale);
        suitbmp.y = mainh/2 + (mainCardHeight / 2 * mainScale) * 0.3;

        

        this.suitInfoContainer.addChild(suitbmp);

        mainStage.addChild(this.suitInfoContainer);

        for(i = start ; i < start + 4 ; i++ ){
            var currentPlayer = i % 4;
            for( var j = 0; j < 5; j++ ){
                this.deckValue[currentPlayer].push(parseInt(cards[cardNo]));
                if(currentPlayer == 0){
                    this.myCardIds.push(parseInt(cards[cardNo]));
                }
                cardNo++;
            }
        }
        for(i = start ; i < start + 2 * 4 ; i++ ){
            var currentPlayer = i % 4;
            for( var j = 0; j < 4; j++ ){
                this.deckValue[currentPlayer].push(parseInt(cards[cardNo]));
                if(currentPlayer == 0){
                    this.myCardIds.push(parseInt(cards[cardNo]));
                }
                cardNo++;
            }
        }

        for(i = 0; i<4; i++){
            this.deckValue[i].sort(function(a, b){return a-b});
        }

        console.log("Deck details : ");

    }

    initialiseIndiClick(aCard){

        aCard.bitmap.on('click',function(){
            console.log("card Clicked");
            //console.log('local is my chance => '+isMyChance);
            console.log('isMyChance => '+mainDeck.isMyChance);
            if(mainDeck.isMyChance){

                if(mainDeck.handFirstSuit == 0){
                    var play = aCard.inCardId.toString();
                    console.log("card Played");
                    socket.emit('moveMade', play);
                    mainDeck.isMyChance = false;
                    var index = mainDeck.myCardIds.findIndex(id => parseInt(id) === parseInt(play));
                    if (index !== -1) {
                        mainDeck.myCardIds.splice(index, 1)[0];
                    }
                }
                else{
                    var suitOfCardPlayed = Math.ceil(parseInt(aCard.inCardId)/13);

                    console.log("Main SUit -> "+mainDeck.handFirstSuit+" Played Suit -> "+suitOfCardPlayed)
                    var inSameSuitAvailable = false;
                    for(var i = 0; i < mainDeck.myCardIds.length; i++){
                        var tempSuit = Math.ceil(mainDeck.myCardIds[i]/13);
                        if(tempSuit == mainDeck.handFirstSuit){
                            inSameSuitAvailable = true;
                        }
                    }   
                    if( !inSameSuitAvailable ){
                        var play = aCard.inCardId.toString();
                        console.log("card Played");
                        socket.emit('moveMade', play);
                        mainDeck.isMyChance = false;
                        var index = mainDeck.myCardIds.findIndex(id => parseInt(id) === parseInt(play));
                        if (index !== -1) {
                            mainDeck.myCardIds.splice(index, 1)[0];
                        }
                    }   
                    else if( suitOfCardPlayed == mainDeck.handFirstSuit){
                        var play = aCard.inCardId.toString();
                        console.log("card Played");
                        socket.emit('moveMade', play);
                        mainDeck.isMyChance = false;
                        var index = mainDeck.myCardIds.findIndex(id => parseInt(id) === parseInt(play));
                        if (index !== -1) {
                            mainDeck.myCardIds.splice(index, 1)[0];
                        }
                    }              
                }
            }
        })
    }

    playCard(inCardId){
        
        for(var i = 0; i < 4; i++){
            for( var j = 0; j < 13; j++){
                if(this.deck[i][j].inCardId === inCardId){
                    this.playedCardsInHand.push(this.deck[i][j]);
                    this.deck[i][j].onClick();
                }
            }
        }

        this.movesMade++;
        this.rectangles[this.currentMovingPlayerPos].visible = false;
        

        if(this.movesMade %4 == 0){

            mainDeck.handFirstSuit = 0;

            var temparr = [];
            for(var i = 0; i<4; i++){
                temparr.push(this.playedCardsInHand[i].inCardId);
            }
            
            this.currentMovingPlayerPos = (this.currentMovingPlayerPos + 1 + this.getWinner(temparr)) % 4;

            function onCardOutAnim(card, winPos){
                card.addAnimation(card.cardOutPosX[winPos], card.cardOutPosY[winPos], 800, 0);//.call(mainDeck.displayScores);
            }

            for(var i = 0; i<4; i++){
                setTimeout(onCardOutAnim, 1300, this.playedCardsInHand[i] ,this.currentMovingPlayerPos);
            }

            this.playedCardsInHand = [];
            var message = "";
            if(this.currentMovingPlayerPos == 0 || this.currentMovingPlayerPos == 2){
                this.ourScore++;
                message = "Your Team Won";
            }
            else{
                this.opponentScore++;
                message = "Your Team Lost";
            }
            var gameComplete = false;

            if(this.ourScore == 7){
                message = "Game Won !!";
                ourGamesWin ++;
                gameComplete = true;
            }
            else if(this.opponentScore == 7){
                message = "Game Lost !!";
                ourGamesLose ++;
                gameComplete = true;
            }

            function showScores(msg, OurS, OppS, gameComplete){

                mainStage.removeChild(mainDeck.suitInfoContainer);

                mainDeck.messageContainer = new createjs.Container();
                mainDeck.messageContainer.setBounds(0.1*mainw, 240*mainScale , mainw*0.8, mainh-50*mainScale);

                var rect = new createjs.Shape();
                rect.graphics.beginFill('#cccccc').drawRect(0.2*mainw, mainh/2-100*mainScale , mainw*0.6, 200*mainScale);
                rect.alpha = 0.5;
                //mainDeck.messageContainer.addChild(rect);

                var intext = "";
                if(gameComplete){
                    intext = msg + "\n\nGames You Won : "+ourGamesWin.toString()+"\n\nGames You Lost : "+ourGamesLose.toString();
                }
                else{
                    var intext = msg+"\n\nYour Score : "+OurS.toString()+"\n\nOpponent Score : "+OppS.toString();
                }

                var size = Math.ceil(25 * mainScale).toString();
                var text = (new createjs.Text(intext, "bold "+size+"px corben", "#ffffff" ));
                //text.outline = 3;
                var b = text.getBounds();
                text.x = mainw/2;
                text.y = mainh/2 - b.height/2;
                text.textAlign = 'center';
                console.log(text);
                mainDeck.messageContainer.addChild(text);
                mainStage.addChild(mainDeck.messageContainer);          
            }

            function afterScores(gameComplete){

                mainStage.removeChild(mainDeck.messageContainer);

                if(!gameComplete){
                    mainStage.addChild(mainDeck.suitInfoContainer);
                    //remove score

                    mainDeck.rectangles[mainDeck.currentMovingPlayerPos].visible = true;
                    if(mainDeck.currentMovingPlayerPos == 0){
                        mainDeck.isMyChance = true;
                    }
                    else if(mainDeck.movesMade %4 == 1){
                        mainDeck.handFirstSuit = Math.ceil(parseInt(inCardId)/13);
                    }
                }
                else{
                    mainLoadingImg.style.visibility = 'visible';
                    if(mainDeck.currentMovingPlayerPos == 0){
                        mainDeck.isMyChance = true;
                        globalThis.waitForUsersToConnect();
                    }
                }
            }

            setTimeout(showScores, 2300, message, this.ourScore, this.opponentScore, gameComplete);
            setTimeout(afterScores, 5500, gameComplete);

        }
        else{        
            this.currentMovingPlayerPos = (this.currentMovingPlayerPos+1)%4;
            this.rectangles[this.currentMovingPlayerPos].visible = true;
            if(this.currentMovingPlayerPos == 0){
                this.isMyChance = true;
            }
            if(this.movesMade %4 == 1){
                this.handFirstSuit = Math.ceil(parseInt(inCardId)/13);
            }
        }
        

    }

    removeDeckCards(){

        for(var i = 0; i < 4; i++){
            for( var j = 0; j < 13; j++){
                this.deck[i][j].removeCard();
            }
            mainStage.removeChild(this.textContainer[i]);
            mainStage.removeChild(this.rectangles[i]); 
        }
        mainStage.removeChild(this.suitInfoContainer);

    }

    getWinner(c){
        console.log("Checking All Cards");
        console.log("Cards Played => "+c);
        var s = [];
        for(var i = 0; i< 4; i++)
        c[i] = parseInt(c[i]);
        s.push(Math.ceil(c[0]/13));
        s.push(Math.ceil(c[1]/13));
        s.push(Math.ceil(c[2]/13));
        s.push(Math.ceil(c[3]/13));
        for(var i=0;i<4;i++) {
            if ((c[i] % 13) == 1) {
                c[i] = c[i] + 13;
            }
        }
        var winner=0;
        var maxCard=0;
        var ts=this.mainSuit;
        if((s[1]==ts)||(s[2]==ts)||(s[3]==ts)||(s[0]==ts)){
            for(var i=0;i<4;i++){
                if((s[i]==ts)&&(c[i]>maxCard)){
                    winner=i;
                    maxCard=c[i];
                }
            }
        }
        else{
            winner=0;
            maxCard=c[0];
            for(var i=1;i<4;i++){
                if((s[i]==s[0])&&(c[i]>maxCard)){
                    winner=i;
                    maxCard=c[i];
                }
            }
        }

        return winner;

    }

}
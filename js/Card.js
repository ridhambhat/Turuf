class Card{

    constructor(cardId, playerId, originalX, originalY, onClickPosX, onClickPosY){ //Player id range 0-3

        this.inPlayerId = playerId;
        this.inCardId = cardId;
        this.scale = mainScale;
        this.onClickPosX = onClickPosX;
        this.onClickPosY = onClickPosY;
        var cardHash = "c"+ cardId.toString();
        this.inCardWidth = mainCardWidth * this.scale;
        this.inCardHeight = mainCardHeight * this.scale;

        if(playerId == 0){
            this.inCardWidth = this.inCardWidth * 1.75;
            this.inCardHeight = this.inCardHeight * 1.75;
        }

        this.cardOutPosX = [mainw/2 , (mainw + 2 *this.inCardWidth), mainw/2, (0 - 2*this.inCardWidth)];
        this.cardOutPosY = [(mainh + 2*this.inCardHeight) , mainh/2, (0 - 2*this.inCardHeight), mainh/2];


        if(playerId === 0){
            this.srcBeforeClicked = mainQueue.getResult(cardHash);       
        }
        else if(playerId === 2){
            this.srcBeforeClicked = mainQueue.getResult("card_back_vertical");   
        }
        else{
            this.srcBeforeClicked = mainQueue.getResult("card_back_horizontal");
            this.inCardHeight = mainCardWidth * this.scale;
            this.inCardWidth = mainCardHeight * this.scale;
        }
        this.srcAfterClicked = mainQueue.getResult(cardHash); 

        this.bitmap = this.makeNewBitmap(this.srcBeforeClicked);
        this.updateCardPos(originalX, originalY);
        mainStage.addChild(this.bitmap);
        //this.bitmap.on('click', this.onClick());
        console.log(cardHash+" added");
    };

    updateCardPos(x, y){
        x = x - this.inCardWidth/2;
        y = y - this.inCardHeight/2;
        this.bitmap.x = x;
        this.bitmap.y = y;
        // this.inCardPosX = x;
        // this.inCardPosY = y;
    }

    updateCardSrc(src){

        this.inCardWidth = mainCardWidth * this.scale;
        this.inCardHeight = mainCardHeight * this.scale;
        var oldx = this.bitmap.x;
        var oldy = this.bitmap.y;
        mainStage.removeChild(this.bitmap);
        console.log(" mcw => "+mainCardWidth+" mch => "+mainCardHeight);
        console.log(" src passes w=> "+src.width +" - h=>"+src.height );
        console.log("incard w=>" + this.inCardWidth+ " - h> "+this.inCardHeight);
        this.bitmap = this.makeNewBitmap(src);
        this.bitmap.x = oldx;
        this.bitmap.y = oldy;
        mainStage.addChild(this.bitmap);

        //this.addAnimation((0.75*mainw, mainh/2, 2000, 0));
    }



    makeNewBitmap(src){
        console.log("making c"+ this.inCardId);
        var bmp = new createjs.Bitmap(src);
        bmp.scaleX = this.inCardWidth / src.width ;
        bmp.scaleY = this.inCardHeight / src.height ;
        return bmp;
    }

    addAnimation(posx, posy, animDuration, waitDuration){
        posx = posx - this.inCardWidth / 2;
        posy = posy - this.inCardHeight / 2; 
        console.log("animation started");
        createjs.Tween.get(this.bitmap).wait(waitDuration).to({x:  posx, y : posy } , animDuration, createjs.Ease.linear);

    }

    

    onClick(){
        console.log("c"+this.inCardId+" clicked!!");
        this.updateCardSrc(this.srcAfterClicked);
        this.addAnimation( this.onClickPosX, this.onClickPosY, 500, 0);
    }

    removeCard(){
        mainStage.removeChild(this.bitmap);
    }
    
}
let mapArray,ctx,currentImgMain;
//mapArray：決定地圖中每個格子的元素
//ctx：HTML5 Canvas用
//currentImgMainX,currentImgMainY：主角所在座標

let imgMountain,imgMain,imgEnemy;
//障礙物、主角、敵人圖片

const gridLength=200;

//初始化
$(function(){
    mapArray=[
        [0,1,1],
        [0,0,0],
        [3,1,2]
        // 0空地,1障礙,2終點,3敵人
    ];
    ctx =$("#myCanvas")[0].getContext("2d");

    imgMain=new Image();
    imgMain.src="images/spriteSheet.png";
    currentImgMain={
        "x":0,
        "y":0
    };
    imgMain.onload=function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
    imgMountain=new  Image();
    imgMountain.src="images/material.png";
    imgEnemy=new Image();
    imgEnemy.src="images/Enemy.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    if(mapArray[x][y]==1){
                        ctx.drawImage(imgMountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }else if(mapArray[x][y]==3){
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                }
            }
        }
    }
});
//使用者動作
$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePostitionX; //cutImagePostitionX主角面相
    targetImg={
        "x":-1,
        "y":-1
    };
    targetBlock={
        "x":-1,
        "y":-1
    };
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x=currentImgMain.x-gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePostitionX=175; //臉朝左
            break;
        case "ArrowUp":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y-gridLength;
            cutImagePostitionX=355; //臉朝上
            break;
        case "ArrowRight":
            targetImg.x=currentImgMain.x+gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePostitionX=540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y+gridLength;
            cutImagePostitionX=0;//臉朝下
            break;
        //其他按鍵-不處理
        default:
            return;
    }

    //確認主角不超過地圖
    if(targetImg.x<=400&& targetImg.x>=0&&targetImg.y<=400&&targetImg.y>=0){
        targetBlock.x=targetImg.y/gridLength;
        targetBlock.y=targetImg.x/gridLength;
    }else{
        targetBlock.x=-1;
        targetBlock.y=-1;
    }
    //清空主角原本所在位置
    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    if(targetBlock.x!=-1&&targetBlock.y!=-1){
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0:
                $("#talkBox").text("");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 1://障礙物
                $("#talkBox").text("有山");
                break;
            case 2: //終點
                $("#talkBox").text("抵達終點");
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            case 3: //敵人
                $("#talkBox").text("哈嘍~");
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    //重新繪製主角
    ctx.drawImage(imgMain,cutImagePostitionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});
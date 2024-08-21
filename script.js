const canvas=document.getElementById('canvas1');//1.
const ctx=canvas.getContext('2d');//now we have all the 2d drawing methods for canvas stored in a single 
//variable called ctx here.2.
//console.log(ctx);//3.
const CANVAS_WIDTH=canvas.width=600;//4.
const CANVAS_HEIGHT=canvas.height=600;//5.
//to bring image to the canvas
const playerImage=new Image();//custom variable,this is build in image class constructor. it will create html
//image element same as in normal html tag.6.
playerImage.src='shadow_dog.png';//7.
//let x=0;//13.
const spriteWidth=575;//18.take widthof the entire file image and divide by how many columns. you will get 
//width value of each frame. here 6876px/12.
const spriteHeight=523;//19.
let playerState='run';//69.
const dropdown=document.getElementById('animations');//70.
dropdown.addEventListener('change',function(e){//71.
playerState=e.target.value;
})
//let frameX=0;//21. instead of changing manually, we will now do it by variable//63.
//let frameY=0;//22.//63.we have to comment it now as we not need it anymore. we are storing exact coordinates.
let gameFrame=0;//26.
const staggerFrames=5;//28. it will slow down the animation by that value
const spriteAnimations=[];//32.
const animationStates=[//48.
    {
        name:'idle',//49.
        frames:7,//50.
    },
    {
        name:'jump',//51.
        frames:7,//52.
    },
    {
        name:'fall',
        frames:7,
    },
    {
        name:'run',
        frames:9,
    },
    {
        name:'dizzy',
        frames:11,
    },
    {
        name:'sit',
        frames:5,
    },
    {
        name:'roll',
        frames:7,
    },
    {
        name:'bite',
        frames:7,
    },
    {
        name:'ko',
        frames:12,
    },
    {
        name:'getHit',
        frames:4,
    }
];
animationStates.forEach((state,index)=>{//53.we can access by state.name. here state represents each object one by one present
    //in the animationStates. index of first object is 0, next is 1 and so on.
let frames={//54.
    loc:[],//55.
}
for(let j=0;j<state.frames;j++){//56. for idle name, this loop will run for 7 times.
let positionX=j*spriteWidth;//57.
let positionY=index*spriteHeight;//58.
frames.loc.push({x:positionX,y:positionY});//59.
}
spriteAnimations[state.name]=frames;//60.
});
//console.log(animationStates);//61.
console.log(spriteAnimations);//61.
function animate(){//8.
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);//this is clearing the area of the canvas. the starting
    //coordinates are 0,0 and ending is 600,600.9.
    //ctx.fillRect(50,50,100,100); this is a fixed position.10. 
    //ctx.fillRect(x,50,100,100); 14.
    //x++; 15.
    //ctx.fillRect(100,50,100,100);//16.
    //ctx.drawImage(playerImage,0,0,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);//17. first argument is the variable
    //which is storing the image. next 2 are x and y value. starting point of the image. 4th and 5th says
    //the height and width. this can also take 9 arguments like this-
    //ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh); here the first one is the source of the image.
    //next 4 are the segments of the image we want to show. sx=source x corordinate,sw=source width.
    //dx=destination x coordinate. where do we want to show the segement on the canvas area.
    //ctx.drawImage(playerImage,0*spriteWidth,0*spriteHeight,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);//20.in 2nd argument, change the 
    //values from 1 to 7....and see the animation working. the image is moving width wise. if we change the value in 3rd argument,
    //the picture will move vertically, not horizontally. so we can switch in this case from different types of animations.
    //let position=Math.floor(gameFrame/staggerFrames)%6;//29. here the value is hard coded
    //let position=Math.floor(gameFrame/staggerFrames)%spriteAnimations["idle"].loc.length;//62.//70.comment is as it is not good
    //to give hard coded value. now we are using the new variable created
    let position=Math.floor(gameFrame/staggerFrames)%spriteAnimations[playerState].loc.length;//70.
    /*
    0/5=0    Math.floor(0)=0      0%6=0
    1/5=0.2  Math.floor(0.2)=0    0%6=0
    2/5=0.4  Math.floor(0.4)=0    0%6=0
    3/5=0.6  Math.floor(0.6)=0    0%6=0
    4/5=0.8  Math.floor(0.8)=0    0%6=0
    5/5=1    Math.floor(1)=1      1%6=1
    2%6=2,3%6=3,4%6=4,5%6=5,6%6=0,7%6=1,8%6=2,9%6=3,10%6=4,11%6=5,12%6=0. this shows that the value of position stays always 
    within 6.
    */
   //frameX=spriteWidth*position;//30.//64.comment it
   let frameX=spriteWidth*position;//65.
   //let frameY=spriteAnimations["idle"].loc[position].y;//66.//71.comment
   let frameY=spriteAnimations[playerState].loc[position].y;//72.
   //ctx.drawImage(playerImage,frameX,frameY*spriteHeight,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);//31.//67.comment it
   ctx.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);//68.
    //ctx.drawImage(playerImage,frameX*spriteWidth,frameY*spriteHeight,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);//23.
    //if(gameFrame%staggerFrames==0){//27.
    //    if(frameX<6) frameX++;//24.
    //    else frameX=0;//25.the next problem is all row does not have the same frames or columns. we have to address. how??it is fast also.
        //how to slow down our animation frma e movement.
    //}
    
    gameFrame++;
    requestAnimationFrame(animate);//this is creating a loop for animate function.11.
};
animate();//12.
/*
"idle"={//33.
loc:[//36.
{x:0,y:0},//39.
{x:575,y:0},//40.
{x:1150,y:0},//41.
{x:1725,y:0},//42.
{x:2300,y:0},//43.
{x:2875,y:0},//44.
{x:3450,y:0}//45.
]
},
"jump"={//34.
loc:[//37.
    
]
},
"run"={//35.
    loc:[//38.
    
    ]
}
];
console.log(spriteAnimations["idle"].loc[2].x);//46.
console.log(spriteAnimations["idle"].loc.length);//47.*/
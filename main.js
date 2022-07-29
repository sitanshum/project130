song1="";
song2="";

song1_status="";
song2_status="";

scoreLeftWrist=0;
scoreRightWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function preload(){
    song1=loadSound("like.mp3");
    song2=loadSound("heatwaves.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("model has loaded");
}

function gotPoses(results){
 if(results.length>0){
    console.log(results)
 scoreLeftWrist=results[0].pose.keypoints[9].score;
 scoreRightWrist=results[0].pose.keypoints[10].score;
    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;

    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
 }
}

function draw(){
    image(video,0,0,600,500);
   
    fill("#d62945");
    stroke("#d62945");

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);

        song1.stop();

        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing heatwaves";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);

        song2.stop();

        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="playing I Like Me Better";
        }
    }
}

function play(){
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}
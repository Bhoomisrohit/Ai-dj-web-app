song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;
score_rightWrist=0;



function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
    
}

function modelLoaded()
{
    console.log("poseNet is initialized");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX-" + leftWristX + "leftWristY-" + leftWristY)

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX-" + rightWristX + "rightWristY-" + rightWristY)
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("leftWrist score is- " + score_leftWrist); 
        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("rightWrist score is- " + score_rightWrist); 

    }
}

function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(score_leftWrist>0.2)
    {
 circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=Math.floor(InNumberleftWristY);
    volume=remove_decimal/500;
    song.setVolume(volume);
    console.log(volume);
    document.getElementById("volume").innerHTML="volume:"+ volume;
    }

    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

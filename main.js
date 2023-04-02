song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song1 = loadSound("SuperMario.mp3");
    song2 = loadSound("Rickroll.mp3");
} 

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(420, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = " + scoreRightWrist + " ,Score Left Wrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " ,Right Wrist Y = " + rightWristY);

        leftWristX = (results[0].pose.leftWrist.x) - 150;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + ' ,Left Wrist Y = ' + leftWristY);
    }
} 

function draw() {
    image(video, 0, 0, 600, 500)
    fill("#2596be");
    stroke("#2596be");

    if (scoreLeftWrist < 0.2) {
        circle(leftWristX, leftWristY, 20);
        playSong1
    }
    if (scoreRightWrist < 0.2) {
        circle(leftWristX, leftWristY, 20);
        playSong2
    }
} 

function playSong1() {
    song1.play()
    song1.setVolume(1);
    song1.rate(1);
}

function playSong2() {
    song2.play()
    song2.setVolume(1);
    song2.rate(1);
}
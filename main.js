objects = [];
status = "";
song = "";

function preload()
{
    song = loadSound("why.mp3");
}


function setup() {
  canvas = createCanvas(380,380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(380,380);
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "")
      {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
    
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if(objects.label != "person")
        {
          document.getElementById("status").innerHTML = "Status : Baby not found";
          song.play();
        }
        else if(objects.label == "person")
        {
          document.getElementById("status").innerHTML = "Status : Baby Found!";
        }
        if(objects.length < 0)
        {
          document.getElementById("status").innerHTML = "Status : Baby not found";
          song.play();
        }
      }
}



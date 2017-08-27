// ImageView library includes muliple options: Viewing, Grayscaling and Cropping step
// Hidden canvases are used to hold uploaded images per operation. So users have the option to have a different image to view in gray.
// Hidden canvases and SimpleImage library are used for simplicity of the project and time limits. In real project, images would be stored in the cloud.

// Things I would have added but due to time was skipped, was to add crop option for original and gray image and have a pop up to edit the crop image. I would add a 'to the top of the page' button instead of user scrolling down. 

// For production code, I would create a crop with edit box around the image to choose the area user wants to crop instead of typing in the numbers.


var image = null; // global variable to handle selected image

//upload images to SimpleImage and display on page
function upload(){
  var input = document.getElementById("inputFile");

  //check to see if a file was selected
  if (input.files.length > 0){

  // check if file uploaded is not an image give alert
    if ( /\.(jpe?g|png|gif)$/i.test(input.files[0].name) === false ) { 
      alert("File selected is not an image!"); 
    } 

    // if file is an image, upload to SimpleImage
    else {
      image = new SimpleImage(input);
      // cache a reference to the html hidden canvas element
      var imgCanvas = document.getElementById("hiddenCanvas");
      //store the image in the hidden canvas
      image.drawTo(imgCanvas);
    }
  }
  //if no file was selected, alert user
  else { 
      alert('No files was selected');
    }
}

//when user clicks on submitting the desired image, scale and draw the image to the canvas box
function drawImg(){
  var input = document.getElementById("inputFile")
  // check if any image was selected
  if (input.files.length === 0){
    alert('No image is selected')
  }

  else {
    var canvas = document.getElementById("image");
    canvas.width  = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    var ctx = canvas.getContext('2d');
    // create image object
    var img  = new Image();

    img.onload=function(){
      var wrh = this.width / this.height;
      //scale the image size acording to the canvas size
      var newWidth = canvas.width;
      var newHeight = newWidth / wrh;
      if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = newHeight * wrh;
        }
      //draw the image to canvas
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
    }

    var img_can = document.getElementById('hiddenCanvas');
    var img_url = img_can.toDataURL();
    img.src = img_url;
  }
} 



//grayImg function to convert the image to grayscale
function grayImg(){
  //check if a file is selected
  var input = document.getElementById("inputFile")
  if (input.files.length === 0){
    alert('No image is selected')
  }

  else {
    // Replace R, G, B value of each pixel by average of the 3 components (grayscale operation)
    for(var pixel of image.values()) {
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }

    // cache a reference to the html hidden canvas element
    var imgCanvas = document.getElementById("hiddenCanvasGray");
    // add the image to the canvas
    image.drawTo(imgCanvas);
  }

  var canvas = document.getElementById("grayImage");
    canvas.width  = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    var ctx = canvas.getContext('2d');
    // create image object
    var img  = new Image();

    img.onload=function(){
      var wrh = this.width / this.height;
      //scale the image size acording to the canvas size
      var newWidth = canvas.width;
      var newHeight = newWidth / wrh;
      if (newHeight > canvas.height) {
          newHeight = canvas.height;
          newWidth = newHeight * wrh;
        }
      //draw the image to canvas
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
    }

    var img_can = document.getElementById('hiddenCanvasGray');
    var img_url = img_can.toDataURL();
    img.src = img_url;
}


function cropImg(){

  var input = document.getElementById("inputFile")
  //check if any file is selected
  if (input.files.length === 0){
    alert('No image is selected')
  }

  else{
    // cache a reference to the html canvas element
    var canvas    = document.getElementById('cropImage');
    canvas.width  = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    var ctx = canvas.getContext('2d');
    // create image object
    var img  = new Image();
    // get the input given for x,y, width and heigth to crop the image
    var crop_x      = document.getElementById('x').value;
    var crop_y      = document.getElementById('y').value;
    var crop_width  = document.getElementById('width').value;
    var crop_height = document.getElementById('height').value;

    img.onload = function(){
      // get the actual image heigth and width
      var actual_h = this.height; 
      var actual_w = this.width;
      var regex    = /^[0-9]+$/;
      var status = true;

      // Alert if height is larger than image height
      if (crop_height > actual_h || crop_y > actual_h-1){
        alert('Please keep in mind the max image height is :'+actual_h);
        status = false;
      } 

      // Alert if width is larger than image width
      if(crop_width > actual_w || crop_x > actual_w-1){
        alert('Please keep in mind the max image width is :'+actual_w);
        status = false;
      } 

      // Alert if the given x, y, height and width are other than numbers
      if(!crop_height.match(regex) || !crop_width.match(regex) || !crop_x.match(regex) || !crop_y.match(regex)){ 
        alert('Only numbers please');
        status = false;
      } 

      // if the given image elements are corrent draw the cropped image
      if (status){

        //scale the image size to fit in canvas
        var wrh = crop_width / crop_height; 
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
          }
        //draw the cropped image to canvas
        ctx.drawImage(img, crop_x, crop_y, crop_width, crop_height, 0, 0, newWidth, newHeight);
      }
    }

    var img_can = document.getElementById('hiddenCanvas');
    var img_url = img_can.toDataURL();
    img.src = img_url;
  }
}


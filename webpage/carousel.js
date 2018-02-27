document.addEventListener('DOMContentLoaded', createCarousel);
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('clickMe').addEventListener('click', function(){
    console.log("you shouldn't have done that!");
    document.body.querySelector('main').innerHTML ="Yoooo";
    document.getElementById('clickMe').addEventListener('click', function(){
      createCarousel();
      console.log("better now!");
    });
  });
});


var main = document.body.querySelector("main");

var myImgs = ["images/boulderCreekLakeSlide.jpg","images/canyonCreekSlide.jpg","images/grizzlyLakeSlide.jpg"];
var imgLinks = [ , , ];

function carousel(dest,idx){
   if (idx >= myImgs.length)
    idx=0;
  dest.src = myImgs[idx];
  idx +=1;
 // t=setTimeout(function(){carousel(dest,idx)},1000);
  setTimeout(function(){carousel(dest,idx)},4000);
}

function createCarousel(){
  var slideSection = document.createElement("section");
  slideSection.setAttribute("id","slideSection");
  var theSlide = document.createElement("img");
  theSlide.setAttribute("id","theSlide");
  slideSection.appendChild(theSlide);
  main.innerHTML = "";
  main.appendChild(slideSection);
  carousel(theSlide,0);
}



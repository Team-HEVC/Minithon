$(".box1-container1").mouseenter(function(){zoomin(1);});
$(".box1-container2").mouseenter(function(){zoomin(2);});
$(".box1-container3").mouseenter(function(){zoomin(3);});
$(".box1-container4").mouseenter(function(){zoomin(4);});
$(".box1-container5").mouseenter(function(){zoomin(5);});
$(".box1-container1").mouseleave(function(){zoomout(1);});
$(".box1-container2").mouseleave(function(){zoomout(2);});
$(".box1-container3").mouseleave(function(){zoomout(3);});
$(".box1-container4").mouseleave(function(){zoomout(4);});
$(".box1-container5").mouseleave(function(){zoomout(5);});

function zoomin(n){
    for(var i=1;i<=5;i++){
        if(i===n){
            $(".box1-container"+i).addClass("slide-max");
        }
        else{
            $(".box1-container"+i).addClass("slide-min"); 
        }
    }
}
function zoomout(n){
    for(var i=1;i<=5;i++){
        if(i===n){
            $(".box1-container"+i).removeClass("slide-max");
        }
        else{
            $(".box1-container"+i).removeClass("slide-min"); 
        }
    }
}
var countDownDate = new Date("october 5, 2023 12:00:00").getTime();
var x = setInterval(function() {
  var currentDate = new Date().getTime();
  var diff = countDownDate - currentDate;
    
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var sec = Math.floor((diff % (1000 * 60)) / 1000);
  if(days<10){
    days="0"+days;
  }
  if(hours<10){
    hours="0"+hours;
  }
  if(min<10){
    min="0"+min;
  }
  if(sec<10){
    sec="0"+sec;
  }

  document.getElementById("days").innerHTML=days; 
  document.getElementById("hours").innerHTML=hours;
  document.getElementById("min").innerHTML=min;
  document.getElementById("sec").innerHTML=sec;
     
  if (diff < 0) {
    clearInterval(x);
  }
}, 1000);

const navigationBar=document.querySelector(".navigation-bar");
const mainSection=document.querySelector(".main-section");

const options={
  rootMargin: "-250px 0px 0px 0px"
};

const mainSectionObserver=new IntersectionObserver(function(entries,mainSectionObserver){
  entries.forEach(entry => {
    //console.log(entry.target);
    if(!entry.isIntersecting){
      navigationBar.classList.add("nav-scroll");
    }
    else{
      navigationBar.classList.remove("nav-scroll");
    }
  });
},options);

mainSectionObserver.observe(mainSection);

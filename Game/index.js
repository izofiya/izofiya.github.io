
        window.setInterval(function () {
            var visibleImg = document.querySelector(".show");
            if (visibleImg) {
                visibleImg.className = "photo";
            }
            
            var allImages = document.querySelectorAll(".photo");
            
            var index = getRandomImageIndex();
           
            allImages[index].className = "photo show";
            allImages[index].onclick = function() {
            
            var audio = document.querySelector("audio");
            audio.currentTime = 0;
            audio.play();
            var counter = document.querySelector(".counter");
            counter.innerHTML = parseInt(counter.innerHTML) + 1;
            }
        }, 2000)

        function getRandomImageIndex() {
            return Math.floor((Math.random() * 9));
        }
const goPage = document.getElementById('go-page');

var tl = gsap.to(goPage, {
            x: "5px",
            paused: true,
            repeat: -1,
            duration: 0.5,
            yoyo: true
        })


goPage.addEventListener('mouseenter', function(e) {
    
    tl.play();
})

goPage.addEventListener('mouseleave', function() {

    tl.pause();

})


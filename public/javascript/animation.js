const goPage = document.getElementById('go-page');

goPage.addEventListener('mouseenter', function() {
    gsap.to(goPage, {
        x: "20px",
        repeat: 1,
        duration: 1,
    })
})

goPage.addEventListener('mouseleave', function() {

     gsap.to(goPage, {
        x: '0px',
        repeat: 0,
        duration: 1,
    })
})


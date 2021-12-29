const goPage = document.getElementById('go-page');


if(goPage != null) {
    var tl = gsap.to(goPage, {
                x: "5px",
                paused: true,
                repeat: -1,
                duration: 0.5,
                yoyo: true
            })


    goPage.addEventListener('mouseenter', function() {
        
        tl.play();
    })

    goPage.addEventListener('mouseleave', function() {

        tl.pause();

    })
}

const newPage = document.getElementById('addPage')
const deleteAll = document.getElementById('deleteAll')

const appearingText = gsap.to('#page-text .flying-letter', {
    opacity: 1,
    stagger: 0.05,
    duration: 0.1,
    paused: true,

})

const appearingDelete = gsap.to('#delete-text .flying-letter', {
    opacity: 1,
    stagger: 0.05,
    duration: 0.1,
    paused: true,

})

newPage.addEventListener('mouseenter', function() {
    appearingText.play();
})

newPage.addEventListener('mouseleave', function() {
    appearingText.reverse();
})

deleteAll.addEventListener('mouseenter', function() {
    appearingDelete.play();
})

deleteAll.addEventListener('mouseleave', function() {
    appearingDelete.reverse();
})

//Mobile nav animation
const nav = gsap.to('.nav-container', {
    x: '270px',
    paused: true,
})

const menu = document.getElementById('hamburger')

menu.addEventListener('click', function() {
    if(menu.classList.contains('active')) {
        nav.reverse()
        menu.classList.remove('active')
    } else {
        menu.classList.add('active')
        nav.play()

    }
})
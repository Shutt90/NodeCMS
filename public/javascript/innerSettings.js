const getInner = document.getElementById('settings-inner')
const socialsTab = document.getElementById('socials-tab')
const profileTab = document.getElementById('profile-tab')

const socialsHtml = `
    <form class="inner-tabs" method="" action="POST">
        <label for="facebook">Facebook:</label>
        <input type="text" name="facebook" id="facebook">
        <label for="twitter">Twitter:</label>
        <input type="text" name="twitter" id="twitter">
        <label for="instagram">Instagram:</label>
        <input type="text" name="instagram" id="instagram">
        <label for="linkedin">LinkedIn:</label>
        <input type="text" name="linkedin" id="linkedin">
        <input class="submit-btn" type="submit">   
    </form>
`


socialsTab.addEventListener('click', function() {
    getInner.innerHTML = socialsHtml
})
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
    </form>`

const profileHtml = `
    <form class="inner-tabs" method="" action="POST">
        <label for="first_name">First Name:</label>
        <input type="text" name="first_name" id="first_name">
        <label for="surname">Surname:</label>
        <input type="text" name="surname" id="surname">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email">
        <label for="contact">Contact:</label>
        <input type="text" name="contact" id="contact">
        <label for="old_password">Old Password:</label>
        <input type="password" name="old_password" id="old_password">
        <label for="new_password">New Password:</label>
        <input type="password" name="new_password" id="new_password">
        <label for="new_password_confirmation">New Password Confirmed:</label>
        <input type="password" name="new_password_confirmation" id="new_password_confirmation">
        <input class="submit-btn" type="submit">   
    </form>

`

const getTabs = document.querySelectorAll('.top-tab')

getTabs.forEach(ele => {
    ele.addEventListener('click', function() {
        
        if(document.querySelector('.active') != null) {
            document.querySelector('.active').classList.remove('active');
        }

        ele.classList.add('active');

        if(ele.id === 'profile-tab') {
            getInner.innerHTML = profileHtml;
        } else if (ele.id === 'socials-tab') {
            getInner.innerHTML = socialsHtml;
        }
    }) 

});
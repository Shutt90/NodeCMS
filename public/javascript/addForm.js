let count = 0; 

const addForm = (parentId, type) => {

    const input = document.createElement('input');
    const element = document.getElementById(parentId)

    count++

    if(type === "text") {
        input.type = "text"
        input.id = `content-box${count}`

    } else if(type === "textarea") {
        const textarea = document.createElement('textarea')
        textarea.id = `contentbox-${count}`
        let getBoxes = document.querySelectorAll('.contentBox')
        getBoxes.forEach(ele => {
            ele.style.width = "20px"
        })

        textarea.className = 'contentBox'
        textarea.style.width = "400px";
        textarea.style.height = "300px";
        textarea.style.overflow = "hidden";
        textarea.style.margin = '1rem';

        return element.appendChild(textarea)

    } else if(type === "file") {
        input.type = "file"

    }  else {

        console.log('Type must be of "text", "textarea", "file"');

    }

    return element.appendChild(input)
}

document.getElementById('addContent').addEventListener('click', function() {
    return addForm('content', 'textarea')
}, false)


const getCurrentContent  = (e) => {

    if(e.target.classList.contains('contentBox')) {
        
        let getBoxes = document.querySelectorAll('.contentBox')
        getBoxes.forEach((ele) => {
            ele.classList.remove('active')
        })

        e.target.classList.add('active')

        getBoxes.forEach((content) => {
            
            if(!content.classList.contains('active')) {
                content.style.width = "20px";
            } else {
                content.style.width = "400px";
            }    
        })

        e.target.classList.add('active')

    }
}

window.addEventListener('click', getCurrentContent);
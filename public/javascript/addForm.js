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
        textarea.classList.add = `contentBox`
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


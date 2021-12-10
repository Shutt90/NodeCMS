Dropzone.autoDiscover = false

if (document.getElementById('upload')) {
    let myDropzone = new Dropzone("#upload", {url: '/sliders/create'});
    myDropzone.on("addedfile", file => {
    console.log(`File added: ${file.name}`);
    });     
}
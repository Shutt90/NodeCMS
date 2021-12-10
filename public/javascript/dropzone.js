Dropzone.autoDiscover = false

if (document.getElementById('sliderUpload')) {
    let myDropzone = new Dropzone("#sliderUpload", {
        url: '/sliders/create',
        maxFilesize: 2,
        maxFiles: 10,
    });

    myDropzone.on("addedfile", file => {
    console.log(`File added: ${file.name}`);
    });     
}
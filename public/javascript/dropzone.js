import Dropzone from "dropzone";


let myDropzone = new Dropzone(".dropzone");
myDropzone.on("addedfile", file => {
  console.log(`File added: ${file.name}`);
});
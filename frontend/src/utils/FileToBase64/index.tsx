export function fileToBase64(file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    var base64data = reader.result;
    callback(base64data);
  };
}

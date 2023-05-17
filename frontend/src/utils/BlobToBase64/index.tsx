export function blobTobase64(blob, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    var base64data = reader.result;
    callback(base64data);
  };
}

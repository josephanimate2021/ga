const fs = require('fs');

module.exports = {
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  },
  fileString(filepath) {
    return filepath;
  },
  exists(filepath) {
    return fs.existsSync(filepath);
  }
}

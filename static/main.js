const get = require("../req/get");
const env = require("../env");

module.exports = {
  getAnimationSwfs(name) {
    return new Promise((res, rej) => get(env.SWF_URL + `/${name}.swf`).then(b => res(b)).catch(e => rej(e)));
  },
};

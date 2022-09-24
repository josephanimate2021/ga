const fs = require('fs');

module.exports = {
  getAssets(type) {
    // vars
    var folder, use, push, name, tag, state;
    const table = [];
    // assign some vars
    switch (type) {
      case "char": {
        folder = process.env.CHARS_FOLDER;
        use = "xml";
        push = "char";
        break;
      } case "movie": {
        folder = process.env.STARTERS_FOLDER;
        use = "xml";
        push = "starter";
        break;
      } case "bg": {
        folder = process.env.BACKGROUNDS_FOLDER;
        use = "thumb";
        break;
      } case "prop": {
        folder = process.env.PROPS_FOLDER;
        use = "thumb";
        break;
      }
    }
    // assign the table var to return some metadata
    try {
      fs.readdirSync(folder).forEach(file => {
        // file vars
        const dot = file.lastIndexOf(".");
        const ext = file.substr(dot + 1);
        const id = file.slice(0, -4);
        const nameExists = fs.existsSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
        // the functions themselves
        switch (use) {
          case "xml": {
            if (ext == "png") return;
            const xml = fs.existsSync(folder + `/${id}.xml`);
            const thumb = fs.existsSync(folder + `/${id}.png`);
            const stateExists = fs.existsSync(process.env.DATABASES_FOLDER + `/states/${id}.txt`);
            const tagExists = fs.existsSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`);
            if (xml && thumb) {
              const buffer = fs.readFileSync(folder + `/${id}.xml`);
              switch (push) {
                case "char": {
                  const beg = buffer.indexOf(`theme_id="`) + 10;
                  const end = buffer.indexOf(`"`, beg);
                  const theme = buffer.subarray(beg, end).toString();
                  if (nameExists && stateExists && tagExists) {
                    name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
                    state = fs.readFileSync(process.env.DATABASES_FOLDER + `/states/${id}.txt`);
                    tag = fs.readFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`);
                    table.unshift({id: id, theme: theme, title: name, copyable: state, tags: tag});
                  } else table.unshift({id: id, theme: theme, title: "Untitled", copyable: "Y"});
                } case "starter": {
                  if (nameExists && tagExists) {
                    name = fs.readFileSync(process.env.DATABASES_FOLDER + `/names/${id}.txt`);
                    tag = fs.readFileSync(process.env.DATABASES_FOLDER + `/tags/${id}.txt`);
                  } else {
                    const begTitle = buffer.indexOf("<title>") + 16;
                    const endTitle = buffer.indexOf("]]></title>");
                    const name = buffer.slice(begTitle, endTitle).toString().trim();
                    const begTag = buffer.indexOf("<tag>") + 14;
                    const endTag = buffer.indexOf("]]></tag>");
                    const tag = buffer.slice(begTag, endTag).toString();
                  } 
                  table.unshift({id: id, title: name, tags: tag});
                }
              }
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
    return table;
  },
  getAssetXmls(data) {
    var files, xml;
    switch (data.type) {
      case "char": {
        files = this.getAssets("char");
        xml = `<ugc more="0">${files.map(v => `<char id="${v.id}" name="${v.title}" cc_theme_id="${v.theme}" thumbnail_url="/assets/${v.id}.png" copyable="${v.copyable}"><tags>${v.tags || ""}</tags></char>`).join('')}</ugc>`;
        break;
      } default: {
        xml = `<ugc more="0"></ugc>`;
        break;
      }
    }
    return xml;
  }
};

import fs from 'fs';
import fUtil from '../fileUtil.js';

export default {
    p: `https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png`,
    search(name, type) {
        const dir = process.env.TITLES_FOLDER;
        const table = [];
        for (const file of fs.readdirSync(dir)) {
            const id = fs.readFileSync(`${dir}/${file}`, 'utf8');
            const elem = `<li>
                <a href="/node?id=${
                    id
                }">
                    <img src="${this.p}"/>
                </a>
                <dl><dt><a href="/node?id=${
                    id
                }">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt></dl>
            </li>`;
            if (file.includes(name)) {
                if (type == "contains-starters") {
                    if (fs.existsSync(process.env.DATABASES_FOLDER + `/${id}-starter.txt`)) {
                        table.unshift(
                            {
                                html: elem
                            }
                        );
                    }
                } else {
                    table.unshift(
                        {
                            html: elem
                        }
                    );
                }
            }
        }
        return table;
    },
    list(type, mode) {
        const table = [];
        switch (type) {
          case "starter": {
            fs.readdirSync(process.env.STARTER_FOLDER).forEach(file => {
              const id = file.split(".")[1];
              if (fs.existsSync(process.env.STARTER_FOLDER + `/${file}`)) {
                const fullFile = fUtil.getFullFile(process.env.DATABASES_FOLDER, `${id}-title.txt`)
                if (mode == "loadMore") table.unshift({html: `<li><a href="/templates?uploaded=true&id=${
                    id
                }"><img src="${this.p}"/></a><dl><dt><a href="/templates?uploaded=true&id=${id}">${
                    fs.readFileSync(process.env.DATABASES_FOLDER + `/${fullFile}`)
                }</a></dt></dl></li>`});
                else table.unshift({html: `<li><a href="/starters?uploaded=true&id=${id}"><img src="${
                    this.p
                }"/></a><dl><dt><a href="/starters?uploaded=true&id=${id}">${
                    fs.readFileSync(process.env.DATABASES_FOLDER + `/${fullFile}`)
                }</a></dt></dl></li>`});
              }
            });
            break;
          } default: {
            fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
              const id = file.split(".")[1];
              const fullFile = fUtil.getFullFile(process.env.DATABASES_FOLDER, `${id}-title.txt`)
              if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) {
                const json = Object.fromEntries(new URLSearchParams(fs.readFileSync(process.env.MOVIE_FOLDER + `/${file}`).toString()));
				const thumbpath = `/files/thumbs/small/${
					fs.existsSync(`./files/thumbs/small/${json.thumbid}.png`) ? json.thumbid : 'default'
				}.png`
                table.unshift({html: `<li>
                  <a href="/node?id=${id}">
                    <img src="${thumbpath}"/>
                  </a>
                  <dl>
                    <dt>
                      <a href="/node?id=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${fullFile}`)}</a>
                    </dt>
                  </dl>
                </li>`});
              }
            });
            break;
          }
        }
        return table;
    },
    home(acc) {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).filter(i => i.startsWith(acc.id)).forEach(file => {
            const id = file.slice(0, -4).substr(acc.id.length + 1);
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) {
                const json = Object.fromEntries(new URLSearchParams(fs.readFileSync(process.env.MOVIE_FOLDER + `/${file}`).toString()));
				const thumbpath = `/files/thumbs/small/${
					fs.existsSync(`./files/thumbs/small/${json.thumbid}.png`) ? json.thumbid : 'default'
				}.png`
                table.unshift({html: `<li>
                    <a href="/node?id=${id}">
                        <img src="${thumbpath}"/>
                    </a>
                    <dl>
                        <dt>
                            <a href="/node?id=${id}">${
                                fs.readFileSync(process.env.DATABASES_FOLDER + `/${acc.id}.${id}-title.txt`)
                            }</a>
                        </dt>
                    </dl>
                </li>`});
            }
        });
        return table;
    },
    listTemplates() {
        const table = [];
        fs.readdirSync(process.env.STARTER_FOLDER).forEach(file => {
            const id = file.slice(0, -4);
            if (fs.existsSync(process.env.STARTER_FOLDER + `/${file}`)) table.unshift({html: `<li class="movie-clip clear-block">
                <a href="javascript:apiVerSelectForStudio('${id}')" class="thumbnail">
                    <img src="${this.p}" alt="${
                        fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)
                    }" title="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}"/>
                </a>      
                <!-- Movie Clip Types -->
                <h2><a href="javascript:apiVerSelectForStudio('${id}')">${
                    fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)
                }</a></h2>
                <p class="submitted">
                    <span class="date">
                        Posted <em>${
                            fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-date.txt`)
                        }</em>        
                    </span>
                    <span class="user">
                        By <a href="${
                            fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-user-link.txt`)
                        }" class="active">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-user.txt`)}</a> 
                    </span>
                </p>
            </li>`});
        });
        return table;
    }
}

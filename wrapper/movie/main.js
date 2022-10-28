const fs = require("fs");

module.exports = {
  search(name, type)  {
    const dir = process.env.TITLES_FOLDER;
    const table = [];

    fs.readdirSync(dir).forEach(file => {
      const id = fs.readFileSync(`${dir}/${file}`, 'utf8');
      if (file.includes(name)) {
        if (type == "contains-starters") {
          if (fs.existsSync(process.env.DATABASES_FOLDER + `/${id}-starter.txt`)) {
            table.unshift({html: `<li><a href="/ajax/movieStarterCheck?movieId=${
              id
            }"><img src="https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png"/></a><dl><dt><a href="/ajax/movieStarterCheck?movieId=${
              id
            }">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt></dl></li>`});
          }
        } else {
          table.unshift({html: `<li><a href="/ajax/movieStarterCheck?movieId=${
            id
          }"><img src="https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png"/></a><dl><dt><a href="/ajax/movieStarterCheck?movieId=${
            id
          }">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt></dl></li>`});
        }
      }
    });
    return table;
    },
    list(type, mode) {
        const table = [];
        switch (type) {
          case "starter": {
            fs.readdirSync(process.env.STARTER_FOLDER).forEach(file => {
              const id = file.slice(0, -4);
              if (fs.existsSync(process.env.STARTER_FOLDER + `/${file}`)) {
                if (mode == "loadMore") table.unshift({html: `<li><a href="/templates?uploaded=true&id=${id}"><img src="https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png"/></a><dl><dt><a href="/templates?uploaded=true&id=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt></dl></li>`});
                else table.unshift({html: `<li><a href="/starters?uploaded=true&id=${id}"><img src="https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png"/></a><dl><dt><a href="/starters?uploaded=true&id=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt></dl></li>`});
              }
            });
            break;
          } default: {
            fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
              const id = file.slice(0, -4);
              if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `<li><a href="/ajax/movieStarterCheck?movieId=${id}"><img src="https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png"/></a><dl><dt><a href="/ajax/movieStarterCheck?movieId=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt></dl></li>`});
            });
            break;
          }
        }
        return table;
    },
    home() {
      const table = [];
      fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
          const id = file.slice(0, -4);
          if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `<li>
          <a href="/ajax/movieStarterCheck?movieId=${id}"><img src="https://web.archive.org/web/20070111205335im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/eva_teleports_jungle.png"/></a>		<dl>
            <dt><a href="/ajax/movieStarterCheck?movieId=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt>
          </dl>
        </li>`});
      });
      return table;
    },
    listTemplates() {
      const table = [];
      fs.readdirSync(process.env.STARTER_FOLDER).forEach(file => {
          const id = file.slice(0, -4);
          if (fs.existsSync(process.env.STARTER_FOLDER + `/${file}`)) table.unshift({html: `    <li class="movie-clip clear-block">
  
          <a href="javascript:apiVerSelectForStudio('${id}')" class="thumbnail"><img src="https://web.archive.org/web/20200604033451im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/xdefault.png.pagespeed.ic.NRbioFMVrg.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    " title="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}"/></a>      <!-- Movie Clip Types -->
        
          <h2><a href="javascript:apiVerSelectForStudio('${id}')">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    </a></h2>
            
    <p class="submitted">
    <span class="date">
      Posted <em>${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-date.txt`)}</em>        </span>
    <span class="user">
      By <a href="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-user-link.txt`)}" class="active">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-user.txt`)}</a> 
                      </span>
  </p>
                        
        </li>`});
      });
      return table;
  }
}

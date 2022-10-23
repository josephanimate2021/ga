const fs = require("fs");

module.exports = {
    search(title) {
      return new Promise((res, rej) => {
        const table = [];
        fs.readdirSync(process.env.TITLES_FOLDER).forEach(file => {
          if (file != title + `.json`) return;
          const meta = require(process.env.TITLES_FOLDER + `/${title}.json`);
          const id = meta.movieid;
          table.unshift(`<li class="movie-clip clear-block">
    
          <a href="javascript:apiVerSelectForPlayer('${id}')" class="thumbnail"><img src="https://web.archive.org/web/20200604033451im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/xdefault.png.pagespeed.ic.NRbioFMVrg.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    " title="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}"/></a>      <!-- Movie Clip Types -->
        
          <h2><a href="javascript:apiVerSelectForPlayer('${id}')">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    </a></h2>
            
          <p class="submitted">
            
            <span class="date">
              <a href="javascript:apiVerSelectForStudio('${id}')">Edit</a>        </span>
            
            <span class="user">
              <a href="/movie/fetch?movieid=${id}" download="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}.txt">Download</a> 
                                </span>
            
          </p>
          
          <dl class="movie-clip-statistics">
          <dt>More Options:</dt>
        <dd><a href="/movie/delete?movieId=${id}">Delete</a></dd>
      </dl>		
                        
        </li>`);
        });
        res(table);
      });
    },
    list() {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
            const id = file.slice(0, -4);
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `<li>
            <a href="/ajax/movieStarterCheck?movieId=${id}"><img src="https://web.archive.org/web/20061023094121im_/http://www.zimmertwins.ca/media/shared/thumbnails/small/edgar_finds_backyard.png"/></a>		<dl>
              <dt><a href="/ajax/movieStarterCheck?movieId=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}</a></dt>
            </dl>
          </li>`});
        });
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

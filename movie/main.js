const fs = require("fs");

module.exports = {
    list() {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
            const id = file.slice(0, -4);
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `    <li class="movie-clip clear-block">
    
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
                          
          </li>`});
        });
        return table;
    }
}

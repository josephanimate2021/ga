const fs = require("fs");

module.exports = {
    list() {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
            const id = file.slice(0, -4);
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `    <li class="movie-clip clear-block">
    
            <a href="/player?movieId=${id}" class="thumbnail"><img src="https://web.archive.org/web/20200604033451im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/xeva_laughs_stage.png.pagespeed.ic._EXN4d1ID5.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
      
      " title="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}"/></a>      <!-- Movie Clip Types -->
        <ul class="movie-clip-types clear-block">
                <li class="now-showing">
              <span>Now Showing</span>
            </li>
            </ul>  
          
            <h2><a href="/player?movieId=${id}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
      
      </a></h2>
              
            <p class="submitted">
              
              <span class="date">
                <a href="/studio?movieId=${id}">Edit</a>        </span>
              
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

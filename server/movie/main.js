const fs = require("fs");

module.exports = {
    list(q) {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
            const id = file.slice(0, -4);
            var f, fu;
            if (q !="noFunctions") {
              f = `javascript:apiVerSelectForPlayer('${id}')`;
              fu = `javascript:apiVerSelectForStudio('${id}')`;
            } else {
              f = `/player?movieId=${id}`;
              fu = `/studio?movieId=${id}`;
            }
            const title = fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({id: id, title: title, html: `    <li class="movie-clip clear-block">
    
            <a href="${f}" class="thumbnail"><img src="https://web.archive.org/web/20200604033451im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/xdefault.png.pagespeed.ic.NRbioFMVrg.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
      
      " title="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}"/></a>      <!-- Movie Clip Types -->
          
            <h2><a href="${f}">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
      
      </a></h2>
              
            <p class="submitted">
              
              <span class="date">
                <a href="${fu}">Edit</a>        </span>
              
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
    },
    listInSmall() {
      const table = [];
      fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
          const id = file.slice(0, -4);
          const title = fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)
          if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({id: id, title: title, html: `<li class="small corners">
          <a href="/player?movieId=${id}" class="thumbnail active"><img src="https://web.archive.org/web/20190913223519im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xedgar_talks_living_room.png.pagespeed.ic.UCb84EEip8.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    " title=""/></a>      <a href="/player?movieId=${id}" class="title active">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    </a>    </li>`});
      });
      return table;
    },
    listAsJson() {
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
      return JSON.stringify({id: table.id, title: table.title});
    },
    home() {
      const table = [];
      fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
          const id = file.slice(0, -4);
          if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `<li class="small corners">
          <a href="javascript:apiVerSelectForPlayer('${id}')" class="thumbnail"><img src="https://web.archive.org/web/20190516080207im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/xedgar_lectures_living_room.png.pagespeed.ic.v6COT2IHS1.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    " title="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}"/></a>      <a href="javascript:apiVerSelectForPlayer('${id}')" class="title">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    </a>    </li>`});
      });
      return table;
    },
    listTemplates() {
      const table = [];
      fs.readdirSync(process.env.STARTER_FOLDER).forEach(file => {
          const id = file.slice(0, -4);
          // the id 677649 is already featured as the current starter movie player.
          if (id == "677649") return;
          if (fs.existsSync(process.env.STARTER_FOLDER + `/${file}`)) table.unshift({html: `<li class="small corners">
          <a href="javascript:apiVerSelectForStudio('${id}')" class="thumbnail"><img src="https://web.archive.org/web/20190602194049im_/http://zimmertwinsatschool.com/sites/zimmertwinsatschool.com/movie/thumbnails/small/xgemjest.png.pagespeed.ic.dADE5wPEjW.png" alt="${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    " title=""></a>      <a href="javascript:apiVerSelectForStudio('${id}')" class="title">${fs.readFileSync(process.env.DATABASES_FOLDER + `/${id}-title.txt`)}
    
    </a>    </li>`});
      });
      return table;
  }
}

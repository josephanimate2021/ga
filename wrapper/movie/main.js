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
    },
    listTemplates() {
      fs.writeFileSync(process.env.STARTER_FOLDER + `/65536.txt`, 'Rage is a fucking retard!');
      fs.writeFileSync(process.env.DATABASES_FOLDER + `/546769.txt`, 'sparkz is a dumbass. You cannot get Wrapper: Offline on gaming consoles.');
      fs.unlinkSync(process.env.STARTER_FOLDER + `/65536.txt`);
      fs.unlinkSync(process.env.DATABASES_FOLDER + `/546769.txt`);
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

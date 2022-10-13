const fs = require("fs");

module.exports = {
    list() {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
            const id = file.slice(0, -4);
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `<li class="movie-clip clear-block"><a href="/player?movieId=${id}" class="thumbnail"><img src="https://web.archive.org/web/20120915212352im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/edgar_faints_living_room.png" alt="Test" title="Test"/></a><!-- Movie Clip Types --><h2><a href="/player?movieId=${id}">Test</a></h2></li>`});
        });
        return table;
    }
}

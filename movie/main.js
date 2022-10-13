const fs = require("fs");

module.exports = {
    listMovies() {
        const table = [];
        fs.readdirSync(process.env.MOVIE_FOLDER).forEach(file => {
            if (fs.existsSync(process.env.MOVIE_FOLDER + `/${file}`)) table.unshift({html: `<li class="movie-clip clear-block"><a href="/player?movieId=${file.slice(0, -4)}" class="thumbnail"><img src="https://web.archive.org/web/20120915212352im_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/thumbnails/small/edgar_faints_living_room.png" alt="Test" title="Test"/></a><!-- Movie Clip Types --><h2><a href="/player?movieId=${file.slice(0, -4)}">Test</a></h2></li>`});
        });
        return table;
    }
}
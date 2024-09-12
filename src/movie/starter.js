export default url => {
    console.log(url);
    let name, title;
    switch (url.query.id) {
        case "344704": {
          name = "surprise";
          title = "Suprise";
          break;
        } case "344709": {
          name = "idolhands";
          title = "Idol Hands";
          break;
        } case "199947": {
          name = "charming13";
          title = "Charming 13";
          break;
        } case "199946": {
          name = "rock-contest";
          title = "Rock Out!";
          break;
        } case "199944": {
          name = "13talks";
          title = "13 Talks";
          break;
        } case "16684": {
          name = "kitty-dreams";
          title = "Kitty Dreams";
          break;
        } case "16683": {
          name = "foiled";
          title = "Foiled!";
          break;
        } case "16682": {
          name = "mystery-box";
          title = "Mystery Box";
          break;
        } case "8": {
          name = "zapped";
          title = "Zapped";
          break;
        } case "7": {
          name = "misfortune";
          title = "Misfortune";
          break;
        } case "281145": {
          name = "fortune";
          title = "Fortune Misfortune";
          break;
        } case "3": {
          name = "joyride";
          title = "Joyride";
          break;
        } case "281136": {
          name = "run";
          title = "Run!";
          break;
        } case "344711": {
          name = "wheres13";
          title = "Where's 13?";
          break;
        } case "281144": {
          name = "gemjest";
          title = "Gem Jest";
          break;
        }
    }
    return {
        name, 
        title
    };
}
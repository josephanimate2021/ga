module.exports = {
  handleError(e) { // handles the error for both the ternimal and the lvm
    console.log(e);
    return 1 + `<error><code>ERR_ASSET_404</code><message>${e}</message><text></text></error>`;
  },
  sampleUrl(id) {
    return new Promise((res, rej) => {
      https.get(`https://api.uberduck.ai/voices/${id}/samples`, (r) => {
        let buffers = [];
        r.on("data", (b) => buffers.push(b)).on("end", () => {
          try {
            const json = JSON.parse(Buffer.concat(buffers));
            if (json[0]) res(json[0].url);
            else res("");
          } catch (e) {
            rej(e);
          }
        }).on("error", rej);
      }).on("error", rej);
    });
  },
  duration(data) {
    return new Promise((res, rej) => {
      mp3Duration(data, (e, duration) => {
        if (e || !duration) return rej(e || "Unable to retreive buffer duration");
        const dur = duration * 1e3;
        res(dur);
      });
    })
  },
  convertToMp3(data, fileExt) {
    return new Promise((res, rej) => {
      const command = ffmpeg(data).inputFormat(fileExt).toFormat("mp3").audioBitrate(4.4e4).on("error", (err) => rej(err));
      res(command.pipe());
    });
  },
  checkSpeakStatus(id) {
    return new Promise((res, rej) => {
      https.get(`https://api.uberduck.ai/speak-status?uuid=${id}`, (r) => {
        let buffers = [];
        r.on("data", (b) => buffers.push(b)).on("end", () => {
          try {
            const json = JSON.parse(Buffer.concat(buffers));
            res(json);
          } catch (e) {
            rej(e);
          }
        }).on("error", rej);
      }).on("error", rej);
    });
  },
  voiceDetail(id) {
    return new Promise((res, rej) => {
      https.get(`https://api.uberduck.ai/voices/${id}/detail`, (r) => {
        let buffers = [];
        r.on("data", (b) => buffers.push(b)).on("end", () => {
          try {
            const json = JSON.parse(Buffer.concat(buffers));
            res(json);
          } catch (e) {
            rej(e);
          }
        }).on("error", rej);
      }).on("error", rej);
    });
  }
}

const https = require("https");
const request = require('request');
const loadPost = require("../req/body");
const ffmpeg = require("fluent-ffmpeg");
const tempfile = require("tempfile");
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path);
const fs = require("fs");
function handleError(e) { // handles the error for both the ternimal and the lvm
    console.log(e);
    return 1 + `<error><code>ERR_ASSET_404</code><message>${e}</message><text></text></error>`;
}
const fUtil = require("../fileUtil");
const mp3Duration = require("mp3-duration");
const { error } = require("console");
function sampleUrl(id) {
    return new Promise((res, rej) => {
        https.get(`https://api.uberduck.ai/voices/${id}/samples`, (r) => {
            let buffers = [];
            r.on("data", (b) => buffers.push(b)).on("end", () => {
                const json = JSON.parse(Buffer.concat(buffers));
                if (json[0]) res(json[0].url);
                else res("");
            }).on("error", rej);
        }).on("error", rej);
    });
}
function duration(data) {
    return new Promise((res, rej) => {
        mp3Duration(data, (e, duration) => {
            if (e || !duration) {
                return rej(e);
            }
            const dur = duration * 1e3;
            res(dur);
        });
    });
}
function convertToMp3(data, fileExt) {
    return new Promise((res, rej) => {
        const command = ffmpeg(data)
            .inputFormat(fileExt)
            .toFormat("mp3")
            .audioBitrate(4.4e4)
            .on("error", (err) => rej(err));
        res(command.pipe());
    });
}
function checkSpeakStatus(id) {
    return new Promise((res, rej) => {
        https.get(`https://api.uberduck.ai/speak-status?uuid=${id}`, (r) => {
            let buffers = [];
            r.on("data", (b) => buffers.push(b)).on("end", () => {
                const json = JSON.parse(Buffer.concat(buffers));
                res(json);
            }).on("error", rej);
        }).on("error", rej);
    });
}
function voiceDetail(id) {
    return new Promise((res, rej) => {
        https.get(`https://api.uberduck.ai/voices/${id}/detail`, (r) => {
            let buffers = [];
            r.on("data", (b) => buffers.push(b)).on("end", () => {
                const json = JSON.parse(Buffer.concat(buffers));
                res(json);
            }).on("error", rej);
        }).on("error", rej);
    });
}
let xml;
let xmlSucess = false;
const errorJson = {};
https.get('https://api.uberduck.ai/voices?mode=tts-basic&language=english&is_commercial=false&is_private=false&slim=false', (r) => {
    let buffers = [];
    r.on("data", (b) => buffers.push(b)).on("end", async () => {
        try {
            const json = JSON.parse(Buffer.concat(buffers));
            for (const voice of json) {
                xmlSucess = true;
                xml += `<voice id="${voice.voicemodel_uuid}" desc="${voice.display_name}" sex="M" demo-url="${await sampleUrl(voice.voicemodel_uuid)}" country="US" plus="N"/>`;
            }
        } catch (e) {
            errorJson.error = e;
            console.log(e);
        }
    });
})
module.exports = function(req, res, url) {
    if (req.method != "POST") return;
    switch (url.pathname) {
        case "/goapi/getTextToSpeechVoices/": {
            res.setHeader("Content-Type", "application/xml");
            if (xmlSucess) res.end(`<voices><language id="en" desc="English">${xml}</language></voices>`);
            else res.end(`<voices><language id="en" desc="English"></language></voices>`);
            break;
        } case "/goapi/convertTextToSoundAsset/": {
            loadPost(req, res).then(async data => {
                const voice = await voiceDetail(data.voice);
                request({
                    method: 'POST',
                    url: 'https://api.uberduck.ai/speak',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        authorization: 'Basic cHViX21hdGR2bHZrYXBwcW9ocGtheDpwa18zOGU2Yjk5NC0wZjBmLTQwMDItYmEyMC02MmI2MjQ4N2IyYmM='
                    },
                    body: {
                        voice: voice.name,
                        speech: data.text
                    },
                    json: true
                }, async (error, response, body) => {
                    if (error) return res.end(handleError(error));
                    let json = await checkSpeakStatus(body.uuid);
                    while (json.path === null) json = await checkSpeakStatus(body.uuid);
                    https.get(json.path, (r) => convertToMp3(r, "wav").then(buff => {
                        let buffers = [];
                        buff.on("data", (b) => buffers.push(b)).on("end", async () => {
                            const buffer = Buffer.concat(buffers);
                            const id = `${fUtil.makeid(12)}.mp3`;
                            const title = `[${voice.display_name}] ${data.text}`;
                            const dur = await duration(buffer);
                            if (!fs.existsSync('./sounds')) fs.mkdirSync('./sounds');
                            fs.writeFileSync(`./sounds/${id}`, buffer);
                            res.end(`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>tts</subtype><title>${title}</title><published>0</published><tags></tags><duration>${dur}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`);
                        });
                    }))
                });
            });
            break;
        } default: return;
    }
    return true;
}
const https = require("https");
const request = require('request');
const loadPost = require("../req/body");
const fs = require("fs");
const fUtil = require("../fileUtil");
const tts = require("./main");
let xml;
let xmlSucess = false;
https.get('https://api.uberduck.ai/voices?mode=tts-basic&language=english&is_commercial=false&is_private=false&slim=false', (r) => {
    let buffers = [];
    r.on("data", (b) => buffers.push(b)).on("end", async () => {
        try {
            const json = JSON.parse(Buffer.concat(buffers));
            for (const voice of json) {
                xmlSucess = true;
                xml += `<voice id="${voice.voicemodel_uuid}" desc="${voice.display_name}" sex="M" demo-url="${await tts.sampleUrl(voice.voicemodel_uuid)}" country="US" plus="N"/>`;
            }
        } catch (e) {
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
                const voice = await tts.voiceDetail(data.voice);
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
                    if (error) return res.end(tts.handleError(error));
                    let json = await tts.checkSpeakStatus(body.uuid);
                    while (json.path === null) json = await tts.checkSpeakStatus(body.uuid);
                    https.get(json.path, (r) => tts.convertToMp3(r, "wav").then(buff => {
                        let buffers = [];
                        buff.on("data", (b) => buffers.push(b)).on("end", async () => {
                            const buffer = Buffer.concat(buffers);
                            const id = `${fUtil.makeid(12)}.mp3`;
                            const title = `[${voice.display_name}] ${data.text}`;
                            const dur = await tts.duration(buffer);
                            if (!fs.existsSync('./sounds')) fs.mkdirSync('./sounds');
                            fs.writeFileSync(`./sounds/${id}`, buffer);
                            res.end(`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>tts</subtype><title>${title}</title><published>0</published><tags></tags><duration>${dur}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`);
                        });
                    }))
                });
            });
            break;
        } case "/goapi/getAsset/": {
            loadPost(req, res).then(data => res.end(fs.readFileSync(`./sounds/${data.assetId}`)))
            break;
        }
        default: return;
    }
    return true;
}

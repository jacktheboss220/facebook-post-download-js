const axios = require('axios');
const fs = require('fs');
// module.exports.downloadFB = async (url) => {
const downloadFB = async (url) => {
    const writer = fs.createWriteStream("./fb.mp4");
    const response = await axios({
        url: url,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('end', resolve)
        writer.on('error', reject)
    })
}
const faceURL = 'https://fb.watch/7B5KBCgdO3'; // public url without ?app=1 or last /
async function dm() {
    await axios(`https://api.neoxr.eu.org/api/fb?url=${faceURL}/&apikey=yourkey`).then((res) => {
        try {
            downloadFB(res.data.data[1].url);
        } catch {
            downloadFB(res.data.data[0].url);
        }
    }).catch(() => {
        console.log("ERROR");
    });
}
dm()

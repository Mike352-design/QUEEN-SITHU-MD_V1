const {cmd , commands} = require('../command')
const yts = require('yt-search');
const fg = require('api-dylux');
const axios = require('axios');
const { Buffer } = require('buffer');

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID




//===================== img downloader ========================

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `💚𝐐𝐔𝐄𝐄𝐍 𝐒𝐈𝐓𝐇𝐔-𝐌𝐃 𝐌𝐑 𝐓𝐇𝐀𝐑𝐔𝐒𝐇𝐀💚`,
                    orderTitle: "",
                    sellerJid: '94704227534@s.whatsapp.net'
                }
            }
        };
        
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
🌟 *Image ${i + 1} from your search!* 🌟
        *Enjoy these images! 📸*

*👨‍💻𝚀𝚄𝙴𝙴𝙽 𝚂𝙸𝚃𝙷𝚄-𝙼𝙳👨‍💻*
`
}, { quoted: qMessage });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

//======================= fb downloader ===================================================================

const { fetchJson } = require('../lib/functions')
const config = require('../config')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//fb downloader
cmd({
    pattern: "fb",
    desc: "Download fb videos",
    category: "download",
    react: "#️⃣",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Facebook video URL!");
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        let desc = ` *🐦‍🔥 QUEEN SITHU MD FB DOWNLOADER 🐦‍🔥*

*🔢 Reply Below Number :*

*1 Download HD Quality*
*2 Download SD Quality*

*👨‍💻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙸𝚃𝙷𝚄 𝙼𝙳 𝙼𝚁 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 👨‍💻*`;

        const vv = await conn.sendMessage(from, { image: { url:"https://files.catbox.moe/w9d14s.jpg"}, caption: desc }, { quoted: mek });
        
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "*👨‍💻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙸𝚃𝙷𝚄-𝙼𝙳 𝙼𝚁 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 👨‍💻*" }, { quoted: mek });
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});

//=========================== apk downloader ==============================

cmd({
    pattern: "apk",
    react: '📦',
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
    const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `💚𝐐𝐔𝐄𝐄𝐍 𝐒𝐈𝐓𝐇𝐔-𝐌𝐃 𝐌𝐑 𝐓𝐇𝐀𝐑𝐔𝐒𝐇𝐀💚`,
                    orderTitle: "",
                    sellerJid: '94704227534@s.whatsapp.net'
                }
            }
        };

await m.react("🔄")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*🐦‍🔥 QUEEN SADU MD APK DOWNLOADER 🐦‍🔥*
*╭──📦 APK Details 📦──◦•◦►•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰───────────────◦•◦►•*\n\n\*👨‍💻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙸𝚃𝙷𝚄 𝙼𝙳 👨‍💻*`

await conn.sendMessage(from,{image: {url: data.datalist.list[0].icon},caption: desc},{quoted: mek})
await conn.sendMessage(from,{document: {url: data.datalist.list[0].file.path_alt},fileName: data.datalist.list[0].name,mimetype: 'application/vnd.android.package-archive',caption: `*👨‍💻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙸𝚃𝙷𝚄-𝙼𝙳 𝙼𝚁 𝚃𝙷𝙰𝚁𝚄𝚂𝙷𝙰 👨‍💻*`},{ quoted: qMessage });
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})

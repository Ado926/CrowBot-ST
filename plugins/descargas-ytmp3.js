import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {

if (!args[0]) return m.reply(`🍭 Ingresa Un Link De YouTube.`);

let api = await(await fetch(`https://api.agungny.my.id/api/youtube-audio?url=${args[0]}`)).json();

// if (!api?.result?.dl_url) return m.reply('No Se  Encontraron Resultados');

let txt = `「✦」𝗧𝗶𝘁𝘂𝗹𝗼: ${api.result.result.title}`;
conn.reply(m.chat, txt, m, rcanal);

conn.sendMessage(m.chat, { audio: { url: api.result.result.download }, mimetype: 'audio/mpeg' }, { quoted: m });
 }

handler.help = ['ytmp3'];
handler.tag = ['descargas'];
handler.command = ['ytmp3', 'mp3'];

export default handler;
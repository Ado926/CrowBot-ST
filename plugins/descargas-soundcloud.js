import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `🎩 Ingrese el nombre de la cancion de *Soundcloud.*`, m, rcanal)

await m.react('🕒');
try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${text}`);
let json = await api.json();

let link = json[0].url;

let api2 = await fetch(`https://delirius-apiofc.vercel.app/download/soundcloud?url=${link}`);
let json2 = await api2.json();

conn.sendMessage(m.chat, { audio: { url: json2.data.url }, mimetype: 'audio/mpeg' }, { quoted: m });

await m.react('✅');
} catch (error) {
m.reply(`No Se Encontraron Resultados Para Tu Búsqueda En Soundcloud\n${error.message}`);
await m.react('✖️');
}}

handler.help = ['soundcloud *<búsqueda>*']
handler.tags = ['descargas']
handler.command = ['soundcloud', 'sound', 'play']

export default handler
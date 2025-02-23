import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return conn.reply('🍭 Ingrese el nombre De Alguna Música');

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `「 *𝐂𝐫𝐨𝐰𝐁𝐨𝐭 - 𝐒𝐓* 」\n> ♡ *Título:* ${title}\n> ♡ *Duración:* ${timestamp}\n> ♡ *Vistas:* ${vistas}\n> ♡ *Canal:* ${videoInfo.author.name || 'Desconocido'}\n> ♡ *Publicado:* ${ago}\n> ♡ *Enlace:* ${url}\n> Powered By Crow's Club`;
    const thumb = (await conn.getFile(thumbnail))?.data;

conn.sendMessage(m.chat, { 
        image: { url: thumb }, 
        caption: infoMessage, 
        footer: dev, 
        buttons: [
            {
                buttonId: `.ytv ${url}`,
                buttonText: { displayText: '✨ Obtener Video' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });

} catch (e) {
m.reply(`Error: ${e.message}`);
  }
}

handler.command = ['test'];

export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}
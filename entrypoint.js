import './style.css'
import html from './index.html?raw'

const req = require.context('./assets', true, /(\.png|sounds\/[\w-]{1,16}\.ogg|music\/musics0\.ogg)$/);

const regexHtmlAssets = /<(img|audio)\s+src="\.\/assets([\/\w.-]+)"\s+id="([\w-]+)"/g;

for (const match of html.matchAll(regexHtmlAssets)){
  const elem = document.createElement(match[1]);
  elem.setAttribute("id", match[3]);
  let key = `.${match[2]}`;
  if (/music\/[\w-]{1,16}\.ogg$/.test(key)) key = "./audio/music/musics0.ogg";
  elem.setAttribute("src", req(key));
  document.body.append(elem);
}

require('./app.js')

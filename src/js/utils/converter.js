import htmlToMarkdown from 'html-to-markdown';

window.htmlToMarkdown = htmlToMarkdown;

import showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';

var converter = new showdown.Converter({
  prefixHeaderId: 'section-',
  'headerLevelStart': 1,
  ghCompatibleHeaderId: true,
  extensions: [{ // replace special characters in lab
    type: 'lang',
    regex: /(<lab[^>]*>)([\s\S]*?)<\/lab>/ig,
    replace: (match, p1, p2) => (p1+p2.replace(/#/g,"&#35;")+'</lab>')
  },{ // remove notice as they are only for github
    type: 'output',
    regex: /(<p>)?<notice(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)<\/notice>(<\/p>)?\n?/ig,
    replace: ""
  },
  { // replace src to real address
    type: 'output',
    regex: /<img\s+(.*?)src=['"](.+?)['"](.*?)\/>/ig,
    replace(m, p1, p2, p3){
      console.log("image:", m,p1,p2,p3);
      if(p2.indexOf("mailto") == 0 && p2.indexOf("#") == 0){
        return ""; // we don't allow mailto or # at the start of an image source
      }else if(window.contentURLBase && p2.indexOf("http") != 0 && p2.indexOf("#") != 0){ // ensure it's relative path
        console.log("Output:", `<img ${p1}src="${window.contentURLBase}/${p2}"${p3}/>`);
        return `<img ${p1}src="${window.contentURLBase}/${p2}"${p3}/>`;
      }else{
        return m;
      }
    }
  }, xssFilter],
  tables: true
});

export { converter };

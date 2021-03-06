/**
 * 移除 html 中未被 svg used 的 symbol 标签
 WP2Static 生成的 html 中包含很多无用的 svg > defs > symbol 标签
 修改变量 svgProcessPath 指定的处理目录
 CAUTION: Script will overwrite origin HTML file under svgProcessPath
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const svgProcessPath = path.resolve(__dirname + '/svgProcess');
const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (/.*\.html$/.test(file)) results.push(file);
  });
  return results;
};

const htmlFiles = walk(svgProcessPath);
htmlFiles.forEach(function(item, index) {
  fs.readFile(item, 'utf8', function(err, file) {
    const $ = cheerio.load(file, {decodeEntities: false});
    let usedSvgId = [];
    $('svg use').each(function(useIndex, useElement) {
      usedSvgId.push($(useElement).attr('href').replace(/#/, ''));
    });

    $('svg defs').find('symbol').each(function(symbolIndex, symbolElement) {
      if (!usedSvgId.includes(symbolElement.attribs.id)) {
        $(symbolElement).remove();
      }
    });

    fs.writeFile(item, $.html(), 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
});

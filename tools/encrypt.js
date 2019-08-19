/**
 * 加密并替换标签包含类名 encrypted-content 中的内容
 * 修改变量 svgProcessPath 指定的处理目录
 * 文件过多会到内存限制，分批处理即可
 * CAUTION: Script will overwrite origin HTML file under encryptProcess
 * */
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const buffer = require('./lib/scrypt-js/thirdparty/buffer')
const unorm = require('./lib/scrypt-js/thirdparty/unorm')
const setImmediate = require('./lib/scrypt-js/thirdparty/setImmediate')
const scrypt = require('./lib/scrypt-js/scrypt')
const aesjs = require('./lib/aes-js')

const svgProcessPath = path.resolve(__dirname + '/encryptProcess')
const ENCRYPT_SELECTOR = '.encrypted-content'
const PASSWORD = ''
const SALT = ''

const walk = function (dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(function (file) {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else if (/.*\.html$/.test(file)) results.push(file)
  })
  return results
}
const htmlFiles = walk(svgProcessPath)
htmlFiles.forEach(async function (item, index) {
  const aesKey = await generateKey(PASSWORD, SALT)
  const file = fs.readFileSync(item, 'utf8')
  const $ = cheerio.load(file, { decodeEntities: false })
  if ($(ENCRYPT_SELECTOR).length) {
    $(ENCRYPT_SELECTOR).each(function (index, element) {
      const encryptedHex = encrypt(aesKey, $(element).html())
      $(element).html(encryptedHex)
    })

    // append decrypt script
    $('body').append(
      '<script src="/tools/lib/scrypt-js/thirdparty/setImmediate.js" type="text/javascript"></script> <script src="/tools/lib/scrypt-js/thirdparty/unorm.js" type="text/javascript"></script> <script src="/tools/lib/scrypt-js/thirdparty/buffer.js" type="text/javascript"></script> <script src="/tools/lib/scrypt-js/scrypt.js" type="text/javascript"></script> <script src="/tools/lib/aes-js/index.js" type="text/javascript"></script> <script src="/tools/decrypt.js" type="text/javascript"></script>')

    fs.writeFileSync(item, $.html(), 'utf8')
    console.log(`处理 ${item}`)
  }
})

function generateKey (password, salt) {
  return new Promise((resolve, reject) => {
    const N = 1024, r = 8, p = 1
    const dkLen = 16
    // generate key from password and salt
    scrypt(new buffer.SlowBuffer(password.normalize('NFKC')),
      new buffer.SlowBuffer(salt.normalize('NFKC')), N, r, p, dkLen,
      function (error, progress, key) {
        if (error) {
          reject(error)
        } else if (key) {
          resolve(key.toString().split(',').map(item => parseInt(item, 10)))
        }
      })
  })
}

function encrypt (aesKey, text) {
  // Convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(text)

  // The counter is optional, and if omitted will begin at 1
  const aesCtr = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5))
  const encryptedBytes = aesCtr.encrypt(textBytes)

  // To print or store the binary data, you may convert it to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)

  return encryptedHex
}

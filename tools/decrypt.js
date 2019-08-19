var password = prompt('Enter password to decrypt this post');
if (password) {
  scrypt(new buffer.SlowBuffer(password.normalize('NFKC')),
      new buffer.SlowBuffer(''.normalize('NFKC')), 1024, 8, 1, 16,
      function(error, progress, key) {
        if (error) {
          console.log('Error: ' + error);
        } else if (key) {
          var aesKey = key.toString().
              split(',').
              map(function(item) {return parseInt(item, 10);});
          var aesCtr = new aesjs.ModeOfOperation.ctr(aesKey,
              new aesjs.Counter(5));
          document.querySelectorAll('.encrypted-content').
              forEach(function(item) {
                var encryptedBytes = aesjs.utils.hex.toBytes(item.innerHTML);
                var decryptedBytes = aesCtr.decrypt(encryptedBytes);
                var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
                item.innerHTML = decryptedText;
              });
        }
      });
} else {
  alert('Invalid password.');
}

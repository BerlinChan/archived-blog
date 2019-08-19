/* krpano 1.17.6 soundinterface plugin (build 2014-10-17) */
var krpanoplugin = function () {
  function z() {
  }

  function A() {
    var a = arguments;
    if (1 < a.length) {
      var b = String(a[0]).toLowerCase(), m = a[1], B = 2 < a.length ? parseInt(a[2]) : 1, k = 3 < a.length ? a[3] : null;
      if ("auto" == b || "null" == b || "" == b)b = "autoid_" + c.timertick + "_" + Math.ceil(1E3 * c.random);
      var g = m, a = g.split("|");
      if (1 < a.length) {
        if (null == e && (e = "", g = document.createElement("audio"), !(null === g || void 0 === g)))if (e += ".wav", void 0 !== g.canPlayType) {
          var h = g.canPlayType("audio/ogg");
          h.match(/maybe|probably/i) && (e += ".ogg", e += ".oga");
          !1 ==
          (c.device.android && c.device.firefox) && (h = g.canPlayType("audio/mpeg"), h.match(/maybe|probably/i) && (e += ".mp3", e += ".mp2", e += ".mpa"));
          h = g.canPlayType("audio/mp4");
          h.match(/maybe|probably/i) && (e += ".mp4");
          h = g.canPlayType("audio/wav");
          h.match(/maybe|probably/i) && (e += ".wav")
        } else e += ".mp3";
        var h = a.length, l, g = null;
        for (l = 0; l < h; l++) {
          var n = String(a[l]).toLowerCase(), n = n.slice(n.lastIndexOf("."));
          if (0 < e.indexOf(n)) {
            g = a[l];
            break
          }
        }
        null == g && (g = a)
      }
      a = w.rootpath;
      null != a && 0 < a.length && "null" != String(a).toLowerCase() ?
      "/" != a.charAt(a.length - 1) && (a += "/") : a = "";
      var m = a = unescape(c.parsePath(a + g)), d = null;
      if (p && x && void 0 !== f[b]) {
        d = f[b];
        try {
          d.currentTime = 0, d.pause()
        } catch (q) {
        }
        f[b] = null;
        delete f[b];
        d = null
      }
      if (null != d || void 0 !== f[b]) {
        null == d ? d = f[b] : f[b] = d;
        try {
          d.currentTime = 0, d.pause()
        } catch (u) {
        }
      } else {
        d = document.createElement("audio");
        if (!d) {
          c.trace(2, y);
          return
        }
        d.addEventListener("error", function () {
          c.trace(3, "soundinterface - loading of " + m + " failed!");
          f[b] = null;
          delete f[b];
          d = null
        }, !0);
        d.addEventListener("ended", function () {
          try {
            0 <
            d.loopcount ? (d.loopcount--, 0 == d.loopcount ? k && c.call(k) : (d.currentTime = 0, d.play())) : (d.currentTime = 0, d.play())
          } catch (a) {
          }
        }, !0);
        f[b] = d
      }
      try {
        if (d.loopcount = B, d.src = m, d && (d.volume = r, d.play()), p && d && d.paused) {
          var s = document.body, t = function () {
            try {
              s.removeEventListener("touchstart", t, !0), j && j.paused && !j.ended && j.play()
            } catch (a) {
              j = null
            }
          };
          s.removeEventListener("touchstart", t, !0);
          j = d;
          s.addEventListener("touchstart", t, !0)
        }
      } catch (v) {
        c.trace(2, y)
      }
    }
  }

  function C(a) {
    if (a = f[String(a).toLowerCase()])try {
      a.pause()
    } catch (b) {
    }
  }

  function D(a) {
    if (a = f[String(a).toLowerCase()])try {
      a.paused && a.play()
    } catch (b) {
    }
  }

  function E(a) {
    if (a = f[String(a).toLowerCase()])try {
      a.paused ? a.play() : a.pause()
    } catch (b) {
    }
  }

  function F(a) {
    if (a = f[String(a).toLowerCase()]) {
      a == j && (j = null);
      try {
        a.currentTime = 0, a.pause()
      } catch (b) {
      }
    }
  }

  function G() {
    var a, b;
    for (a in f)if ((b = f[a]) && void 0 !== b.paused) {
      try {
        b.pause()
      } catch (c) {
      }
      f[a] = null
    }
    f = [];
    j = null
  }

  function u(a) {
    var b, c;
    for (b in f) {
      c = f[b];
      try {
        c && void 0 !== c.paused && (!1 == a ? !1 == c.paused && (c.pause(), c.needresume = !0) : c.needresume &&
        c.play())
      } catch (e) {
      }
    }
  }

  function v() {
    r = k ? 0 : q;
    var a, b;
    for (a in f)if (b = f[a])try {
      b.volume = r, p && (k ? !1 == b.paused && (b._krp_muted = !0, b.pause()) : !0 == b._krp_muted && (b._krp_muted = !1, b.play()))
    } catch (c) {
    }
  }

  var w = null, c = null, f = [], j = null, p = !1, x = !1, y = "Soundinterface Plugin - HTML5 audio is not supported by this browser!", q = 1, k = !1, r = 1;
  this.registerplugin = function (a, b, e) {
    c = a;
    w = e;
    "1.16" > c.version ? c.trace(3, "Soundinterface Plugin - too old krpano version, min. version is 1.16!") : (e.keep = !0, e.registerattribute("rootpath",
      ""), e.registerattribute("volume", 1, function (a) {
      q = a;
      v()
    }, function () {
      return q
    }), e.registerattribute("mute", !1, function (a) {
      k = 0 <= "yesontrue1".indexOf(String(a).toLowerCase());
      v()
    }, function () {
      return k
    }), c.soundinterface = e, c.preloadsound = z, c.playsound = A, c.pausesound = C, c.resumesound = D, c.pausesoundtoggle = E, c.stopsound = F, c.stopallsounds = G, a = navigator.userAgent, b = a.indexOf("OS "), 0 < b && (b += 3, "4.2" > a.slice(b, a.indexOf(" ", b)).split("_").join(".") && (x = !0)), p = c.device.ios || c.device.android, window && (window.addEventListener("pagehide",
      function () {
        u(!1)
      }, !0), window.addEventListener("pageshow", function () {
      u(!0)
    }, !0)))
  };
  var e = null
};

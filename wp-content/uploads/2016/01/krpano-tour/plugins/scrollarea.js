/* krpano 1.17.6 scrollarea plugin (build 2014-10-17) */
var krpanoplugin = function () {
  function I(b) {
    return "boolean" == typeof b ? b : 0 <= "yesontrue1".indexOf(String(b).toLowerCase())
  }

  function U(b) {
    if (b && h && V) {
      var g = h.timertick, a = 0;
      0 == J && (J = g);
      var e = g - J | 0;
      J = g;
      "wheel" == b.type ? a = b.deltaY : "mousewheel" == b.type ? a = -b.wheelDelta : "DOMMouseScroll" == b.type && (a = b.detail);
      a = -a;
      500 < e ? K = 1 == b.deltaMode || 0 == a % 20 ? 0 : 1 : 66 > e && (0 == K && 0 != a % 40 && 6 < Math.abs(a)) && (K = 1);
      b.preventDefault();
      b.stopPropagation();
      0 != a && (0 == K ? a = 0 > a ? -5 : 5 : (a /= 20, -10 > a ? a = -10 : 10 < a && (a = 10)), 1 == j ? L(a * u, 0) : 2 == j ? L(0,
        a * s) : 3 == j && L(0, a * s))
    }
  }

  function r(b, g, a, e, d) {
    var c = null;
    d = (!0 === d ? "remove" : "add") + "EventListener";
    var f = M.browser.events;
    if (f.touch && ("down" == g ? c = f.touchstart : "move" == g ? c = f.touchmove : "up" == g && (c = f.touchend), M.ie && !1 == f.mouse && ("over" == g ? c = f.pointerover ? f.pointerover : "MSPointerOver" : "out" == g && (c = f.pointerout ? f.pointerout : "MSPointerOut")), c))b[d](c, a, e);
    if (f.mouse && ("down" == g ? c = "mousedown" : "move" == g ? c = "mousemove" : "up" == g ? c = "mouseup" : "over" == g ? c = "mouseover" : "out" == g && (c = "mouseout"), c))b[d](c, a, e)
  }

  function W() {
    if (a) {
      var b =
        a.sprite.parentNode;
      if (b && (b = b.kobject))b.maskchildren = !0, b.poschanged && b.updatepluginpos(), X = b, m = b.pixelwidth, n = b.pixelheight, isNaN(m) && (m = 0), isNaN(n) && (n = 0), C = 0 < m || 0 < n
    }
  }

  function N() {
    d = Number(a.x);
    c = Number(a.y);
    isNaN(Y) && (d = 0);
    isNaN(Z) && (c = 0)
  }

  function D(b) {
    b = void 0 === b ? !1 : b;
    1 == (j & 1) ? a.x != d && (a.x = d, b = !0) : d = 0;
    2 == (j & 2) ? a.y != c && (a.y = c, b = !0) : c = 0;
    if (b && a && a.onscroll) {
      if (C) {
        b = m - v;
        var g = n - w, f = d, e = c;
        isNaN(f) && (f = 0);
        isNaN(e) && (e = 0);
        f += b * p;
        e += g * q;
        a.woverflow = -b;
        a.hoverflow = -g;
        a.loverflow = Math.round((-f + A * b) *
          u);
        a.roverflow = Math.round((+f - (1 - A) * b) * u);
        a.toverflow = Math.round((-e + B * g) * s);
        a.boverflow = Math.round((+e - (1 - B) * g) * s)
      }
      h.call(a.onscroll, a)
    }
  }

  function ba(b) {
    for (; 0 < t.length && !(100 >= b - t[0].time);)t.shift()
  }

  function O() {
    W();
    var b = String(a.align).toLowerCase();
    if ("" == b || "null" == b)b = "lefttop";
    s = u = 1;
    q = p = 0.5;
    B = A = 0;
    0 <= b.indexOf("left") && (p = A = 0, u = 1);
    0 <= b.indexOf("top") && (q = B = 0, s = 1);
    0 <= b.indexOf("right") && (A = 1, p = 0, u = -1);
    0 <= b.indexOf("bottom") && (B = 1, q = 0, s = -1)
  }

  function ca(b) {
    O();
    t = [];
    if (!1 == $)x = !1; else {
      r(window,
        "up", da, !0);
      r(window, "move", ea, !0);
      var g = h.stagescale, a = b.changedTouches && 0 < b.changedTouches.length ? b.changedTouches[0] : b;
      b = a.pageX / g;
      g = a.pageY / g;
      x = !1;
      P = b;
      Q = g;
      return !1
    }
  }

  function fa(b) {
    if ((void 0 === b.pointerType || 4 == b.pointerType || "mouse" == b.pointerType) && aa)if (O(), !1 != C && (b = n - w, 0 > m - v || 0 > b))E = !0, r(a.sprite, "move", ga, !0), r(a.sprite, "out", ha, !0)
  }

  function ga() {
    if (E && !1 == x && X) {
      var b = X.getmouse();
      R(b.x / m * a.pixelwidth, b.y / n * a.pixelheight, !0)
    }
  }

  function ha() {
    r(a.sprite, "move", ga, !0, !0);
    r(a.sprite, "out", ha,
      !0, !0);
    E = !1
  }

  function ea(b) {
    var g = h.stagescale, a = b.changedTouches && 0 < b.changedTouches.length ? b.changedTouches[0] : b, e = a.pageX / g, g = a.pageY / g;
    if (!1 == x && (j & 1 && 5 < Math.abs(e - P) || j & 2 && 5 < Math.abs(g - Q)))z && (f = k = 0, z = !1), null != l && (clearInterval(l), l = null), x = !0, E = !1, P = e, Q = g, N(), Y = d, Z = c;
    x && (b = b.timeStamp, ba(b), t.push({
      time: b,
      x: e,
      y: g
    }), d = Y + (e - P) * u, c = Z + (g - Q) * s, e = -(v - m), b = -(w - n), d += e * p, c += b * q, g = 1 / (1 + y * y), d = 0 < e ? d - (d - e * p) * g : d - (0 < d ? d : d < e ? d - e : 0) * g, c = 0 < b ? c - (c - b * q) * g : c - (0 < c ? c : c < b ? c - b : 0) * g, d -= e * p, c -= b * q, D());
    return !1
  }

  function da(b) {
    r(window,
      "up", da, !0, !0);
    r(window, "move", ea, !0, !0);
    if (x) {
      ba(b.timeStamp);
      if (1 < t.length) {
        b = t[0];
        var a = t[t.length - 1], c = a.y - b.y, e = (a.time - b.time) * S;
        k = (a.x - b.x) / e * u;
        f = c / e * s
      } else f = k = 0;
      l = setInterval(T, 1E3 / 60);
      x = !1
    }
  }

  function ka() {
    setTimeout(function () {
      W();
      D(!0);
      null == l && (l = setInterval(T, 1E3 / 60))
    }, 100)
  }

  function T() {
    d += k;
    c += f;
    k *= F;
    f *= F;
    var b = 0, a = 0, h = -(v - m), e = -(w - n);
    d += h * p;
    c += e * q;
    0 < h ? b = d - h * p : z ? b = d - ia : d < h ? b = d - h : 0 < d && (b = d);
    0.1 > b * b && (b = 0);
    0 < e ? a = c - e * q : z ? a = c - ja : c < e ? a = c - e : 0 < c && (a = c);
    0.1 > a * a && (a = 0);
    d -= h * p;
    c -= e * q;
    0 == (j & 1) &&
    (k = b = 0);
    0 == (j & 2) && (f = a = 0);
    0 != b && (b *= -1, d += b * (1 - y), k = 0 >= b * k ? k + b * G : b * H, k *= y);
    0 != a && (a *= -1, c += a * (1 - y), f = 0 >= a * f ? f + a * G : a * H, f *= y);
    0 == b && (0 == a && 0.05 > Math.sqrt(k * k + f * f)) && (z = !1, f = k = 0, clearInterval(l), l = null);
    D()
  }

  function R(b, a, f) {
    O();
    N();
    if (!1 == C)setTimeout(function () {
      R(b, a, f)
    }, 10); else {
      b = Number(b);
      isNaN(b) && (b = 0);
      a = Number(a);
      isNaN(a) && (a = 0);
      var e = m - v, h = n - w;
      b = A * v + b * u;
      a = B * w + a * s;
      b *= -1;
      a *= -1;
      b += m / 2;
      0 < b && (b = 0);
      b < e && (b = e);
      a += n / 2;
      0 < a && (a = 0);
      a < h && (a = h);
      !0 === f ? (z = !0, ia = b, ja = a, null == l && (l = setInterval(T, 1E3 / 60))) :
        (e = -(v - m), h = -(w - n), b = 0 > e ? b - e * p : 0, a = 0 > h ? a - h * q : 0, d = b, c = a, D())
    }
  }

  function la(b, a) {
    R(b, a, !0)
  }

  function ma() {
    null != l && (clearInterval(l), l = null);
    E = x = !1;
    t = [];
    f = k = 0;
    z = !1;
    N()
  }

  function L(b, a) {
    z = !1;
    b = Number(b);
    isNaN(b) && (b = 0);
    a = Number(a);
    isNaN(a) && (a = 0);
    O();
    N();
    if (!1 != C) {
      var h = m - v, e = n - w, j = !1;
      0 > h && (d += h * p, 0 < b && 0 > d ? (j = !0, k += b) : 0 > b && d > h && (j = !0, k += b), d -= h * p);
      0 > e && (c += e * q, 0 < a && 0 > c ? (j = !0, f += a) : 0 > a && c > e && (j = !0, f += a), c -= e * q);
      j && null == l && (l = setInterval(T, 1E3 / 60))
    }
  }

  var h = null, a = null, M = null, j = 3, v = 0, w = 0, C = !1, X = null, m = 0, n =
    0, z = !1, ia = 0, ja = 0, u = 1, s = 1, p = 0, q = 0, A = 0, B = 0, y = 1, F = 0.95, G = 0.08, H = 0.15, S = 1 / 15, $ = !0, V = !0, x = !1, P = 0, Q = 0, d = 0, c = 0, Y = 0, Z = 0, l = null, t = [], k = 0, f = 0, E = !1, aa = !1;
  this.registerplugin = function (b, c, d) {
    h = b;
    a = d;
    "1.16" > h.version ? (h.trace(3, "Scrollarea Plugin - too old krpano version (min. version 1.16)"), a = h = null) : (M = h.device, a.registerattribute("direction", "all", function (a) {
      a = String(a).toLowerCase();
      j = 0;
      j |= 1 * (0 <= a.indexOf("h"));
      j |= 2 * (0 <= a.indexOf("v"));
      j |= 3 * (0 <= a.indexOf("all"))
    }, function () {
      return 3 == (j & 3) ? "all" : 1 == (j & 1) ?
        "h" : "v"
    }), a.registerattribute("overscroll", y, function (a) {
      y = 0 > a ? 0 : 1 < a ? 1 : a
    }, function () {
      return y
    }), a.registerattribute("friction", F, function (a) {
      F = Number(a)
    }, function () {
      return F
    }), a.registerattribute("acceleration", G, function (a) {
      G = Number(a)
    }, function () {
      return G
    }), a.registerattribute("returnacceleration", H, function (a) {
      H = Number(a)
    }, function () {
      return H
    }), a.registerattribute("momentum", S, function (a) {
      S = Number(a)
    }, function () {
      return S
    }), a.registerattribute("onscroll", null), a.registerattribute("woverflow", 0),
      a.registerattribute("hoverflow", 0), a.registerattribute("loverflow", 0), a.registerattribute("roverflow", 0), a.registerattribute("toverflow", 0), a.registerattribute("boverflow", 0), a.registerattribute("draggable", !0, function (a) {
      $ = I(a)
    }, function () {
      return $
    }), a.registerattribute("mwheel", !0, function (a) {
      V = I(a)
    }, function () {
      return V
    }), a.registerattribute("onhover_autoscrolling", !1, function (a) {
      aa = I(a)
    }, function () {
      return aa
    }), a.registerattribute("csshardwareacceleration", "auto"), a.setcenter = R, a.scrolltocenter =
      la, a.stopscrolling = ma, a.scrollby = L, !0 == I(a.csshardwareacceleration) && (a.sprite.style[M.browser.css.transform + "Style"] = "preserve-3d"), a.sprite.addEventListener("DOMMouseScroll", U, !0), a.sprite.addEventListener("mousewheel", U, !0), a.sprite.addEventListener("wheel", U, !0), r(a.sprite, "down", ca, !0), r(a.sprite, "over", fa, !0), h.set("events[" + a.name + "_scrollarea].keep", !0), h.set("events[" + a.name + "_scrollarea].onresize", ka))
  };
  var J = 0, K = 0;
  this.onresize = function (a, c) {
    if (!h)return !1;
    v = a;
    w = c;
    W();
    D(!0);
    return !1
  };
  this.unloadplugin =
    function () {
      h && a && (h.set("events[" + a.name + "_scrollarea].name", null), null != l && (clearInterval(l), l = null), r(a.sprite, "down", ca, !0, !0), r(a.sprite, "over", fa, !0, !0));
      h = a = null
    }
};

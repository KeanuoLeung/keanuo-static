const t = navigator.userAgent,
  e = /(iPhone|iPad|iPod|iOS)/i.test(t),
  n = /Windows\sPhone/i.test(t),
  i = /(Android)/i.test(t),
  o = /MicroMessenger\/([\d\.]+)/i.test(t),
  r = /mac\sos/i.test(t) && !e,
  c = /windows\snt/i.test(t) && !n,
  s = /MPAPP\/([\d\.]+)/i.test(t),
  a = /iPad/i.test(t),
  d = /WindowsWechat/i.test(t),
  u = /MacWechat/i.test(t) || /wechat.*mac os/i.test(t),
  l = o && window.WeixinPrefecherJSBridge,
  f =
    (i && /miniprogram/.test(t.toLowerCase())) ||
    "miniprogram" == window.__wxjs_environment,
  h = /wxwork/i.test(t);
function p() {
  const e = t.match(/MicroMessenger\/([\d\.]+)/i);
  return !(!e || !e[1]) && e[1];
}
function w() {
  const e = t.match(/MacWechat\/([\d\.]+)/i);
  return !(!e || !e[1]) && e[1];
}
function g() {
  const e = t.match(/wxwork\/([\d\.]+)/i);
  return !(!e || !e[1]) && e[1];
}
function m(t) {
  return Number(Number("0x" + t).toString(10));
}
function v() {
  const e = t.match(/MicroMessenger\/[\d\.]+\(0x(.+?)\)/i);
  if (e && e[1] && null != e[1]) return e[1];
  if (!e && /MicroMessenger\/[\d\.]+/i.test(t)) {
    const t = (function () {
      const t = location.search.substring(1).split("&"),
        e = {};
      for (const n of t) {
        const t = n.split("="),
          i = decodeURIComponent(t[0]);
        void 0 === e[i] && (e[i] = decodeURIComponent(t[1]));
      }
      return e;
    })();
    if (t.version) return t.version;
  }
  return !1;
}
const y = {
  "cp-1": (t, e) => t < e,
  cp0: (t, e) => t === e,
  cp1: (t, e) => t > e,
};
function W(t, e, n, i) {
  let o = !1;
  switch (i) {
    case "mac":
      o = w();
      break;
    case "windows":
      o = (function () {
        const t = navigator.userAgent.match(/WindowsWechat\(0x(\w+?)\)/);
        if (t && 2 === t.length) {
          const e = t[1];
          return [m(e.slice(1, 2)), m(e.slice(2, 4)), m(e.slice(4, 6))].join(
            "."
          );
        }
        return !1;
      })();
      break;
    case "wxwork":
      o = g();
      break;
    default:
      o = p();
  }
  if (!o) return;
  const r = o.split("."),
    c = t.split(".");
  /\d+/g.test(r[r.length - 1]) || r.pop();
  for (let s = 0, a = Math.max(r.length, c.length); s < a; ++s) {
    const t = r[s] || "",
      n = c[s] || "",
      i = parseInt(t, 10) || 0,
      o = parseInt(n, 10) || 0;
    if (y.cp0(i, o)) continue;
    return (0, y[`cp${e}`])(i, o);
  }
  return n || 0 === e;
}
let x = !1;
const _ = v();
if (i && _) {
  const t = "0x" + _.substr(-2);
  parseInt(t) >= 64 && parseInt(t) <= 79 && (x = !0);
}
const M = {
  get: p,
  getMac: w,
  getMacOS: function () {
    const e = t.match(/Mac OS X ([\d_]+)/i);
    return !(!e || !e[1]) && e[1].replace(/_/g, ".");
  },
  getWindows: function () {
    const e = t.match(/WindowsWechat\(0x(.+?)\)/i);
    return !(!e || !e[1]) && e[1];
  },
  getInner: v,
  getWxWork: g,
  cpVersion: W,
  eqVersion: function (t) {
    return W(t, 0);
  },
  gtVersion: function (t, e) {
    return W(t, 1, e);
  },
  ltVersion: function (t, e) {
    return W(t, -1, e);
  },
  getPlatform: function () {
    return e ? "ios" : i ? "android" : r ? "mac_os" : c ? "windows" : "unknown";
  },
  isWp: n,
  isIOS: e,
  isAndroid: i,
  isInMiniProgram: f,
  isWechat: o,
  isMac: r,
  isWindows: c,
  isMacWechat: u,
  isWindowsWechat: d,
  isWxWork: h,
  isOnlyWechat: o && !h,
  isMpapp: s,
  isIPad: a,
  isGooglePlay: x,
  isPrefetch: l,
};
let b = {},
  S = !1;
const T = window.__moon_report || (() => {}),
  E = 8;
try {
  b = top.window.document;
} catch (C) {
  S = !0;
}
const P = {};
function k(t) {
  const e = () => {
    try {
      t &&
        ((window.onBridgeReadyTime = window.onBridgeReadyTime || Date.now()),
        t());
    } catch (C) {
      throw (T([{ offset: E, log: "ready", e: C }]), C);
    }
    window.jsapiReadyTime = Date.now();
  };
  S ||
  (void 0 !== top.window.WeixinJSBridge && top.window.WeixinJSBridge.invoke)
    ? e()
    : b.addEventListener
    ? b.addEventListener("WeixinJSBridgeReady", e, !1)
    : b.attachEvent &&
      (b.attachEvent("WeixinJSBridgeReady", e),
      b.attachEvent("onWeixinJSBridgeReady", e));
}
const D = {
    ready: k,
    invoke: function (t, e, n) {
      k(
        () =>
          !S &&
          ("object" != typeof top.window.WeixinJSBridge
            ? (alert("请在微信中打开此链接"), !1)
            : void top.window.WeixinJSBridge.invoke(t, e, (...e) => {
                try {
                  const i = e[0],
                    o = i && i.err_msg ? ", err_msg-> " + i.err_msg : "";
                  console.info("[jsapi] invoke->" + t + o),
                    n && n.apply(window, e);
                } catch (C) {
                  throw (
                    (T([{ offset: E, log: "invoke;methodName:" + t, e: C }]), C)
                  );
                }
              }))
      );
    },
    call: function (t) {
      k(() => {
        if (S) return !1;
        if ("object" != typeof top.window.WeixinJSBridge) return !1;
        try {
          top.window.WeixinJSBridge.call(t);
        } catch (C) {
          throw (T([{ offset: E, log: "call;methodName:" + t, e: C }]), C);
        }
      });
    },
    on: function (t, e) {
      k(
        () =>
          !S &&
          !(
            "object" != typeof top.window.WeixinJSBridge ||
            !top.window.WeixinJSBridge.on
          ) &&
          (P[t] || (P[t] = []),
          P[t].push(e),
          !(P[t].length > 1) &&
            void top.window.WeixinJSBridge.on(t, (...e) => {
              try {
                const n = e[0],
                  i = n && n.err_msg ? ", err_msg-> " + n.err_msg : "";
                if (
                  (console.info("[jsapi] event->" + t + i), P[t] && P[t].length)
                ) {
                  let n;
                  for (let i = 0; i < P[t].length; i++)
                    n = P[t][i].apply(window, e);
                  return n;
                }
              } catch (C) {
                throw (T([{ offset: E, log: "on;eventName:" + t, e: C }]), C);
              }
            }))
      );
    },
    remove: function (t, e) {
      k(() => {
        if (!P[t]) return !1;
        let n = !1;
        for (let i = P[t].length - 1; i >= 0; i--)
          P[t][i] === e && (P[t].splice(i, 1), (n = !0));
        return n;
      });
    },
  },
  B = navigator.userAgent,
  J = {
    x: 0,
    y: 0,
    isPc: /(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
    isWp: /Windows\sPhone/i.test(B),
    tsTime: -1,
  },
  N = ["webkit", "moz", "ms", "o"];
let I;
function L() {
  return !J.isPc && !J.isWp;
}
function O(t, e, n, i) {
  L()
    ? ((e.tap_handler = function (t) {
        if (
          -1 == J.tsTime ||
          +new Date() - J.tsTime > 200 ||
          (I && new Date().getTime() - I < 200)
        )
          return;
        const n = t.changedTouches[0];
        return Math.abs(J.y - n.clientY) <= 5 && Math.abs(J.x - n.clientX) <= 5
          ? e.call(this, t)
          : void 0;
      }),
      R(t, "touchend", i, e.tap_handler, n))
    : R(t, "click", i, e, n);
}
function j(t, e, n, i, o) {
  const r = this;
  let c;
  if (J.isPc || J.isWp) {
    let n,
      s,
      a,
      d = !1;
    R(t, "mousedown", i, function (t) {
      (a = !1),
        (d = !0),
        (n = t.clientX),
        (s = t.clientY),
        (c = setTimeout(function () {
          (a = !0), (c = void 0), e.call(this, t);
        }, 500)),
        t.preventDefault();
    }),
      R(t, "mousemove", i, function (t) {
        d &&
          c &&
          (Math.abs(s - t.clientY) > 5 || Math.abs(n - t.clientX) > 5) &&
          (clearTimeout(c),
          (c = void 0),
          "function" == typeof o && o.call(r, t));
      }),
      R(t, "mouseup", i, function () {
        (d = !1), clearTimeout(c);
      }),
      R(t, "click", i, function () {
        if (a) return !1;
      });
  } else
    R(t, "touchstart", i, function (t) {
      1 === t.touches.length &&
        (c = setTimeout(function () {
          (c = void 0), e.call(r, t);
        }, 500));
    }),
      R(t, "touchmove", i, function (t) {
        if (!c) return;
        const e = t.changedTouches[0];
        (Math.abs(J.y - e.clientY) > 5 || Math.abs(J.x - e.clientX) > 5) &&
          (clearTimeout(c),
          (c = void 0),
          "function" == typeof o && o.call(r, t));
      }),
      R(
        t,
        "touchend",
        i,
        function (t) {
          c ? (clearTimeout(c), (c = void 0)) : t.preventDefault();
        },
        !0
      );
}
function A(t, e) {
  if (!t || !e || t.nodeType != t.ELEMENT_NODE) return !1;
  const n = t.webkitMatchesSelector || t.msMatchesSelector || t.matchesSelector;
  return n ? n.call(t, e) : ((e = e.substr(1)), t.className.indexOf(e) > -1);
}
function R(t, e, n, i, o, r) {
  let c, s, a;
  if (("input" == e && J.isPc && (e = "keyup"), t)) {
    if (
      ("function" == typeof n && ((r = o), (o = i), (i = n), (n = "")),
      "string" != typeof n && (n = ""),
      t == window && "load" == e && /complete|loaded/.test(document.readyState))
    )
      return i({ type: "load" });
    if ("tap" == e) return O(t, i, o, n);
    if ("longtap" === e) return j(t, i, 0, n, r);
    "unload" == e && "onpagehide" in window && (e = "pagehide"),
      (c = function (t) {
        const e = i(t);
        return (
          !1 === e &&
            (t.stopPropagation && t.stopPropagation(),
            t.preventDefault && t.preventDefault()),
          e
        );
      }),
      n &&
        "." == n.charAt(0) &&
        (a = function (e) {
          const i = (function (t, e, n) {
            for (; t && !A(t, e); )
              t = t !== n && t.nodeType !== t.DOCUMENT_NODE && t.parentNode;
            return t;
          })(e.target || e.srcElement, n, t);
          if (i) return (e.delegatedTarget = i), c(e);
        }),
      (s = a || c),
      (i[e + "_handler"] = s),
      t.addEventListener
        ? t.addEventListener(e, s, !!o)
        : t.attachEvent && t.attachEvent("on" + e, s, !!o);
  }
}
function V(t, e, n, i) {
  if (!t) return;
  let o,
    r = e;
  "tap" == r &&
    (L()
      ? ((r = "touchend"),
        (o =
          n.tap_handler && n.tap_handler.touchend_handler
            ? n.tap_handler.touchend_handler
            : n))
      : (r = "click")),
    o || (o = n[r + "_handler"] || n),
    t.removeEventListener
      ? t.removeEventListener(r, o, !!i)
      : t.detachEvent
      ? t.detachEvent("on" + r, o, !!i)
      : "tap" == r && L()
      ? (n.tap_handler && (n.tap_handler.touchend_handler = null),
        (n.tap_handler = null))
      : (n[r + "_handler"] = null);
}
L() &&
  R(document, "touchstart", function (t) {
    if (1 === t.touches.length) {
      const e = t.touches[0];
      (J.x = e.clientX), (J.y = e.clientY), (J.tsTime = +new Date());
    } else J.tsTime = -1;
  }),
  window.addEventListener(
    "scroll",
    function () {
      I = new Date().getTime();
    },
    !0
  );
const X = {
  on: R,
  off: V,
  tap: O,
  longtap: j,
  bindVisibilityChangeEvt: function (t) {
    const e = (function () {
      if ("hidden" in document) return "hidden";
      for (let t = 0; t < N.length; t++)
        if (N[t] + "Hidden" in document) return N[t] + "Hidden";
      return null;
    })();
    if (e) {
      const n = e.replace(/[H|h]idden/, "") + "visibilitychange";
      document.addEventListener(
        n,
        function () {
          const e =
            "hidden" !==
            document[
              (function () {
                if ("visibilityState" in document) return "visibilityState";
                for (let t = 0; t < N.length; t++)
                  if (N[t] + "VisibilityState" in document)
                    return N[t] + "VisibilityState";
                return null;
              })()
            ];
          "function" == typeof t && t(e);
        },
        !1
      );
    }
  },
  doubletap: function (t, e) {
    let n = 0;
    const i = (t) => {
      Date.now() - n < 300 && e.call(this, t), (n = Date.now());
    };
    return O(t, i), () => V(t, "touchend", i);
  },
};
export { X as D, D as J, M as m };

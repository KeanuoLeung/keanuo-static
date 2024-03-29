function getLastFridayOfMonth(year, month) {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const daysInWeek = 7;
  const dayOfWeekFriday = 5;
  const daysToSubtract = (new Date(year, month, lastDayOfMonth).getDay() + daysInWeek - dayOfWeekFriday) % daysInWeek;
  return lastDayOfMonth - daysToSubtract;
}

function dayToPayDay() {
  return getLastFridayOfMonth(new Date().getFullYear(), new Date().getMonth()) - new Date().getDate();
}

var e = Object.defineProperty,
  t = Object.getOwnPropertySymbols,
  a = Object.prototype.hasOwnProperty,
  r = Object.prototype.propertyIsEnumerable,
  n = (t, a, r) =>
    a in t
      ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[a] = r),
  l = (e, l) => {
    for (var o in l || (l = {})) a.call(l, o) && n(e, o, l[o]);
    if (t) for (var o of t(l)) r.call(l, o) && n(e, o, l[o]);
    return e;
  };
import { r as o, R as i, a as c } from './vendor.26d9d3d0.js';
const s = { base: 10, startTime: 9, endTime: 6, workDays: 5 },
  m = () => {
    const [e, t] = o.exports.useState(1),
      a = l(
        l(
          {},
          (() => {
            const e = localStorage.getItem('now-you-get-paid');
            try {
              return l(l({}, s), JSON.parse(e || '{}'));
            } catch (t) {
              return console.error(t), s;
            }
          })()
        ),
        Object.fromEntries(
          location.search
            .slice(1)
            .split('&')
            .filter(Boolean)
            .map((e) => {
              const [t, a] = e.split('=');
              return [t, Number(a)];
            })
        )
      );
    var r;
    (r = a), localStorage.setItem('now-you-get-paid', JSON.stringify(r));
    const { base: n, startTime: i, endTime: c, workDays: m } = a,
      p = Math.ceil(((12 * n) / (365 - (365 / 7) * (7 - m))) * 1e3),
      d = i % 13,
      u = c > 12 ? c % 25 : (c + 12) % 25;
    return (
      o.exports.useEffect(() => {
        const e = window.setInterval(() => {
          const e = new Date(),
            a = e.getFullYear(),
            r = e.getMonth(),
            n = e.getDate(),
            l = e.getTime(),
            o = new Date(a, r, n, d, 0, 0).getTime(),
            i = new Date(a, r, n, u, 0, 0).getTime();
          console.info('end, start', u, d);
          t(l < o ? 0 : l > i ? 1 : (l - o) / (3600 * (u - d) * 1e3));
        }, 300);
        return () => {
          clearInterval(e);
        };
      }, []),
      { percent: e, oneDayPaid: p }
    );
  },
  p =
    location.href.split('?')[0] +
    '?' +
    Object.entries(s)
      .map((e) => e.join('='))
      .join('&');
function d() {
  const { percent: e, oneDayPaid: t } = m(),
    [a, r = '0'] = (Math.ceil(t * e * 1e3) / 1e3).toString().split('.'),
    n = [a, r.padEnd(3, '0')].join('.');
  return i.createElement(
    'div',
    { className: 'paid-wrapper' },
    i.createElement('p', { className: 'paid-title' }, 'NOW U GET PAID'),
    i.createElement(
      'div',
      { className: 'paid-bar' },
      i.createElement(
        'div',
        { className: 'paid-bar-inner', style: { width: 95 * e + 5 + '%' } },
        i.createElement(
          'div',
          { className: 'paid-toast' },
          i.createElement('p', null, '今天已经赚了 ', n, ` 元`),
          i.createElement(
            'p',
            null,
            ' ',
            1 === e ? '🎮 下班啦' : `🧱 目标 ${t} 元，还有 ${dayToPayDay()}天 发工资`,
            ' '
          )
        )
      )
    )
  );
}
c.render(
  i.createElement(i.StrictMode, null, i.createElement(d, null)),
  document.getElementById('root')
);

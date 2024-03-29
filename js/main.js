// minesweeper js

! function() {
    const t = document,
        e = t.documentElement,
        i = t.body,
        n = window.sr = ScrollReveal({
            mobile: !1
        });
    e.classList.remove("no-js"), e.classList.add("js"), window.addEventListener("load", function() {
        i.classList.add("is-loaded")
    }), i.classList.contains("has-animations") && window.addEventListener("load", function() {
        n.reveal(".device", {
            duration: 600,
            distance: "100px",
            easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            origin: "bottom",
            viewFactor: .6
        })
    })
}();

MicroModal.init({
  onShow: modal => console.info(`${modal.id} is shown`), // [1]
  onClose: modal => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  disableScroll: true, // [5]
  disableFocus: false, // [6]
  awaitOpenAnimation: false, // [7]
  awaitCloseAnimation: false, // [8]
  debugMode: true // [9]
});


(function(h) {
    var t = function(g, p, i) {
        var d = {
            isMine: !1,
            isRevealed: !1,
            isEmpty: !1,
            isFlagged: !1
        };
        d.x = p;
        d.y = i;
        d.mineCount = 0;
        d.setFlagged = function(b) {
            g.toggleClass("flag", b);
            d.isFlagged = b
        };
        d.setRevealed = function(b) {
            g.toggleClass("hidden", !b);
            d.isRevealed = b
        };
        d.setEmpty = function(b) {
            d.isEmpty = b
        };
        d.setMine = function(b) {
            d.isMine = b;
            g.toggleClass("mine", b)
        };
        d.setMineCount = function(b) {
            d.mineCount = b;
            d.setText(b)
        };
        d.setText = function(b) {
            h("<span />").text(b).appendTo(g)
        };
        return d
    };
    h.fn.minesweeper = function() {
        var g = this,
            p = function() {
                window.clearInterval(l);
                l = window.setInterval(function() {
                    k += 0.1;
                    m.text(k.toFixed(1))
                }, 100);
                m.text(k)
            },
            i = {},
            d = !1,
            b, k = 0,
            l, m, u = {
                easy: {
                    d: 8,
                    m: 6
                }
            };
        i.start = function() {
            var q = u[h(".level").val()];
            g.width(42 * q.d + 2);
            var r = g.find(".board").empty(),
                e = q.d,
                s = q.m,
                n = function(a, b) {
                    var c = [],
                        b = b || function() {
                            return !0
                        };
                    0 < a.x && c.push(f[a.x - 1][a.y]);
                    a.x < e - 1 && c.push(f[a.x + 1][a.y]);
                    0 < a.y && c.push(f[a.x][a.y - 1]);
                    a.y < e - 1 && c.push(f[a.x][a.y + 1]);
                    0 < a.x &&
                        0 < a.y && c.push(f[a.x - 1][a.y - 1]);
                    a.x < e - 1 && 0 < a.y && c.push(f[a.x + 1][a.y - 1]);
                    0 < a.x && a.y < e - 1 && c.push(f[a.x - 1][a.y + 1]);
                    a.x < e - 1 && a.y < e - 1 && c.push(f[a.x + 1][a.y + 1]);
                    return h.grep(c, b)
                },
                v = function(a) {
                    a = a.data("location");
                    return field = f[a.x][a.y]
                },
                j = {},
                f = [];
            j.draw = function() {
                var a, b, c;
                for (a = 0; a < e; a++) {
                    f[a] = [];
                    for (b = 0; b < e; b++) c = h('<div class="field hidden" />').appendTo(r), f[a][b] = t(c, a, b), c.data("location", {
                        x: a,
                        y: b
                    });
                    h('<div class="clear" />').appendTo(r)
                }
                for (a = 0; a < s;) b = Math.floor(1E3 * Math.random() + 1) % e, c = Math.floor(1E3 *
                    Math.random() + 1) % e, f[b][c].isMine || (f[b][c].setMine(!0), a++);
                for (a = 0; a < e; a++)
                    for (b = 0; b < e; b++)
                        if (c = f[a][b], !c.isMine) {
                            var d = n(c, function(a) {
                                return !!a.isMine
                            });
                            0 < d.length ? c.setMineCount(d.length) : c.setEmpty(!0)
                        }
            };
            j.reveal = function(a, b) {
                if (!(a.isFlagged || b && a.isRevealed))
                    if (a.isMine) {
                        for (var c = 0; c < e; c++)
                            for (var d = 0; d < e; d++) f[c][d].setRevealed(!0);
                        h(j).trigger("gameover")
                    } else if (a.isRevealed && !b) {
                    if (c = n(a, function(a) {
                            return a.isFlagged
                        }), a.mineCount === c.length) {
                        d = n(a, function(a) {
                            return !a.isRevealed &&
                                !a.isFlagged
                        });
                        for (c = 0; c < d.length; c++) j.reveal(d[c], !0)
                    }
                } else {
                    a.setRevealed(!0);
                    a.setFlagged(!1);
                    if (a.isEmpty) {
                        d = n(a);
                        for (c = 0; c < d.length; c++)(d[c].isEmpty || !d[c].isMine) && j.reveal(d[c], !0)
                    }
                    for (d = c = 0; d < e; d++)
                        for (var g = 0; g < e; g++) f[d][g].isRevealed || c++;
                    c === s && h(j).trigger("win")
                }
            };
            j.flag = function(a) {
                a.isRevealed || a.setFlagged(!a.isFlagged)
            };
            r.off("mousedown", ".field").on("mousedown", ".field", function(a) {
                h(j).trigger("fieldSelected", [a, v(h(this))])
            });
            b = j;
            b.draw();
            h(b).one("win", function() {
                i.stop();
                window.setTimeout(function() {
                        // window.alert("You Win!")
                        MicroModal.show('modal-1'); // [1]
                    },
                    100)
            }).one("gameover", function() {
                i.stop();
                window.setTimeout(function() {
                    // window.alert("Game Over!")
                    MicroModal.show('modal-2'); // [2]
                }, 100)
            }).one("fieldSelected", p).on("fieldSelected", i.reveal);
            window.clearInterval(l);
            k = 0;
            m.text(k);
            d = !0
        };
        i.stop = function() {
            window.clearInterval(l);
            d = !1
        };
        i.reveal = function(g, h, e) {
            d && (1 === h.which ? b.reveal(e) : b.flag(e))
        };
        m = g.find(".timer");
        g.find("button.newGame").on("click", i.start);
        g.on("contextmenu", function() {
            return !1
        });
        i.start();
        return this
    }
})(jQuery);
if (void 0 === Mzp) var Mzp = {};
!function () {
    "use strict";
    var d, s, u, p = {}, m = !1, g = document.body, f = document.documentElement, v = {};
    p.createModal = function (e, t, o) {
        v = o;
        var n = window.innerWidth < 760;
        m && p.closeModal();
        var a = v && v.title ? v.title : "", r = v && v.className ? v.className : "",
            l = v && v.closeText ? v.closeText : "",
            i = '<div class="mzp-c-modal ' + r + '" role="dialog" aria-labelledby="' + e.getAttribute("id") + '" tabindex="-1">  <div class="mzp-c-modal-window">    <div class="mzp-c-modal-inner">      <header><h2>' + a + '</h2></header>      <div class="mzp-c-modal-close">        <button type="button" class="mzp-c-modal-button-close">' + l + "</button>      </div>    </div>  </div></div>";
        v && !v.allowScroll || n ? f.classList.add("mzp-is-noscroll") : f.classList.remove("mzp-is-noscroll"), g.insertAdjacentHTML("beforeend", i), u = document.querySelector(".mzp-c-modal"), d = (s = t).parentNode, document.querySelector(".mzp-c-modal-inner").appendChild(t), t.classList.add("mzp-c-modal-overlay-contents");
        var c = document.querySelector(".mzp-c-modal-button-close");
        c.addEventListener("click", p.closeModal, !1), c.setAttribute("title", l), document.querySelector(".mzp-c-modal .mzp-c-modal-window").addEventListener("click", function (e) {
            e.target === this && p.closeModal()
        }, !1), u.focus(), document.addEventListener("keyup", h, !1), document.addEventListener("focus", w, !1), e.classList.add("mzp-c-modal-origin"), m = !0, v && "function" == typeof v.onCreate && v.onCreate()
    };
    var h = function (e) {
        27 === e.keyCode && m && p.closeModal()
    }, w = function (e) {
        m && !u.contains(e.target) && (e.stopPropagation(), u.focus())
    };
    p.closeModal = function (e) {
        e && e.preventDefault(), d.appendChild(s), u.parentNode.removeChild(u), f.classList.remove("mzp-is-noscroll");
        var t = document.querySelector(".mzp-c-modal-origin");
        t.focus(), t.classList.remove("mzp-c-modal-origin"), m = !1, document.removeEventListener("focus", w, !1), v && "function" == typeof v.onDestroy && v.onDestroy(), v = {}
    }, window.Mzp.Modal = p
}(), function () {
    "use strict";
    var o = document.querySelector(".mzp-c-sidemenu"), n = document.querySelector(".mzp-c-sidemenu-main"),
        e = document.querySelector(".mzp-js-toggle");
    e.setAttribute("tabindex", "0"), e.setAttribute("role", "button"), n.setAttribute("aria-expanded", "false"), e.addEventListener("click", function (e) {
        e.preventDefault(), o.classList.toggle("mzp-is-active");
        var t = "true" === n.getAttribute("aria-expanded") ? "false" : "true";
        n.setAttribute("aria-expanded", t)
    }, !1)
}(), function () {
    "use strict";
    var t = document.getElementById("product-select-form"), o = document.getElementById("select-product"),
        n = document.querySelectorAll(".c-selection-version select"),
        a = document.querySelectorAll(".c-selection-language select"),
        r = document.querySelectorAll(".c-selection-platform select"), l = document.querySelector(".c-download"),
        i = document.getElementById("download-info-product"), c = document.getElementById("download-info-platform"),
        d = document.getElementById("download-info-language"), s = document.getElementById("download-button-primary"),
        u = {
            getSelectOption: function (e) {
                return {id: e.options[e.selectedIndex].value, label: e.options[e.selectedIndex].textContent}
            }, setSelectOption: function (e, t) {
                for (var o = 0; o < t.length; o++) if (t[o].value === e) {
                    t[o].selected = "selected";
                    break
                }
            }, setAllSelectOptions: function (e, t) {
                for (var o = 0; o < t.length; o++) u.setSelectOption(e, t[o].options)
            }, setFormSelection: function (e) {
                t.setAttribute("data-current", e)
            }, getFormSelection: function () {
                return t.getAttribute("data-current")
            }, getProductSelection: function () {
                var e = u.getSelectOption(o);
                if ("desktop_esr" === e.id) {
                    var t = u.getFormSelection();
                    "desktop_esr_next" === t && (e.id = t)
                }
                return e
            }, setProductSelection: function (e) {
                u.setSelectOption(e, o.options), u.setFormSelection(e)
            }, getVersionSelection: function (e) {
                var t = document.querySelector('.c-selection-options[data-product="' + e.id + '"]').querySelector(".c-selection-version select");
                return u.getSelectOption(t)
            }, getPlatform: function (e) {
                var t;
                switch (e) {
                    case"windows":
                        t = "win64";
                        break;
                    case"linux":
                        t = "linux64";
                        break;
                    case"osx":
                        t = "osx";
                        break;
                    default:
                        t = !1
                }
                return t
            }, getPlatformSelection: function (e) {
                var t = document.querySelector('.c-selection-options[data-product="' + e.id + '"]').querySelector(".c-selection-platform select");
                return u.getSelectOption(t)
            }, getLanguageSelection: function (e) {
                var t = document.querySelector('.c-selection-options[data-product="' + e.id + '"]').querySelector(".c-selection-language select");
                return u.getSelectOption(t)
            }, getPageLanguage: function (e) {
                var t = e || document.getElementsByTagName("html")[0].getAttribute("lang");
                return !!t && (t = "en" === t ? "en-US" : t)
            }, getDownloadLink: function (e, t, o) {
                try {
                    var n = document.querySelector('.c-locale-list[data-product="' + e + '"]').querySelector('.c-locale-list-item[data-language="' + o + '"]').querySelector('.c-download-list > li > a[data-download-version="' + t + '"]');
                    return n ? n.href : new Error("platformLink is " + n)
                } catch (a) {
                    return a
                }
            }, setDownloadLink: function (e, t, o, n, a) {
                var r = a || s;
                r.href = e, r.setAttribute("data-display-name", t.label), r.setAttribute("data-download-version", o.id), r.setAttribute("data-download-language", n.id), /^android/.test(o.id) ? r.setAttribute("data-download-os", "Android") : r.setAttribute("data-download-os", "Desktop")
            }, onError: function (e) {
                l.classList.add("has-error"), document.getElementById("all-downloads").classList.add("is-fallback"), e instanceof Error && window.dataLayer.push({
                    event: "in-page-interaction",
                    eAction: "download error",
                    eLabel: e.name + e.message
                })
            }, offError: function () {
                l.classList.contains("has-error") && l.classList.remove("has-error")
            }, isValidURL: function (e) {
                return "string" == typeof e && /^https:\/\/download.mozilla.org/.test(e)
            }, generateDownloadURL: function () {
                var e = u.getProductSelection(), t = u.getPlatformSelection(e), o = u.getLanguageSelection(e),
                    n = u.getVersionSelection(e), a = u.getDownloadLink(n.id, t.id, o.id);
                u.isValidURL(a) ? (u.setDownloadLink(a, e, t, o), u.setDownloadInfo(e.label, t.label, o.label), u.offError()) : u.onError(a)
            }, setDownloadInfo: function (e, t, o) {
                i.textContent = e, c.textContent = t, d.textContent = o
            }, onProductChange: function (e) {
                u.setFormSelection(e.target.value), u.generateDownloadURL(), u.setHash(e.target.value)
            }, onVersionChange: function (e) {
                "desktop_esr" !== e.target.value && "desktop_esr_next" !== e.target.value || u.setFormSelection(e.target.value), u.setAllSelectOptions(e.target.value, n), u.generateDownloadURL()
            }, onPlatformChange: function (e) {
                u.setAllSelectOptions(e.target.value, r), u.generateDownloadURL()
            }, onLanguageChange: function (e) {
                u.setAllSelectOptions(e.target.value, a), u.generateDownloadURL()
            }, initInput: function (e, t) {
                "function" == typeof t && e.addEventListener("change", t, !1), e.removeAttribute("disabled")
            }, initAllInputs: function (e, t) {
                for (var o = 0; o < e.length; o++) u.initInput(e[o], t)
            }, enableForm: function () {
                u.initInput(o, u.onProductChange), u.initAllInputs(r, u.onPlatformChange), u.initAllInputs(a, u.onLanguageChange), u.initAllInputs(n, u.onVersionChange), l.classList.remove("hidden"), window.addEventListener("hashchange", u.onHashChange, !1)
            }, getHash: function (e) {
                var t, o = "string" == typeof e ? e : window.location.href;
                -1 < o.indexOf("#") && (t = o.split("#")[1]);
                switch (t) {
                    case"product-desktop-release":
                        t = "desktop_release";
                        break;
                    case"product-desktop-beta":
                        t = "desktop_beta";
                        break;
                    case"product-desktop-developer":
                        t = "desktop_developer";
                        break;
                    case"product-desktop-nightly":
                        t = "desktop_nightly";
                        break;
                    case"product-desktop-esr":
                        t = "desktop_esr";
                        break;
                    case"product-android-release":
                        t = "android_release";
                        break;
                    case"product-android-beta":
                        t = "android_beta";
                        break;
                    case"product-android-nightly":
                        t = "android_nightly";
                        break;
                    default:
                        t = null
                }
                return t
            }, setHash: function (e, t) {
                var o = "string" == typeof t || window.location.hash;
                return o = "#product-" + e.replace(/_/g, "-"), t || (window.location.hash = o), o
            }, onHashChange: function () {
                var e = u.getHash();
                e && (u.setProductSelection(e), u.generateDownloadURL())
            }, init: function () {
                var e = u.getHash();
                e && u.setProductSelection(e);
                var t = u.getPageLanguage(), o = u.getProductSelection(), n = u.getPlatform(window.site.platform);
                n && u.setAllSelectOptions(n, r), t && o.id && o.label ? (e || u.setHash(o.id), u.setFormSelection(o.id), u.setAllSelectOptions(t, a), u.generateDownloadURL(), u.enableForm()) : u.onError()
            }
        };
    window.Mozilla.FirefoxDownloader = u
}(), function (l) {
    "use strict";
    l.run(function i() {
        var t = document.getElementById("browser-help"), o = document.getElementById("icon-browser-help"),
            n = document.getElementById("installer-help"), e = document.querySelectorAll(".icon-installer-help");

        function a(e, t, o) {
            Mzp.Modal.createModal(this, e, {
                title: t,
                className: "help-modal"
            }), window.dataLayer.push({event: "in-page-interaction", eAction: "link click", eLabel: o})
        }

        l.FirefoxDownloader.init(), o.addEventListener("click", function (e) {
            e.preventDefault(), a.call(this, t, o.textContent, "Get Browser Help")
        }, !1);
        for (var r = 0; r < e.length; r++) e[r].addEventListener("click", function (e) {
            e.preventDefault(), a.call(this, n, e.target.textContent, "Get Installer Help")
        }, !1)
    })
}(window.Mozilla);

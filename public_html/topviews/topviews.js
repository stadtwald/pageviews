(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Array.includes function polyfill
// This is not a full implementation, just a shorthand to indexOf !== -1
if (!Array.prototype.includes) {
  Array.prototype.includes = function (search) {
    return this.indexOf(search) !== -1;
  };
}

// String.includes function polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// Object.assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// ChildNode.remove
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    this.parentNode.removeChild(this);
  };
}

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var pv = {
  addSiteNotice: function addSiteNotice(level, message, title, autodismiss) {
    title = title ? '<strong>' + title + '</strong> ' : '';
    autodismiss = autodismiss ? ' autodismiss' : '';
    $('.site-notice').append('<div class=\'alert alert-' + level + autodismiss + '\'>' + title + message + '</div>');
    $('.site-notice-wrapper').show();
  },
  clearMessages: function clearMessages() {
    $('.message-container').html('');
  },
  clearSiteNotices: function clearSiteNotices() {
    $('.site-notice .autodismiss').remove();

    if (!$('.site-notice .alert').length) {
      $('.site-notice-wrapper').hide();
    }
  },


  /**
   * Get the wiki URL given the page name
   *
   * @param {string} page name
   * @returns {string} URL for the page
   */
  getPageURL: function getPageURL(page) {
    return '//' + pv.getProject() + '.org/wiki/' + encodeURIComponent(page).replace(/ /g, '_').replace(/'/, escape);
  },


  /**
   * Get the project name (without the .org)
   *
   * @returns {boolean} lang.projectname
   */
  getProject: function getProject() {
    var project = $('.aqs-project-input').val();
    // Get the first 2 characters from the project code to get the language
    return project.replace(/.org$/, '');
  },
  getLocaleDateString: function getLocaleDateString() {
    var formats = {
      'ar-SA': 'DD/MM/YY',
      'bg-BG': 'DD.M.YYYY',
      'ca-ES': 'DD/MM/YYYY',
      'zh-TW': 'YYYY/M/d',
      'cs-CZ': 'D.M.YYYY',
      'da-DK': 'DD-MM-YYYY',
      'de-DE': 'DD.MM.YYYY',
      'el-GR': 'D/M/YYYY',
      'en-US': 'M/D/YYYY',
      'fi-FI': 'D.M.YYYY',
      'fr-FR': 'DD/MM/YYYY',
      'he-IL': 'DD/MM/YYYY',
      'hu-HU': 'YYYY. MM. DD.',
      'is-IS': 'D.M.YYYY',
      'it-IT': 'DD/MM/YYYY',
      'ja-JP': 'YYYY/MM/DD',
      'ko-KR': 'YYYY-MM-DD',
      'nl-NL': 'D-M-YYYY',
      'nb-NO': 'DD.MM.YYYY',
      'pl-PL': 'YYYY-MM-DD',
      'pt-BR': 'D/M/YYYY',
      'ro-RO': 'DD.MM.YYYY',
      'ru-RU': 'DD.MM.YYYY',
      'hr-HR': 'D.M.YYYY',
      'sk-SK': 'D. M. YYYY',
      'sq-AL': 'YYYY-MM-DD',
      'sv-SE': 'YYYY-MM-DD',
      'th-TH': 'D/M/YYYY',
      'tr-TR': 'DD.MM.YYYY',
      'ur-PK': 'DD/MM/YYYY',
      'id-ID': 'DD/MM/YYYY',
      'uk-UA': 'DD.MM.YYYY',
      'be-BY': 'DD.MM.YYYY',
      'sl-SI': 'D.M.YYYY',
      'et-EE': 'D.MM.YYYY',
      'lv-LV': 'YYYY.MM.DD.',
      'lt-LT': 'YYYY.MM.DD',
      'fa-IR': 'MM/DD/YYYY',
      'vi-VN': 'DD/MM/YYYY',
      'hy-AM': 'DD.MM.YYYY',
      'az-Latn-AZ': 'DD.MM.YYYY',
      'eu-ES': 'YYYY/MM/DD',
      'mk-MK': 'DD.MM.YYYY',
      'af-ZA': 'YYYY/MM/DD',
      'ka-GE': 'DD.MM.YYYY',
      'fo-FO': 'DD-MM-YYYY',
      'hi-IN': 'DD-MM-YYYY',
      'ms-MY': 'DD/MM/YYYY',
      'kk-KZ': 'DD.MM.YYYY',
      'ky-KG': 'DD.MM.YY',
      'sw-KE': 'M/d/YYYY',
      'uz-Latn-UZ': 'DD/MM YYYY',
      'tt-RU': 'DD.MM.YYYY',
      'pa-IN': 'DD-MM-YY',
      'gu-IN': 'DD-MM-YY',
      'ta-IN': 'DD-MM-YYYY',
      'te-IN': 'DD-MM-YY',
      'kn-IN': 'DD-MM-YY',
      'mr-IN': 'DD-MM-YYYY',
      'sa-IN': 'DD-MM-YYYY',
      'mn-MN': 'YY.MM.DD',
      'gl-ES': 'DD/MM/YY',
      'kok-IN': 'DD-MM-YYYY',
      'syr-SY': 'DD/MM/YYYY',
      'dv-MV': 'DD/MM/YY',
      'ar-IQ': 'DD/MM/YYYY',
      'zh-CN': 'YYYY/M/D',
      'de-CH': 'DD.MM.YYYY',
      'en-GB': 'DD/MM/YYYY',
      'es-MX': 'DD/MM/YYYY',
      'fr-BE': 'D/MM/YYYY',
      'it-CH': 'DD.MM.YYYY',
      'nl-BE': 'D/MM/YYYY',
      'nn-NO': 'DD.MM.YYYY',
      'pt-PT': 'DD-MM-YYYY',
      'sr-Latn-CS': 'D.M.YYYY',
      'sv-FI': 'D.M.YYYY',
      'az-Cyrl-AZ': 'DD.MM.YYYY',
      'ms-BN': 'DD/MM/YYYY',
      'uz-Cyrl-UZ': 'DD.MM.YYYY',
      'ar-EG': 'DD/MM/YYYY',
      'zh-HK': 'D/M/YYYY',
      'de-AT': 'DD.MM.YYYY',
      'en-AU': 'D/MM/YYYY',
      'es-ES': 'DD/MM/YYYY',
      'fr-CA': 'YYYY-MM-DD',
      'sr-Cyrl-CS': 'D.M.YYYY',
      'ar-LY': 'DD/MM/YYYY',
      'zh-SG': 'D/M/YYYY',
      'de-LU': 'DD.MM.YYYY',
      'en-CA': 'DD/MM/YYYY',
      'es-GT': 'DD/MM/YYYY',
      'fr-CH': 'DD.MM.YYYY',
      'ar-DZ': 'DD-MM-YYYY',
      'zh-MO': 'D/M/YYYY',
      'de-LI': 'DD.MM.YYYY',
      'en-NZ': 'D/MM/YYYY',
      'es-CR': 'DD/MM/YYYY',
      'fr-LU': 'DD/MM/YYYY',
      'ar-MA': 'DD-MM-YYYY',
      'en-IE': 'DD/MM/YYYY',
      'es-PA': 'MM/DD/YYYY',
      'fr-MC': 'DD/MM/YYYY',
      'ar-TN': 'DD-MM-YYYY',
      'en-ZA': 'YYYY/MM/DD',
      'es-DO': 'DD/MM/YYYY',
      'ar-OM': 'DD/MM/YYYY',
      'en-JM': 'DD/MM/YYYY',
      'es-VE': 'DD/MM/YYYY',
      'ar-YE': 'DD/MM/YYYY',
      'en-029': 'MM/DD/YYYY',
      'es-CO': 'DD/MM/YYYY',
      'ar-SY': 'DD/MM/YYYY',
      'en-BZ': 'DD/MM/YYYY',
      'es-PE': 'DD/MM/YYYY',
      'ar-JO': 'DD/MM/YYYY',
      'en-TT': 'DD/MM/YYYY',
      'es-AR': 'DD/MM/YYYY',
      'ar-LB': 'DD/MM/YYYY',
      'en-ZW': 'M/D/YYYY',
      'es-EC': 'DD/MM/YYYY',
      'ar-KW': 'DD/MM/YYYY',
      'en-PH': 'M/D/YYYY',
      'es-CL': 'DD-MM-YYYY',
      'ar-AE': 'DD/MM/YYYY',
      'es-UY': 'DD/MM/YYYY',
      'ar-BH': 'DD/MM/YYYY',
      'es-PY': 'DD/MM/YYYY',
      'ar-QA': 'DD/MM/YYYY',
      'es-BO': 'DD/MM/YYYY',
      'es-SV': 'DD/MM/YYYY',
      'es-HN': 'DD/MM/YYYY',
      'es-NI': 'DD/MM/YYYY',
      'es-PR': 'DD/MM/YYYY',
      'am-ET': 'D/M/YYYY',
      'tzm-Latn-DZ': 'DD-MM-YYYY',
      'iu-Latn-CA': 'D/MM/YYYY',
      'sma-NO': 'DD.MM.YYYY',
      'mn-Mong-CN': 'YYYY/M/d',
      'gd-GB': 'DD/MM/YYYY',
      'en-MY': 'D/M/YYYY',
      'prs-AF': 'DD/MM/YY',
      'bn-BD': 'DD-MM-YY',
      'wo-SN': 'DD/MM/YYYY',
      'rw-RW': 'M/D/YYYY',
      'qut-GT': 'DD/MM/YYYY',
      'sah-RU': 'MM.DD.YYYY',
      'gsw-FR': 'DD/MM/YYYY',
      'co-FR': 'DD/MM/YYYY',
      'oc-FR': 'DD/MM/YYYY',
      'mi-NZ': 'DD/MM/YYYY',
      'ga-IE': 'DD/MM/YYYY',
      'se-SE': 'YYYY-MM-DD',
      'br-FR': 'DD/MM/YYYY',
      'smn-FI': 'D.M.YYYY',
      'moh-CA': 'M/D/YYYY',
      'arn-CL': 'DD-MM-YYYY',
      'ii-CN': 'YYYY/M/D',
      'dsb-DE': 'D. M. YYYY',
      'ig-NG': 'D/M/YYYY',
      'kl-GL': 'DD-MM-YYYY',
      'lb-LU': 'DD/MM/YYYY',
      'ba-RU': 'DD.MM.YY',
      'nso-ZA': 'YYYY/MM/DD',
      'quz-BO': 'DD/MM/YYYY',
      'yo-NG': 'D/M/YYYY',
      'ha-Latn-NG': 'D/M/YYYY',
      'fil-PH': 'M/D/YYYY',
      'ps-AF': 'DD/MM/YY',
      'fy-NL': 'D-M-YYYY',
      'ne-NP': 'M/D/YYYY',
      'se-NO': 'DD.MM.YYYY',
      'iu-Cans-CA': 'D/M/YYYY',
      'sr-Latn-RS': 'D.M.YYYY',
      'si-LK': 'YYYY-MM-DD',
      'sr-Cyrl-RS': 'D.M.YYYY',
      'lo-LA': 'DD/MM/YYYY',
      'km-KH': 'YYYY-MM-DD',
      'cy-GB': 'DD/MM/YYYY',
      'bo-CN': 'YYYY/M/D',
      'sms-FI': 'D.M.YYYY',
      'as-IN': 'DD-MM-YYYY',
      'ml-IN': 'DD-MM-YY',
      'en-IN': 'DD-MM-YYYY',
      'or-IN': 'DD-MM-YY',
      'bn-IN': 'DD-MM-YY',
      'tk-TM': 'DD.MM.YY',
      'bs-Latn-BA': 'D.M.YYYY',
      'mt-MT': 'DD/MM/YYYY',
      'sr-Cyrl-ME': 'D.M.YYYY',
      'se-FI': 'D.M.YYYY',
      'zu-ZA': 'YYYY/MM/DD',
      'xh-ZA': 'YYYY/MM/DD',
      'tn-ZA': 'YYYY/MM/DD',
      'hsb-DE': 'D. M. YYYY',
      'bs-Cyrl-BA': 'D.M.YYYY',
      'tg-Cyrl-TJ': 'DD.MM.yy',
      'sr-Latn-BA': 'D.M.YYYY',
      'smj-NO': 'DD.MM.YYYY',
      'rm-CH': 'DD/MM/YYYY',
      'smj-SE': 'YYYY-MM-DD',
      'quz-EC': 'DD/MM/YYYY',
      'quz-PE': 'DD/MM/YYYY',
      'hr-BA': 'D.M.YYYY.',
      'sr-Latn-ME': 'D.M.YYYY',
      'sma-SE': 'YYYY-MM-DD',
      'en-SG': 'D/M/YYYY',
      'ug-CN': 'YYYY-M-D',
      'sr-Cyrl-BA': 'D.M.YYYY',
      'es-US': 'M/D/YYYY'
    };
    return formats[navigator.language] || 'YYYY-MM-DD';
  },


  /**
   * Check if Intl is supported
   *
   * @returns {boolean} whether the browser (presumably) supports date locale operations
   */
  localeSupported: function localeSupported() {
    return (typeof Intl === 'undefined' ? 'undefined' : _typeof(Intl)) === 'object';
  },


  /**
   * Map normalized pages from API into a string of page names
   * Used in normalizePageNames()
   *
   * @param {array} pages - array of page names
   * @param {array} normalizedPages - array of normalized mappings returned by the API
   * @returns {array} pages with the new normalized names, if given
   */
  mapNormalizedPageNames: function mapNormalizedPageNames(pages, normalizedPages) {
    normalizedPages.forEach(function (normalPage) {
      /** do it this way to preserve ordering of pages */
      pages = pages.map(function (page) {
        if (normalPage.from === page) {
          return normalPage.to;
        } else {
          return page;
        }
      });
    });
    return pages;
  },


  /**
   * Localize Number object with delimiters
   *
   * @param {Number} value - the Number, e.g. 1234567
   * @returns {string} - with locale delimiters, e.g. 1,234,567 (en-US)
   */
  n: function n(value) {
    return new Number(value).toLocaleString();
  },


  /**
   * Make request to API in order to get normalized page names. E.g. masculine versus feminine namespaces on dewiki
   *
   * @param {array} pages - array of page names
   * @returns {Deferred} promise with data fetched from API
   */
  normalizePageNames: function normalizePageNames(pages) {
    var _this = this;

    var dfd = $.Deferred();

    return $.ajax({
      url: 'https://' + pv.getProject() + '.org/w/api.php?action=query&prop=info&format=json&titles=' + pages.join('|'),
      dataType: 'jsonp'
    }).then(function (data) {
      if (data.query.normalized) {
        pages = _this.mapNormalizedPageNames(pages, data.query.normalized);
      }
      return dfd.resolve(pages);
    });
  },


  /**
   * Change alpha level of an rgba value
   *
   * @param {string} value - rgba value
   * @param {float|string} alpha - transparency as float value
   * @returns {string} rgba value
   */
  rgba: function rgba(value, alpha) {
    return value.replace(/,\s*\d\)/, ', ' + alpha + ')');
  },


  /**
   * Splash in console, just for fun
   * @returns {String} output
   */
  splash: function splash() {
    console.log('      ___            __ _                     _                             ');
    console.log('     | _ \\  __ _    / _` |   ___    __ __    (_)     ___   __ __ __  ___    ');
    console.log('     |  _/ / _` |   \\__, |  / -_)   \\ V /    | |    / -_)  \\ V  V / (_-<    ');
    console.log('    _|_|_  \\__,_|   |___/   \\___|   _\\_/_   _|_|_   \\___|   \\_/\\_/  /__/_   ');
    console.log('  _| """ |_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|  ');
    console.log('  "`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'  ');
    console.log('              ___                     _  _     _               _            ');
    console.log('      o O O  /   \\   _ _     __ _    | || |   | |     ___     (_)     ___   ');
    console.log('     o       | - |  | \' \\   / _` |    \\_, |   | |    (_-<     | |    (_-<   ');
    console.log('    TS__[O]  |_|_|  |_||_|  \\__,_|   _|__/   _|_|_   /__/_   _|_|_   /__/_  ');
    console.log('   {======|_|"""""|_|"""""|_|"""""|_| """"|_|"""""|_|"""""|_|"""""|_|"""""| ');
    console.log('  ./o--000\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\' ');
  },


  /**
   * Replace spaces with underscores
   *
   * @param {array} pages - array of page names
   * @returns {array} page names with underscores
   */
  underscorePageNames: function underscorePageNames(pages) {
    return pages.map(function (page) {
      return decodeURIComponent(page.replace(/ /g, '_'));
    });
  }
};

// must be exported to global scope for Chart template rendering
window.pv = pv;

module.exports = pv;

},{}],3:[function(require,module,exports){
'use strict';

var siteMap = {
  'aawiki': 'aa.wikipedia.org',
  'aawiktionary': 'aa.wiktionary.org',
  'aawikibooks': 'aa.wikibooks.org',
  'abwiki': 'ab.wikipedia.org',
  'abwiktionary': 'ab.wiktionary.org',
  'acewiki': 'ace.wikipedia.org',
  'afwiki': 'af.wikipedia.org',
  'afwiktionary': 'af.wiktionary.org',
  'afwikibooks': 'af.wikibooks.org',
  'afwikiquote': 'af.wikiquote.org',
  'akwiki': 'ak.wikipedia.org',
  'akwiktionary': 'ak.wiktionary.org',
  'akwikibooks': 'ak.wikibooks.org',
  'alswiki': 'als.wikipedia.org',
  'alswiktionary': 'als.wiktionary.org',
  'alswikibooks': 'als.wikibooks.org',
  'alswikiquote': 'als.wikiquote.org',
  'amwiki': 'am.wikipedia.org',
  'amwiktionary': 'am.wiktionary.org',
  'amwikiquote': 'am.wikiquote.org',
  'anwiki': 'an.wikipedia.org',
  'anwiktionary': 'an.wiktionary.org',
  'angwiki': 'ang.wikipedia.org',
  'angwiktionary': 'ang.wiktionary.org',
  'angwikibooks': 'ang.wikibooks.org',
  'angwikiquote': 'ang.wikiquote.org',
  'angwikisource': 'ang.wikisource.org',
  'arwiki': 'ar.wikipedia.org',
  'arwiktionary': 'ar.wiktionary.org',
  'arwikibooks': 'ar.wikibooks.org',
  'arwikinews': 'ar.wikinews.org',
  'arwikiquote': 'ar.wikiquote.org',
  'arwikisource': 'ar.wikisource.org',
  'arwikiversity': 'ar.wikiversity.org',
  'arcwiki': 'arc.wikipedia.org',
  'arzwiki': 'arz.wikipedia.org',
  'aswiki': 'as.wikipedia.org',
  'aswiktionary': 'as.wiktionary.org',
  'aswikibooks': 'as.wikibooks.org',
  'aswikisource': 'as.wikisource.org',
  'astwiki': 'ast.wikipedia.org',
  'astwiktionary': 'ast.wiktionary.org',
  'astwikibooks': 'ast.wikibooks.org',
  'astwikiquote': 'ast.wikiquote.org',
  'avwiki': 'av.wikipedia.org',
  'avwiktionary': 'av.wiktionary.org',
  'aywiki': 'ay.wikipedia.org',
  'aywiktionary': 'ay.wiktionary.org',
  'aywikibooks': 'ay.wikibooks.org',
  'azwiki': 'az.wikipedia.org',
  'azwiktionary': 'az.wiktionary.org',
  'azwikibooks': 'az.wikibooks.org',
  'azwikiquote': 'az.wikiquote.org',
  'azwikisource': 'az.wikisource.org',
  'azbwiki': 'azb.wikipedia.org',
  'bawiki': 'ba.wikipedia.org',
  'bawikibooks': 'ba.wikibooks.org',
  'barwiki': 'bar.wikipedia.org',
  'bat_smgwiki': 'bat-smg.wikipedia.org',
  'bclwiki': 'bcl.wikipedia.org',
  'bewiki': 'be.wikipedia.org',
  'bewiktionary': 'be.wiktionary.org',
  'bewikibooks': 'be.wikibooks.org',
  'bewikiquote': 'be.wikiquote.org',
  'bewikisource': 'be.wikisource.org',
  'be_x_oldwiki': 'be-tarask.wikipedia.org',
  'bgwiki': 'bg.wikipedia.org',
  'bgwiktionary': 'bg.wiktionary.org',
  'bgwikibooks': 'bg.wikibooks.org',
  'bgwikinews': 'bg.wikinews.org',
  'bgwikiquote': 'bg.wikiquote.org',
  'bgwikisource': 'bg.wikisource.org',
  'bhwiki': 'bh.wikipedia.org',
  'bhwiktionary': 'bh.wiktionary.org',
  'biwiki': 'bi.wikipedia.org',
  'biwiktionary': 'bi.wiktionary.org',
  'biwikibooks': 'bi.wikibooks.org',
  'bjnwiki': 'bjn.wikipedia.org',
  'bmwiki': 'bm.wikipedia.org',
  'bmwiktionary': 'bm.wiktionary.org',
  'bmwikibooks': 'bm.wikibooks.org',
  'bmwikiquote': 'bm.wikiquote.org',
  'bnwiki': 'bn.wikipedia.org',
  'bnwiktionary': 'bn.wiktionary.org',
  'bnwikibooks': 'bn.wikibooks.org',
  'bnwikisource': 'bn.wikisource.org',
  'bowiki': 'bo.wikipedia.org',
  'bowiktionary': 'bo.wiktionary.org',
  'bowikibooks': 'bo.wikibooks.org',
  'bpywiki': 'bpy.wikipedia.org',
  'brwiki': 'br.wikipedia.org',
  'brwiktionary': 'br.wiktionary.org',
  'brwikiquote': 'br.wikiquote.org',
  'brwikisource': 'br.wikisource.org',
  'bswiki': 'bs.wikipedia.org',
  'bswiktionary': 'bs.wiktionary.org',
  'bswikibooks': 'bs.wikibooks.org',
  'bswikinews': 'bs.wikinews.org',
  'bswikiquote': 'bs.wikiquote.org',
  'bswikisource': 'bs.wikisource.org',
  'bugwiki': 'bug.wikipedia.org',
  'bxrwiki': 'bxr.wikipedia.org',
  'cawiki': 'ca.wikipedia.org',
  'cawiktionary': 'ca.wiktionary.org',
  'cawikibooks': 'ca.wikibooks.org',
  'cawikinews': 'ca.wikinews.org',
  'cawikiquote': 'ca.wikiquote.org',
  'cawikisource': 'ca.wikisource.org',
  'cbk_zamwiki': 'cbk-zam.wikipedia.org',
  'cdowiki': 'cdo.wikipedia.org',
  'cewiki': 'ce.wikipedia.org',
  'cebwiki': 'ceb.wikipedia.org',
  'chwiki': 'ch.wikipedia.org',
  'chwiktionary': 'ch.wiktionary.org',
  'chwikibooks': 'ch.wikibooks.org',
  'chowiki': 'cho.wikipedia.org',
  'chrwiki': 'chr.wikipedia.org',
  'chrwiktionary': 'chr.wiktionary.org',
  'chywiki': 'chy.wikipedia.org',
  'ckbwiki': 'ckb.wikipedia.org',
  'cowiki': 'co.wikipedia.org',
  'cowiktionary': 'co.wiktionary.org',
  'cowikibooks': 'co.wikibooks.org',
  'cowikiquote': 'co.wikiquote.org',
  'crwiki': 'cr.wikipedia.org',
  'crwiktionary': 'cr.wiktionary.org',
  'crwikiquote': 'cr.wikiquote.org',
  'crhwiki': 'crh.wikipedia.org',
  'cswiki': 'cs.wikipedia.org',
  'cswiktionary': 'cs.wiktionary.org',
  'cswikibooks': 'cs.wikibooks.org',
  'cswikinews': 'cs.wikinews.org',
  'cswikiquote': 'cs.wikiquote.org',
  'cswikisource': 'cs.wikisource.org',
  'cswikiversity': 'cs.wikiversity.org',
  'csbwiki': 'csb.wikipedia.org',
  'csbwiktionary': 'csb.wiktionary.org',
  'cuwiki': 'cu.wikipedia.org',
  'cvwiki': 'cv.wikipedia.org',
  'cvwikibooks': 'cv.wikibooks.org',
  'cywiki': 'cy.wikipedia.org',
  'cywiktionary': 'cy.wiktionary.org',
  'cywikibooks': 'cy.wikibooks.org',
  'cywikiquote': 'cy.wikiquote.org',
  'cywikisource': 'cy.wikisource.org',
  'dawiki': 'da.wikipedia.org',
  'dawiktionary': 'da.wiktionary.org',
  'dawikibooks': 'da.wikibooks.org',
  'dawikiquote': 'da.wikiquote.org',
  'dawikisource': 'da.wikisource.org',
  'dewiki': 'de.wikipedia.org',
  'dewiktionary': 'de.wiktionary.org',
  'dewikibooks': 'de.wikibooks.org',
  'dewikinews': 'de.wikinews.org',
  'dewikiquote': 'de.wikiquote.org',
  'dewikisource': 'de.wikisource.org',
  'dewikiversity': 'de.wikiversity.org',
  'dewikivoyage': 'de.wikivoyage.org',
  'diqwiki': 'diq.wikipedia.org',
  'dsbwiki': 'dsb.wikipedia.org',
  'dvwiki': 'dv.wikipedia.org',
  'dvwiktionary': 'dv.wiktionary.org',
  'dzwiki': 'dz.wikipedia.org',
  'dzwiktionary': 'dz.wiktionary.org',
  'eewiki': 'ee.wikipedia.org',
  'elwiki': 'el.wikipedia.org',
  'elwiktionary': 'el.wiktionary.org',
  'elwikibooks': 'el.wikibooks.org',
  'elwikinews': 'el.wikinews.org',
  'elwikiquote': 'el.wikiquote.org',
  'elwikisource': 'el.wikisource.org',
  'elwikiversity': 'el.wikiversity.org',
  'elwikivoyage': 'el.wikivoyage.org',
  'emlwiki': 'eml.wikipedia.org',
  'enwiki': 'en.wikipedia.org',
  'enwiktionary': 'en.wiktionary.org',
  'enwikibooks': 'en.wikibooks.org',
  'enwikinews': 'en.wikinews.org',
  'enwikiquote': 'en.wikiquote.org',
  'enwikisource': 'en.wikisource.org',
  'enwikiversity': 'en.wikiversity.org',
  'enwikivoyage': 'en.wikivoyage.org',
  'eowiki': 'eo.wikipedia.org',
  'eowiktionary': 'eo.wiktionary.org',
  'eowikibooks': 'eo.wikibooks.org',
  'eowikinews': 'eo.wikinews.org',
  'eowikiquote': 'eo.wikiquote.org',
  'eowikisource': 'eo.wikisource.org',
  'eswiki': 'es.wikipedia.org',
  'eswiktionary': 'es.wiktionary.org',
  'eswikibooks': 'es.wikibooks.org',
  'eswikinews': 'es.wikinews.org',
  'eswikiquote': 'es.wikiquote.org',
  'eswikisource': 'es.wikisource.org',
  'eswikiversity': 'es.wikiversity.org',
  'eswikivoyage': 'es.wikivoyage.org',
  'etwiki': 'et.wikipedia.org',
  'etwiktionary': 'et.wiktionary.org',
  'etwikibooks': 'et.wikibooks.org',
  'etwikiquote': 'et.wikiquote.org',
  'etwikisource': 'et.wikisource.org',
  'euwiki': 'eu.wikipedia.org',
  'euwiktionary': 'eu.wiktionary.org',
  'euwikibooks': 'eu.wikibooks.org',
  'euwikiquote': 'eu.wikiquote.org',
  'extwiki': 'ext.wikipedia.org',
  'fawiki': 'fa.wikipedia.org',
  'fawiktionary': 'fa.wiktionary.org',
  'fawikibooks': 'fa.wikibooks.org',
  'fawikinews': 'fa.wikinews.org',
  'fawikiquote': 'fa.wikiquote.org',
  'fawikisource': 'fa.wikisource.org',
  'fawikivoyage': 'fa.wikivoyage.org',
  'ffwiki': 'ff.wikipedia.org',
  'fiwiki': 'fi.wikipedia.org',
  'fiwiktionary': 'fi.wiktionary.org',
  'fiwikibooks': 'fi.wikibooks.org',
  'fiwikinews': 'fi.wikinews.org',
  'fiwikiquote': 'fi.wikiquote.org',
  'fiwikisource': 'fi.wikisource.org',
  'fiwikiversity': 'fi.wikiversity.org',
  'fiu_vrowiki': 'fiu-vro.wikipedia.org',
  'fjwiki': 'fj.wikipedia.org',
  'fjwiktionary': 'fj.wiktionary.org',
  'fowiki': 'fo.wikipedia.org',
  'fowiktionary': 'fo.wiktionary.org',
  'fowikisource': 'fo.wikisource.org',
  'frwiki': 'fr.wikipedia.org',
  'frwiktionary': 'fr.wiktionary.org',
  'frwikibooks': 'fr.wikibooks.org',
  'frwikinews': 'fr.wikinews.org',
  'frwikiquote': 'fr.wikiquote.org',
  'frwikisource': 'fr.wikisource.org',
  'frwikiversity': 'fr.wikiversity.org',
  'frwikivoyage': 'fr.wikivoyage.org',
  'frpwiki': 'frp.wikipedia.org',
  'frrwiki': 'frr.wikipedia.org',
  'furwiki': 'fur.wikipedia.org',
  'fywiki': 'fy.wikipedia.org',
  'fywiktionary': 'fy.wiktionary.org',
  'fywikibooks': 'fy.wikibooks.org',
  'gawiki': 'ga.wikipedia.org',
  'gawiktionary': 'ga.wiktionary.org',
  'gawikibooks': 'ga.wikibooks.org',
  'gawikiquote': 'ga.wikiquote.org',
  'gagwiki': 'gag.wikipedia.org',
  'ganwiki': 'gan.wikipedia.org',
  'gdwiki': 'gd.wikipedia.org',
  'gdwiktionary': 'gd.wiktionary.org',
  'glwiki': 'gl.wikipedia.org',
  'glwiktionary': 'gl.wiktionary.org',
  'glwikibooks': 'gl.wikibooks.org',
  'glwikiquote': 'gl.wikiquote.org',
  'glwikisource': 'gl.wikisource.org',
  'glkwiki': 'glk.wikipedia.org',
  'gnwiki': 'gn.wikipedia.org',
  'gnwiktionary': 'gn.wiktionary.org',
  'gnwikibooks': 'gn.wikibooks.org',
  'gomwiki': 'gom.wikipedia.org',
  'gotwiki': 'got.wikipedia.org',
  'gotwikibooks': 'got.wikibooks.org',
  'guwiki': 'gu.wikipedia.org',
  'guwiktionary': 'gu.wiktionary.org',
  'guwikibooks': 'gu.wikibooks.org',
  'guwikiquote': 'gu.wikiquote.org',
  'guwikisource': 'gu.wikisource.org',
  'gvwiki': 'gv.wikipedia.org',
  'gvwiktionary': 'gv.wiktionary.org',
  'hawiki': 'ha.wikipedia.org',
  'hawiktionary': 'ha.wiktionary.org',
  'hakwiki': 'hak.wikipedia.org',
  'hawwiki': 'haw.wikipedia.org',
  'hewiki': 'he.wikipedia.org',
  'hewiktionary': 'he.wiktionary.org',
  'hewikibooks': 'he.wikibooks.org',
  'hewikinews': 'he.wikinews.org',
  'hewikiquote': 'he.wikiquote.org',
  'hewikisource': 'he.wikisource.org',
  'hewikivoyage': 'he.wikivoyage.org',
  'hiwiki': 'hi.wikipedia.org',
  'hiwiktionary': 'hi.wiktionary.org',
  'hiwikibooks': 'hi.wikibooks.org',
  'hiwikiquote': 'hi.wikiquote.org',
  'hifwiki': 'hif.wikipedia.org',
  'howiki': 'ho.wikipedia.org',
  'hrwiki': 'hr.wikipedia.org',
  'hrwiktionary': 'hr.wiktionary.org',
  'hrwikibooks': 'hr.wikibooks.org',
  'hrwikiquote': 'hr.wikiquote.org',
  'hrwikisource': 'hr.wikisource.org',
  'hsbwiki': 'hsb.wikipedia.org',
  'hsbwiktionary': 'hsb.wiktionary.org',
  'htwiki': 'ht.wikipedia.org',
  'htwikisource': 'ht.wikisource.org',
  'huwiki': 'hu.wikipedia.org',
  'huwiktionary': 'hu.wiktionary.org',
  'huwikibooks': 'hu.wikibooks.org',
  'huwikinews': 'hu.wikinews.org',
  'huwikiquote': 'hu.wikiquote.org',
  'huwikisource': 'hu.wikisource.org',
  'hywiki': 'hy.wikipedia.org',
  'hywiktionary': 'hy.wiktionary.org',
  'hywikibooks': 'hy.wikibooks.org',
  'hywikiquote': 'hy.wikiquote.org',
  'hywikisource': 'hy.wikisource.org',
  'hzwiki': 'hz.wikipedia.org',
  'iawiki': 'ia.wikipedia.org',
  'iawiktionary': 'ia.wiktionary.org',
  'iawikibooks': 'ia.wikibooks.org',
  'idwiki': 'id.wikipedia.org',
  'idwiktionary': 'id.wiktionary.org',
  'idwikibooks': 'id.wikibooks.org',
  'idwikiquote': 'id.wikiquote.org',
  'idwikisource': 'id.wikisource.org',
  'iewiki': 'ie.wikipedia.org',
  'iewiktionary': 'ie.wiktionary.org',
  'iewikibooks': 'ie.wikibooks.org',
  'igwiki': 'ig.wikipedia.org',
  'iiwiki': 'ii.wikipedia.org',
  'ikwiki': 'ik.wikipedia.org',
  'ikwiktionary': 'ik.wiktionary.org',
  'ilowiki': 'ilo.wikipedia.org',
  'iowiki': 'io.wikipedia.org',
  'iowiktionary': 'io.wiktionary.org',
  'iswiki': 'is.wikipedia.org',
  'iswiktionary': 'is.wiktionary.org',
  'iswikibooks': 'is.wikibooks.org',
  'iswikiquote': 'is.wikiquote.org',
  'iswikisource': 'is.wikisource.org',
  'itwiki': 'it.wikipedia.org',
  'itwiktionary': 'it.wiktionary.org',
  'itwikibooks': 'it.wikibooks.org',
  'itwikinews': 'it.wikinews.org',
  'itwikiquote': 'it.wikiquote.org',
  'itwikisource': 'it.wikisource.org',
  'itwikiversity': 'it.wikiversity.org',
  'itwikivoyage': 'it.wikivoyage.org',
  'iuwiki': 'iu.wikipedia.org',
  'iuwiktionary': 'iu.wiktionary.org',
  'jawiki': 'ja.wikipedia.org',
  'jawiktionary': 'ja.wiktionary.org',
  'jawikibooks': 'ja.wikibooks.org',
  'jawikinews': 'ja.wikinews.org',
  'jawikiquote': 'ja.wikiquote.org',
  'jawikisource': 'ja.wikisource.org',
  'jawikiversity': 'ja.wikiversity.org',
  'jbowiki': 'jbo.wikipedia.org',
  'jbowiktionary': 'jbo.wiktionary.org',
  'jvwiki': 'jv.wikipedia.org',
  'jvwiktionary': 'jv.wiktionary.org',
  'kawiki': 'ka.wikipedia.org',
  'kawiktionary': 'ka.wiktionary.org',
  'kawikibooks': 'ka.wikibooks.org',
  'kawikiquote': 'ka.wikiquote.org',
  'kaawiki': 'kaa.wikipedia.org',
  'kabwiki': 'kab.wikipedia.org',
  'kbdwiki': 'kbd.wikipedia.org',
  'kgwiki': 'kg.wikipedia.org',
  'kiwiki': 'ki.wikipedia.org',
  'kjwiki': 'kj.wikipedia.org',
  'kkwiki': 'kk.wikipedia.org',
  'kkwiktionary': 'kk.wiktionary.org',
  'kkwikibooks': 'kk.wikibooks.org',
  'kkwikiquote': 'kk.wikiquote.org',
  'klwiki': 'kl.wikipedia.org',
  'klwiktionary': 'kl.wiktionary.org',
  'kmwiki': 'km.wikipedia.org',
  'kmwiktionary': 'km.wiktionary.org',
  'kmwikibooks': 'km.wikibooks.org',
  'knwiki': 'kn.wikipedia.org',
  'knwiktionary': 'kn.wiktionary.org',
  'knwikibooks': 'kn.wikibooks.org',
  'knwikiquote': 'kn.wikiquote.org',
  'knwikisource': 'kn.wikisource.org',
  'kowiki': 'ko.wikipedia.org',
  'kowiktionary': 'ko.wiktionary.org',
  'kowikibooks': 'ko.wikibooks.org',
  'kowikinews': 'ko.wikinews.org',
  'kowikiquote': 'ko.wikiquote.org',
  'kowikisource': 'ko.wikisource.org',
  'kowikiversity': 'ko.wikiversity.org',
  'koiwiki': 'koi.wikipedia.org',
  'krwiki': 'kr.wikipedia.org',
  'krwikiquote': 'kr.wikiquote.org',
  'krcwiki': 'krc.wikipedia.org',
  'kswiki': 'ks.wikipedia.org',
  'kswiktionary': 'ks.wiktionary.org',
  'kswikibooks': 'ks.wikibooks.org',
  'kswikiquote': 'ks.wikiquote.org',
  'kshwiki': 'ksh.wikipedia.org',
  'kuwiki': 'ku.wikipedia.org',
  'kuwiktionary': 'ku.wiktionary.org',
  'kuwikibooks': 'ku.wikibooks.org',
  'kuwikiquote': 'ku.wikiquote.org',
  'kvwiki': 'kv.wikipedia.org',
  'kwwiki': 'kw.wikipedia.org',
  'kwwiktionary': 'kw.wiktionary.org',
  'kwwikiquote': 'kw.wikiquote.org',
  'kywiki': 'ky.wikipedia.org',
  'kywiktionary': 'ky.wiktionary.org',
  'kywikibooks': 'ky.wikibooks.org',
  'kywikiquote': 'ky.wikiquote.org',
  'lawiki': 'la.wikipedia.org',
  'lawiktionary': 'la.wiktionary.org',
  'lawikibooks': 'la.wikibooks.org',
  'lawikiquote': 'la.wikiquote.org',
  'lawikisource': 'la.wikisource.org',
  'ladwiki': 'lad.wikipedia.org',
  'lbwiki': 'lb.wikipedia.org',
  'lbwiktionary': 'lb.wiktionary.org',
  'lbwikibooks': 'lb.wikibooks.org',
  'lbwikiquote': 'lb.wikiquote.org',
  'lbewiki': 'lbe.wikipedia.org',
  'lezwiki': 'lez.wikipedia.org',
  'lgwiki': 'lg.wikipedia.org',
  'liwiki': 'li.wikipedia.org',
  'liwiktionary': 'li.wiktionary.org',
  'liwikibooks': 'li.wikibooks.org',
  'liwikiquote': 'li.wikiquote.org',
  'liwikisource': 'li.wikisource.org',
  'lijwiki': 'lij.wikipedia.org',
  'lmowiki': 'lmo.wikipedia.org',
  'lnwiki': 'ln.wikipedia.org',
  'lnwiktionary': 'ln.wiktionary.org',
  'lnwikibooks': 'ln.wikibooks.org',
  'lowiki': 'lo.wikipedia.org',
  'lowiktionary': 'lo.wiktionary.org',
  'lrcwiki': 'lrc.wikipedia.org',
  'ltwiki': 'lt.wikipedia.org',
  'ltwiktionary': 'lt.wiktionary.org',
  'ltwikibooks': 'lt.wikibooks.org',
  'ltwikiquote': 'lt.wikiquote.org',
  'ltwikisource': 'lt.wikisource.org',
  'ltgwiki': 'ltg.wikipedia.org',
  'lvwiki': 'lv.wikipedia.org',
  'lvwiktionary': 'lv.wiktionary.org',
  'lvwikibooks': 'lv.wikibooks.org',
  'maiwiki': 'mai.wikipedia.org',
  'map_bmswiki': 'map-bms.wikipedia.org',
  'mdfwiki': 'mdf.wikipedia.org',
  'mgwiki': 'mg.wikipedia.org',
  'mgwiktionary': 'mg.wiktionary.org',
  'mgwikibooks': 'mg.wikibooks.org',
  'mhwiki': 'mh.wikipedia.org',
  'mhwiktionary': 'mh.wiktionary.org',
  'mhrwiki': 'mhr.wikipedia.org',
  'miwiki': 'mi.wikipedia.org',
  'miwiktionary': 'mi.wiktionary.org',
  'miwikibooks': 'mi.wikibooks.org',
  'minwiki': 'min.wikipedia.org',
  'mkwiki': 'mk.wikipedia.org',
  'mkwiktionary': 'mk.wiktionary.org',
  'mkwikibooks': 'mk.wikibooks.org',
  'mkwikisource': 'mk.wikisource.org',
  'mlwiki': 'ml.wikipedia.org',
  'mlwiktionary': 'ml.wiktionary.org',
  'mlwikibooks': 'ml.wikibooks.org',
  'mlwikiquote': 'ml.wikiquote.org',
  'mlwikisource': 'ml.wikisource.org',
  'mnwiki': 'mn.wikipedia.org',
  'mnwiktionary': 'mn.wiktionary.org',
  'mnwikibooks': 'mn.wikibooks.org',
  'mowiki': 'mo.wikipedia.org',
  'mowiktionary': 'mo.wiktionary.org',
  'mrwiki': 'mr.wikipedia.org',
  'mrwiktionary': 'mr.wiktionary.org',
  'mrwikibooks': 'mr.wikibooks.org',
  'mrwikiquote': 'mr.wikiquote.org',
  'mrwikisource': 'mr.wikisource.org',
  'mrjwiki': 'mrj.wikipedia.org',
  'mswiki': 'ms.wikipedia.org',
  'mswiktionary': 'ms.wiktionary.org',
  'mswikibooks': 'ms.wikibooks.org',
  'mtwiki': 'mt.wikipedia.org',
  'mtwiktionary': 'mt.wiktionary.org',
  'muswiki': 'mus.wikipedia.org',
  'mwlwiki': 'mwl.wikipedia.org',
  'mywiki': 'my.wikipedia.org',
  'mywiktionary': 'my.wiktionary.org',
  'mywikibooks': 'my.wikibooks.org',
  'myvwiki': 'myv.wikipedia.org',
  'mznwiki': 'mzn.wikipedia.org',
  'nawiki': 'na.wikipedia.org',
  'nawiktionary': 'na.wiktionary.org',
  'nawikibooks': 'na.wikibooks.org',
  'nawikiquote': 'na.wikiquote.org',
  'nahwiki': 'nah.wikipedia.org',
  'nahwiktionary': 'nah.wiktionary.org',
  'nahwikibooks': 'nah.wikibooks.org',
  'napwiki': 'nap.wikipedia.org',
  'ndswiki': 'nds.wikipedia.org',
  'ndswiktionary': 'nds.wiktionary.org',
  'ndswikibooks': 'nds.wikibooks.org',
  'ndswikiquote': 'nds.wikiquote.org',
  'nds_nlwiki': 'nds-nl.wikipedia.org',
  'newiki': 'ne.wikipedia.org',
  'newiktionary': 'ne.wiktionary.org',
  'newikibooks': 'ne.wikibooks.org',
  'newwiki': 'new.wikipedia.org',
  'ngwiki': 'ng.wikipedia.org',
  'nlwiki': 'nl.wikipedia.org',
  'nlwiktionary': 'nl.wiktionary.org',
  'nlwikibooks': 'nl.wikibooks.org',
  'nlwikinews': 'nl.wikinews.org',
  'nlwikiquote': 'nl.wikiquote.org',
  'nlwikisource': 'nl.wikisource.org',
  'nlwikivoyage': 'nl.wikivoyage.org',
  'nnwiki': 'nn.wikipedia.org',
  'nnwiktionary': 'nn.wiktionary.org',
  'nnwikiquote': 'nn.wikiquote.org',
  'nowiki': 'no.wikipedia.org',
  'nowiktionary': 'no.wiktionary.org',
  'nowikibooks': 'no.wikibooks.org',
  'nowikinews': 'no.wikinews.org',
  'nowikiquote': 'no.wikiquote.org',
  'nowikisource': 'no.wikisource.org',
  'novwiki': 'nov.wikipedia.org',
  'nrmwiki': 'nrm.wikipedia.org',
  'nsowiki': 'nso.wikipedia.org',
  'nvwiki': 'nv.wikipedia.org',
  'nywiki': 'ny.wikipedia.org',
  'ocwiki': 'oc.wikipedia.org',
  'ocwiktionary': 'oc.wiktionary.org',
  'ocwikibooks': 'oc.wikibooks.org',
  'omwiki': 'om.wikipedia.org',
  'omwiktionary': 'om.wiktionary.org',
  'orwiki': 'or.wikipedia.org',
  'orwiktionary': 'or.wiktionary.org',
  'orwikisource': 'or.wikisource.org',
  'oswiki': 'os.wikipedia.org',
  'pawiki': 'pa.wikipedia.org',
  'pawiktionary': 'pa.wiktionary.org',
  'pawikibooks': 'pa.wikibooks.org',
  'pagwiki': 'pag.wikipedia.org',
  'pamwiki': 'pam.wikipedia.org',
  'papwiki': 'pap.wikipedia.org',
  'pcdwiki': 'pcd.wikipedia.org',
  'pdcwiki': 'pdc.wikipedia.org',
  'pflwiki': 'pfl.wikipedia.org',
  'piwiki': 'pi.wikipedia.org',
  'piwiktionary': 'pi.wiktionary.org',
  'pihwiki': 'pih.wikipedia.org',
  'plwiki': 'pl.wikipedia.org',
  'plwiktionary': 'pl.wiktionary.org',
  'plwikibooks': 'pl.wikibooks.org',
  'plwikinews': 'pl.wikinews.org',
  'plwikiquote': 'pl.wikiquote.org',
  'plwikisource': 'pl.wikisource.org',
  'plwikivoyage': 'pl.wikivoyage.org',
  'pmswiki': 'pms.wikipedia.org',
  'pnbwiki': 'pnb.wikipedia.org',
  'pnbwiktionary': 'pnb.wiktionary.org',
  'pntwiki': 'pnt.wikipedia.org',
  'pswiki': 'ps.wikipedia.org',
  'pswiktionary': 'ps.wiktionary.org',
  'pswikibooks': 'ps.wikibooks.org',
  'ptwiki': 'pt.wikipedia.org',
  'ptwiktionary': 'pt.wiktionary.org',
  'ptwikibooks': 'pt.wikibooks.org',
  'ptwikinews': 'pt.wikinews.org',
  'ptwikiquote': 'pt.wikiquote.org',
  'ptwikisource': 'pt.wikisource.org',
  'ptwikiversity': 'pt.wikiversity.org',
  'ptwikivoyage': 'pt.wikivoyage.org',
  'quwiki': 'qu.wikipedia.org',
  'quwiktionary': 'qu.wiktionary.org',
  'quwikibooks': 'qu.wikibooks.org',
  'quwikiquote': 'qu.wikiquote.org',
  'rmwiki': 'rm.wikipedia.org',
  'rmwiktionary': 'rm.wiktionary.org',
  'rmwikibooks': 'rm.wikibooks.org',
  'rmywiki': 'rmy.wikipedia.org',
  'rnwiki': 'rn.wikipedia.org',
  'rnwiktionary': 'rn.wiktionary.org',
  'rowiki': 'ro.wikipedia.org',
  'rowiktionary': 'ro.wiktionary.org',
  'rowikibooks': 'ro.wikibooks.org',
  'rowikinews': 'ro.wikinews.org',
  'rowikiquote': 'ro.wikiquote.org',
  'rowikisource': 'ro.wikisource.org',
  'rowikivoyage': 'ro.wikivoyage.org',
  'roa_rupwiki': 'roa-rup.wikipedia.org',
  'roa_rupwiktionary': 'roa-rup.wiktionary.org',
  'roa_tarawiki': 'roa-tara.wikipedia.org',
  'ruwiki': 'ru.wikipedia.org',
  'ruwiktionary': 'ru.wiktionary.org',
  'ruwikibooks': 'ru.wikibooks.org',
  'ruwikinews': 'ru.wikinews.org',
  'ruwikiquote': 'ru.wikiquote.org',
  'ruwikisource': 'ru.wikisource.org',
  'ruwikiversity': 'ru.wikiversity.org',
  'ruwikivoyage': 'ru.wikivoyage.org',
  'ruewiki': 'rue.wikipedia.org',
  'rwwiki': 'rw.wikipedia.org',
  'rwwiktionary': 'rw.wiktionary.org',
  'sawiki': 'sa.wikipedia.org',
  'sawiktionary': 'sa.wiktionary.org',
  'sawikibooks': 'sa.wikibooks.org',
  'sawikiquote': 'sa.wikiquote.org',
  'sawikisource': 'sa.wikisource.org',
  'sahwiki': 'sah.wikipedia.org',
  'sahwikisource': 'sah.wikisource.org',
  'scwiki': 'sc.wikipedia.org',
  'scwiktionary': 'sc.wiktionary.org',
  'scnwiki': 'scn.wikipedia.org',
  'scnwiktionary': 'scn.wiktionary.org',
  'scowiki': 'sco.wikipedia.org',
  'sdwiki': 'sd.wikipedia.org',
  'sdwiktionary': 'sd.wiktionary.org',
  'sdwikinews': 'sd.wikinews.org',
  'sewiki': 'se.wikipedia.org',
  'sewikibooks': 'se.wikibooks.org',
  'sgwiki': 'sg.wikipedia.org',
  'sgwiktionary': 'sg.wiktionary.org',
  'shwiki': 'sh.wikipedia.org',
  'shwiktionary': 'sh.wiktionary.org',
  'siwiki': 'si.wikipedia.org',
  'siwiktionary': 'si.wiktionary.org',
  'siwikibooks': 'si.wikibooks.org',
  'simplewiki': 'simple.wikipedia.org',
  'simplewiktionary': 'simple.wiktionary.org',
  'simplewikibooks': 'simple.wikibooks.org',
  'simplewikiquote': 'simple.wikiquote.org',
  'skwiki': 'sk.wikipedia.org',
  'skwiktionary': 'sk.wiktionary.org',
  'skwikibooks': 'sk.wikibooks.org',
  'skwikiquote': 'sk.wikiquote.org',
  'skwikisource': 'sk.wikisource.org',
  'slwiki': 'sl.wikipedia.org',
  'slwiktionary': 'sl.wiktionary.org',
  'slwikibooks': 'sl.wikibooks.org',
  'slwikiquote': 'sl.wikiquote.org',
  'slwikisource': 'sl.wikisource.org',
  'slwikiversity': 'sl.wikiversity.org',
  'smwiki': 'sm.wikipedia.org',
  'smwiktionary': 'sm.wiktionary.org',
  'snwiki': 'sn.wikipedia.org',
  'snwiktionary': 'sn.wiktionary.org',
  'sowiki': 'so.wikipedia.org',
  'sowiktionary': 'so.wiktionary.org',
  'sqwiki': 'sq.wikipedia.org',
  'sqwiktionary': 'sq.wiktionary.org',
  'sqwikibooks': 'sq.wikibooks.org',
  'sqwikinews': 'sq.wikinews.org',
  'sqwikiquote': 'sq.wikiquote.org',
  'srwiki': 'sr.wikipedia.org',
  'srwiktionary': 'sr.wiktionary.org',
  'srwikibooks': 'sr.wikibooks.org',
  'srwikinews': 'sr.wikinews.org',
  'srwikiquote': 'sr.wikiquote.org',
  'srwikisource': 'sr.wikisource.org',
  'srnwiki': 'srn.wikipedia.org',
  'sswiki': 'ss.wikipedia.org',
  'sswiktionary': 'ss.wiktionary.org',
  'stwiki': 'st.wikipedia.org',
  'stwiktionary': 'st.wiktionary.org',
  'stqwiki': 'stq.wikipedia.org',
  'suwiki': 'su.wikipedia.org',
  'suwiktionary': 'su.wiktionary.org',
  'suwikibooks': 'su.wikibooks.org',
  'suwikiquote': 'su.wikiquote.org',
  'svwiki': 'sv.wikipedia.org',
  'svwiktionary': 'sv.wiktionary.org',
  'svwikibooks': 'sv.wikibooks.org',
  'svwikinews': 'sv.wikinews.org',
  'svwikiquote': 'sv.wikiquote.org',
  'svwikisource': 'sv.wikisource.org',
  'svwikiversity': 'sv.wikiversity.org',
  'svwikivoyage': 'sv.wikivoyage.org',
  'swwiki': 'sw.wikipedia.org',
  'swwiktionary': 'sw.wiktionary.org',
  'swwikibooks': 'sw.wikibooks.org',
  'szlwiki': 'szl.wikipedia.org',
  'tawiki': 'ta.wikipedia.org',
  'tawiktionary': 'ta.wiktionary.org',
  'tawikibooks': 'ta.wikibooks.org',
  'tawikinews': 'ta.wikinews.org',
  'tawikiquote': 'ta.wikiquote.org',
  'tawikisource': 'ta.wikisource.org',
  'tewiki': 'te.wikipedia.org',
  'tewiktionary': 'te.wiktionary.org',
  'tewikibooks': 'te.wikibooks.org',
  'tewikiquote': 'te.wikiquote.org',
  'tewikisource': 'te.wikisource.org',
  'tetwiki': 'tet.wikipedia.org',
  'tgwiki': 'tg.wikipedia.org',
  'tgwiktionary': 'tg.wiktionary.org',
  'tgwikibooks': 'tg.wikibooks.org',
  'thwiki': 'th.wikipedia.org',
  'thwiktionary': 'th.wiktionary.org',
  'thwikibooks': 'th.wikibooks.org',
  'thwikinews': 'th.wikinews.org',
  'thwikiquote': 'th.wikiquote.org',
  'thwikisource': 'th.wikisource.org',
  'tiwiki': 'ti.wikipedia.org',
  'tiwiktionary': 'ti.wiktionary.org',
  'tkwiki': 'tk.wikipedia.org',
  'tkwiktionary': 'tk.wiktionary.org',
  'tkwikibooks': 'tk.wikibooks.org',
  'tkwikiquote': 'tk.wikiquote.org',
  'tlwiki': 'tl.wikipedia.org',
  'tlwiktionary': 'tl.wiktionary.org',
  'tlwikibooks': 'tl.wikibooks.org',
  'tnwiki': 'tn.wikipedia.org',
  'tnwiktionary': 'tn.wiktionary.org',
  'towiki': 'to.wikipedia.org',
  'towiktionary': 'to.wiktionary.org',
  'tpiwiki': 'tpi.wikipedia.org',
  'tpiwiktionary': 'tpi.wiktionary.org',
  'trwiki': 'tr.wikipedia.org',
  'trwiktionary': 'tr.wiktionary.org',
  'trwikibooks': 'tr.wikibooks.org',
  'trwikinews': 'tr.wikinews.org',
  'trwikiquote': 'tr.wikiquote.org',
  'trwikisource': 'tr.wikisource.org',
  'tswiki': 'ts.wikipedia.org',
  'tswiktionary': 'ts.wiktionary.org',
  'ttwiki': 'tt.wikipedia.org',
  'ttwiktionary': 'tt.wiktionary.org',
  'ttwikibooks': 'tt.wikibooks.org',
  'ttwikiquote': 'tt.wikiquote.org',
  'tumwiki': 'tum.wikipedia.org',
  'twwiki': 'tw.wikipedia.org',
  'twwiktionary': 'tw.wiktionary.org',
  'tywiki': 'ty.wikipedia.org',
  'tyvwiki': 'tyv.wikipedia.org',
  'udmwiki': 'udm.wikipedia.org',
  'ugwiki': 'ug.wikipedia.org',
  'ugwiktionary': 'ug.wiktionary.org',
  'ugwikibooks': 'ug.wikibooks.org',
  'ugwikiquote': 'ug.wikiquote.org',
  'ukwiki': 'uk.wikipedia.org',
  'ukwiktionary': 'uk.wiktionary.org',
  'ukwikibooks': 'uk.wikibooks.org',
  'ukwikinews': 'uk.wikinews.org',
  'ukwikiquote': 'uk.wikiquote.org',
  'ukwikisource': 'uk.wikisource.org',
  'ukwikivoyage': 'uk.wikivoyage.org',
  'urwiki': 'ur.wikipedia.org',
  'urwiktionary': 'ur.wiktionary.org',
  'urwikibooks': 'ur.wikibooks.org',
  'urwikiquote': 'ur.wikiquote.org',
  'uzwiki': 'uz.wikipedia.org',
  'uzwiktionary': 'uz.wiktionary.org',
  'uzwikibooks': 'uz.wikibooks.org',
  'uzwikiquote': 'uz.wikiquote.org',
  'vewiki': 've.wikipedia.org',
  'vecwiki': 'vec.wikipedia.org',
  'vecwiktionary': 'vec.wiktionary.org',
  'vecwikisource': 'vec.wikisource.org',
  'vepwiki': 'vep.wikipedia.org',
  'viwiki': 'vi.wikipedia.org',
  'viwiktionary': 'vi.wiktionary.org',
  'viwikibooks': 'vi.wikibooks.org',
  'viwikiquote': 'vi.wikiquote.org',
  'viwikisource': 'vi.wikisource.org',
  'viwikivoyage': 'vi.wikivoyage.org',
  'vlswiki': 'vls.wikipedia.org',
  'vowiki': 'vo.wikipedia.org',
  'vowiktionary': 'vo.wiktionary.org',
  'vowikibooks': 'vo.wikibooks.org',
  'vowikiquote': 'vo.wikiquote.org',
  'wawiki': 'wa.wikipedia.org',
  'wawiktionary': 'wa.wiktionary.org',
  'wawikibooks': 'wa.wikibooks.org',
  'warwiki': 'war.wikipedia.org',
  'wowiki': 'wo.wikipedia.org',
  'wowiktionary': 'wo.wiktionary.org',
  'wowikiquote': 'wo.wikiquote.org',
  'wuuwiki': 'wuu.wikipedia.org',
  'xalwiki': 'xal.wikipedia.org',
  'xhwiki': 'xh.wikipedia.org',
  'xhwiktionary': 'xh.wiktionary.org',
  'xhwikibooks': 'xh.wikibooks.org',
  'xmfwiki': 'xmf.wikipedia.org',
  'yiwiki': 'yi.wikipedia.org',
  'yiwiktionary': 'yi.wiktionary.org',
  'yiwikisource': 'yi.wikisource.org',
  'yowiki': 'yo.wikipedia.org',
  'yowiktionary': 'yo.wiktionary.org',
  'yowikibooks': 'yo.wikibooks.org',
  'zawiki': 'za.wikipedia.org',
  'zawiktionary': 'za.wiktionary.org',
  'zawikibooks': 'za.wikibooks.org',
  'zawikiquote': 'za.wikiquote.org',
  'zeawiki': 'zea.wikipedia.org',
  'zhwiki': 'zh.wikipedia.org',
  'zhwiktionary': 'zh.wiktionary.org',
  'zhwikibooks': 'zh.wikibooks.org',
  'zhwikinews': 'zh.wikinews.org',
  'zhwikiquote': 'zh.wikiquote.org',
  'zhwikisource': 'zh.wikisource.org',
  'zhwikivoyage': 'zh.wikivoyage.org',
  'zh_classicalwiki': 'zh-classical.wikipedia.org',
  'zh_min_nanwiki': 'zh-min-nan.wikipedia.org',
  'zh_min_nanwiktionary': 'zh-min-nan.wiktionary.org',
  'zh_min_nanwikibooks': 'zh-min-nan.wikibooks.org',
  'zh_min_nanwikiquote': 'zh-min-nan.wikiquote.org',
  'zh_min_nanwikisource': 'zh-min-nan.wikisource.org',
  'zh_yuewiki': 'zh-yue.wikipedia.org',
  'zuwiki': 'zu.wikipedia.org',
  'zuwiktionary': 'zu.wiktionary.org',
  'zuwikibooks': 'zu.wikibooks.org',
  'advisorywiki': 'advisory.wikimedia.org',
  'arwikimedia': 'ar.wikimedia.org',
  'arbcom_dewiki': 'arbcom-de.wikipedia.org',
  'arbcom_enwiki': 'arbcom-en.wikipedia.org',
  'arbcom_fiwiki': 'arbcom-fi.wikipedia.org',
  'arbcom_nlwiki': 'arbcom-nl.wikipedia.org',
  'auditcomwiki': 'auditcom.wikimedia.org',
  'bdwikimedia': 'bd.wikimedia.org',
  'bewikimedia': 'be.wikimedia.org',
  'betawikiversity': 'beta.wikiversity.org',
  'boardwiki': 'board.wikimedia.org',
  'boardgovcomwiki': 'boardgovcom.wikimedia.org',
  'brwikimedia': 'br.wikimedia.org',
  'cawikimedia': 'ca.wikimedia.org',
  'chairwiki': 'chair.wikimedia.org',
  'chapcomwiki': 'affcom.wikimedia.org',
  'checkuserwiki': 'checkuser.wikimedia.org',
  'cnwikimedia': 'cn.wikimedia.org',
  'cowikimedia': 'co.wikimedia.org',
  'collabwiki': 'collab.wikimedia.org',
  'commonswiki': 'commons.wikimedia.org',
  'dkwikimedia': 'dk.wikimedia.org',
  'donatewiki': 'donate.wikimedia.org',
  'etwikimedia': 'ee.wikimedia.org',
  'execwiki': 'exec.wikimedia.org',
  'fdcwiki': 'fdc.wikimedia.org',
  'fiwikimedia': 'fi.wikimedia.org',
  'foundationwiki': 'wikimediafoundation.org',
  'grantswiki': 'grants.wikimedia.org',
  'iegcomwiki': 'iegcom.wikimedia.org',
  'ilwikimedia': 'il.wikimedia.org',
  'incubatorwiki': 'incubator.wikimedia.org',
  'internalwiki': 'internal.wikimedia.org',
  'labswiki': 'wikitech.wikimedia.org',
  'labtestwiki': 'labtestwikitech.wikimedia.org',
  'legalteamwiki': 'legalteam.wikimedia.org',
  'loginwiki': 'login.wikimedia.org',
  'mediawikiwiki': 'www.mediawiki.org',
  'metawiki': 'meta.wikimedia.org',
  'mkwikimedia': 'mk.wikimedia.org',
  'movementroleswiki': 'movementroles.wikimedia.org',
  'mxwikimedia': 'mx.wikimedia.org',
  'nlwikimedia': 'nl.wikimedia.org',
  'nowikimedia': 'no.wikimedia.org',
  'noboard_chapterswikimedia': 'noboard-chapters.wikimedia.org',
  'nostalgiawiki': 'nostalgia.wikipedia.org',
  'nycwikimedia': 'nyc.wikimedia.org',
  'nzwikimedia': 'nz.wikimedia.org',
  'officewiki': 'office.wikimedia.org',
  'ombudsmenwiki': 'ombudsmen.wikimedia.org',
  'otrs_wikiwiki': 'otrs-wiki.wikimedia.org',
  'outreachwiki': 'outreach.wikimedia.org',
  'pa_uswikimedia': 'pa-us.wikimedia.org',
  'plwikimedia': 'pl.wikimedia.org',
  'qualitywiki': 'quality.wikimedia.org',
  'rswikimedia': 'rs.wikimedia.org',
  'ruwikimedia': 'ru.wikimedia.org',
  'sewikimedia': 'se.wikimedia.org',
  'searchcomwiki': 'searchcom.wikimedia.org',
  'sourceswiki': 'wikisource.org',
  'spcomwiki': 'spcom.wikimedia.org',
  'specieswiki': 'species.wikimedia.org',
  'stewardwiki': 'steward.wikimedia.org',
  'strategywiki': 'strategy.wikimedia.org',
  'tenwiki': 'ten.wikipedia.org',
  'testwiki': 'test.wikipedia.org',
  'test2wiki': 'test2.wikipedia.org',
  'testwikidatawiki': 'test.wikidata.org',
  'trwikimedia': 'tr.wikimedia.org',
  'transitionteamwiki': 'transitionteam.wikimedia.org',
  'uawikimedia': 'ua.wikimedia.org',
  'ukwikimedia': 'uk.wikimedia.org',
  'usabilitywiki': 'usability.wikimedia.org',
  'votewiki': 'vote.wikimedia.org',
  'wg_enwiki': 'wg-en.wikipedia.org',
  'wikidatawiki': 'wikidata.org',
  'wikimania2005wiki': 'wikimania2005.wikimedia.org',
  'wikimania2006wiki': 'wikimania2006.wikimedia.org',
  'wikimania2007wiki': 'wikimania2007.wikimedia.org',
  'wikimania2008wiki': 'wikimania2008.wikimedia.org',
  'wikimania2009wiki': 'wikimania2009.wikimedia.org',
  'wikimania2010wiki': 'wikimania2010.wikimedia.org',
  'wikimania2011wiki': 'wikimania2011.wikimedia.org',
  'wikimania2012wiki': 'wikimania2012.wikimedia.org',
  'wikimania2013wiki': 'wikimania2013.wikimedia.org',
  'wikimania2014wiki': 'wikimania2014.wikimedia.org',
  'wikimania2015wiki': 'wikimania2015.wikimedia.org',
  'wikimania2016wiki': 'wikimania2016.wikimedia.org',
  'wikimania2017wiki': 'wikimania2017.wikimedia.org',
  'wikimaniateamwiki': 'wikimaniateam.wikimedia.org',
  'zerowiki': 'zero.wikimedia.org'
};

module.exports = siteMap;

},{}],4:[function(require,module,exports){
'use strict';

var pv = require('../shared/pv');

var config = {
  articleSelector: '.aqs-article-selector',
  dateRangeSelector: '.aqs-date-range-selector',
  daysAgo: 7,
  defaults: {
    excludes: [],
    localizeDateFormat: 'true',
    numericalFormatting: 'true',
    project: 'en.wikipedia.org'
  },
  minDate: moment('2015-10-01'),
  maxDate: moment().subtract(1, 'days'),
  pageSize: 20,
  projectInput: '.aqs-project-input',
  timestampFormat: 'YYYYMMDD00'
};
module.exports = config;

},{"../shared/pv":2}],5:[function(require,module,exports){
'use strict';

var config = require('./config');

var session = {
  excludes: [],
  localizeDateFormat: localStorage['pageviews-settings-localizeDateFormat'] || config.defaults.localizeDateFormat,
  numericalFormatting: localStorage['pageviews-settings-numericalFormatting'] || config.defaults.numericalFormatting,
  offset: 0,
  max: null,
  pageData: [],
  pageNames: [],
  params: null
};

module.exports = session;

},{"./config":4}],6:[function(require,module,exports){
'use strict';

var config = require('./config');
var siteMap = require('../shared/site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});
var pv = require('../shared/pv');
var session = require('./session');
window.session = session;

/**
 * Apply user input by updating the URL hash and view, if needed
 * @param {boolean} force - apply all user options even if we've detected nothing has changed
 * @returns {Deferred} deferred object from initData
 */
function applyChanges(force) {
  if (!pushParams() && force !== true) return;

  resetView(false);
  return initData().then(function () {
    drawData();
  });
}

/**
 * Print list of top pages
 * @returns {null} nothing
 */
function drawData() {
  $('.chart-container').removeClass('loading').html('');

  var count = 0,
      index = 0;

  while (count < config.pageSize + session.offset) {
    var item = session.pageData[index++];

    if (session.excludes.includes(item.article)) continue;
    if (!session.max) session.max = item.views;

    var width = 100 * (item.views / session.max);

    $('.chart-container').append('<div class=\'topview-entry\' style=\'background:linear-gradient(to right, #EEE ' + width + '%, transparent ' + width + '%)\'>\n       <span class=\'topview-entry--remove glyphicon glyphicon-remove\' data-article-id=' + (index - 1) + ' aria-hidden=\'true\'></span>\n       <span class=\'topview-entry--rank\'>' + ++count + '</span>\n       <a class=\'topview-entry--label\' href="https://en.wikipedia.org/wiki/' + item.article.replace(/ /g, '_') + '" target="_blank">' + item.article + '</a>\n       <span class=\'topview-entry--leader\'></span>\n       <a class=\'topview-entry--views\' href=\'' + getPageviewsURL(item.article) + '\'>' + pv.n(item.views) + '</a></div>');
  }

  pushParams();

  $('.topview-entry--remove').off('click').on('click', function () {
    session.excludes.push(session.pageNames[$(this).data('article-id')]);
    setArticleSelectorDefaults(session.excludes);
    pushParams();
  });
}

/**
 * Get date format to use based on settings
 * @returns {string} date format to passed to parser
 */
function getDateFormat() {
  if (session.localizeDateFormat === 'true') {
    return pv.getLocaleDateString();
  } else {
    return config.defaults.dateFormat;
  }
}

/**
 * Gets the date headings as strings - i18n compliant
 * @param {boolean} localized - whether the dates should be localized per browser language
 * @returns {Array} the date headings as strings
 */
function getDateHeadings(localized) {
  var daterangepicker = $(config.dateRangeSelector).data('daterangepicker'),
      dateHeadings = [];

  for (var date = moment(daterangepicker.startDate); date.isBefore(daterangepicker.endDate); date.add(1, 'd')) {
    if (localized) {
      dateHeadings.push(date.format(getDateFormat()));
    } else {
      dateHeadings.push(date.format('YYYY-MM-DD'));
    }
  }
  return dateHeadings;
}

/**
 * Link to /pageviews for given article and chosen daterange
 * @param {string} article - page name
 * @returns {string} URL
 */
function getPageviewsURL(article) {
  var startDate = moment($(config.dateRangeSelector).data('daterangepicker').startDate),
      endDate = moment($(config.dateRangeSelector).data('daterangepicker').endDate);
  var platform = $('#platform-select').val(),
      project = $(config.projectInput).val();

  return '/pageviews#start=' + startDate.subtract(3, 'days').format('YYYY-MM-DD') + ('&end=' + endDate.add(3, 'days').format('YYYY-MM-DD') + '&project=' + project + '&platform=' + platform + '&pages=' + article);
}

/**
 * Compute how many days are in the selected date range
 *
 * @returns {integer} number of days
 */
function numDaysInRange() {
  var daterangepicker = $(config.dateRangeSelector).data('daterangepicker');
  return daterangepicker.endDate.diff(daterangepicker.startDate, 'days') + 1;
}

/*
 * Generate key/value pairs of URL hash params
 * @returns {Object} key/value pairs representation of URL hash
 */
function parseHashParams() {
  var uri = decodeURI(location.hash.slice(1)),
      chunks = uri.split('&');
  var params = {};

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i].split('=');

    if (chunk[0] === 'excludes') {
      params.excludes = chunk[1].split('|');
    } else {
      params[chunk[0]] = chunk[1];
    }
  }

  return params;
}

/**
 * Parses the URL hash and sets all the inputs accordingly
 * Should only be called on initial page load, until we decide to support pop states (probably never)
 * @returns {null} nothing
 */
function popParams() {
  var params = parseHashParams();

  $(config.projectInput).val(params.project || config.defaults.project);
  if (validateProject()) return;

  var startDate = moment(params.start || moment().subtract(config.daysAgo, 'days')),
      endDate = moment(params.end || Date.now());

  $(config.dateRangeSelector).data('daterangepicker').setStartDate(startDate);
  $(config.dateRangeSelector).data('daterangepicker').setEndDate(endDate);
  $('#platform-select').val(params.platform || 'all-access');

  if (startDate < moment('2015-10-01') || endDate < moment('2015-10-01')) {
    pv.addSiteNotice('danger', 'Pageviews API does not contain data older than October 2015. Sorry.', 'Invalid parameters!', true);
    resetView();
    return;
  } else if (startDate > endDate) {
    pv.addSiteNotice('warning', 'Start date must be older than the end date.', 'Invalid parameters!', true);
    resetView();
    return;
  }

  if (!params.excludes || params.excludes.length === 1 && !params.excludes[0]) {
    session.excludes = config.defaults.excludes;
  } else {
    session.excludes = params.excludes.map(function (exclude) {
      return exclude.replace(/_/g, ' ');
    });
  }

  initData().then(function () {
    setupArticleSelector(session.excludes);
    setupListeners();
    drawData();
  });
}

/**
 * Replaces history state with new URL hash representing current user input
 * Called whenever we go to update the chart
 * @returns {string|false} the new hash param string or false if nothing has changed
 */
function pushParams() {
  var daterangepicker = $(config.dateRangeSelector).data('daterangepicker');

  var state = $.param({
    start: daterangepicker.startDate.format('YYYY-MM-DD'),
    end: daterangepicker.endDate.format('YYYY-MM-DD'),
    project: $(config.projectInput).val(),
    platform: $('#platform-select').val()
  }) + ('&excludes=' + pv.underscorePageNames(session.excludes).join('|'));

  session.params = '#' + state;

  if (location.hash === session.params) {
    return false;
  }

  if (window.history && window.history.replaceState) {
    window.history.replaceState({}, 'Topviews comparsion', session.params);
  }

  return state;
}

/**
 * Removes all article selector related stuff then adds it back
 * @returns {null} nothing
 */
function resetArticleSelector() {
  var articleSelector = $(config.articleSelector);
  articleSelector.off('change');
  articleSelector.val(null);
  articleSelector.html('');
  articleSelector.select2('data', null);
  articleSelector.select2('destroy');
  setupArticleSelector();
}

/**
 * Removes chart, messages, and resets article selections
 * @returns {null} nothing
 */
function resetView() {
  var clearSelector = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  session.max = null;
  session.offset = 0;
  session.pageData = [];
  session.pageNames = [];
  session.excludes = [];
  $('.chart-container').removeClass('loading').html('');
  $('.message-container').html('');
  if (clearSelector) resetArticleSelector();
}

/**
 * Sets up the article selector and adds listener to update chart
 * @param {array} excludes - default page names to exclude
 * @returns {null} - nothing
 */
function setupArticleSelector() {
  var excludes = arguments.length <= 0 || arguments[0] === undefined ? session.excludes : arguments[0];

  var articleSelector = $(config.articleSelector);

  articleSelector.select2({
    data: session.pageNames,
    maximumSelectionLength: 50,
    minimumInputLength: 0,
    placeholder: 'Type page names to exclude from view...'
  });

  if (excludes.length) setArticleSelectorDefaults(excludes);

  articleSelector.on('change', function () {
    session.excludes = $(this).val() || [];
    session.max = null;
    drawData();
    $(this).select2().trigger('close');
  });
}

/**
 * Directly set articles in article selector
 *
 * @param {array} pages - page titles
 * @returns {array} - untouched array of pages
 */
function setArticleSelectorDefaults(pages) {
  $(config.articleSelector).val(pages).trigger('change');
  return pages;
}

/**
 * sets up the daterange selector and adds listeners
 * @returns {null} - nothing
 */
function setupDateRangeSelector() {
  var dateRangeSelector = $(config.dateRangeSelector);
  dateRangeSelector.daterangepicker({
    dateLimit: { days: 31 },
    locale: { format: getDateFormat() },
    startDate: moment().subtract(config.daysAgo, 'days'),
    minDate: config.minDate,
    maxDate: config.maxDate,
    ranges: {
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
      'Last 30 Days': [moment().subtract(29, 'days'), moment().subtract(1, 'days')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
  });
}

/**
 * General place to add page-wide listeners
 * @returns {null} - nothing
 */
function setupListeners() {
  $(config.dateRangeSelector).on('change', applyChanges);
  $('#platform-select').on('change', applyChanges);
  $('a[href="#"]').on('click', function (e) {
    return e.preventDefault();
  });
  $('.expand-chart').on('click', function () {
    session.offset += config.pageSize;
    drawData();
  });
}

/**
 * Setup listeners for project input
 * @returns {null} - nothing
 */
function setupProjectInput() {
  $(config.projectInput).on('change', function () {
    if (!this.value) {
      this.value = config.defaults.project;
      return;
    }
    if (validateProject()) return;
    resetView(false);
    applyChanges(true).then(resetArticleSelector);
  });
}

/**
 * Fetch data from API
 * @returns {Deferred} promise with data
 */
function initData() {
  var _$;

  $('.chart-container').addClass('loading');

  /** Collect parameters from inputs. */
  var dateRangeSelector = $(config.dateRangeSelector),
      startDate = dateRangeSelector.data('daterangepicker').startDate,
      endDate = dateRangeSelector.data('daterangepicker').endDate,
      access = $('#platform-select').val();

  var promises = [];

  for (var date = moment(startDate); date.isBefore(endDate); date.add(1, 'd')) {
    promises.push($.ajax({
      url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/' + pv.getProject() + '/' + access + '/' + date.format('YYYY/MM/DD'),
      dataType: 'json'
    }));
  }

  var dfd = $.Deferred();

  return (_$ = $).when.apply(_$, promises).then(function () {
    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    if (promises.length === 1) data = [data];

    /** import data and do summations */
    data.forEach(function (day) {
      day[0].items[0].articles.forEach(function (item, index) {
        if (session.pageData[index]) {
          session.pageData[index].views += item.views;
        } else {
          session.pageData[index] = {
            article: item.article.replace(/_/g, ' '),
            views: item.views
          };
        }
      });
    });

    /** sort given new view counts */
    session.pageData = session.pageData.sort(function (a, b) {
      return b.views - a.views;
    });

    /** ...and build the pageNames array for Select2 */
    session.pageNames = session.pageData.map(function (value) {
      return value.article.replace(/_/g, ' ');
    });

    return dfd.resolve(session.pageData);
  });
}

/**
 * Checks value of project input and validates it against site map
 * @returns {boolean} whether the currently input project is valid
 */
function validateProject() {
  var project = $(config.projectInput).val();
  if (siteDomains.includes(project)) {
    $('body').removeClass('invalid-project');
  } else {
    resetView();
    writeMessage('<a href=\'//' + project + '\'>' + project + '</a> is not a\n       <a href=\'//meta.wikipedia.org/w/api.php?action=sitematrix&formatversion=2\'>valid project</a>', 'validate', true);
    $('body').addClass('invalid-project');
    return true;
  }
}

/**
 * Writes message just below the chart
 * @param {string} message - message to write
 * @param {boolean} clear - whether to clear any existing messages
 * @returns {jQuery} - jQuery object of message container
 */
function writeMessage(message, clear) {
  if (clear) {
    pv.clearMessages();
  }
  return $('.message-container').append('<p class=\'error-message\'>' + message + '</p>');
}

$(document).ready(function () {
  setupProjectInput();
  setupDateRangeSelector();
  popParams();

  /** simple metric to see how many use it (pageviews of the pageview, a meta-pageview, if you will :) */
  $.ajax({
    url: '//tools.wmflabs.org/musikanimal/api/uses',
    method: 'PATCH',
    data: {
      tool: 'topviews',
      type: 'form'
    }
  });
});

},{"../shared/pv":2,"../shared/site_map":3,"./config":4,"./session":5}]},{},[1,2,3,6]);

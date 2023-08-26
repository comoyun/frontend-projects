/* 
    Name: consoleJS
    Created by: Khumoyun 
*/

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) { return typeof obj; } : function(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function(_o) {
  "use strict";

  var isSupported = typeof _o !== "undefined";
  var isArray = function isArray(_param) {
    return (/array/gi.test(_param.constructor.toString()));
  };
  var doOpt = function doOpt() {
    var cjs = {
      /**
       * @param string _text - Misol: <20 style='font-weight: bold'>Salom</20>
       * @desc - cjs Elementlaridan (<SON>TEXT</SON>) foydalangan holda consolga habar jo'natadi. Agar "log" funksiyasi ichida cjs Elementi bo'lmasa "Syntax Xato" lik e'lon qilinadi.
       **/
      log: function log(_text) {
        var props = this.getProps(_text);
        if (props) {
          var _console;

          (_console = console)["log"].apply(_console, [props.g_text].concat(_toConsumableArray(props.styles)));
        } else {
          console['error']("Syntax hatolik \nMisol: cjs.log(\'<1>Salom dunyo</1>\')");
        }
      },
      /**
       * @param string _text - Misol: <20 style='font-weight: bold'>Salom</20>
       * @desc - cjs Elementlaridan (<SON>TEXT</SON>) foydalangan holda consolga habar jo'natadi. Agar "error" funksiyasi ichida cjs Elementi bo'lmasa "Syntax Xato" lik e'lon qilinadi.
       **/
      error: function error(_text) {
        var props = this.getProps(_text);
        if (props) {
          var _console2;

          (_console2 = console)["error"].apply(_console2, [props.g_text].concat(_toConsumableArray(props.styles)));
        } else {
          console['error']("Syntax hatolik \nMisol: cjs.error(\'<1>Salom dunyo</1>\')");
        }
      },
      /**
       * @param string _text - Misol: <20 style='font-weight: bold'>Salom</20>
       * @desc - cjs Elementlaridan (<SON>TEXT</SON>) foydalangan holda consolga habar jo'natadi. Agar "info" funksiyasi ichida cjs Elementi bo'lmasa "Syntax Xato" lik e'lon qilinadi.
       **/
      info: function info(_text) {
        var props = this.getProps(_text);
        if (props) {
          var _console3;

          (_console3 = console)["info"].apply(_console3, [props.g_text].concat(_toConsumableArray(props.styles)));
        } else {
          console['error']("Syntax hatolik \nMisol: cjs.info(\'<1>Salom dunyo</1>\')");
        }
      },
      /**
       * @param string _text - Misol: <20 style='font-weight: bold'>Salom</20>
       * @desc - cjs Elementlaridan (<SON>TEXT</SON>) foydalangan holda consolga habar jo'natadi. Agar "warn" funksiyasi ichida cjs Elementi bo'lmasa "Syntax Xato" lik e'lon qilinadi.
       **/
      warn: function warn(_text) {
        var props = this.getProps(_text);
        if (props) {
          var _console4;

          (_console4 = console)["warn"].apply(_console4, [props.g_text].concat(_toConsumableArray(props.styles)));
        } else {
          console['error']("Syntax hatolik \nMisol: cjs.warn(\'<1>Salom dunyo</1>\')");
        }
      },
      getProps: function getProps(_text) {
        var regexp = /<(\d+)\s*(style=([\"\'])(.*?)\3)?>(.*?)<\/\1>/gi;
        var props = {
          texts: [],
          sizes: [],
          styles: [],
          g_text: ""
        };
        if (regexp.test(_text)) {
          _text = _text.replace(/\n/g, "**[NEWLINE]**");
          var infos = _text.match(regexp);
          for (var index = 0; index < infos.length; index++) {
            var innerRegx = /<(\d+)\s*(style=([\"\'])(.*?)\3)?>(.*?)<\/\1>/gi;
            var element = infos[index];
            var s_props = innerRegx.exec(element);
            var size = s_props[1];
            var text = s_props[5];
            var style = s_props[4];
            props.sizes.push(size);
            props.texts.push(text);
            props.styles.push(style ? "font-size:" + size + "px;" + style : "font-size:" + size + "px;");
          }
          for (var i = 0; i < props.texts.length; i++) {
            var _text2 = props.texts[i];
            props.g_text += "%c" + _text2;
          }
        } else {
          props = null;
        }
        if(props) {
          props.g_text = props.g_text.replace(/\*\*\[NEWLINE\]\*\*/g, "\n")
        }
        return props;
      }
    };
    window.cjs ? true : window.cjs = cjs;
  };
  var toString = Object.prototype.toString;
  if (isSupported) {
    doOpt();
  } 
})(console);

/*
    <(\d)\s*(style=([\"\'])(.*?)\3)?>(.*?)<\/\1>
    1 - SIZE
    2 - DN
    3 - DN
    4 - STYLE
    5 - TEXT
*/


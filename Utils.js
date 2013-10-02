(function () {
  window.Utils = {
    createElem: function (elem) {
      return document.createElement(elem);
    },

    createListener: function (elem, evnt, callback) {
      if ('addEventListener' in elem) {
        elem.addEventListener(evnt, callback);
      } else {
        elem.attachEvent('on' + evnt, callback);
      }
    },

    extend: function (obj1, obj2) {
      for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
          obj1[key] = obj2[key];
        }
      }

      return obj1;
    },

    fireEvent: function (obj, evt) {
      var fireOnThis = obj,
          evObj;

      if (document.createEvent) {
        evObj = document.createEvent('MouseEvents');
        evObj.initEvent(evt, true, false);
        fireOnThis.dispatchEvent(evObj);
      } else if (document.createEventObject) {
        //IE
        evObj = document.createEventObject();
        fireOnThis.fireEvent('on' + evt, evObj);
      }
    },

    getChildren: function (elem) {
      var children = [];

      for (var i = 0; i < elem.children.length; i++) {
        children.push(elem.children[i]);
      }

      return children;
    },

    getText: function (elem) {
      if ('innerText' in elem) {
        return elem.innerText;
      } else {
        return elem.textContent;
      }
    },

    setText: function (elem, string) {
      if ('innerText' in elem) {
        elem.innerText = string;
      } else {
        elem.textContent = string;
      }
    },

    removeClass: function (elem, className) {
      var classes = elem.className.split(/\s+/),
          index = classes.indexOf(className);

      if (index >= 0) {
        classes.splice(index, 1);
        elem.className = classes.join(' ');
        Utils.removeClass(elem, className);
      }
    },

    addClass: function (elem, className) {
      Utils.removeClass(elem, className);
      elem.className += ' ' + className;
    }
  };
}());

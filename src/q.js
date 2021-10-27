const q = (function (document) {
  const slice_ = Function.prototype.call.bind(Array.prototype.slice);

  const qs_ = document.querySelector.bind(document);
  const qsa_ = document.querySelectorAll.bind(document);
  const byid_ = document.getElementById.bind(document);

  return init_(sa, {
    s,
    sa,
    id,
    on,
    off,
    ready,
    class: {
      add: (node, className) => {
        return node.classList.add(className);
      },
      rm: (node, className) => {
        return node.classList.remove(className);
      },
      toggle: (node, className) => {
        return node.classList.toggle(className);
      },
      ls: (node) => {
        return slice_(node.classList);
      },
      has: (node, className) => {
        return node.classList.contains(className);
      },
      count: (node) => {
        return node.classList.length;
      },
      string: (node) => {
        return node.classList.toString();
      },
      each: (node, callback) => {
        return node.classList.forEach(each_, { callback });
      },
    },
    to: {
      array: slice_,
    },
  });

  function s(...args) {
    return qs_(...args) || null;
  }

  function sa(...args) {
    return slice_(qsa_(...args));
  }

  function on(config) {
    // config: {target:'element', type:'event', callback: 'function', useCapture: 'boolean'}
    // q.on({
    //     target     : 'element',
    //     type       : 'click',
    //     callback   : (evt) => {},
    //     useCapture : false,
    // });
    return config.target.addEventListener(
      config.type || "click",
      config.callback,
      config.useCapture || false
    );
  }

  function off(config) {
    return config.target.removeEventListener(
      config.type || "click",
      config.callback,
      config.useCapture || false
    );
  }

  function ready(callback) {
    return "complete" === document.readyState
      ? callback(new Event("DOMContentLoaded"))
      : document.addEventListener("DOMContentLoaded", callback);
  }

  function each_(className, i, clsList) {
    return this.callback.call(this, className);
  }

  function id(id) {
    return byid_(id.replace(/^#?(.*)$/, (...args) => args[1])) || null;
  }

  function init_(target, setup) {
    Object.keys(setup).forEach(paste_, { target, setup });
    return target;
  }

  function paste_(prop) {
    this.target[prop] = this.setup[prop];
  }
})(document);

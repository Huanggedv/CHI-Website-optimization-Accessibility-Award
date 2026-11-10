/* dc-lite: a tiny runtime that renders the page template with live state.
   Supports {{path}} holes, <sc-for>, <sc-if>, on* event bindings and setState. */
(function () {
  'use strict';

  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (patch) {
    Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
    scheduleRender();
  };
  DCLogic.prototype.forceUpdate = function () { scheduleRender(); };

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;
  var tpl, root, comp, pending = false;

  function lookup(expr, scope) {
    expr = expr.trim();
    if (expr === 'true') return true;
    if (expr === 'false') return false;
    if (expr === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
    if (/^(['"]).*\1$/.test(expr)) return expr.slice(1, -1);
    var parts = expr.split('.');
    var v = scope[parts[0]];
    for (var i = 1; i < parts.length; i++) {
      if (v == null) return undefined;
      v = v[parts[i]];
    }
    return v;
  }
  function interp(str, scope) {
    return str.replace(HOLE, function (_, e) {
      var v = lookup(e, scope);
      return v == null ? '' : String(v);
    });
  }
  function rawOrString(str, scope) {
    var m = str.match(WHOLE);
    return m ? lookup(m[1], scope) : interp(str, scope);
  }

  function renderChildren(src, scope, parent, path) {
    var kids = src.childNodes, k = 0;
    for (var i = 0; i < kids.length; i++) k = renderNode(kids[i], scope, parent, path, k);
  }

  function renderNode(node, scope, parent, path, k) {
    if (node.nodeType === 3) {
      parent.appendChild(document.createTextNode(interp(node.nodeValue, scope)));
      return k;
    }
    if (node.nodeType !== 1) return k;
    var tag = node.localName;
    if (tag === 'helmet') return k;
    if (tag === 'sc-for') {
      var list = rawOrString(node.getAttribute('list') || '', scope) || [];
      var as = node.getAttribute('as') || 'item';
      for (var i = 0; i < list.length; i++) {
        var s = Object.create(scope);
        s[as] = list[i];
        s.$index = i;
        renderChildren(node, s, parent, path + '/' + k + '[' + i + ']');
      }
      return k + 1;
    }
    if (tag === 'sc-if') {
      if (rawOrString(node.getAttribute('value') || '', scope)) renderChildren(node, scope, parent, path + '/' + k + 'if');
      return k + 1;
    }
    var el = node.namespaceURI && node.namespaceURI !== 'http://www.w3.org/1999/xhtml'
      ? document.createElementNS(node.namespaceURI, node.localName)
      : document.createElement(tag);
    var myPath = path + '/' + k;
    el.setAttribute('data-dc-path', myPath);
    for (var a = 0; a < node.attributes.length; a++) {
      var at = node.attributes[a], name = at.name, val = at.value;
      if (name.indexOf('hint-') === 0) continue;
      if (name.length > 2 && name.indexOf('on') === 0 && WHOLE.test(val)) {
        var fn = lookup(val.match(WHOLE)[1], scope);
        if (typeof fn === 'function') {
          var ev = name.slice(2).toLowerCase();
          if (ev === 'change' && (tag === 'input' || tag === 'textarea')) ev = 'input';
          el.addEventListener(ev, fn);
        }
        continue;
      }
      var out = rawOrString(val, scope);
      if (name === 'value' && (tag === 'input' || tag === 'textarea')) { el.value = out == null ? '' : out; continue; }
      if (out === false || out == null) continue;
      el.setAttribute(name, String(out));
    }
    renderChildren(node, scope, el, myPath);
    parent.appendChild(el);
    return k + 1;
  }

  function render() {
    pending = false;
    var active = document.activeElement, focusPath = null, selS = null, selE = null;
    if (active && root.contains(active)) {
      focusPath = active.getAttribute('data-dc-path');
      try { selS = active.selectionStart; selE = active.selectionEnd; } catch (e) {}
    }
    var vals = comp.renderVals ? comp.renderVals() : {};
    var frag = document.createDocumentFragment();
    renderChildren(tpl.content, vals, frag, '');
    root.replaceChildren(frag);
    if (focusPath) {
      var again = root.querySelector('[data-dc-path="' + focusPath + '"]');
      if (again) {
        again.focus({ preventScroll: true });
        try { if (selS != null) again.setSelectionRange(selS, selE); } catch (e) {}
      }
    }
  }
  function scheduleRender() {
    if (pending) return;
    pending = true;
    (window.requestAnimationFrame || setTimeout)(render);
  }

  function boot() {
    tpl = document.getElementById('dc-template');
    root = document.getElementById('dc-root');
    var helmet = tpl.content.querySelector('helmet');
    if (helmet) Array.prototype.slice.call(helmet.children).forEach(function (n) {
      document.head.appendChild(n.cloneNode(true));
    });
    var code = document.querySelector('script[data-dc-script]').textContent;
    var Component = new Function('DCLogic', code + '\nreturn Component;')(DCLogic);
    comp = new Component({});
    render();
    if (comp.componentDidMount) comp.componentDidMount();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

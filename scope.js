/**
 * Scope.js By Matthew A. Tavares
 * See https://github.com/badbadnotgood/scope.js for documentation
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var $S = Scope = {
  
  _scopes: {
    global: {
      name: '',
      callback: null
    }
  },
  _current: {},
  _callback: {},
  
  init: function(scope) {
    if ($.isPlainObject(scope)) {
      for (s in scope) break;
      this._current[s] = scope[s]
      this._scopes[s] = {name: s, callback: null}
    } else {
      this._current['global'] = scope
    }
  },

  set: function(scope, callback) {
    if ($.isPlainObject(scope)) {
      for (s in scope) break;
      this._scopes[s] = {name: scope[s], callback: callback}
      if (this._current[s] && this._current[s] != scope[s]) {
        if ($.isFunction(this._callback[s])) {
          this._callback[s].apply(null, [scope[s], this._current[s]])
        }
        if ($.isFunction(this._scopes[s].callback)) {
          this._scopes[s].callback.apply(null, [scope[s], this._current[s]])
        }
      }
      this._current[s] = scope[s]
    } else {
      this.set({global: scope}, callback)
    }
  },
  
  is: function(scope, scope2) {
    if (scope2) {
      return (this._current[scope] == scope2)
    } else {
      return this.is('global', scope)
    }
  },
  
  callback: function(scope, func) {
    if ($.isFunction(scope)) {
      this._callback['global'] = scope
    } else {
      this._callback[scope] = func
    }
  }
}
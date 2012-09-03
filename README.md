scope.js
========

`scope.js` is a simple javascript library for managing a general, application-wide scope.  Best used for websites with tabbing or a lot of content being shown / hidden on the same page.

##Why Use Scopes?

Scopes make the management of content that is constantly shown / hidden from the users view easier by triggering callbacks every time a scope changes.  Let's say you have an application with View A, B, C and D but only one view is shown at a time (maybe the others are loaded via AJAX).  What if you wanted your web app to have different functionality on view B than on view C, D and A, well with `scope.js` its as easy as adding one line of code.

##Usage

To use `scope.js` simply include it in your documents `<head>` section along with `jquery.js`.  Because scopes are relative to whatever page your on you must set what the first scope is by using the init function.  The scope class can be accesed with `Scope` or `$S`.
  
```
$S.init("about-page")
```

Then you can add your callbacks by using the `$S.callback()` function, please note that callbacks are only called when the scope is changed.

```
$S.callback(function(new_scope, last_scope) {
  // Callback code here involving transition between scopes
  // Like fadeIns..fadeOuts... keyboard shortcut changes
  // Saving data, etc...
})
```

You can set the scope in your document by using the `S.set()` function.

```
<a href="#" onclick="$S.set('contact-page')">Contact Page</a>
<a href="#" onclick="$S.set('about-page')">About Page</a>
```

##Scopes with...Scopes

Lets say you have a really complicated admin page with lots of different pages being loaded and hidden and lots of data saving in the background, you can use scopes.js to manage multiple scopes so you know exactly where your user is in the context of your page.  Scoping scopes is simple, just supply a hash to any of the $S functions.

```
$S.init({pages: 'about'})
$S.set({pages: 'contact'})
```
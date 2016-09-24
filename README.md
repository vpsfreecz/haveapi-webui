HaveAPI WebUI
=============

Generic web UI for any [HaveAPI](https://github.com/vpsfreecz/haveapi)
based API. The user can browse through all accessible API resources, invoke
actions and set and view action parameters.

It uses [haveapi-client-js](https://github.com/vpsfreecz/haveapi-client-js) to
communicate with the API servers (currently it needs `haveapi-client-js` from `master`).

Demo
----

 - API independent: https://projects.vpsfree.cz/haveapi-webui/master/general/
 - Aimed at api.vpsfree.cz: https://projects.vpsfree.cz/haveapi-webui/master/vpsfree/

Build
-----

Install all dependencies and [webpack](https://webpack.github.io/). Run `webpack`
in the project directory:

    $ npm install && npm install -g webpack
    $ webpack

Deployment
----------

Copy contents of [dist/](dist/) to the web server or open `dist/index.html` in the
browser directly.

Configuration
-------------

See [haveapi-webui.config.js](haveapi-webui.config.js). Generally, the UI can
ask for URL of the API server you wish to work with or it can be built with
a specific API URL.

Note that the app must be rebuilt for the config changes to take effect.

License
-------

HaveAPI WebUI is released under the MIT license.

HaveAPI WebUI
=============

Generic web UI for any [HaveAPI](https://github.com/vpsfreecz/haveapi)
based API. The user can browse through all accessible API resources, invoke
actions and set and view action parameters. It can be built to run from any
directory, locally or being served by a web server.

It uses [haveapi-client-js](https://github.com/vpsfreecz/haveapi-client-js) to
communicate with the API servers.

Demo
----

All versions of `haveapi-webui` are available at https://webui.haveapi.org.
If you wish to try it with an existing API, enter `https://api.vpsfree.cz` as the API
URL.

Build
-----

Install all dependencies and run `gulp` in the project directory.

    $ npm install && npm install -g gulp
    $ gulp

Deployment
----------

Copy contents of [dist/](dist/) to the web server or open `dist/index.html` in the
browser directly.

Configuration
-------------

`haveapi-webui` can ask for URL of the API server you wish to work with or it
can be built with a specific API URL. It is also possible to select which
history type to use -- hash history working everywhere and browser history
for production use.

See [haveapi-webui.config.js](haveapi-webui.config.js) for more information.
Note that the app must be rebuilt for the config changes to take effect.

License
-------

HaveAPI WebUI is released under the MIT license.

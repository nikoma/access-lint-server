# AccessLint Server

A lightweight AccessLint Server.

## Deployment to Heroku

Instructions based on [this post](https://gist.github.com/edelpero/9257311),

Create a new server and configure it to use the multi-buildpack:

```bash
$ heroku create myserver
$ heroku config:set BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

Create a `.buildpacks` file with this content:

```
https://github.com/heroku/heroku-buildpack-ruby
https://github.com/stomita/heroku-buildpack-phantomjs
```

Configure the PhantomJS dependencies

```bash
$ heroku config:set PATH="/usr/local/bin:/usr/bin:/bin:/app/vendor/phantomjs/bin"
$ heroku config:set LD_LIBRARY_PATH=/usr/local/lib:/usr/lib:/lib:/app/vendor/phantomjs/lib
```

Deploy your server

```bash
git push heroku master
```

## Usage

Currently the server's only endpoint is the `check?url=URL` URL, which will check the given
web page and return the results in JSON format.

Example:

https://access-lint-server-demo.herokuapp.com/check?url=http://validationhell.com

# AccessLint Server

A lightweight AccessLint Server.

[AccessLint](https://github.com/accesslint/access_lint) is a great Ruby gem that
lets you check for accessibility issues on web pages.

This gem encapsulates Google Chrome's [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools), which are
executed via [PhantomJS](http://phantomjs.org/).

As including these dependencies on an existing project might be a too heavy load,
following the microservices approach it's better to move this part to an independent
server.

AccessLint Server is just that, a lightweight Sinatra app that gives you the results
of the accessibility audits.

## Setup

To set up this on your development machine you'll need to install [PhantomJS](http://phantomjs.org/download.html) and then:

```bash
$ git clone https://github.com/sitevalidator/access-lint-server
$ cd access-lint-server
$ bundle install
```

After that, you can launch the server with:

```bash
$ bundle exec rackup
```

## Deployment to Heroku

Instructions are based on [this post](https://gist.github.com/edelpero/9257311).

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

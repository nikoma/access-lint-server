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

http://access-lint-server-demo.herokuapp.com/check?url=http://validationhell.com

This will return the following results in JSON format:

```json
 {
  "NA": [{
    "element_names": [],
    "severity": "Warning",
    "status": "NA",
    "title": "aria-owns should not be used if ownership is implicit in the DOM"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "NA",
    "title": "Audio elements should have controls"
  }, {
    "element_names": [],
    "severity": "Severe",
    "status": "NA",
    "title": "ARIA state and property values must be valid"
  }, {
    "element_names": [],
    "severity": "Severe",
    "status": "NA",
    "title": "Elements with ARIA roles must use a valid, non-abstract ARIA role"
  }, {
    "element_names": [],
    "severity": "Severe",
    "status": "NA",
    "title": "Controls and media elements should have labels"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "NA",
    "title": "role=main should only appear on significant elements"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "NA",
    "title": "An element's ID must not be present in more that one aria-owns attribute at any time"
  }, {
    "element_names": [],
    "severity": "Severe",
    "status": "NA",
    "title": "ARIA attributes which refer to other elements by ID should refer to elements which exist in the DOM"
  }, {
    "element_names": [],
    "severity": "Severe",
    "status": "NA",
    "title": "Elements with ARIA roles must have all required attributes for that role"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "NA",
    "title": "Avoid positive integer values for tabIndex"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "NA",
    "title": "Video elements should use <track> elements to provide captions"
  }],
  "PASS": [{
    "element_names": [],
    "severity": "Warning",
    "status": "PASS",
    "title": "The web page should have the content's human language indicated in the markup"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "PASS",
    "title": "Meaningful images should not be used in element backgrounds"
  }, {
    "element_names": [],
    "severity": "Warning",
    "status": "PASS",
    "title": "The web page should have a title that describes topic or purpose"
  }],
  "FAIL": [{
    "element_names": ["<img src=\"/images/fire.png\" align=\"absmiddle\" width=\"30\" hspace=\"5\">", "<img src=\"/images/nuke.gif\" width=\"100%\" vspace=\"8\">"],
    "severity": "Warning",
    "status": "FAIL",
    "title": "Images should have an alt attribute"
  }, {
    "element_names": ["<a href=\"/pages/abyss/1\">\n            </a>", "<a href=\"/pages/abyss/1\">\n\n            </a>", "<a href=\"/pages/abyss/1\">\n              </a>", "<a href=\"https://app.sitevalidator.com/s/cbf35b792a90aa46958f83ca015a08cbe5f72ae9\">\n      \n    </a>"],
    "severity": "Warning",
    "status": "FAIL",
    "title": "The purpose of each link should be clear from the link text"
  }, {
    "element_names": ["<a href=\"https://app.sitevalidator.com/s/cbf35b792a90aa46958f83ca015a08cbe5f72ae9\" class=\"label label-success\">Click here to see the validation report for this whole site</a>", "<li class=\"nav-header\">Some wrong pages</li>", "<a href=\"/pages/faqs\">FAQs</a>", "<a href=\"/pages/agent\">User Agent</a>", "<a href=\"/pages/how\">How to survive</a>", "<a href=\"/pages/why\">Why nobody validates</a>", "<a href=\"/pages/circle/1\">Limbo</a>", "<a href=\"/pages/circle/2\">Lust</a>", "<a href=\"/pages/circle/3\">Gluttony</a>", "<a href=\"/pages/circle/4\">Greed</a>", "<a href=\"/pages/circle/5\">Anger</a>", "<a href=\"/pages/circle/6\">Heresy</a>", "<a href=\"/pages/circle/7\">Violence</a>", "<a href=\"/pages/circle/8\">Fraud</a>", "<a href=\"/pages/circle/9\">Treachery</a>", "<a href=\"/pages/abyss/1\">Enter the Abyss...</a>", "<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\"http://validationhell.com\" data-via=\"SiteValidator\" data-hashtags=\"w3c\">Tweet</a>", "<a href=\"https://sitevalidator.com\">Validate your entire sites with a single click.</a>"],
    "severity": "Warning",
    "status": "FAIL",
    "title": "Text elements should have a reasonable contrast ratio"
  }]
}
```

var AccessibilityAudit = {
  init: function( config ) {
    this.url         = config.url;
    this.template    = config.template;
    this.container   = config.container;

    this.getAuditResults();
  },

  getAuditResults: function() {
    $.ajax({
      url: "/check?url="+$('#results').data('url'),
      context: this,

      success: function(results) {
        var source   = $(this.template).html();
        var template = Handlebars.compile(source);
        $(this.container).html(template(results));

        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      },

      error: function(results) {
        $(this.container).html("<p><i class='fa fa-frown-o'></i> We're sorry, but the audit failed. Try again in a few minutes.</p>")
      }
      // TODO: handle failure
    });
  }
}

$(function() {
  AccessibilityAudit.init({
    url:         'http://jaimeiniesta.com',
    template:    '#results-template',
    container:   '#results'
  });
});

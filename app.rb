require 'sinatra'
require 'access_lint'
require 'json'

VERSION = "0.1.0"

before do
  @url = params[:url]
end

# Audit results
get '/audit' do
  erb :audit
end

# Returns access_lint results as JSON
get '/check' do
  @results = AccessLint::Audit.new(@url).run

  content_type :json
  @results.to_json
end

helpers do
  def h(text)
    Rack::Utils.escape_html(text)
  end
end

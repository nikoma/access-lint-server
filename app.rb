require 'sinatra'
require 'access_lint'
require 'json'

get '/check' do
  @url      = params[:url]
  @results  = AccessLint::Audit.new(@url).run

  content_type :json
  @results.to_json
end

require 'sinatra'
require 'mongo'

set :bind, '0.0.0.0'
set :port, 3004

# MongoDB connection
client = Mongo::Client.new(['mongo_db:27017'], database: 'my_movies')
collection = client[:my_movies]

get '/' do
  'Hello, this is your Sinatra web application!'
end

get '/randommoviesids' do
  # Get 5 random movie IDs from the MongoDB collection
  random_movie_ids = collection.aggregate([{ '$sample': { 'size': 5 } }]).to_a.map { |doc| doc['id'].to_i }

  # Return the result as JSON
  { ids: random_movie_ids }.to_json
end

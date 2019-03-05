class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :hq, :image_url
  has_many :users
end

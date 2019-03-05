class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :distance, :stroke 
  has_many :user_events
  has_many :users, through: :user_events
end

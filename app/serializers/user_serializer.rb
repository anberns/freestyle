class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :team, :events 
  belongs_to :team
  has_many :user_events 
  has_many :events, through: :user_events
end

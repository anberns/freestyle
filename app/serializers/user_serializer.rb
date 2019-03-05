class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :team
end

class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :distance, :stroke
end

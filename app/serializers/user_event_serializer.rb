class UserEventSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :event_id, :personal_record
end

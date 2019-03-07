class Event < ApplicationRecord
  has_many :user_events
  has_many :users, through: :user_events, dependent: :destroy

  validates :distance, presence: true
  validates :stroke, presence: true

  scope :filter_by_distance, ->(distance) {where("distance <= ?", distance)}
  scope :filter_by_stroke, ->(stroke) {where("stroke = ?", stroke.downcase)}

  def self.sort
    sorted_events = Event.all.sort_by { |event| event.distance }
  end
end

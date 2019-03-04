class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true 
  validates :email, presence: true, uniqueness: true

  belongs_to :team
  has_many :swimmer_events
  has_many :events, through: :swimmer_events, dependent: :destroy
  # can remove
  accepts_nested_attributes_for :events

end

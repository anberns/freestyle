class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true 
  validates :email, presence: true, uniqueness: true

  belongs_to :team
  has_many :user_events
  has_many :events, through: :user_events, dependent: :destroy

end

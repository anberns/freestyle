class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer "distance"
      t.string "stroke"

      t.timestamps
    end
  end
end

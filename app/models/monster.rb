class Monster < ApplicationRecord
  belongs_to :game
  belongs_to :room, optional: true

  before_create :set_characteristics

  delegate :name, :fighting_strength, :magical_power, :hostile, :indifferent, :friendly, :points, :buy_points, :max_load, to: :monster_details

  def monster_details
    @monster_details ||= MonsterContext.details_for(self)
  end

  private

  def set_characteristics
    p 'set_characteristics'
    monster = MonsterContext.random_monster
    self.slug = monster.slug
  end
end

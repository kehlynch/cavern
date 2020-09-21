class Monster < ApplicationRecord
  belongs_to :game
  belongs_to :room, optional: true

  before_create :set_characteristics

  delegate :name, :fighting_strength, :magical_power, :hostile_roll, :indifferent_roll, :friendly_roll, :points, :buy_points, :max_load, to: :monster_details

  def monster_details
    @monster_details ||= MonsterContext.details_for(self)
  end

  def make_hostile!
    self.hostile = true
    save
  end

  private

  def set_characteristics
    p 'set_characteristics'
    unless slug
      monster = MonsterContext.random_monster
      self.slug = monster.slug
    end

    if hostile_roll.length == 6
      self.hostile = true
    end
  end
end

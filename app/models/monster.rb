class Monster < ApplicationRecord
  belongs_to :game
  belongs_to :room, optional: true

  before_create :set_characteristics

  private

  def set_characteristics
    p 'set_characteristics'
    monster = MonsterGenerator.random_monster
    self.slug = monster.slug
    self.fighting_strength = monster.fighting_strength
    self.magical_power = monster.magical_power
    self.hostile = monster.hostile
    self.indifferent = monster.indifferent
    self.friendly = monster.friendly
    self.points = monster.points
    self.max_load = monster.max_load
  end
end

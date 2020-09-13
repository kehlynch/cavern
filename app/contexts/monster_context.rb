module MonsterContext
  MONSTER_CLASSES = [
    Hero,
    Ranger
  ].freeze

  def self.random_monster
    Hero.new
  end

  def self.details_for(monster)
    MONSTER_CLASSES.find { |m| monster.slug == m.slug }.new
  end
end

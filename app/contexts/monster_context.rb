module MonsterContext
  MONSTER_CLASSES = [
    Adventurer, Dragon, Dwarf, Giant, Hero, Ogre, Priest, Ranger, Sibyl,
    Sourcerer, Spectre, Troll, Wanderer, Wizard
  ].freeze

  def self.random_monster
    MONSTER_CLASSES.map do |c|
      c.relative_probability.times.collect { c }
    end.flatten.sample.new
  end

  def self.details_for(monster)
    MONSTER_CLASSES.find { |m| monster.slug == m.slug }.new
  end

  def self.pickable_slugs
    MONSTER_CLASSES.select { |m| m.buy_points }.map(&:slug)
  end
end

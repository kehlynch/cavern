class BaseItem
  attr_reader :slug, :name, :weight, :points

  def self.slug
    name.underscore
  end

  def initialize(name:, weight:, points:)
    @slug = self.class.slug
    @name = name
    @weight = weight
    @points = points
  end

  def special
    'When you wish to open it, roll a die...'
  end

  def self.relative_probability
    10
  end
end

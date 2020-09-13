class BaseMonster
  attr_reader :slug, :name, :fighting_strength, :magical_power, :hostile, :indifferent, :friendly, :points, :buy_points, :max_load

  def self.slug
    name.underscore
  end

  def initialize(name:, fighting_strength:, magical_power:, hostile:, indifferent:, friendly:, points:, buy_points:, max_load:)
    @slug = self.class.slug
    @name = name
    @fighting_strength = fighting_strength
    @magical_power = magical_power
    @hostile = hostile
    @indifferent = indifferent
    @friendly = friendly
    @points = points
    @buy_points = buy_points
    @max_load = max_load
  end
end

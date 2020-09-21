class BaseMonster
  attr_reader :slug, :name, :fighting_strength, :magical_power, :hostile, :indifferent, :friendly, :points, :max_load

  delegate :buy_points, to: :class

  def self.slug
    name.underscore
  end

  def self.relative_probability
    10
  end

  def self.buy_points
    nil
  end

  def initialize(name:, fighting_strength:, magical_power:, hostile:, indifferent:, friendly:, points:, max_load:)
    @slug = self.class.slug
    @name = name
    @fighting_strength = fighting_strength
    @magical_power = magical_power
    @hostile = hostile.is_a?(Range) ? hostile.to_a : [hostile]
    @indifferent = indifferent.is_a?(Range) ? indifferent.to_a : [indifferent]
    @friendly = friendly.is_a?(Range) ? friendly.to_a : [friendly]
    @points = points
    @max_load = max_load
  end
end

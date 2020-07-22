class Monsters::BaseMonster
  attr_reader :slug, :fighting_strength, :magical_power, :hostile, :indifferent, :friendly, :points, :max_load

  def initialize(slug:, fighting_strength:, magical_power:, hostile:, indifferent:, friendly:, points:, max_load:)
    @slug = slug
    @fighting_strength = fighting_strength
    @magical_power = magical_power
    @hostile = hostile
    @indifferent = indifferent
    @friendly = friendly
    @points = points
    @max_load = max_load
  end
end

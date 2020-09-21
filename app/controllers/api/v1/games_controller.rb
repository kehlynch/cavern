class Api::V1::GamesController < ApplicationController
  before_action :find_game, only: [:update, :show]

  def index
    games = Game.all.order(created_at: :desc)
    render json: games
  end

  def create
    p '***create'
    player = Player.create(name: game_params[:name])
    @game = Game.create!(player: player)
    set_game_cookie(@game)
    set_player_cookie(player)
    render_game
  end

  def show
    render_game
  end

  def update
    case game_params[:actionx]
    when 'move'
      @game.move!(game_params[:direction])
      render_game
    when 'party'
      game_params[:friends].each do |monster_slug|
        Monster.create(game: @game, slug: monster_slug, in_party: true)
      end
      @game.update(party_picked: true)
      render_game
    when 'fight'
      @game.current_room.monsters.each(&:make_hostile!)
      render_game
    end
  end

  def pickable
    render(
      json: MonsterContext.pickable_slugs.map { |s| Monster.new(slug: s) },
      only: [:slug],
      methods: [:name, :fighting_strength, :magical_power, :hostile_roll, :indifferent_roll, :friendly_roll, :points, :buy_points, :max_load]
    )
  end

  def destroy
  end

  private

  def render_game
    @game.reload
    render(
      json: @game,
      only: [:rooms, :current_room, :party_picked],
      methods: :choices,
      include: {
        friends: {
          only: [:id, :slug],
          methods: [:name, :fighting_strength, :magical_power, :points, :buy_points]
        },
        rooms: {
          only: [:id, :doors, :stairs_up, :stairs_down, :current]
        },
        current_room: {
          only: [:id, :doors, :stairs_up, :stairs_down, :current],
          include: {
            monsters: {
              only: [:id, :slug],
              methods: [:name, :fighting_strength, :magical_power, :hostile_roll, :indifferent_roll, :friendly_roll, :points, :buy_points, :max_load, :hostile]
            },
            items: {
              only: [:id, :slug],
              methods: [:name, :points, :weight]
            }
          }
        }
      }
    )
  end

  def game_params
    params.permit(:name, :actionx, :direction, :id, game: {}, friends: [])
  end
end

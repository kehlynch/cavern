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
    if game_params[:actionx] == 'move'
      @game.move!(game_params[:direction])
      @game.reload
      render_game
    end
  end

  def destroy
  end

  private

  def render_game
    render(
      json: @game,
      only: [:rooms, :current_room],
      include: {
        rooms: {
          only: [:id, :doors, :stairs_up, :stairs_down, :current]
        },
        current_room: {
          only: [:id, :doors, :stairs_up, :stairs_down, :current],
          include: {
            monsters: {
              only: [:id, :slug],
              methods: [:name, :fighting_strength, :magical_power, :hostile, :indifferent, :friendly, :points, :buy_points, :max_load]
            }
          }
        }
      }
    )
  end

  def game_params
    params.permit(:name, :actionx, :direction, :id, game: {})
  end
end

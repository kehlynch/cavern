class Api::V1::GamesController < ApplicationController
  before_action :find_game, only: :update

  def index
    games = Game.all.order(created_at: :desc)
    render json: games
  end

  def create
    p '***create'
    player = Player.create(name: game_params[:name])
    game = Game.create!(player: player)
    set_game_cookie(game)
    set_player_cookie(player)
    render json: game, include: [:current_room, :rooms]
  end

  def show
  end

  def update
    if game_params[:actionx] == 'move'
      @game.move!(game_params[:direction])
      @game.reload
      render json: @game, include: [:current_room, :rooms]
    end
  end

  def destroy
  end

  private

  def game_params
    params.permit(:name, :actionx, :direction, :id, game: {})
  end
end

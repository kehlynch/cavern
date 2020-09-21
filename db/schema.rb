# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_13_134001) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.boolean "party_picked", default: false
    t.index ["player_id"], name: "index_games_on_player_id"
  end

  create_table "items", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "room_id"
    t.bigint "monster_id"
    t.string "slug"
    t.index ["game_id"], name: "index_items_on_game_id"
    t.index ["monster_id"], name: "index_items_on_monster_id"
    t.index ["room_id"], name: "index_items_on_room_id"
  end

  create_table "monsters", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "room_id"
    t.string "slug"
    t.boolean "in_party"
    t.index ["game_id"], name: "index_monsters_on_game_id"
    t.index ["room_id"], name: "index_monsters_on_room_id"
  end

  create_table "players", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "rooms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_id"
    t.integer "doors", default: [], array: true
    t.integer "x_location"
    t.integer "y_location"
    t.integer "level"
    t.boolean "stairs_up", default: false
    t.boolean "stairs_down", default: false
    t.boolean "current", default: false
    t.index ["game_id"], name: "index_rooms_on_game_id"
  end

end

-- This file is the border outside all modules
{--
Import List
--}


module L03G1Border exposing (Model, Msg(..), init, main, myShapes, update, view)

import Html exposing (Attribute, Html, div, input)
import Html.Attributes
import Html.Events exposing (onInput, onMouseDown, onMouseUp)
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)


myShapes model =
    [ roundedRect 230 10 2 |> filled lightGray |> move ( 0, 66.9 )
    , rect 230 3 |> filled white |> move ( 0, 63 )
    , rect 230 0.5 |> filled gray |> move ( 0, 64.5 )
    , roundedRect 230 144 2 |> outlined (solid 0.5) darkGray
    , text "Linear Transformation Math Visualizer Ver 1.0"
        |> sansserif
        |> centered
        |> size 6
        |> filled black
        |> move ( 0, 66 )
    ]


type Msg
    = Tick Float GetKeyState


type alias Model =
    { time : Float }


update msg model =
    case msg of
        Tick t _ ->
            ( { model | time = t }, Cmd.none )


init =
    { time = 0 }


main : EllieAppWithTick () Model Msg
main =
    ellieAppWithTick Tick
        { init =
            \_ ->
                ( init
                  -- this is the initial state, like you are used to
                , Cmd.none
                )

        -- no requests at this time
        , update = update
        , view = \model -> { title = "Game Slot", body = view model }
        , subscriptions = \_ -> Sub.none
        }


view model =
    collage 232 145 (myShapes model)

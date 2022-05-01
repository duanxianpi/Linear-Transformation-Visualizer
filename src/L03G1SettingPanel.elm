-- This file is the TransPanel Background
{--
Import List
--}


module L03G1SettingPanel exposing (Model, Msg(..), init, main, myShapes, update, view)

import Html exposing (Attribute, Html, div, input)
import Html.Attributes
import Html.Events exposing (onInput, onMouseDown, onMouseUp)
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)


myShapes model =
    [ html 90
        130
        (div
            [ Html.Attributes.style "box-shadow" "rgb(0 0 0 / 25%) 2px 2px 5px 0px"
            , Html.Attributes.style "width" "80px"
            , Html.Attributes.style "height" "120px"
            , Html.Attributes.style "border-radius" "3px"
            ]
            []
        )
        |> move ( -105, 60 )
    , roundedRect 80 120 3
        |> outlined (solid 0.5) gray
        |> move ( -65, 0 )
    , text "Settings" |> sansserif |> centered |> size 8 |> filled black |> move ( -65, 49 )
    , text "Angle unit" |> sansserif |> size 6 |> filled black |> move ( -100, 37 )
    , text "Showing pervious" |> sansserif |> size 4 |> filled black |> move ( -100, 27 )
    , text "shapes while editting" |> sansserif |> size 4 |> filled black |> move ( -100, 22 )
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

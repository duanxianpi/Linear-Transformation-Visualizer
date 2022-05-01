-- This file is the TransPanel Background
{--
Import List
--}


module L03G1TransPanel exposing (Model, Msg(..), init, main, myShapes, update, view)

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
    , roundedRect 80 120 3 |> outlined (solid 0.5) gray |> move ( -65, 0 )
    , text "Transformation" |> centered |> sansserif |> size 7 |> filled black |> move ( -65, 49 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -90, 40 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -76, 40 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -81, 40 - 2 )
    , text "Scale X" |> centered |> sansserif |> size 4 |> filled white |> move ( -92, 38.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -50, 40 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -50 + 14, 40 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -50 + 9, 40 - 2 )
    , text "Scale Y" |> centered |> sansserif |> size 4 |> filled white |> move ( -52, 38.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -90, 20 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -76, 20 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -81, 20 - 2 )
    , text "Shear X" |> centered |> sansserif |> size 4 |> filled white |> move ( -92, 18.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -50, 20 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -50 + 14, 20 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -50 + 9, 20 - 2 )
    , text "Shear Y" |> centered |> sansserif |> size 4 |> filled white |> move ( -52, 18.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -90, 0 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -76, 0 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -81, 0 - 2 )
    , text "Rotate" |> centered |> sansserif |> size 4 |> filled white |> move ( -92, -1.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -50, 0 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -50 + 14, 0 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -50 + 9, 0 - 2 )
    , text "Reflect Origin" |> centered |> sansserif |> size 3 |> filled white |> move ( -52, -1.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -90, -20 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -76, -20 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -81, -20 - 2 )
    , text "Reflect X" |> centered |> sansserif |> size 4 |> filled white |> move ( -92, -21.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -50, -20 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -50 + 14, -20 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -50 + 9, -20 - 2 )
    , text "Reflect Y" |> centered |> sansserif |> size 4 |> filled white |> move ( -52, -21.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -90, -40 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -76, -40 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -81, -40 - 2 )
    , text "Reflect Y=X" |> centered |> sansserif |> size 3 |> filled white |> move ( -92, -41.5 - 2 )
    , roundedRect 22 8 1.5 |> filled (rgb 26 30 35) |> move ( -50, -40 - 2 )
    , roundedRect 14 8 1.5 |> filled (rgb 196 196 196) |> move ( -50 + 14, -40 - 2 )
    , rect 4 8 |> filled (rgb 196 196 196) |> move ( -50 + 9, -40 - 2 )
    , text "Reflect Y=-X" |> centered |> sansserif |> size 3 |> filled white |> move ( -52, -41.5 - 2 )
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

-- This file is the GridPanel Background
{--
Import List
--}


module L03G1GridPanel2 exposing (Model, Msg(..), axis, getDelta, grid, init, main, myShapes, scaleNegativeNumberX, scaleNegativeNumberY, scalePositiveNumberX, scalePositiveNumberY, update, view)

import Html exposing (Attribute, Html, div, input)
import Html.Attributes
import Html.Events exposing (onInput, onMouseDown, onMouseUp)
import Round
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)


myShapes model dx dy scale =
    [ html 150
        150
        (div
            [ Html.Attributes.style "box-shadow" "rgb(0 0 0 / 25%) 2px 2px 5px 0px"
            , Html.Attributes.style "width" "120px"
            , Html.Attributes.style "height" "120px"
            , Html.Attributes.style "border-radius" "3px"
            ]
            []
        )
        |> move ( -15, 60 )
    , grid dx dy scale |> move ( 45, 0 )
    , roundedRect 120 120 3 |> outlined (solid 0.5) gray |> move ( 45, 0 )
    ]


getDelta d =
    ((d / 7.5) - toFloat (floor (d / 7.5))) * 7.5


grid dx dy scale =
    let
        gridHLines =
            List.map
                (\x ->
                    line ( -60 - 7.5 + getDelta dx, 60 + getDelta dy - toFloat x * 7.5 ) ( 67.5 + getDelta dx, 60 + getDelta dy - toFloat x * 7.5 )
                        |> outlined (solid 0.5) gray
                )
                (List.range -1 17)

        gridHLinesS =
            List.map
                (\x ->
                    line ( -60 - 7.5 + getDelta dx, 60 + getDelta dy + 3.75 - toFloat x * 7.5 ) ( 67.5 + getDelta dx, 60 + getDelta dy + 3.75 - toFloat x * 7.5 )
                        |> outlined (solid 0.5) lightGray
                )
                (List.range 0 17)

        gridVLines =
            List.map
                (\x ->
                    line ( 60 + getDelta dx - toFloat x * 7.5, 67.5 + getDelta dy ) ( 60 + getDelta dx - toFloat x * 7.5, -60 - 7.5 + getDelta dy )
                        |> outlined (solid 0.5) gray
                )
                (List.range -1 17)

        gridVLinesS =
            List.map
                (\x ->
                    line ( 60 + getDelta dx + 3.75 - toFloat x * 7.5, 67.5 + getDelta dy ) ( 60 + getDelta dx + 3.75 - toFloat x * 7.5, -60 - 7.5 + getDelta dy )
                        |> outlined (solid 0.5) lightGray
                )
                (List.range 0 17)
    in
    [ clip (ghost (roundedRect 120 120 3)) (gridHLinesS |> group)
    , clip (ghost (roundedRect 120 120 3)) (gridVLinesS |> group)
    , clip (ghost (roundedRect 120 120 3)) (gridHLines |> group)
    , clip (ghost (roundedRect 120 120 3)) (gridVLines |> group)
    , axis dx dy scale
    ]
        |> group


axis dx dy scale =
    [ clip (ghost (roundedRect 120 120 3)) (rect 120 0.01 |> outlined (solid 0.5) black |> move ( 0, dy ))
    , clip (ghost (roundedRect 120 120 3)) (rect 120 0.01 |> outlined (solid 0.5) black |> rotate (degrees 90) |> move ( dx, 0 ))
    , clip (ghost (roundedRect 120 120 3)) (scalePositiveNumberX scale dx |> group |> move ( 0, -3 ) |> move ( dx, dy ))
    , clip (ghost (roundedRect 120 120 3)) (scaleNegativeNumberX scale dx |> group |> move ( -1, -3 ) |> move ( dx, dy ))
    , clip (ghost (roundedRect 120 120 3)) (scalePositiveNumberY scale dy |> group |> move ( -3, 0 ) |> move ( dx, dy ))
    , clip (ghost (roundedRect 120 120 3)) (scaleNegativeNumberY scale dy |> group |> move ( -5, 0 ) |> move ( dx, dy ))
    ]
        |> group


scalePositiveNumberX scale dx =
    let
        maxNum =
            ceiling ((60.0 - dx) / 7.5 / 2)
    in
    List.map
        (\x ->
            [ rect 3.5 5 |> filled white
            , text (Round.round 2 (toFloat x * scale)) |> size 4.5 |> centered |> filled black |> move ( 0, -1.5 )
            ]
                |> group
                |> move ( 7.5 * toFloat x, 0 )
        )
        (List.map (\x -> 2 * x)
            (List.range
                (if dx > -78.75 then
                    1

                 else
                    maxNum - 8
                )
                maxNum
            )
        )


scaleNegativeNumberX scale dx =
    let
        maxNum =
            floor ((-60.0 - dx) / 7.5 / 2)
    in
    List.map
        (\x ->
            [ rect 3.5 5 |> filled white
            , text (Round.round 2 (toFloat x * scale)) |> size 4.5 |> centered |> filled black |> move ( 0, -1.5 )
            ]
                |> group
                |> move ( 7.5 * toFloat x, 0 )
        )
        (List.map (\x -> 2 * x)
            (List.range maxNum
                (if dx > 78.75 then
                    maxNum + 8

                 else
                    -1
                )
            )
        )


scalePositiveNumberY scale dy =
    let
        maxNum =
            ceiling ((60.0 - dy) / 7.5 / 2)
    in
    List.map
        (\x ->
            [ rect 3.5 5 |> filled white
            , text (Round.round 2 (toFloat x * scale)) |> size 4.5 |> alignRight |> filled black |> move ( 2, -2 )
            ]
                |> group
                |> move ( 0, 7.5 * toFloat x )
        )
        (List.map (\x -> 2 * x)
            (List.range
                (if dy > -78.75 then
                    1

                 else
                    maxNum - 8
                )
                maxNum
            )
        )


scaleNegativeNumberY scale dy =
    let
        maxNum =
            floor ((-60.0 - dy) / 7.5 / 2)
    in
    List.map
        (\x ->
            [ rect 3.5 5 |> filled white
            , text (Round.round 2 (toFloat x * scale)) |> size 4.5 |> alignRight |> filled black |> move ( 4, -2 )
            ]
                |> group
                |> move ( 0, 7.5 * toFloat x )
        )
        (List.map (\x -> 2 * x)
            (List.range maxNum
                (if dy > 78.75 then
                    maxNum + 8

                 else
                    -1
                )
            )
        )


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
    collage 232 145 (myShapes model 0 0 (1 / 3))

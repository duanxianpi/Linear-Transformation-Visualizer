{--
Import List
L03G1MatrixModel2 38
--}


module L03ResultPanel exposing (Model, Msg(..), init, main, myShapes, update, view)

import Html exposing (Attribute, Html, div, input)
import Html.Attributes
import Html.Events exposing (onInput, onMouseDown, onMouseUp)
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)
import L03G1MatrixModel2 exposing (..)

myShapes model page =
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
    , text "Calculation" |> centered |> sansserif |> size 7 |> filled black |> move ( -65, 49 )
    , case page of
        1 ->
            [ text "We know the formula of matrix"
                |> alignLeft
                |> sansserif
                |> size 5
                |> filled black
                |> move ( -100.5, 40 )
            , text "transformation is"
                |> alignLeft
                |> sansserif
                |> size 5
                |> filled black
                |> move ( -100.5, 35 )
            , L03G1MatrixModel2.latex2Svg "T(x)=Ax" |> move ( -140+63, 38 )
            , text "Ax is the mutiple of two matrix"
                |> alignLeft
                |> sansserif
                |> size 5
                |> filled black
                |> move ( -100.5, 20 )
            , L03G1MatrixModel2.latex2Svg "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}\\begin{bmatrix}e&f\\\\g&h\\end{bmatrix} =" |> move ( -140+43, 20 )
            , L03G1MatrixModel2.latex2Svg "\\small\\begin{bmatrix}a*e+b*g & a*f+b*h\\\\c*e+d*g & c*f+d*h\\end{bmatrix}" |> move (-140+43, 3 )
            , text "Now let calculate all the "
                |> alignLeft
                |> sansserif
                |> size 5
                |> filled black
                |> move ( -100.5, -25 )
            , text "transformation matrices we have "
                |> alignLeft
                |> sansserif
                |> size 5
                |> filled black
                |> move ( -100.5, -30 )
            ]
                |> group

        2 ->
            [ L03G1MatrixModel2.latex2Svg "A = " |> move ( -100, 50 )
            ]
                |> group

        _ ->
            [] |> group
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
    collage 232 145 (myShapes model 2)

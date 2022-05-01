-- This file is for the palettle background


module L03G1Palette exposing (Model, Msg(..), blackPalette, colorPalette, fromColorToPaletteX, fromPaletteXToColor, init, main, myShapes, stopList, stopListBW, update, view)

import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)

myShapes model =
    [ rect 68 7 |> filled colorPalette |> move ( -63.5, -31 )
    , rect 68 7 |> outlined (solid 1) gray |> move ( -63.5, -31 )
    , rect 68 7 |> filled colorPalette |> move ( -63.5, -45 )
    , rect 68 7 |> outlined (solid 1) gray |> move ( -63.5, -45 )
    ]


colorPalette =
    gradient stopList


blackPalette =
    gradient stopListBW


stopList =
    [ stop (rgb 0 0 0) 0
    , stop (rgb 255 0 0) 8.5
    , stop (rgb 255 255 0) 17
    , stop (rgb 0 255 0) 25.5
    , stop (rgb 0 255 255) 34
    , stop (rgb 0 0 255) 42.5
    , stop (rgb 255 0 255) 51
    , stop (rgb 255 0 0) 59.5
    , stop (rgb 255 255 255) 68
    ]


stopListBW =
    [ stop (rgb 0 0 0) 0
    , stop (rgb 255 255 255) 25.5
    ]


fromPaletteXToColor x =
    let
        rX =
            x + 97.5

        scaleX =
            rX / 8.5
    in
    if rX >= 0 && rX < 8.5 then
        ( 255 * scaleX, 0, 0 )

    else if rX >= 8.5 && rX < 17 then
        ( 255, (scaleX - 1) * 255, 0 )

    else if rX >= 17 && rX < 25.5 then
        ( 255 - (scaleX - 2) * 255, 255, 0 )

    else if rX >= 25.5 && rX < 34 then
        ( 0, 255, (scaleX - 3) * 255 )

    else if rX >= 34 && rX < 42.5 then
        ( 0, 255 - (scaleX - 4) * 255, 255 )

    else if rX >= 42.5 && rX < 51 then
        ( (scaleX - 5) * 255, 0, 255 )

    else if rX >= 51 && rX < 59.5 then
        ( 255, 0, 255 - (scaleX - 6) * 255 )

    else if rX >= 59.5 && rX < 68 then
        ( 255, (scaleX - 7) * 255, (scaleX - 7) * 255 )

    else if rX == 68 then
        ( 255, 255, 255 )

    else
        ( 0, 0, 0 )


fromColorToPaletteX ( r, g, b ) =
    if abs (g - 0) < 0.0000001 && abs (b - 0) < 0.0000001 then
        ((r / 255) + 0) * 8.5 - 97.5

    else if abs (r - 255) < 0.0000001 && abs (b - 0) < 0.0000001 then
        ((g / 255) + 1) * 8.5 - 97.5

    else if abs (g - 255) < 0.0000001 && abs (b - 0) < 0.0000001 then
        (((255 - r) / 255) + 2) * 8.5 - 97.5

    else if abs (r - 0) < 0.0000001 && abs (g - 255) < 0.0000001 then
        ((b / 255) + 3) * 8.5 - 97.5

    else if abs (r - 0) < 0.0000001 && abs (b - 255) < 0.0000001 then
        (((255 - g) / 255) + 4) * 8.5 - 97.5

    else if abs (b - 255) < 0.0000001 && abs (g - 0) < 0.0000001 then
        ((r / 255) + 5) * 8.5 - 97.5

    else if abs (r - 255) < 0.0000001 && abs (g - 0) < 0.0000001 then
        (((255 - b) / 255) + 6) * 8.5 - 97.5

    else if abs (r - 255) < 0.0000001 then
        ((b / 255) + 7) * 8.5 - 97.5

    else
        -29.5


type Msg
    = Tick Float GetKeyState


type alias Model =
    { time : Float }


update msg model =
    case msg of
        Tick t _ ->
            ( { time = t }, Cmd.none )


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
    collage 232 142 (myShapes model)

-- This file is our custom shape type


module L03G1ShapeModel exposing (CustomShape, Model, Msg(..), init, main, myShapes, update, view)

import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)

myShapes model =
    []


type alias CustomShape =
    { name : String, points : List ( Float, Float ), shapeColor : ( Float, Float, Float ), outputColor : ( Float, Float, Float ) }


type Msg
    = Tick Float GetKeyState


type alias Model =
    { time : Float }


update msg model =
    case msg of
        Tick t _ ->
            { time = t }


init =
    { time = 0 }


main =
    gameApp Tick { model = init, view = view, update = update, title = "Game Slot" }


view model =
    collage 192 128 (myShapes model)

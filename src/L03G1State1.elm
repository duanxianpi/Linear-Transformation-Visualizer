-- The first state of program, editing shape and showing the graph
{--
Import List
L03G1ShapeModel 9
L03G1ShapesPanel 236
L03G1GridPanel2 79
ICONS 142
L03G1EditShapePanel 82
L03G1Palette 66
L03G1Border 51
L03G1SettingPanel 16
--}


module L03G1State1 exposing (GridPanelMsg(..), GridState(..), Model, Msg(..), Palette1State(..), Palette2State(..), ShapePanelMsg(..), State(..), getColor, getElement, getFromDict, init, main, moveCoor, myShapes, roundCoor, roundFloatTo05, setElement, settingChangeArrow, shapeVertex, shapeWidget, toGirdCoor, toGirdX, toGirdY, toRoundedCoor, toViewCoor, toViewX, toViewY, update, view)

import Dict exposing (Dict)
import Html exposing (Attribute, Html, div, input)
import Html.Attributes
import Html.Events exposing (onInput, onMouseDown, onMouseUp)
import Json.Decode as Decode exposing (Decoder)
import Round
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)
import L03G1ShapeModel exposing (..)
import L03G1ShapesPanel exposing (..)
import L03G1GridPanel2 exposing (..)
import ICONS exposing (..)
import L03G1EditShapePanel exposing (..)
import L03G1Palette exposing (..)
import L03G1Border exposing (..)
import L03G1SettingPanel exposing (..)

myShapes model =
    [ L03G1Border.myShapes model |> group
    , L03G1GridPanel2.myShapes model model.gridDX model.gridDY model.scaleGrid |> group
    , roundedRect 120 120 3
        |> filled (rgba 0 0 0 0)
        |> move ( 45, 0 )
        |> notifyMouseMoveAt ShowingCoordinate
        |> notifyMouseDownAt (\x -> GPMsg (GridDraggedAt x))
        |> notifyMouseMoveAt (\x -> GPMsg (GridDragging x))
        |> notifyMouseUp (GPMsg GridReleasing)
        |> notifyLeave (GPMsg GridReleasing)

    -- Show current Coordinate at buttom right
    , text (roundCoor 4 ( model.x, model.y ))
        |> size 6
        |> alignRight
        |> filled black
        |> move ( 105, -69 )

    -- Some hints
    , text
        (if model.state == EidtingShapeState then
            "Hold Ctrl Key to Snap the Point!"

         else
            "Try Dragging the Graph!"
        )
        |> size 5
        |> filled black
        |> move ( -15, -66 )
    , text
        (if model.state == EidtingShapeState then
            "Hold Shift Key and Drag the Graph!"

         else
            ""
        )
        |> size 5
        |> filled black
        |> move ( -15, -70.5 )
    , case model.state of
        AddingShapeState ->
            [ L03G1ShapesPanel.myShapes model |> group
            , ICONS.gear
                |> scale 0.4
                |> scale (getFromDict "gearScale" model.btnScaleDict)
                |> notifyEnter (ScaleBtn "gearScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
                |> notifyTap (SPMsg ToSetting)
                |> move ( -96, 50 )
            , ICONS.plus
                |> scale 0.4
                |> scale (getFromDict "plusScale" model.btnScaleDict)
                |> move ( -33, 51.5 )
            , rect 10 10
                |> filled (rgba 0 0 0 0)
                |> move ( -33, 51.5 )
                |> notifyTap (SPMsg AddShape)
                |> notifyEnter (ScaleBtn "plusScale" 1.2)
                |> notifyLeave CancelScale

            -- Shape Widget
            , List.map
                (\( i, s ) ->
                    shapeWidget i s.name s.shapeColor s.outputColor model
                        |> move ( -65, toFloat i * -25 + 32 )
                )
                model.indexedShapeList
                |> group

            -- Display Current shapes
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                ((model.shapeList
                    |> List.map (\x -> ( x.points, x.shapeColor ))
                    |> List.map (\( point, color ) -> openPolygon (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> outlined (solid 0.8) (getColor color))
                 )
                    |> group
                )

            -- Verteies of current shapes
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                ((model.shapeList
                    |> List.map .points
                    |> List.map (\point -> List.map (\x -> shapeVertex x 1 (getFromDict (Debug.toString x) model.btnScaleDict)) (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> group)
                 )
                    |> group
                )

            -- Highlight Shape
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                (openPolygon (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) model.highLightShape.points) |> outlined (solid 2) (getColor model.highLightShape.shapeColor))
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                (List.map (\x -> circle 2 |> filled (rgb 94 92 230) |> move x) (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) model.highLightShape.points) |> group)
            ]
                |> group

        EidtingShapeState ->
            [ L03G1EditShapePanel.myShapes model |> group

            -- Palette
            , L03G1Palette.myShapes model |> group
            , roundedRect 1 9 1
                |> filled gray
                |> addOutline (solid 0.5) (rgb 100 100 100)
                |> move ( model.palette1X, -31 )
                |> notifyMouseDown (SPMsg Grabbing1)

            -- Palette 1
            , case model.palette1State of
                Grabbed1 ->
                    [ rect 232 142 |> filled (rgba 0 0 0 0)
                    ]
                        |> group
                        |> notifyMouseUp (SPMsg Stop1)
                        |> notifyLeave (SPMsg Stop1)
                        |> notifyMouseMoveAt (\x -> SPMsg (MoveFloater1 x))
                        |> notifyMouseMoveAt (\x -> SPMsg (GetBaseColor1 x))
                        |> notifyMouseMoveAt (\x -> SPMsg (DataChanged model.tempShape.name model.tempShape.points model.tempColor model.tempShape.outputColor))

                _ ->
                    [] |> group
            , roundedRect 1 9 1
                |> filled gray
                |> addOutline (solid 0.5) (rgb 100 100 100)
                |> move ( model.palette2X, -45 )
                |> notifyMouseDown (SPMsg Grabbing2)

            -- Palette 2
            , case model.palette2State of
                Grabbed2 ->
                    [ rect 232 142 |> filled (rgba 0 0 0 0)
                    ]
                        |> group
                        |> notifyMouseUp (SPMsg Stop2)
                        |> notifyLeave (SPMsg Stop2)
                        |> notifyMouseMoveAt (\x -> SPMsg (MoveFloater2 x))
                        |> notifyMouseMoveAt (\x -> SPMsg (GetBaseColor2 x))
                        |> notifyMouseMoveAt (\x -> SPMsg (DataChanged model.tempShape.name model.tempShape.points model.tempShape.shapeColor model.tempColor))

                _ ->
                    [] |> group

            -- Change Shape Name
            , html 500
                100
                (div []
                    [ div []
                        [ input
                            [ Html.Attributes.placeholder "Enter the name"
                            , if model.tempShape.name /= "Shape\u{205F}\u{202F}\u{200B}" then
                                Html.Attributes.value model.tempShape.name

                              else
                                Html.Attributes.style "border" "0"
                            , onInput (\x -> SPMsg (DataChanged x model.tempShape.points model.tempShape.shapeColor model.tempShape.outputColor))
                            , Html.Attributes.type_ "text"
                            , Html.Attributes.style "text-align" "center"
                            , Html.Attributes.style "align" "center"
                            , Html.Attributes.maxlength 15
                            , Html.Attributes.style "width" "100px"
                            , Html.Attributes.style "background-color" "transparent"
                            , Html.Attributes.style "border" "0"
                            , Html.Attributes.style "outline" "none"
                            , Html.Attributes.style "font-family" "sans-serif"
                            ]
                            []
                        ]
                    ]
                )
                |> scale 0.6
                |> move ( -97, 57.5 )

            -- Show all the exist coordinate
            , (List.take 6 model.tempShape.points
                |> List.indexedMap Tuple.pair
                |> List.map
                    (\( i, point ) ->
                        text (String.fromInt (i + 1) ++ ". " ++ roundCoor 2 point)
                            |> alignLeft
                            |> size 5
                            |> filled black
                            |> move ( -97.5, 28 - toFloat i * 8 )
                    )
              )
                |> group
            , ((model.tempShape.points |> List.drop 6 |> List.take 5)
                |> List.indexedMap Tuple.pair
                |> List.map
                    (\( i, point ) ->
                        text (String.fromInt (i + 7) ++ ". " ++ roundCoor 2 point)
                            |> alignLeft
                            |> size 5
                            |> filled black
                            |> move ( -62.5, 28 - toFloat i * 8 )
                    )
              )
                |> group
            , if List.length model.tempShape.points > 11 then
                text "..." |> size 10 |> filled black |> move ( -62.5, -12 )

              else
                [] |> group

            -- Confirm and Discard Button for editing shape
            , ICONS.check
                |> scale 0.4
                |> scale (getFromDict "checkScale" model.btnScaleDict)
                |> move ( -35, -54 )
            , rect 10 8
                |> filled (rgba 0 0 0 0)
                |> move ( -33, -53 )
                |> notifyTap (SPMsg ConfirmChangeE)
                |> notifyEnter (ScaleBtn "checkScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
            , ICONS.xmark
                |> scale 0.3
                |> scale (getFromDict "xmarkScale" model.btnScaleDict)
                |> move ( -96, -55 )
            , rect 8 8
                |> filled (rgba 0 0 0 0)
                |> move ( -95, -54 )
                |> notifyTap (SPMsg DiscardChangeE)
                |> notifyEnter (ScaleBtn "xmarkScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
            , if getFromDict "SPSWE" model.settingsDict == 1.0 then
                [ -- Display Current shapes
                  clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                    ((model.shapeList
                        |> List.map (\x -> ( x.points, x.shapeColor ))
                        |> List.map (\( point, color ) -> openPolygon (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> outlined (solid 0.8) (getColor color))
                     )
                        |> group
                    )

                -- Verteies of current shapes
                , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                    ((model.shapeList
                        |> List.map .points
                        |> List.map (\point -> List.map (\x -> shapeVertex x 1 (getFromDict (Debug.toString x) model.btnScaleDict)) (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> group)
                     )
                        |> group
                    )
                ]
                    |> group

              else
                [] |> group

            -- Show the graph
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                (openPolygon (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) model.tempShape.points) |> outlined (solid 0.8) (getColor model.tempShape.shapeColor))

            -- Show the vetex of graph
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                (List.map (\x -> circle 1 |> filled (rgb 94 92 230) |> move x) (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) model.tempShape.points) |> group)

            -- The point following which pointer
            , circle 1 |> filled (rgb 94 92 230) |> move (toViewCoor model.scaleGrid ( model.x, model.y ) model.gridDX model.gridDY)
            , roundedRect 120 120 3
                |> filled (rgba 0 0 0 0)
                |> move ( 45, 0 )
                |> notifyMouseMoveAt ShowingCoordinate
                |> notifyMouseMoveAt (\x -> GPMsg (GridDragging x))
                |> notifyMouseUp (GPMsg GridReleasing)
                |> notifyLeave (GPMsg GridReleasing)
                |> (if model.isShift then
                        notifyMouseDownAt (\x -> GPMsg (GridDraggedAt x))

                    else
                        notifyTapAt
                            (\x ->
                                SPMsg
                                    (DataChanged model.tempShape.name
                                        (List.reverse
                                            ((if model.isCtrl then
                                                toRoundedCoor model.scaleGrid x model.gridDX model.gridDY

                                              else
                                                toGirdCoor model.scaleGrid x model.gridDX model.gridDY
                                             )
                                                :: List.reverse model.tempShape.points
                                            )
                                        )
                                        model.tempShape.shapeColor
                                        model.tempShape.outputColor
                                    )
                            )
                   )

            -- Undo and Redo
            , ICONS.undo
                |> scale 0.3
                |> scale (getFromDict "undoScale" model.btnScaleDict)
                |> move ( -3.5, 47 )
            , rect 7 7
                |> filled (rgba 0 0 0 0)
                |> move ( -3.5, 49 )
                |> notifyTap (SPMsg Undo)
                |> notifyEnter (ScaleBtn "undoScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
            , ICONS.redo
                |> scale 0.3
                |> scale (getFromDict "redoScale" model.btnScaleDict)
                |> move ( -4.5, 37 )
            , rect 7 7
                |> filled (rgba 0 0 0 0)
                |> move ( -4.5, 39 )
                |> notifyTap (SPMsg Redo)
                |> notifyEnter (ScaleBtn "redoScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
            ]
                |> group

        SettingState ->
            [ L03G1SettingPanel.myShapes model |> group

            -- Display Current shapes
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                ((model.shapeList
                    |> List.map (\x -> ( x.points, x.shapeColor ))
                    |> List.map (\( point, color ) -> openPolygon (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> outlined (solid 0.8) (getColor color))
                 )
                    |> group
                )

            -- Verteies of current shapes
            , clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                ((model.shapeList
                    |> List.map .points
                    |> List.map (\point -> List.map (\x -> shapeVertex x 1 (getFromDict (Debug.toString x) model.btnScaleDict)) (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> group)
                 )
                    |> group
                )

            -- Setting Relative Code
            , settingChangeArrow "RotateMode" model.btnScaleDict model.settingsDict
            , text
                (if getFromDict "RotateMode" model.settingsDict == 1.0 then
                    "Degrees"

                 else
                    "Radians"
                )
                |> bold
                |> filled black
                |> scale 0.5
                |> move ( -56.5, 37 )
            , settingChangeArrow "SPSWE" model.btnScaleDict model.settingsDict |> move ( 0, -13 )
            , text
                (if getFromDict "SPSWE" model.settingsDict == 1.0 then
                    "Yes"

                 else
                    "No"
                )
                |> bold
                |> filled black
                |> scale 0.5
                |> move ( -56.5, 24 )

            -- Confirm and Discard Button for settings
            , ICONS.check
                |> scale 0.4
                |> scale (getFromDict "checkScale" model.btnScaleDict)
                |> move ( -35, -54 )
            , rect 10 8
                |> filled (rgba 0 0 0 0)
                |> move ( -33, -53 )
                |> notifyTap (SPMsg ConfirmChangeS)
                |> notifyEnter (ScaleBtn "checkScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
            , ICONS.xmark
                |> scale 0.3
                |> scale (getFromDict "xmarkScale" model.btnScaleDict)
                |> move ( -96, -55 )
            , rect 8 8
                |> filled (rgba 0 0 0 0)
                |> move ( -95, -54 )
                |> notifyTap (SPMsg DiscardChangeS)
                |> notifyEnter (ScaleBtn "xmarkScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
            ]
                |> group

    -- Zoom In/Out and Home Button
    , ICONS.zoomIn
        |> scale 0.3
        |> scale (getFromDict "zoomInScale" model.btnScaleDict)
        |> move ( 96, 50 )
        |> makeTransparent
            (if model.scaleGrid == (1 / 32) then
                0

             else
                1
            )
    , rect 8 8
        |> filled (rgba 0 0 0 0)
        |> move ( 97, 49 )
        |> notifyEnter (ScaleBtn "zoomInScale" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (GPMsg (GridScale (model.scaleGrid * 0.5)))
    , ICONS.zoomOut
        |> scale 0.3
        |> scale (getFromDict "zoomOutScale" model.btnScaleDict)
        |> move ( 96, 40 )
        |> makeTransparent
            (if model.scaleGrid == 32 then
                0

             else
                1
            )
    , rect 8 8
        |> filled (rgba 0 0 0 0)
        |> move ( 97, 39 )
        |> notifyEnter (ScaleBtn "zoomOutScale" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (GPMsg (GridScale (model.scaleGrid * 2)))
    , ICONS.home
        |> scale 0.35
        |> scale (getFromDict "homeScale" model.btnScaleDict)
        |> move ( 97, 28 )
    , rect 8 8
        |> filled (rgba 1 1 11 0)
        |> move ( 97, 29 )
        |> notifyEnter (ScaleBtn "homeScale" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (GPMsg ClearGridDelta)
    ]



-- Arrow to changing settings


settingChangeArrow key btnScaleDict settingsDict =
    [ triangle 10
        |> filled black
        |> scale (0.3 * getFromDict (key ++ "t1") btnScaleDict)
        |> move ( -32, 39 )
        |> notifyEnter (ScaleBtn (key ++ "t1") 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (SPMsg (ChangeSetting key (getFromDict key settingsDict)))
    , triangle 10
        |> filled black
        |> scale (0.3 * getFromDict (key ++ "t2") btnScaleDict)
        |> rotate (degrees 60)
        |> move ( -60, 39 )
        |> notifyEnter (ScaleBtn (key ++ "t2") 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (SPMsg (ChangeSetting key (getFromDict key settingsDict)))
    ]
        |> group



-- The Vertex of Shapes


shapeVertex coor r rscale =
    circle r
        |> filled (rgb 94 92 230)
        |> scale rscale
        |> move coor
        |> notifyEnter (ScaleBtn (Debug.toString coor) 1.75)
        |> notifyEnter (ShowingCoordinate coor)
        |> notifyLeave CancelScale



-- The Shape Widget


shapeWidget id name ( r1, g1, b1 ) ( r2, g2, b2 ) model =
    [ [ roundedRect 64 22 2 |> filled (rgba 0 0 0 0) |> addOutline (solid 0.35) darkGray
      , text name |> sansserif |> size 5 |> filled black |> move ( -28, 5 )
      , rect 5 5 |> filled (rgb r1 g1 b1) |> addOutline (solid 0.2) black |> move ( -25, 1 )
      , text ("(" ++ (round r1 |> String.fromInt) ++ "," ++ (round g1 |> String.fromInt) ++ "," ++ (round b1 |> String.fromInt) ++ ")")
            |> sansserif
            |> size 5
            |> filled (rgb r1 g1 b1)
            |> move ( -20, -0.5 )
      , rect 5 5 |> filled (rgb r2 g2 b2) |> addOutline (solid 0.2) black |> move ( -25, -6 )
      , text ("(" ++ (round r2 |> String.fromInt) ++ "," ++ (round g2 |> String.fromInt) ++ "," ++ (round b2 |> String.fromInt) ++ ")")
            |> sansserif
            |> size 5
            |> filled (rgb r2 g2 b2)
            |> move ( -20, -7.5 )
      ]
        |> group
        |> notifyEnter (SPMsg (Hignlighting id))
        |> notifyLeave (SPMsg CleanHignlighting)

    -- Editing the Shape
    , ICONS.pen
        |> scale 0.25
        |> scale (getFromDict ("penScale" ++ String.fromInt id) model.btnScaleDict)
        |> move ( 27, 5 )
    , rect 7 7
        |> filled (rgba 0 0 0 0)
        |> move ( 27.5, 6 )
        |> notifyTap (SPMsg (EditShape id))
        |> notifyEnter (ScaleBtn ("penScale" ++ String.fromInt id) 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale

    -- Delete the Shape
    , ICONS.trash
        |> scale 0.25
        |> scale (getFromDict ("trashScale" ++ String.fromInt id) model.btnScaleDict)
        |> move ( 27, -6.7 )
    , rect 7 7
        |> filled (rgba 0 0 0 0)
        |> move ( 27.5, -6 )
        |> notifyTap (SPMsg (DelShape id))
        |> notifyEnter (ScaleBtn ("trashScale" ++ String.fromInt id) 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
    ]
        |> group



-- Get Element from the list


getElement : Int -> List L03G1ShapeModel.CustomShape -> L03G1ShapeModel.CustomShape
getElement id list =
    let
        maybeElm =
            List.head (List.drop id list)
    in
    case maybeElm of
        Just elm ->
            elm

        Nothing ->
            { name = "ERROR!", points = [], shapeColor = ( 0, 0, 0 ), outputColor = ( 255, 0, 0 ) }



-- Set Element to the list


setElement : Int -> L03G1ShapeModel.CustomShape -> List L03G1ShapeModel.CustomShape -> List L03G1ShapeModel.CustomShape
setElement id elm list =
    List.append (List.take id list) (elm :: List.drop (id + 1) list)



-- Transfer the global X to the Grid X


toGirdX scale x dx =
    scale * ((2 * (x - dx)) / 15 - 6)



-- Transfer the global Y to the Grid Y


toGirdY scale y dy =
    scale * ((2 * (y - dy)) / 15)



-- Transfer the global Coor to the Grid Coor


toGirdCoor scale ( x, y ) dx dy =
    ( scale * ((2 * (x - dx)) / 15 - 6), scale * ((2 * (y - dy)) / 15) )



-- Snap the Coor to the nearest coor on the grid


toRoundedCoor scale ( x, y ) dx dy =
    ( (scale * ((2 * (x - dx)) / 15 - 6)) |> (\num -> roundFloatTo05 num scale), (scale * ((2 * (y - dy)) / 15)) |> (\num -> roundFloatTo05 num scale) )



-- Transfer the Grid X to the global X


toViewX scale x dx =
    scale * ((15 * x) / 2 + 45) + dx



-- Transfer the Grid Y to the global Y


toViewY scale y dy =
    scale * ((15 * y) / 2) + dy



-- Transfer the Grid Coor to the global Coor


toViewCoor scale ( x, y ) dx dy =
    ( ((15 * x / scale) / 2 + 45) + dx, ((15 * y / scale) / 2) + dy )


moveCoor ( x, y ) =
    ( x - 116, y - 71 )



-- Round a coor to string with a specific decimal


roundCoor d ( x, y ) =
    "(" ++ Round.round d x ++ "," ++ Round.round d y ++ ")"



-- Round a number to the nearest coor on the grid


roundFloatTo05 num scale =
    let
        dp =
            num - toFloat (floor (num / (scale / 2.0))) * (scale / 2.0)
    in
    if dp < 0.25 * scale then
        toFloat (floor (num / (scale / 2.0))) * (scale / 2.0)

    else if dp < 0.75 * scale then
        toFloat (floor (num / (scale / 2.0))) * (scale / 2.0) + 0.5 * scale

    else if dp > 0.75 * scale then
        toFloat (floor (num / (scale / 2.0))) * (scale / 2.0) + 1.0 * scale

    else
        num



-- Get a Color from r g b


getColor ( r, g, b ) =
    rgb r g b



-- Get the scale value from dict


getFromDict : String -> Dict String Float -> Float
getFromDict key dict =
    Maybe.withDefault 1.0 (Dict.get key dict)


type ShapePanelMsg
    = AddShape
    | DelShape Int
    | EditShape Int
    | ToSetting
    | ChangeSetting String Float
    | ConfirmChangeE
    | DiscardChangeE
    | ConfirmChangeS
    | DiscardChangeS
    | DataChanged String (List ( Float, Float )) ( Float, Float, Float ) ( Float, Float, Float )
    | GetBaseColor1 ( Float, Float )
    | GetBaseColor2 ( Float, Float )
    | MoveFloater1 ( Float, Float )
    | Grabbing1
    | Stop1
    | MoveFloater2 ( Float, Float )
    | Grabbing2
    | Stop2
    | Hignlighting Int
    | CleanHignlighting
    | Undo
    | Redo


type GridPanelMsg
    = GridDraggedAt ( Float, Float )
    | GridDragging ( Float, Float )
    | GridReleasing
    | GridScale Float
    | ClearGridDelta


type Msg
    = Tick Float GetKeyState
    | SPMsg ShapePanelMsg
    | ShowingCoordinate ( Float, Float )
    | ScaleBtn String Float
    | CancelScale
    | GPMsg GridPanelMsg
    | UpdateSetting (Dict String Float)
    | UpdateGridProps Float Float Float


type State
    = AddingShapeState
    | EidtingShapeState
    | SettingState


type Palette1State
    = Waiting1
    | Grabbed1


type Palette2State
    = Waiting2
    | Grabbed2


type GridState
    = GridWaiting
    | GridDragged


type alias Model =
    { time : Float
    , state : State
    , shapeList : List L03G1ShapeModel.CustomShape
    , indexedShapeList : List ( Int, L03G1ShapeModel.CustomShape )
    , tempShape : L03G1ShapeModel.CustomShape
    , currentChangedID : Int
    , x : Float
    , y : Float
    , palette1X : Float
    , palette1State : Palette1State
    , palette2X : Float
    , palette2State : Palette2State
    , tempColor : ( Float, Float, Float )
    , highLightShape : L03G1ShapeModel.CustomShape
    , historyList : List ( Float, Float )
    , isCtrl : Bool
    , isShift : Bool
    , gridDX : Float
    , gridDY : Float
    , globalX : Float
    , globalY : Float
    , gridState : GridState
    , perGridDX : Float
    , perGridDY : Float
    , btnScaleDict : Dict String Float
    , scaleGrid : Float
    , oldSettingsDict : Dict String Float
    , settingsDict : Dict String Float
    }


update msg model =
    case msg of
        Tick t ( keys, _, _ ) ->
            ( { model
                | time = t
                , indexedShapeList = List.indexedMap Tuple.pair model.shapeList
                , isCtrl =
                    if keys Ctrl == Down then
                        True

                    else if keys Ctrl == Up then
                        False

                    else
                        model.isCtrl
                , isShift =
                    if keys Shift == Down then
                        True

                    else if keys Shift == Up then
                        False

                    else
                        model.isShift
              }
            , Cmd.none
            )

        SPMsg spMsg ->
            case spMsg of
                AddShape ->
                    ( { model
                        | shapeList =
                            if List.length model.shapeList < 4 then
                                List.reverse
                                    ({ name = "Shape\u{205F}\u{202F}\u{200B}"
                                     , points = []
                                     , shapeColor = ( 0, 0, 0 )
                                     , outputColor = ( 255, 0, 0 )
                                     }
                                        :: List.reverse model.shapeList
                                    )

                            else
                                model.shapeList
                      }
                    , Cmd.none
                    )

                DelShape id ->
                    ( { model | shapeList = List.append (List.take id model.shapeList) (List.drop (id + 1) model.shapeList) }, Cmd.none )

                EditShape id ->
                    ( { model
                        | state = EidtingShapeState
                        , tempShape = getElement id model.shapeList
                        , currentChangedID = id
                        , palette1X = L03G1Palette.fromColorToPaletteX (getElement id model.shapeList).shapeColor
                        , palette2X = L03G1Palette.fromColorToPaletteX (getElement id model.shapeList).outputColor
                      }
                    , Cmd.none
                    )

                ToSetting ->
                    ( { model
                        | state = SettingState
                        , oldSettingsDict = model.settingsDict
                      }
                    , Cmd.none
                    )

                ChangeSetting key value ->
                    ( { model
                        | settingsDict =
                            Dict.insert key
                                (if value == 0.0 then
                                    1.0

                                 else
                                    0.0
                                )
                                model.settingsDict
                      }
                    , Cmd.none
                    )

                ConfirmChangeE ->
                    ( { model
                        | state = AddingShapeState
                        , shapeList = setElement model.currentChangedID model.tempShape model.shapeList
                      }
                    , Cmd.none
                    )

                DiscardChangeE ->
                    ( { model | state = AddingShapeState }
                    , Cmd.none
                    )

                ConfirmChangeS ->
                    ( { model
                        | state = AddingShapeState
                      }
                    , Cmd.none
                    )

                DiscardChangeS ->
                    ( { model
                        | state = AddingShapeState
                        , settingsDict = model.oldSettingsDict
                      }
                    , Cmd.none
                    )

                DataChanged newName newPoints newC1 newC2 ->
                    ( { model
                        | tempShape =
                            { name = newName
                            , points = newPoints
                            , shapeColor = newC1
                            , outputColor = newC2
                            }
                        , historyList = newPoints
                      }
                    , Cmd.none
                    )

                GetBaseColor1 ( _, _ ) ->
                    let
                        rX =
                            model.palette1X + 97.5

                        scaleX =
                            rX / 8.5
                    in
                    ( { model
                        | tempColor = L03G1Palette.fromPaletteXToColor model.palette1X
                      }
                    , Cmd.none
                    )

                Grabbing1 ->
                    ( { model | palette1State = Grabbed1 }, Cmd.none )

                MoveFloater1 ( x, _ ) ->
                    ( { model
                        | palette1X =
                            if x < -97.5 then
                                -97.5

                            else if x > -29.5 then
                                -29.5

                            else
                                x
                      }
                    , Cmd.none
                    )

                Stop1 ->
                    ( { model | palette1State = Waiting1 }, Cmd.none )

                GetBaseColor2 ( _, _ ) ->
                    let
                        rX =
                            model.palette2X + 97.5

                        scaleX =
                            rX / 8.5
                    in
                    ( { model
                        | tempColor = L03G1Palette.fromPaletteXToColor model.palette2X
                      }
                    , Cmd.none
                    )

                Grabbing2 ->
                    ( { model | palette2State = Grabbed2 }, Cmd.none )

                MoveFloater2 ( x, _ ) ->
                    ( { model
                        | palette2X =
                            if x < -97.5 then
                                -97.5

                            else if x > -29.5 then
                                -29.5

                            else
                                x
                      }
                    , Cmd.none
                    )

                Stop2 ->
                    ( { model | palette2State = Waiting2 }, Cmd.none )

                Hignlighting id ->
                    ( { model | highLightShape = getElement id model.shapeList }, Cmd.none )

                CleanHignlighting ->
                    ( { model | highLightShape = { name = "", points = [], shapeColor = ( 0, 0, 0 ), outputColor = ( 255, 0, 0 ) } }, Cmd.none )

                Undo ->
                    ( { model
                        | tempShape =
                            { name = model.tempShape.name
                            , points = model.tempShape.points |> List.reverse |> List.drop 1 |> List.reverse
                            , shapeColor = model.tempShape.shapeColor
                            , outputColor = model.tempShape.outputColor
                            }
                      }
                    , Cmd.none
                    )

                Redo ->
                    ( { model
                        | tempShape =
                            { name = model.tempShape.name
                            , points = List.append model.tempShape.points (model.historyList |> List.drop (List.length model.tempShape.points) |> List.take 1)
                            , shapeColor = model.tempShape.shapeColor
                            , outputColor = model.tempShape.outputColor
                            }
                      }
                    , Cmd.none
                    )

        ShowingCoordinate ( newX, newY ) ->
            if model.isCtrl then
                ( { model
                    | x = roundFloatTo05 (toGirdX model.scaleGrid newX model.gridDX) model.scaleGrid
                    , y = roundFloatTo05 (toGirdY model.scaleGrid newY model.gridDY) model.scaleGrid
                  }
                , Cmd.none
                )

            else
                ( { model
                    | x = toGirdX model.scaleGrid newX model.gridDX
                    , y = toGirdY model.scaleGrid newY model.gridDY
                  }
                , Cmd.none
                )

        ScaleBtn name scale ->
            ( { model | btnScaleDict = Dict.insert name scale model.btnScaleDict }, Cmd.none )

        CancelScale ->
            ( { model | btnScaleDict = ICONS.emptyDict }, Cmd.none )

        GPMsg gpMsg ->
            case gpMsg of
                GridDraggedAt ( nx, ny ) ->
                    ( { model | globalX = nx, globalY = ny, gridState = GridDragged }, Cmd.none )

                GridDragging ( x, y ) ->
                    case model.gridState of
                        GridWaiting ->
                            ( model, Cmd.none )

                        GridDragged ->
                            ( { model | gridDX = model.perGridDX + x - model.globalX, gridDY = model.perGridDY + y - model.globalY }, Cmd.none )

                GridReleasing ->
                    ( { model | perGridDX = model.gridDX, perGridDY = model.gridDY, gridState = GridWaiting }, Cmd.none )

                ClearGridDelta ->
                    ( { model | globalX = 0, globalY = 0, gridDX = 0, gridDY = 0, perGridDX = 0, perGridDY = 0, gridState = GridWaiting, scaleGrid = 1 }, Cmd.none )

                GridScale scale ->
                    ( { model
                        | scaleGrid =
                            if scale > 32 then
                                32

                            else if scale < (1 / 32) then
                                1 / 32

                            else
                                scale
                      }
                    , Cmd.none
                    )

        UpdateSetting settings ->
            ( { model | settingsDict = settings }, Cmd.none )

        UpdateGridProps dx dy scale ->
            ( { model | gridDX = dx, gridDY = dy, scaleGrid = scale }, Cmd.none )


init =
    { time = 0
    , state = AddingShapeState
    , shapeList = []
    , indexedShapeList = []
    , tempShape = { name = "", points = [], shapeColor = ( 0, 0, 0 ), outputColor = ( 255, 0, 0 ) }
    , currentChangedID = 0
    , x = 0
    , y = 0
    , palette1X = -97.5
    , palette1State = Waiting1
    , palette2X = -97.5
    , palette2State = Waiting2
    , tempColor = ( 0, 0, 0 )
    , highLightShape = { name = "", points = [], shapeColor = ( 0, 0, 0 ), outputColor = ( 255, 0, 0 ) }
    , historyList = []
    , isCtrl = False
    , isShift = False
    , globalX = 0
    , globalY = 0
    , gridDX = 0
    , gridDY = 0
    , gridState = GridWaiting
    , perGridDX = 0
    , perGridDY = 0
    , btnScaleDict = ICONS.emptyDict
    , scaleGrid = 1
    , oldSettingsDict = Dict.fromList []
    , settingsDict = Dict.fromList [ ( "RotateMode", 1.0 ), ( "SPSWE", 0.0 ) ]
    }


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

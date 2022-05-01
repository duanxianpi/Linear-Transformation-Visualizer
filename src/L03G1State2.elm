-- The second state of program, applying transformation and showing the graph
{--
Import List
L03G1ShapeModel 9
L03G1GridPanel2 79
ICONS 142
L03G1TransPanel 77
L03G1MatrixModel2 73
L03G1Border 51
L03G1SettingPanel 16
--}


module L03G1State2 exposing (GridPanelMsg(..), GridState(..), Model, Msg(..), State(..), buttonPressDecoder, buttonUpDecoder, getColor, getFromDict, init, main, matrices, moveCoor, myShapes, numbers, onKeyDown, onKeyUp, roundCoor, roundFloatTo05, settingChangeArrow, shapeVertex, textTF, toGirdCoor, toGirdX, toGirdY, toRoundedCoor, toViewCoor, toViewX, toViewY, update, view)

import Dict exposing (Dict)
import Html exposing (Attribute, Html, div, input)
import Html.Attributes
import Html.Events exposing (onInput, onMouseDown, onMouseUp)
import Json.Decode as Decode exposing (Decoder)
import Round
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)
import L03G1ShapeModel exposing (..)
import L03G1GridPanel2 exposing (..)
import ICONS exposing (..)
import L03G1TransPanel exposing (..)
import L03G1MatrixModel2 exposing (..)
import L03G1Border exposing (..)
import L03G1SettingPanel exposing (..)

myShapes model =
    [ case model.state of
        TransState ->
            [ matrices model
            , L03G1TransPanel.myShapes model |> group
            , numbers model
            , textTF model
            , ICONS.gear
                |> scale 0.4
                |> scale (getFromDict "gearScale" model.btnScaleDict)
                |> notifyEnter (ScaleBtn "gearScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
                |> notifyTap ToSetting
                |> move ( -96, 50 )
            , ICONS.trash
                |> scale 0.4
                |> scale (getFromDict "trashScale" model.btnScaleDict)
                |> notifyEnter (ScaleBtn "trashScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap ResetMatraix
                |> move ( -35, 50 )
            ]
                |> group

        SettingState ->
            [ L03G1SettingPanel.myShapes model |> group

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
                |> notifyTap ConfirmChangeS
                |> notifyEnter (ScaleBtn "checkScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
                |> notifyTap UpdateTransMatrix
            , ICONS.xmark
                |> scale 0.3
                |> scale (getFromDict "xmarkScale" model.btnScaleDict)
                |> move ( -96, -55 )
            , rect 8 8
                |> filled (rgba 0 0 0 0)
                |> move ( -95, -54 )
                |> notifyTap DiscardChangeS
                |> notifyEnter (ScaleBtn "xmarkScale" 1.2)
                |> notifyLeave CancelScale
                |> notifyTap CancelScale
                |> notifyTap UpdateTransMatrix
            ]
                |> group
    , L03G1Border.myShapes model |> group
    , L03G1GridPanel2.myShapes model model.gridDX model.gridDY model.scaleGrid |> group
    , roundedRect 120 120 3
        |> filled (rgba 0 0 0 0)
        |> move ( 45, 0 )
        |> notifyMouseMoveAt ShowingCoordinate
        |> notifyMouseDownAt (\x -> GPMsg (GridDraggedAt x))
        |> notifyMouseMoveAt (\x -> GPMsg (GridDragging x))
        |> notifyMouseUp (GPMsg GridReleasing)
        |> notifyLeave (GPMsg GridReleasing)
    , text (roundCoor 4 ( model.x, model.y ))
        |> size 6
        |> alignRight
        |> filled black
        |> move ( 105, -69 )

    -- Display shape before transforamtion
    , (model.shapeList
        |> List.map (\x -> ( x.points, x.shapeColor ))
        |> List.map
            (\( point, color ) ->
                clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                    (openPolygon (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point) |> outlined (solid 1) (getColor color))
            )
      )
        |> group

    -- Display shape after transforamtion
    , (model.shapeList
        |> List.map (\x -> ( x.points, x.outputColor ))
        |> List.map
            (\( point, color ) ->
                clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                    (openPolygon
                        (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY)
                            (L03G1MatrixModel2.pointsToMatrix point
                                |> L03G1MatrixModel2.applyMutipleTrans model.transList
                                |> L03G1MatrixModel2.matrixToPoints
                            )
                        )
                        |> outlined (solid 1) (getColor color)
                    )
            )
      )
        |> group

    -- Display shape vertex before transforamtion
    , (model.shapeList
        |> List.map (\x -> ( x.points, x.outputColor ))
        |> List.map
            (\( point, color ) ->
                List.map
                    (\pos ->
                        clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                            (shapeVertex pos 1 (getFromDict (Debug.toString pos) model.btnScaleDict))
                    )
                    (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY)
                        (L03G1MatrixModel2.pointsToMatrix point
                            |> L03G1MatrixModel2.applyMutipleTrans model.transList
                            |> L03G1MatrixModel2.matrixToPoints
                        )
                    )
                    |> group
            )
      )
        |> group

    -- Display shape vertex after transforamtion
    , (model.shapeList
        |> List.map .points
        |> List.map
            (\point ->
                List.map
                    (\pos ->
                        clip (ghost (roundedRect 119.5 119.5 3) |> move ( 45, 0 ))
                            (shapeVertex pos 1 (getFromDict (Debug.toString pos) model.btnScaleDict))
                    )
                    (List.map (\x -> toViewCoor model.scaleGrid x model.gridDX model.gridDY) point)
                    |> group
            )
      )
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
    , text (roundCoor 4 ( model.x, model.y ))
        |> size 6
        |> alignRight
        |> filled black
        |> move ( 105, -69 )
    ]


settingChangeArrow key btnScaleDict settingsDict =
    [ triangle 10
        |> filled black
        |> scale (0.3 * getFromDict (key ++ "t1") btnScaleDict)
        |> move ( -32, 39 )
        |> notifyEnter (ScaleBtn (key ++ "t1") 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (ChangeSetting key (getFromDict key settingsDict))
    , triangle 10
        |> filled black
        |> scale (0.3 * getFromDict (key ++ "t2") btnScaleDict)
        |> rotate (degrees 60)
        |> move ( -60, 39 )
        |> notifyEnter (ScaleBtn (key ++ "t2") 1.2)
        |> notifyLeave CancelScale
        |> notifyTap (ChangeSetting key (getFromDict key settingsDict))
    ]
        |> group


shapeVertex coor r rscale =
    circle r
        |> filled (rgb 94 92 230)
        |> scale rscale
        |> move coor
        |> notifyEnter (ScaleBtn (Debug.toString coor) 1.75)
        |> notifyEnter (ShowingCoordinate coor)
        |> notifyLeave CancelScale


textTF model =
    [ text (Debug.toString model.reflecto) |> size 5 |> sansserif |> filled black |> move ( -42, 36.5 - (toFloat 2 * 20) )
    , text (Debug.toString model.reflectX) |> size 5 |> sansserif |> filled black |> move ( -82, 36.5 - (toFloat 3 * 20) )
    , text (Debug.toString model.reflectY) |> size 5 |> sansserif |> filled black |> move ( -42, 36.5 - (toFloat 3 * 20) )
    , text (Debug.toString model.reflectyx) |> size 5 |> sansserif |> filled black |> move ( -82, 36.5 - (toFloat 4 * 20) )
    , text (Debug.toString model.reflectynx) |> size 5 |> sansserif |> filled black |> move ( -42, 36.5 - (toFloat 4 * 20) )
    , roundedRect 14 8 3
        |> filled (rgba 0 0 0 0)
        |> move ( -36, -1 * (toFloat 0 * 20) - 2 )
        |> notifyTap (Reverse 5)
        |> notifyTap UpdateTransMatrix
    , roundedRect 14 8 3
        |> filled (rgba 0 0 0 0)
        |> move ( -76, -1 * (toFloat 1 * 20) - 2 )
        |> notifyTap (Reverse 6)
        |> notifyTap UpdateTransMatrix
    , roundedRect 14 8 3
        |> filled (rgba 0 0 0 0)
        |> move ( -36, -1 * (toFloat 1 * 20) - 2 )
        |> notifyTap (Reverse 7)
        |> notifyTap UpdateTransMatrix
    , roundedRect 14 8 3
        |> filled (rgba 0 0 0 0)
        |> move ( -76, -1 * (toFloat 2 * 20) - 2 )
        |> notifyTap (Reverse 8)
        |> notifyTap UpdateTransMatrix
    , roundedRect 14 8 3
        |> filled (rgba 0 0 0 0)
        |> move ( -36, -1 * (toFloat 2 * 20) - 2 )
        |> notifyTap (Reverse 9)
        |> notifyTap UpdateTransMatrix
    ]
        |> group



-- Number input field


numbers model =
    [ html 60
        20
        (div []
            [ div []
                [ input
                    [ Html.Attributes.type_ "number"
                    , Html.Attributes.value (String.fromFloat model.scaleX)
                    , onInput (DataChanging 0)
                    , Html.Events.on "mousedown" buttonPressDecoder
                    , Html.Events.on "mouseup" buttonUpDecoder
                    , onKeyDown (KeyboardStateChanging 1)
                    , onKeyUp (KeyboardStateChanging 0)
                    , Html.Attributes.step "0.1"
                    , Html.Attributes.style "width" "50px"
                    , Html.Attributes.style "height" "20px"
                    , Html.Attributes.style "background-color" "transparent"
                    , Html.Attributes.style "border" "0"
                    , Html.Attributes.style "outline" "none"
                    ]
                    []
                ]
            ]
        )
        |> scale 0.4
        |> move ( -83, 42.2 - (toFloat 0 * 20) )
        |> notifyLeave (MouseStateChanging 1 0)
    , html 60
        20
        (div []
            [ div []
                [ input
                    [ Html.Attributes.type_ "number"
                    , Html.Attributes.step "0.1"
                    , Html.Attributes.value (String.fromFloat model.scaleY)
                    , onInput (DataChanging 1)
                    , Html.Events.on "mousedown" buttonPressDecoder
                    , Html.Events.on "mouseup" buttonUpDecoder
                    , onKeyDown (KeyboardStateChanging 1)
                    , onKeyUp (KeyboardStateChanging 0)
                    , Html.Attributes.style "width" "50px"
                    , Html.Attributes.style "height" "20px"
                    , Html.Attributes.style "background-color" "transparent"
                    , Html.Attributes.style "border" "0"
                    , Html.Attributes.style "outline" "none"
                    ]
                    []
                ]
            ]
        )
        |> scale 0.4
        |> move ( -43, 42.2 - (toFloat 0 * 20) )
        |> notifyLeave (MouseStateChanging 1 0)
    , html 60
        20
        (div []
            [ div []
                [ input
                    [ Html.Attributes.type_ "number"
                    , Html.Attributes.step "0.1"
                    , Html.Attributes.value (String.fromFloat model.shearX)
                    , onInput (DataChanging 2)
                    , Html.Events.on "mousedown" buttonPressDecoder
                    , Html.Events.on "mouseup" buttonUpDecoder
                    , onKeyDown (KeyboardStateChanging 1)
                    , onKeyUp (KeyboardStateChanging 0)
                    , Html.Attributes.style "width" "50px"
                    , Html.Attributes.style "height" "20px"
                    , Html.Attributes.style "background-color" "transparent"
                    , Html.Attributes.style "border" "0"
                    , Html.Attributes.style "outline" "none"
                    ]
                    []
                ]
            ]
        )
        |> scale 0.4
        |> move ( -83, 42.2 - (toFloat 1 * 20) )
        |> notifyLeave (MouseStateChanging 1 0)
    , html 60
        20
        (div []
            [ div []
                [ input
                    [ Html.Attributes.type_ "number"
                    , Html.Attributes.step "0.1"
                    , Html.Attributes.value (String.fromFloat model.shearY)
                    , onInput (DataChanging 3)
                    , Html.Events.on "mousedown" buttonPressDecoder
                    , Html.Events.on "mouseup" buttonUpDecoder
                    , onKeyDown (KeyboardStateChanging 1)
                    , onKeyUp (KeyboardStateChanging 0)
                    , Html.Attributes.style "width" "50px"
                    , Html.Attributes.style "height" "20px"
                    , Html.Attributes.style "background-color" "transparent"
                    , Html.Attributes.style "border" "0"
                    , Html.Attributes.style "outline" "none"
                    ]
                    []
                ]
            ]
        )
        |> scale 0.4
        |> move ( -43, 42.2 - (toFloat 1 * 20) )
        |> notifyLeave (MouseStateChanging 1 0)
    , html 60
        20
        (div []
            [ div []
                [ input
                    [ Html.Attributes.type_ "number"
                    , Html.Attributes.step "1"
                    , Html.Attributes.value (String.fromFloat model.rotate)
                    , onInput (DataChanging 4)
                    , Html.Events.on "mousedown" buttonPressDecoder
                    , Html.Events.on "mouseup" buttonUpDecoder
                    , onKeyDown (KeyboardStateChanging 1)
                    , onKeyUp (KeyboardStateChanging 0)
                    , Html.Attributes.style "width" "50px"
                    , Html.Attributes.style "height" "20px"
                    , Html.Attributes.style "background-color" "transparent"
                    , Html.Attributes.style "border" "0"
                    , Html.Attributes.style "outline" "none"
                    ]
                    []
                ]
            ]
        )
        |> scale 0.4
        |> move ( -83, 42.2 - (toFloat 2 * 20) )
        |> notifyLeave (MouseStateChanging 1 0)
    ]
        |> group



-- All the matrix


matrices model =
    [ L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 0 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -100, 33.2 )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 1 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -60, 33.2 )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 2 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -100, 33.2 - (toFloat 1 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 3 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -60, 33.2 - (toFloat 1 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 4 model.displayMatricesList)))
        |> scale 0.5
        |> move ( -100, 32.2 - (toFloat 2 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 9 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -60, 33.2 - (toFloat 2 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 5 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -100, 33.2 - (toFloat 3 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 6 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -60, 33.2 - (toFloat 3 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 7 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -100, 33.2 - (toFloat 4 * 20) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 8 model.displayMatricesList)))
        |> scale 0.7
        |> move ( -60, 33.2 - (toFloat 4 * 20) )
    ]
        |> group


buttonPressDecoder : Decoder Msg
buttonPressDecoder =
    Decode.map (\x -> MouseStateChanging 0 x)
        (Decode.field "button" Decode.int)


buttonUpDecoder : Decoder Msg
buttonUpDecoder =
    Decode.map (\x -> MouseStateChanging 1 x)
        (Decode.field "button" Decode.int)


onKeyUp : (Int -> msg) -> Html.Attribute msg
onKeyUp tagger =
    Html.Events.on "keyup" (Decode.map tagger Html.Events.keyCode)


onKeyDown : (Int -> msg) -> Html.Attribute msg
onKeyDown tagger =
    Html.Events.on "keydown" (Decode.map tagger Html.Events.keyCode)


toGirdX scale x dx =
    scale * ((2 * (x - dx)) / 15 - 6)


toGirdY scale y dy =
    scale * ((2 * (y - dy)) / 15)


toGirdCoor scale ( x, y ) dx dy =
    ( scale * ((2 * (x - dx)) / 15 - 6), scale * ((2 * (y - dy)) / 15) )


toRoundedCoor scale ( x, y ) dx dy =
    ( (scale * ((2 * (x - dx)) / 15 - 6)) |> (\num -> roundFloatTo05 num scale), (scale * ((2 * (y - dy)) / 15)) |> (\num -> roundFloatTo05 num scale) )


toViewX scale x dx =
    scale * ((15 * x) / 2 + 45) + dx


toViewY scale y dy =
    scale * ((15 * y) / 2) + dy


toViewCoor scale ( x, y ) dx dy =
    ( ((15 * x / scale) / 2 + 45) + dx, ((15 * y / scale) / 2) + dy )


moveCoor ( x, y ) =
    ( x - 116, y - 71 )


roundCoor d ( x, y ) =
    "(" ++ Round.round d x ++ "," ++ Round.round d y ++ ")"


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


getColor ( r, g, b ) =
    rgb r g b


getFromDict : String -> Dict String Float -> Float
getFromDict key dict =
    Maybe.withDefault 1.0 (Dict.get key dict)


type State
    = TransState
    | SettingState


type GridState
    = GridWaiting
    | GridDragged


type GridPanelMsg
    = GridDraggedAt ( Float, Float )
    | GridDragging ( Float, Float )
    | GridReleasing
    | GridScale Float
    | ClearGridDelta


type Msg
    = Tick Float GetKeyState
    | DataChanging Int String
    | Reverse Int
    | UpdateTransMatrix
    | UpdateShapeList (List L03G1ShapeModel.CustomShape)
    | MouseStateChanging Int Int
    | KeyboardStateChanging Int Int
    | GPMsg GridPanelMsg
    | ScaleBtn String Float
    | CancelScale
    | ShowingCoordinate ( Float, Float )
    | ResetMatraix
    | ToSetting
    | ChangeSetting String Float
    | ConfirmChangeS
    | DiscardChangeS
    | UpdateSetting (Dict String Float)
    | UpdateGridProps Float Float Float


type alias Model =
    { time : Float
    , state : State
    , scaleX : Float
    , scaleY : Float
    , shearX : Float
    , shearY : Float
    , rotate : Float
    , reflecto : Bool
    , reflectX : Bool
    , reflectY : Bool
    , reflectyx : Bool
    , reflectynx : Bool
    , transList : List L03G1MatrixModel2.Matrix
    , displayMatricesList : List L03G1MatrixModel2.Matrix
    , shapeList : List L03G1ShapeModel.CustomShape
    , startTime : Float
    , isMouseDown : Bool
    , isKeyDown : Bool
    , gridDX : Float
    , gridDY : Float
    , globalX : Float
    , globalY : Float
    , gridState : GridState
    , perGridDX : Float
    , perGridDY : Float
    , btnScaleDict : Dict String Float
    , scaleGrid : Float
    , x : Float
    , y : Float
    , oldSettingsDict : Dict String Float
    , settingsDict : Dict String Float
    }


update msg model =
    case msg of
        Tick t _ ->
            let
                newScaleX =
                    model.scaleX

                newScaleY =
                    model.scaleY

                newShearX =
                    model.shearX

                newShearY =
                    model.shearY

                newRotate =
                    model.rotate
            in
            ( { model
                | startTime = model.time
                , time = t
                , displayMatricesList =
                    (if not model.isMouseDown && not model.isKeyDown then
                        [ L03G1MatrixModel2.scaleMatrix newScaleX 1
                        , L03G1MatrixModel2.scaleMatrix 1 newScaleY
                        , L03G1MatrixModel2.horiShear newShearX
                        , L03G1MatrixModel2.vertShear newShearY
                        , (if getFromDict "RotateMode" model.settingsDict == 1.0 then
                            L03G1MatrixModel2.rotateMatrixD

                           else
                            L03G1MatrixModel2.rotateMatrixR
                          )
                            newRotate
                        ]

                     else
                        model.displayMatricesList
                    )
                        ++ [ if model.reflectX then
                                L03G1MatrixModel2.reflectX

                             else
                                L03G1MatrixModel2.identityMatrix
                           , if model.reflectY then
                                L03G1MatrixModel2.reflectY

                             else
                                L03G1MatrixModel2.identityMatrix
                           , if model.reflectyx then
                                L03G1MatrixModel2.reflectYeqX

                             else
                                L03G1MatrixModel2.identityMatrix
                           , if model.reflectynx then
                                L03G1MatrixModel2.reflectYeqNegX

                             else
                                L03G1MatrixModel2.identityMatrix
                           , if model.reflecto then
                                L03G1MatrixModel2.reflectOrigin

                             else
                                L03G1MatrixModel2.identityMatrix
                           ]
              }
            , Cmd.none
            )

        DataChanging i numberStr ->
            let
                newScaleX =
                    if i == 0 then
                        Maybe.withDefault 0 (String.toFloat numberStr)

                    else
                        model.scaleX

                newScaleY =
                    if i == 1 then
                        Maybe.withDefault 0 (String.toFloat numberStr)

                    else
                        model.scaleY

                newShearX =
                    if i == 2 then
                        Maybe.withDefault 0 (String.toFloat numberStr)

                    else
                        model.shearX

                newShearY =
                    if i == 3 then
                        Maybe.withDefault 0 (String.toFloat numberStr)

                    else
                        model.shearY

                newRotate =
                    if i == 4 then
                        Maybe.withDefault 0 (String.toFloat numberStr)

                    else
                        model.rotate
            in
            ( { model
                | scaleX = newScaleX
                , scaleY = newScaleY
                , shearX = newShearX
                , shearY = newShearY
                , rotate = newRotate
                , transList =
                    [ L03G1MatrixModel2.scaleMatrix newScaleX 1
                    , L03G1MatrixModel2.scaleMatrix 1 newScaleY
                    , L03G1MatrixModel2.horiShear newShearX
                    , L03G1MatrixModel2.vertShear newShearY
                    , (if getFromDict "RotateMode" model.settingsDict == 1.0 then
                        L03G1MatrixModel2.rotateMatrixD

                       else
                        L03G1MatrixModel2.rotateMatrixR
                      )
                        newRotate
                    , if model.reflectX then
                        L03G1MatrixModel2.reflectX

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflectY then
                        L03G1MatrixModel2.reflectY

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflectyx then
                        L03G1MatrixModel2.reflectYeqX

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflectynx then
                        L03G1MatrixModel2.reflectYeqNegX

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflecto then
                        L03G1MatrixModel2.reflectOrigin

                      else
                        L03G1MatrixModel2.identityMatrix
                    ]
              }
            , Cmd.none
            )

        Reverse i ->
            case i of
                5 ->
                    ( { model | reflecto = not model.reflecto }, Cmd.none )

                6 ->
                    ( { model | reflectX = not model.reflectX }, Cmd.none )

                7 ->
                    ( { model | reflectY = not model.reflectY }, Cmd.none )

                8 ->
                    ( { model | reflectyx = not model.reflectyx }, Cmd.none )

                9 ->
                    ( { model | reflectynx = not model.reflectynx }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        UpdateTransMatrix ->
            ( { model
                | transList =
                    [ L03G1MatrixModel2.scaleMatrix model.scaleX 1
                    , L03G1MatrixModel2.scaleMatrix 1 model.scaleY
                    , L03G1MatrixModel2.horiShear model.shearX
                    , L03G1MatrixModel2.vertShear model.shearY
                    , (if getFromDict "RotateMode" model.settingsDict == 1.0 then
                        L03G1MatrixModel2.rotateMatrixD

                       else
                        L03G1MatrixModel2.rotateMatrixR
                      )
                        model.rotate
                    , if model.reflectX then
                        L03G1MatrixModel2.reflectX

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflectY then
                        L03G1MatrixModel2.reflectY

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflectyx then
                        L03G1MatrixModel2.reflectYeqX

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflectynx then
                        L03G1MatrixModel2.reflectYeqNegX

                      else
                        L03G1MatrixModel2.identityMatrix
                    , if model.reflecto then
                        L03G1MatrixModel2.reflectOrigin

                      else
                        L03G1MatrixModel2.identityMatrix
                    ]
              }
            , Cmd.none
            )

        UpdateShapeList spList ->
            ( { model | shapeList = spList }, Cmd.none )

        MouseStateChanging l i ->
            ( { model
                | isMouseDown =
                    if i == 0 then
                        l == 0

                    else
                        model.isMouseDown
              }
            , Cmd.none
            )

        KeyboardStateChanging isDown key ->
            ( { model
                | isKeyDown =
                    if key == 40 || key == 38 then
                        isDown == 1

                    else
                        False
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

        ConfirmChangeS ->
            ( { model
                | state = TransState
              }
            , Cmd.none
            )

        DiscardChangeS ->
            ( { model
                | state = TransState
                , settingsDict = model.oldSettingsDict
              }
            , Cmd.none
            )

        ResetMatraix ->
            ( { model
                | scaleX = 1
                , scaleY = 1
                , reflecto = False
                , reflectX = False
                , reflectY = False
                , reflectyx = False
                , reflectynx = False
                , shearX = 0
                , shearY = 0
                , rotate = 0
                , transList = []
                , displayMatricesList = []
              }
            , Cmd.none
            )

        ShowingCoordinate ( newX, newY ) ->
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
    , state = TransState
    , scaleX = 1
    , scaleY = 1
    , reflecto = False
    , reflectX = False
    , reflectY = False
    , reflectyx = False
    , reflectynx = False
    , shearX = 0
    , shearY = 0
    , rotate = 0
    , transList = []
    , displayMatricesList = []
    , shapeList = []
    , startTime = 0
    , isMouseDown = False
    , isKeyDown = False
    , scaleGrid = 1
    , globalX = 0
    , globalY = 0
    , gridDX = 0
    , gridDY = 0
    , gridState = GridWaiting
    , perGridDX = 0
    , perGridDY = 0
    , x = 0
    , y = 0
    , btnScaleDict = ICONS.emptyDict
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

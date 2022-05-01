-- The thrid state of program, showing the calculation steps and showing the graph
{--
Import List
L03G1ShapeModel 9
L03G1GridPanel2 79
ICONS 142
L03ResultPanel 68
L03G1MatrixModel2 73
L03G1Border 51
--}


module L03G1State3 exposing (GridPanelMsg(..), GridState(..), Model, Msg(..), State(..), getColor, getFromDict, init, main, matrices, moveCoor, myShapes, page3, page4, roundCoor, roundFloatTo05, shapeVertex, toGirdCoor, toGirdX, toGirdY, toRoundedCoor, toViewCoor, toViewX, toViewY, update, view)

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
import L03ResultPanel exposing (..)
import L03G1MatrixModel2 exposing (..)
import L03G1Border exposing (..)

myShapes model =
    [ L03ResultPanel.myShapes model model.page |> group
    , case model.page of
        2 ->
            matrices model

        3 ->
            page3 model

        4 ->
            page4 model

        _ ->
            [] |> group

    -- Pervious page
    , if model.page < 4 then
        [ triangle 10
            |> filled black
            |> scale (0.4 * getFromDict "rArrowScale" model.btnScaleDict)
            |> move ( -34, -52 )
            |> notifyEnter (ScaleBtn "rArrowScale" 1.2)
            |> notifyLeave CancelScale
            |> notifyTap CancelScale
            |> notifyTap ForwardPage
        ]
            |> group

      else
        [] |> group

    -- Next page
    , if model.page > 1 then
        [ triangle 10
            |> filled black
            |> mirrorX
            |> scale (0.4 * getFromDict "lArrowScale" model.btnScaleDict)
            |> move ( -95, -52 )
            |> notifyEnter (ScaleBtn "lArrowScale" 1.2)
            |> notifyLeave CancelScale
            |> notifyTap CancelScale
            |> notifyTap BackwardPage
        ]
            |> group

      else
        [] |> group
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


shapeVertex coor r rscale =
    circle r
        |> filled (rgb 94 92 230)
        |> scale rscale
        |> move coor
        |> notifyEnter (ScaleBtn (Debug.toString coor) 1.75)
        |> notifyEnter (ShowingCoordinate coor)
        |> notifyLeave CancelScale


page3 model =
    [ let
        xList =
            List.map (\( i, s ) -> ( i, s.points )) (List.indexedMap Tuple.pair model.shapeList)
      in
      List.map
        (\( i, p ) ->
            [ L03G1MatrixModel2.latex2Svg ("x_" ++ String.fromInt (i + 1) ++ "=") |> move ( -95, 40 - (toFloat i * 20) )
            , L03G1MatrixModel2.pointsToMatrix p
                |> L03G1MatrixModel2.evalMatrixSvg
                |> move ( -80, 46 - (toFloat i * 20) )
                |> clip (rect 50 20 |> ghost |> move ( -55, 37 - (toFloat i * 20) ))
            , rect 50 20
                |> filled (rgba 0 0 0 0)
                |> move ( -55, 37 - (toFloat i * 20) )
                |> addHyperlink ("https://www.1xd3latex2svg.tk/evalMatrix?list=" ++ Debug.toString (L03G1MatrixModel2.matrixToStringList (L03G1MatrixModel2.pointsToMatrix p) False))
            ]
                |> group
        )
        xList
        |> group
    , text "The matrix may not be displayed "
        |> size 5
        |> filled black
        |> move ( -100, -38 )
    , text "completely, please click on it or "
        |> size 5
        |> filled black
        |> move ( -100, -43 )
    , text "check on the grid panel "
        |> size 5
        |> filled black
        |> move ( -100, -48 )
    ]
        |> group


page4 model =
    [ let
        xList =
            List.map (\( i, s ) -> ( i, s.points )) (List.indexedMap Tuple.pair model.shapeList)
      in
      List.map
        (\( i, p ) ->
            let
                matrix =
                    L03G1MatrixModel2.pointsToMatrix p
                        |> L03G1MatrixModel2.applyMutipleTrans model.transList
                        |> L03G1MatrixModel2.calcMatrix
            in
            [ L03G1MatrixModel2.latex2Svg ("Ax_" ++ String.fromInt (i + 1) ++ "=") |> move ( -95, 40 - (toFloat i * 20) )
            , matrix
                |> L03G1MatrixModel2.evalMatrixSvg
                |> move ( -75, 44 - (toFloat i * 20) )
                |> clip (rect 50 20 |> ghost |> move ( -55, 35 - (toFloat i * 20) ))
            , rect 50 20
                |> filled (rgba 0 0 0 0)
                |> move ( -55, 35 - (toFloat i * 20) )
                |> addHyperlink ("https://www.1xd3latex2svg.tk/evalMatrix?list=" ++ Debug.toString (L03G1MatrixModel2.matrixToStringList matrix False))
            ]
                |> group
        )
        xList
        |> group
    , text "The matrix may not be displayed "
        |> size 5
        |> filled black
        |> move ( -100, -38 )
    , text "completely, please click on it or "
        |> size 5
        |> filled black
        |> move ( -100, -43 )
    , text "check on the grid panel "
        |> size 5
        |> filled black
        |> move ( -100, -48 )
    ]
        |> group


matrices model =
    [ L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 0 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -90, 33.2 )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 1 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -50, 33.2 )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 2 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -90, 33.2 - (toFloat 1 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 3 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -50, 33.2 - (toFloat 1 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 4 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -90, 32.2 - (toFloat 2 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 9 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -90, 33.2 - (toFloat 3 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 5 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -70, 33.2 - (toFloat 3 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 6 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -50, 33.2 - (toFloat 3 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 7 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -90, 33.2 - (toFloat 4 * 15) )
    , L03G1MatrixModel2.simMatrixSvg
        (Maybe.withDefault L03G1MatrixModel2.identityMatrix (List.head (List.drop 8 model.displayMatricesList)))
        |> scale 0.6
        |> move ( -50, 33.2 - (toFloat 4 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -95, 31 - (toFloat 1 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -95, 31 - (toFloat 2 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -95, 31 - (toFloat 3 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -95, 31 - (toFloat 4 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -55, 31 - (toFloat 0 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -55, 31 - (toFloat 1 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -75, 31 - (toFloat 3 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -55, 31 - (toFloat 3 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\times " |> move ( -55, 31 - (toFloat 4 * 15) )
    , L03G1MatrixModel2.latex2Svg " \\, = " |> move ( -95, -42 )
    , L03G1MatrixModel2.evalMatrixSvg
        (L03G1MatrixModel2.identityMatrix |> L03G1MatrixModel2.applyMutipleTrans model.displayMatricesList |> L03G1MatrixModel2.matrixToPoints |> L03G1MatrixModel2.pointsToMatrix)
        |> scale 0.6
        |> move ( -88, -40 )
    ]
        |> group


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
    | UpdateShapeList (List L03G1ShapeModel.CustomShape)
    | UpdateDisplayMList (List L03G1MatrixModel2.Matrix)
    | UpdateTransList (List L03G1MatrixModel2.Matrix)
    | GPMsg GridPanelMsg
    | ScaleBtn String Float
    | CancelScale
    | ShowingCoordinate ( Float, Float )
    | ForwardPage
    | BackwardPage
    | UpdateGridProps Float Float Float


type alias Model =
    { time : Float
    , state : State
    , transList : List L03G1MatrixModel2.Matrix
    , displayMatricesList : List L03G1MatrixModel2.Matrix
    , shapeList : List L03G1ShapeModel.CustomShape
    , startTime : Float
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
    , page : Int
    }


update msg model =
    case msg of
        Tick t _ ->
            ( { model
                | startTime = model.time
                , time = t
              }
            , Cmd.none
            )

        UpdateShapeList spList ->
            ( { model | shapeList = spList }, Cmd.none )

        UpdateTransList list ->
            ( { model | transList = list }, Cmd.none )

        UpdateDisplayMList list ->
            ( { model | displayMatricesList = list }, Cmd.none )

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

        ForwardPage ->
            ( { model | page = model.page + 1 }, Cmd.none )

        BackwardPage ->
            ( { model | page = model.page - 1 }, Cmd.none )

        UpdateGridProps dx dy scale ->
            ( { model | gridDX = dx, gridDY = dy, scaleGrid = scale }, Cmd.none )


init =
    { time = 0
    , state = TransState
    , transList = []
    , displayMatricesList = []
    , shapeList = [ { name = "", points = [ ( 1.48849, 2 ) ], shapeColor = ( 0, 0, 0 ), outputColor = ( 255, 0, 0 ) } ]
    , startTime = 0
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
    , page = 1
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

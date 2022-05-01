-- Combining all the state together and add start page.
{--
L03G1State1 504
L03G1State2 108
L03G1State3 208
ICONS 142
L03G1Border 51
--}


module FinalPrototype exposing (Model, Msg(..), State(..), getFromDict, init, introduction, main, myShapes, ps, step1, step2, step3, textBlock, toEditingShapeArrow, toResultRArrow, toResultlArrow, toTransformShapeLArrow, toTransformShapeRArrow, update, view)

import Dict exposing (Dict)
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)
import L03G1State1 exposing (..)
import L03G1State2 exposing (..)
import L03G1State3 exposing (..)
import ICONS exposing (..)
import L03G1Border exposing (..)


myShapes model =
    [ L03G1Border.myShapes model |> group
    , text "Introduction" |> alignLeft |> filled black |> move ( -110, 50 )
    , textBlock introduction |> move ( -110, 40 )
    , text "Usage" |> alignLeft |> filled black |> move ( -110, 15 )
    , text "Step 1" |> alignLeft |> size 8 |> filled black |> move ( -110, 5 )
    , textBlock step1 |> move ( -105, -5 )
    , text "Step 2" |> alignLeft |> size 8 |> filled black |> move ( -110, -38 )
    , textBlock step2 |> move ( -105, -48 )
    , text "Step 3" |> alignLeft |> size 8 |> filled black |> move ( 0, 5 )
    , textBlock step3 |> move ( 0, -5 )
    , text "PS" |> alignLeft |> size 8 |> filled black |> move ( 0, -15 )
    , textBlock ps |> move ( 0, -25 )
    , union (roundedRect 30 15 3 |> filled black) (text "Let's GO!!!" |> size 6 |> centered |> filled white |> move ( 0, -1.5 ))
        |> scale (getFromDict "gobtn" model.btnScaleDict)
        |> move ( 90, -62 )
        |> notifyEnter (ScaleBtn "gobtn" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
        |> notifyTap ToEditingShape
    ]


introduction =
    [ "Linear Transformation Math Visualizer is a online tool help people who first learn linear "
    , "transformation to understand how is it works. Users can customize their own shapes and "
    , "apply 10 basic linear transformations to the shapes"
    ]


step1 =
    [ "▪ Using plus button add a shape"
    , "▪ Click pen to customize the shape"
    , "▪ There are some useful settings in"
    , "  the settings"
    , "▪ Press Right Arrow to continue"
    ]


step2 =
    [ "▪ Try each transformation"
    , "▪ Change Rad/Deg Mode in settings"
    , "▪ Moving mouse to each point to check"
    , "  coordinate"
    ]


step3 =
    [ "▪ Check out the calculation process!"
    ]


ps =
    [ "▪ The graph on the right side can always"
    , "  be dragged and scaled"
    , "▪ When you are editing the shape hold shift "
    , "  key to drag the graph"
    , "▪ Try holding ctrl while editing shape! "
    ]


textBlock textList =
    List.map (\( i, t ) -> text t |> size 6 |> alignLeft |> filled black |> move ( 0, toFloat i * -6 )) (List.indexedMap Tuple.pair textList)
        |> group


toTransformShapeRArrow btnScaleDict =
    [ ICONS.rArrow |> scale 0.4 |> scale (getFromDict "tTRA" btnScaleDict) |> move ( -30, -67.5 )
    , rect 12 9
        |> filled (rgba 0 0 0 0)
        |> move ( -30, -65 )
        |> notifyEnter (ScaleBtn "tTRA" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
        |> notifyTap ToTransformShape
    ]


toTransformShapeLArrow btnScaleDict =
    [ ICONS.lArrow |> scale 0.4 |> scale (getFromDict "tTLA" btnScaleDict) |> move ( -100, -67.5 )
    , rect 12 9
        |> filled (rgba 0 0 0 0)
        |> move ( -100, -65 )
        |> notifyEnter (ScaleBtn "tTLA" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
        |> notifyTap ToTransformShape
    ]


toResultlArrow btnScaleDict =
    [ ICONS.rArrow |> scale 0.4 |> scale (getFromDict "tRlA" btnScaleDict) |> move ( -30, -67.5 )
    , rect 12 9
        |> filled (rgba 0 0 0 0)
        |> move ( -30, -65 )
        |> notifyEnter (ScaleBtn "tRlA" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
        |> notifyTap ToResultPage
    ]


toResultRArrow btnScaleDict =
    [ ICONS.rArrow |> scale 0.4 |> scale (getFromDict "tRRA" btnScaleDict) |> move ( -30, -67.5 )
    , rect 12 9
        |> filled (rgba 0 0 0 0)
        |> move ( -30, -65 )
        |> notifyEnter (ScaleBtn "tRRA" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
        |> notifyTap ToResultPage
    ]


toEditingShapeArrow btnScaleDict =
    [ ICONS.lArrow |> scale 0.4 |> scale (getFromDict "tESA" btnScaleDict) |> move ( -100, -67.5 )
    , rect 12 9
        |> filled (rgba 0 0 0 0)
        |> move ( -100, -65 )
        |> notifyEnter (ScaleBtn "tESA" 1.2)
        |> notifyLeave CancelScale
        |> notifyTap CancelScale
        |> notifyTap ToEditingShape
    ]


getFromDict : String -> Dict String Float -> Float
getFromDict key dict =
    Maybe.withDefault 1.0 (Dict.get key dict)


type State
    = Waiting
    | EditingShape
    | TransformShape
    | ResultPage


type Msg
    = Tick Float GetKeyState
    | EditingShapeMsg L03G1State1.Msg
    | TransformShapeMsg L03G1State2.Msg
    | ResultPageMsg L03G1State3.Msg
    | ToTransformShape
    | ToEditingShape
    | ToResultPage
    | ScaleBtn String Float
    | CancelScale


type alias Model =
    { time : Float
    , state : State
    , editingShapeModel : L03G1State1.Model
    , transformShapeModel : L03G1State2.Model
    , resultPageModel : L03G1State3.Model
    , btnScaleDict : Dict String Float
    }


update msg model =
    case msg of
        Tick t keyboardStuff ->
            let
                ( newEditingShapeModel, newESCmd ) =
                    L03G1State1.update (L03G1State1.Tick t keyboardStuff) model.editingShapeModel

                ( newTransformShapeModel, newTSCmd ) =
                    L03G1State2.update (L03G1State2.Tick t keyboardStuff) model.transformShapeModel
            in
            ( { model
                | time = t
                , editingShapeModel = newEditingShapeModel
                , transformShapeModel = newTransformShapeModel
              }
            , Cmd.none
            )

        ToTransformShape ->
            let
                ( newTransformShapeModelU, newTSCmd ) =
                    L03G1State2.update (L03G1State2.UpdateShapeList model.editingShapeModel.shapeList) model.transformShapeModel

                ( newTransformShapeModelUS, newCmd ) =
                    L03G1State2.update (L03G1State2.UpdateSetting model.editingShapeModel.settingsDict) newTransformShapeModelU

                ( newTransformShapeModel, newCmd4 ) =
                    L03G1State2.update (L03G1State2.UpdateGridProps model.editingShapeModel.gridDX model.editingShapeModel.gridDY model.editingShapeModel.scaleGrid) newTransformShapeModelUS
            in
            ( { model
                | state = TransformShape
                , transformShapeModel = newTransformShapeModel
              }
            , Cmd.none
            )

        ToEditingShape ->
            let
                ( newEditingShapeModel, newCmd ) =
                    L03G1State1.update (L03G1State1.UpdateSetting model.transformShapeModel.settingsDict) model.editingShapeModel

                ( newEditingShapeModel2, newCmd4 ) =
                    L03G1State1.update (L03G1State1.UpdateGridProps model.transformShapeModel.gridDX model.transformShapeModel.gridDY model.transformShapeModel.scaleGrid) newEditingShapeModel
            in
            ( { model
                | state = EditingShape
                , editingShapeModel = newEditingShapeModel2
              }
            , Cmd.none
            )

        ToResultPage ->
            let
                ( newResultPageModel1, newCmd1 ) =
                    L03G1State3.update (L03G1State3.UpdateTransList model.transformShapeModel.transList) model.resultPageModel

                ( newResultPageModel2, newCmd2 ) =
                    L03G1State3.update (L03G1State3.UpdateDisplayMList model.transformShapeModel.displayMatricesList) newResultPageModel1

                ( newResultPageModel3, newCmd3 ) =
                    L03G1State3.update (L03G1State3.UpdateShapeList model.transformShapeModel.shapeList) newResultPageModel2

                ( newResultPageModel4, newCmd4 ) =
                    L03G1State3.update (L03G1State3.UpdateGridProps model.transformShapeModel.gridDX model.transformShapeModel.gridDY model.transformShapeModel.scaleGrid) newResultPageModel3
            in
            ( { model
                | state = ResultPage
                , resultPageModel = newResultPageModel4
              }
            , Cmd.none
            )

        EditingShapeMsg esMsg ->
            let
                ( newModel, newCmd ) =
                    L03G1State1.update esMsg model.editingShapeModel
            in
            ( { model | editingShapeModel = newModel }
            , Cmd.map EditingShapeMsg newCmd
            )

        TransformShapeMsg tsMsg ->
            let
                ( newModel, newCmd ) =
                    L03G1State2.update tsMsg model.transformShapeModel
            in
            ( { model | transformShapeModel = newModel }
            , Cmd.map EditingShapeMsg newCmd
            )

        ResultPageMsg rpMsg ->
            let
                ( newModel, newCmd ) =
                    L03G1State3.update rpMsg model.resultPageModel
            in
            ( { model | resultPageModel = newModel }
            , Cmd.map ResultPageMsg newCmd
            )

        ScaleBtn name scale ->
            ( { model | btnScaleDict = Dict.insert name scale model.btnScaleDict }, Cmd.none )

        CancelScale ->
            ( { model | btnScaleDict = ICONS.emptyDict }, Cmd.none )


init =
    { time = 0
    , state = Waiting
    , editingShapeModel = L03G1State1.init
    , transformShapeModel = L03G1State2.init
    , resultPageModel = L03G1State3.init
    , btnScaleDict = ICONS.emptyDict
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
        , view = \model -> { title = "Linear Transformation Math Visualizer Ver1.0", body = view model }
        , subscriptions = \_ -> Sub.none
        }


view : Model -> Collage Msg
view model =
    collage 232 145 <|
        case model.state of
            Waiting ->
                myShapes model

            EditingShape ->
                (L03G1State1.myShapes model.editingShapeModel
                    |> List.map (GraphicSVG.map EditingShapeMsg)
                )
                    ++ (if model.editingShapeModel.state == L03G1State1.AddingShapeState then
                            toTransformShapeRArrow model.btnScaleDict

                        else
                            []
                       )

            TransformShape ->
                (L03G1State2.myShapes model.transformShapeModel
                    |> List.map (GraphicSVG.map TransformShapeMsg)
                )
                    ++ (if model.transformShapeModel.state == L03G1State2.TransState then
                            [ toEditingShapeArrow model.btnScaleDict |> group, toResultRArrow model.btnScaleDict |> group ]

                        else
                            []
                       )

            ResultPage ->
                (L03G1State3.myShapes model.resultPageModel
                    |> List.map (GraphicSVG.map ResultPageMsg)
                )
                    ++ toTransformShapeLArrow model.btnScaleDict

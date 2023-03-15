-- This file inlucde a cutsom matrix type and
-- all the functions for calculating the matrix
-- and showing the graph


module L03G1MatrixModel2 exposing (BinOp(..), CalcMatrix, DisplayMatrix, MathExpr(..), Matrix, Model, Msg(..), UnaryOp(..), applyMutipleTrans, applyMutipleTransAux, applyTransformation, calcMatrix, eval, evalMatrix, evalMatrixSvg, fromJust, getMatrixColCount, getMatrixRowCount, horiShear, identityMatrix, init, latex2Svg, listPair, main, mat, mathString, matrixSvg, matrixToLatex, matrixToPoints, matrixToStringList, matrixTranspose, matt, mm, myShapes, roundMatrix ,pointsToMatrix, reflectOrigin, reflectX, reflectY, reflectYeqNegX, reflectYeqX, rotateMatrixD, rotateMatrixR, rowMultiple, scaleMatrix, simMatrixSvg, sumRow, update, vertShear, view)

import Html
import Html.Attributes
import GraphicSVG exposing (..)
import GraphicSVG.EllieApp exposing (..)
import Html exposing (Html, button, div, node, text)
import Html.Attributes exposing (attribute)
import Json.Encode as Encode
import Http
import Round

myShapes model =
    [ GraphicSVG.text (Debug.toString (getMatrixColCount matt))
        |> size 5
        |> filled black
        |> move ( -80, 0 )
    , -- text (Debug.toString (evalMatrix mm))
      -- |> size 3  |> selectable |> filled black |> move (-80,20),
      -- text (Debug.toString mm)
      -- |> size 6 |> filled black |> move (-50,-30),
      rect 192 0.5 |> filled black
    , rect 0.5 128 |> filled black
    , simMatrixSvg mm |> move ( -20, 50 ) |> scale 0.8
    , evalMatrixSvg matt
    , polygon (matrixToPoints matt) |> outlined (solid 0.5) black
    , polygon (matrixToPoints mm) |> outlined (solid 0.5) black
    ]


mm =
    matt |> applyMutipleTrans [ horiShear 0, rotateMatrixR 0.82006009 ]


mat =
    [ [ Coef 0, Coef 0 ], [ Coef 0, Coef 101 ], [ Coef 10, Coef 10 ], [ Coef 10, Coef 0 ] ]


matt =
    pointsToMatrix [ ( 0, 0 ), ( 10, 0 ), ( 10, 10 ), ( 0, 10 ) ]



-- [(0,0),(28,0),(11,-32),(14,14),(35,-38)]
-- Convert matrix to a tuple list


matrixToPoints matrix =
    List.map2 Tuple.pair (List.concat (List.take 1 (evalMatrix matrix))) (List.concat (List.drop 1 (evalMatrix matrix)))



-- Convert tuple list to a matrix


pointsToMatrix pointList =
    let
        matrix =
            List.map (\( x, y ) -> [ Coef x, Coef y ]) pointList
    in
    matrixTranspose (getMatrixRowCount matrix) (getMatrixColCount matrix) matrix



-- Scale Matrix


scaleMatrix x y =
    [ [ Coef x, Coef 0 ]
    , [ Coef 0, Coef y ]
    ]



-- Rotate Matrix in Deg mode


rotateMatrixD degrees =
    [ [ Func1 CosD (Coef degrees), Func2 Mult (Coef -1) (Func1 SinD (Coef degrees)) ]
    , [ Func1 SinD (Coef degrees), Func1 CosD (Coef degrees) ]
    ]



-- Rotate Matrix in Rad mode


rotateMatrixR a =
    [ [ Func1 CosR (Coef a), Func2 Mult (Coef -1) (Func1 SinR (Coef a)) ]
    , [ Func1 SinR (Coef a), Func1 CosR (Coef a) ]
    ]



-- Reflect X Matrix


reflectX =
    [ [ Coef 1, Coef 0 ]
    , [ Coef 0, Coef -1 ]
    ]



-- Reflect Y Matrix


reflectY =
    [ [ Coef -1, Coef 0 ]
    , [ Coef 0, Coef 1 ]
    ]



-- Reflect Y=X Matrix


reflectYeqX =
    [ [ Coef 0, Coef 1 ]
    , [ Coef 1, Coef 0 ]
    ]



-- Reflect Y=-X Matrix


reflectYeqNegX =
    [ [ Coef 0, Coef -1 ]
    , [ Coef -1, Coef 0 ]
    ]



-- Reflect through origin Matrix


reflectOrigin =
    [ [ Coef -1, Coef 0 ]
    , [ Coef 0, Coef -1 ]
    ]



-- Horizontal Shear Matrix


horiShear k =
    [ [ Coef 1, Coef k ]
    , [ Coef 0, Coef 1 ]
    ]



-- Vertical Shear Matrix


vertShear k =
    [ [ Coef 1, Coef 0 ]
    , [ Coef k, Coef 1 ]
    ]



-- Identity Matrix


identityMatrix =
    [ [ Coef 1, Coef 0 ]
    , [ Coef 0, Coef 1 ]
    ]



-- MathExperssion type


type MathExpr
    = Coef Float
    | PI
    | Func1 UnaryOp MathExpr
    | Func2 BinOp MathExpr MathExpr



-- Binary Operation


type BinOp
    = Add
    | Mult



-- Unary Operation


type UnaryOp
    = CosR
    | SinR
    | CosD
    | SinD



-- Evalue a MathExpr


eval : MathExpr -> Float
eval expr =
    case expr of
        Coef a ->
            a

        PI ->
            pi

        Func1 unaryOp e ->
            case unaryOp of
                CosR ->
                    cos ((eval e) * pi)

                SinR ->
                    sin ((eval e) * pi)

                CosD ->
                    cos (degrees (eval e))

                SinD ->
                    sin (degrees (eval e))

        Func2 binOp e1 e2 ->
            case binOp of
                Add ->
                    eval e1 + eval e2

                Mult ->
                    eval e1 * eval e2



-- Convert a MathExor to String


mathString : MathExpr -> Bool -> String
mathString expr isDisplay =
    case expr of
        Coef c ->
            if c < 0 then
                "(" ++ String.fromFloat c ++ ")"
            else String.fromFloat c

        PI ->
            "pi"

        Func2 binOp e1 e2 ->
            case binOp of
                Add ->
                    "(" ++ mathString e1 isDisplay ++ " + " ++ mathString e2 isDisplay ++ ")"

                Mult ->
                    "(" ++ mathString e1 isDisplay ++ " * " ++ mathString e2 isDisplay ++ ")"

        Func1 unaryOp e ->
            case unaryOp of
                CosR ->
                    "\\cos((" ++ mathString e isDisplay ++ ") * \\pi" ++ ")"

                SinR ->
                    "\\sin((" ++ mathString e isDisplay ++ ") * \\pi" ++ ")"

                CosD ->
                    if isDisplay then
                        "\\cos(" ++ mathString e isDisplay ++ ")"

                    else
                        "\\cos(" ++ mathString e isDisplay ++ " * \\pi/180" ++ ")"

                SinD ->
                    if isDisplay then
                        "\\sin(" ++ mathString e isDisplay ++ ")"

                    else
                        "\\sin(" ++ mathString e isDisplay ++ " * \\pi/180" ++ ")"



-- Matrix Type


type alias Matrix =
    List (List MathExpr)



-- Matrix show in String


type alias DisplayMatrix =
    List (List String)



-- Matrix in Float


type alias CalcMatrix =
    List (List Float)



-- Apply a linear trasnformation to a Matrix


applyTransformation : Matrix -> Matrix -> Matrix
applyTransformation transM matrix =
    let
        matrixT =
            List.map (\x -> List.map (\y -> rowMultiple x y) transM) (matrixTranspose (getMatrixRowCount matrix) (getMatrixColCount matrix) matrix)
    in
    matrixTranspose (getMatrixRowCount matrixT) (getMatrixColCount matrixT) matrixT


applyMutipleTransAux : List Matrix -> Matrix
applyMutipleTransAux transList =
    case transList of
        t :: ts ->
            applyTransformation t (applyMutipleTransAux ts)

        [] ->
            identityMatrix



-- Apply a list of linear trasnformation to a Matrix


applyMutipleTrans : List Matrix -> Matrix -> Matrix
applyMutipleTrans transList matrix =
    applyTransformation (transList |> applyMutipleTransAux) matrix


rowMultiple : List MathExpr -> List MathExpr -> MathExpr
rowMultiple listA listB =
    sumRow (List.map2 (Func2 Mult) listA listB)


sumRow : List MathExpr -> MathExpr
sumRow matrixList =
    case matrixList of
        m :: mas ->
            Func2 Add
                m
                (if List.length mas == 1 then
                    fromJust (List.head mas)

                 else
                    sumRow mas
                )

        [] ->
            Coef 0


fromJust : Maybe MathExpr -> MathExpr
fromJust mathExpr =
    case mathExpr of
        Just expr ->
            expr

        Nothing ->
            Coef 0



-- Transpose a Matrix


matrixTranspose : Int -> Int -> Matrix -> Matrix
matrixTranspose m n matrix =
    case matrix of
        ma :: mas ->
            listPair ma (matrixTranspose m n mas)

        otherwise ->
            List.repeat n []


listPair : List a -> List (List a) -> List (List a)
listPair listA listB =
    List.map2 (\x y -> x :: y) listA listB


-- Round a matrix 
roundMatrix : Int -> Matrix -> Matrix
roundMatrix num matrix =
    List.map (\x -> List.map (\y -> Coef (Round.roundNum num (eval y))) x) matrix


-- Calculate a Matrix


calcMatrix : Matrix -> Matrix
calcMatrix matrix =
    List.map (\x -> List.map (\y -> Coef (eval y)) x) matrix



-- Evalue a Matrix


evalMatrix : Matrix -> CalcMatrix
evalMatrix matrix =
    List.map (\x -> List.map eval x) matrix



-- Convert a Matrix to a Matrix in String


matrixToStringList : Matrix -> Bool -> DisplayMatrix
matrixToStringList matrix isDisplay =
    List.map (\x -> List.map (\y -> mathString y isDisplay) x) matrix



-- Convert a Matrix to Latex equation


matrixToLatex : Matrix -> String
matrixToLatex matrix =
    "\\begin{bmatrix}"
        ++ List.foldr (++)
            ""
            (List.concat
                (List.map
                    (\x ->
                        List.append (List.intersperse " & " x)
                            [ " \\\\ " ]
                    )
                    (matrixToStringList matrix True)
                )
            )
        ++ "\\end{bmatrix}"

-- Convert a latex a url to get SVG


latex2Svg latex =

    [ html 500
        500
        (
            latexgenerate latex
        )
        |> scale 0.3
    ]
        |> group

-- Latex

latexgenerate expr =
  node "katex-expression"
    [ attribute "expression" expr
    , attribute "katex-options" (Encode.encode 0 options)
    ]
    []

options : Encode.Value
options =
    Encode.object
        [ ( "displayMode", Encode.bool True )
        ]


-- Eval a matrix and get SVG


evalMatrixSvg matrix =
    latex2Svg (matrixToLatex matrix)


getBook : Cmd Msg
getBook =
  Http.get
    { url = "https://elm-lang.org/assets/public-opinion.txt"
    , expect = Http.expectString GotResult
    }


-- Simpify a matrix and get SVG


simMatrixSvg matrix =
        latex2Svg (matrixToLatex matrix)



-- Get a svg by url


matrixSvg url =
    [ html 1000
        1000
        (Html.img
            [ Html.Attributes.src url
            , Html.Attributes.style "user-select" "none"
            , Html.Attributes.draggable "false"
            ]
            []
        )
        |> scale 0.2
    ]
        |> group



-- Get the number of row of a matrix


getMatrixRowCount matrix =
    List.length matrix



-- Get the number of column of a matrix


getMatrixColCount matrix =
    case List.head matrix of
        Just m ->
            List.length m

        Nothing ->
            -1


type Msg
    = Tick Float GetKeyState | GotResult (Result Http.Error String)


type alias Model =
    { time : Float , getResult : String}


update msg model =
    case msg of
        Tick t _ ->
            ( { model | time = t }, Cmd.none )

        GotResult result ->
                case result of
                    Ok res ->
                        ( { model | getResult = res }, Cmd.none )

                    Err _ ->
                        ( model, Cmd.none )


init =
    { time = 0, getResult = "" }


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

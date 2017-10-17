<?php            
    include '../model/graficos_2.php';             
    header('Content-Type: application/json', true);    
    $json = json_decode($_POST['item']);   
    /* INSTACIA A CLASSE GRAFICOS */
    $geraGrafico = new graficos();
              
    $geraGrafico->geraGrafico1($json);           
?>    

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />        
        <title>Painel Producao - Ind Bandeirante</title>
        <link rel="stylesheet" href="../../css/materialize.min.css" />
        <link rel="stylesheet" href="../../css/Gerencial.css" />
        <script src="../../js/jquery.min.js"></script>
        <script src="../../js/Chart.js"></script>             
    </head>
    <body>
        
    </body>
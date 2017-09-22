<?php

    header('Content-Type: application/json', true);
    
    $json = json_decode($_POST['item']);
    
    if($json->{'acao'} == 1){
        
            require_once 'dados.php';
            $dados = new dados();
            echo $dados->insere_dados($json);         
    }else{
        echo 'não foi possivel inserir os dados ';
    }


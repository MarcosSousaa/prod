<?php

    header('Content-Type: application/json', true);
    
    $json = json_decode($_POST['item']);
    
    if($json->{'acao'} == 1){
        if($flag){
            require_once 'dados.php';
            $dados = new dados();
            echo $dados->insere_dados($json);
        } else{
            
        }
    }


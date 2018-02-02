<?php
    require_once '../model/importaPlanilha.class.php';            
/* Seta configuração para não dar timeout */
ini_set('max_execution_time','-1');
$dir = '../../up/';
$arq = $dir. $_FILES['arq']['name'];
if(move_uploaded_file($_FILES['arq']['tmp_name'], $arq)){
    echo 'Arquivo Enviado';
    $pdo = new PDO('mysql:host=localhost;dbname=producao', 'root', 'admin');        
    /* Instância o objeto importação e passa como parâmetro o caminho da planilha e a conexão PDO */
    $obj = new importaPlanilha($arq, $pdo);      
    $linhaImportadas = $obj->insertDados();
    if($linhaImportadas = true){
        echo "<script>alert('PLANILHA IMPORTADA COM SUCESSO')</script>";
        echo "<script>window.location.href = '../../index.html'</script>"; 
        if(!unlink($arq)){
            echo 'Erro ao deletar';
        }
        else {
            echo 'Arquivo apagado';
        }
    }
    else {
        echo "<script>alert('NAO FOI IMPORTADO')</script>";
    }

}
else{echo 'Não foi possivel fazer o upload';}



 

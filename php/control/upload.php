<?php
    require_once '../model/importaPlanilha.class.php';            
/* Seta configuração para não dar timeout */
ini_set('max_execution_time','-1');       
$arq = $_POST["arq"];
$pdo = new PDO('mysql:host=localhost;dbname=producao', 'root', 'admin');        
/* Instância o objeto importação e passa como parâmetro o caminho da planilha e a conexão PDO */
$obj = new importaPlanilha($arq, $pdo);      
$linhaImportadas = $obj->insertDados();
if($linhaImportadas = true){
    echo "<script>alert('PLANILHA IMPORTADA COM SUCESSO')</script>";
    echo "<script>window.location.href = '../../index.html'</script>";   
}
else {
    echo "<script>alert('NAO FOI IMPORTADO')</script>";
}

 
 
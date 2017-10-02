<?php
    require_once '../model/datb.php';

    function geraGraficos($json){
        $banco = new datb();
        $query = "SELECT SUM(PROD_KG),EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EXTRUSORA = '01' UNION SELECT SUM(PROD_KG),EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EXTRUSORA = '02' UNION SELECT SUM(PROD_KG),EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EXTRUSORA = '03' UNION SELECT SUM(PROD_KG),EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EXTRUSORA = '04' UNION SELECT SUM(PROD_KG),EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EXTRUSORA = '05';";
        $result = $banco->sql_query($query);
        foreach($result as $row){
            $row['DATA_PROD'] = str_replace("-", "/", $row['DATA_PROD']);
            $row['DATA_PROD'] = date('d/m/Y', strtotime($row['DATA_PROD'])); 
            echo json_encode($row);
        }
    }


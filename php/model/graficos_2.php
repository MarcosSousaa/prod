<?php
    header('Content-Type: application/json');
   require_once '../model/datb.php';        
    class graficos_2 {                             
        // GRAFICO POR MAQUINA 
        public function geraGrafico10($json){            
            $banco = new datb();            
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA)AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' GROUP BY EXTRUSORA;");
            foreach($result as $row){
                $data[] = $row;             
            }
            echo json_encode($data);           
        }
        
         
        
    }

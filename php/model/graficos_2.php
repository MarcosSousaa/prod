<?php    
   require_once '../model/datb.php';        
    class graficos {
        public $linha = array();
            // GRAFICO GERAL
           
        // GRAFICO POR MAQUINA 
        public function geraGrafico1($data1,$data2){            
            $banco = new datb();
            $linhas = 1;
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA)AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$data1."' AND '".$data2."' GROUP BY EXTRUSORA;");
            foreach($result as $row){
                echo json_encode($row);                
            }
           
        }
        
         
        
    }

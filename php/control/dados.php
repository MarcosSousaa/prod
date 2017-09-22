<?php
    require_once '../model/datb.php';
    
    class dados {
        public $data;
        public $extrusora;
        public $turno;
        public $operador;
        public $producao;
        public $apara;
        public $refile;
        public $borra;
        public $qtd_paradas;
        public $min_paradas;
        public $oc;
        
     
      public function seleciona(){
          $banco = new datb();
          $query = "SELECT * FROM DADOS";
          $result = $banco ->sql_query($query);
          
      }
      
      public function insere_dados($json){          
          $banco = new datb();
          $oc_tr = implode(",",$json->{'oc'});
          $newdata = str_replace("/","-",$json->{'data'});
          $newdata = date('Y-m-d');
          $query = "INSERT INTO DADOS(DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,QTD_PARADAS,MINUTOS_PARADAS,OC) VALUES ('".$newdata."','".$json->{'extrusora'}."','".$json->{'turno'}."','".$json->{'operador'}."','".$json->{'producao'}."','".$json->{'apara'}."','".$json->{'refile'}."','".$json->{'borra'}."','".$json->{'qtd_paradas'}."','".$json->{'minutos_paradas'}."','". $oc_tr."');";          
          return $banco ->sql_insert($query);
      }
    }



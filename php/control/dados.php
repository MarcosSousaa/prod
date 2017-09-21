<?php
    require_once 'model/datb.php';
    
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
          
      }
      
      public function insere_dados($json){
          $banco = new datb();
          $query = "INSERT INTO producao(DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,QTD_PARADAS,MINUTOS_PARADAS,OC)";
          $query = " VALUES ('".$json->{'data'}."','".$json->{'extrusora'}."','".$json->{'turno'}."','".$json->{'operador'}."','".$json->{'producao'}."','".$json->{'apara'}."','".$json->{'refile'}."','".$json->{'borra'}."','".$json->{'qtd_paradas'}."','".$json->{'minutos_paradas'}."','".$json->{'oc'}."');";
          return $banco ->sql_insert($query);
      }
    }



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
        $query = "SELECT * FROM DADOS;";
        $result = $banco ->sql_query($query); // $newdata = str_replace("/","-",$json->{'data'});        
        //$newdata = date('Y-m-d');
        
        $table = "";
        foreach ($result as $row){
            $newdata = str_replace("-", "/", $row['DATA_PROD']);
            $newdata2 = date('d/m/Y', strtotime($newdata));
            $table .= "<tr><td>".$row['ID']."</td><td>".$newdata2."</td><td>".$row['EXTRUSORA']."</td><td>".$row['TURNO']."</td><td>".$row['OPERADOR']."</td><td>".$row['PROD_KG']."</td><td>".$row['APARA']."</td><td>".$row['REFILE']."</td><td>".$row['BORRA']."</td><td>".$row['QTD_PARADAS']."</td><td>".$row['MINUTOS_PARADAS']."</td><td>".$row['OC']."</td>";
            $table .= "<td><input id='id_edit' type='hidden' value=".$row['ID']."/><a class='waves-effect waves-light btn' id='edit'<i class='material-icons center'>edit</i></a>";
            $table .= "<td><a class='waves-effect waves-light btn' id='btn-del'<i class='material-icons center'>delete</i><input id='id_del' type='hidden' value=".$row['ID']." /></a>";            
        }        
        return $table;
      
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



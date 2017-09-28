<?php
    require_once '../model/datb.php';
    
    class dados {
        public $id;
        public $data;
        public $extrusora;
        public $turno;
        public $operador;
        public $producao;
        public $apara;
        public $refile;
        public $borra;
        public $acabamento;
        public $qtd_parada;
        public $tempo_parada;
        public $oc;
        
     
        public function seleciona(){
            $banco = new datb();
            $query = "SELECT * FROM DADOS;";
            $result = $banco ->sql_query($query); // $newdata = str_replace("/","-",$json->{'data'});                    
            $table = "";
            foreach ($result as $row){            
                $newdata = str_replace("-", "/", $row['DATA_PROD']);
                $newdata2 = date('d/m/Y', strtotime($newdata));
                $table .= "<tr><td>".$row['ID']."</td><td>".$newdata2."</td><td>".$row['EXTRUSORA']."</td><td>".$row['TURNO']."</td><td>".$row['OPERADOR']."</td><td>".$row['PROD_KG']."</td><td>".$row['APARA']."</td><td>".$row['REFILE']."</td><td>".$row['BORRA']."</td><td>".$row['ACABAMENTO']."</td><td>".$row['QTD_PARADA']."</td><td>".$row['TEMPO_PARADA']."</td><td>".$row['OC']."</td>";
                $table .= "<td><a class='waves-effect waves-light btn btn-edit'><i class='material-icons center'>edit</i></a></td>";
                $table .= "<td><a class='waves-effect waves-light btn btn-del'><i class='material-icons center'>delete</i></a></td>";
            }        
            return $table;      
        }
      
        public function insere_dados($json){          
            $banco = new datb();
            $oc_tr = implode(",",$json->{'oc'});
            $newdata = str_replace("/","-",$json->{'data'});
            $newdata = date('Y-m-d');
            $query = "INSERT INTO DADOS(DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,ACABAMENTO,QTD_PARADA,TEMPO_PARADA,OC) VALUES ('".$newdata."','".$json->{'extrusora'}."','".$json->{'turno'}."','".$json->{'operador'}."','".$json->{'producao'}."','".$json->{'apara'}."','".$json->{'refile'}."','".$json->{'borra'}."','".$json->{'acabamento'}."','".$json->{'qtd_parada'}."','".$json->{'tempo_parada'}."','". $oc_tr."');";          
            return $banco ->sql_insert($query);
        }
    
        public function seleciona_id($id){
            $banco = new datb();
            $query = "SELECT * FROM DADOS WHERE ID_DADOS=".$id.";";
            $result = $banco->sql_query($query);
            $form = "";
            foreach($result as $row){
                $row['DATA_PROD'] = str_replace("-","/",$row['DATA_PROD']);
                $row['DATA_PROD'] = date('d/m/Y', strtotime($row['DATA_PROD']));
                $row['OC'] = explode(",", $row['OC']);
                echo json_encode($row);
            }   
        }    
        
        public function altera($json){
            $banco = new datb();
            $oc_tr = implode(",",$json->{'oc'});
            $newdata = str_replace("/","-",$json->{'data'});
            $newdata = date('Y-m-d');
            $query = "UPDATE DADOS SET DATA_PROD='".$newdata."',EXTRUSORA='".$json->{'extrusora'}."',OPERADOR='".$json->{'operador'}."',PRODUCAO='".$json->{'producao'}."',APARA='".$json->{'apara'}."',REFILE='".$json->{'refile'}."',BORRA='".$json->{'borra'}."',ACABAMENTO='".$json->{'acabamento'}."',QTD_PARADA='".$json->{'qtd_parada'}."',TEMPO_PARADA='".$json->{'tempo_parada'}."',OC='".$oc_tr."' WHERE ID_DADOS=".$json->{'id'}.";";
            return $banco ->sql_insert($query);
        }
      
    }



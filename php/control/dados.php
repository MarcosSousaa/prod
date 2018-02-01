<?php
    require_once '../model/datb.php';
    require_once '../model/simplexlsx.class.php';
    ini_set('max_execution_time','-1');
    
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
       
        
        public function seleciona($json){
            $banco = new datb();            
            //$query = "SELECT * FROM D WHERE DATA_PROD BETWEEN'".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EMPRESA_FK =".$json->{'empresa'}." ORDER BY DATA_PROD;";
            $query = "SELECT * FROM d LEFT OUTER JOIN empresa ON D.EMPRESA_FK = EMPRESA.ID_EMPRESA DATA_PROD BETWEEN'".$json->{'data1'}."' AND '".$json->{'data2'}."' AND EMPRESA_FK = ".$json->{'emp'}." ORDER BY DATA_PROD;";
            $result = $banco ->sql_query($query);
            $table = "";
            foreach ($result as $row){            
                $row['DATA_PROD'] = str_replace("-", "/", $row['DATA_PROD']);
                $row['DATA_PROD'] = date('d/m/Y', strtotime($row['DATA_PROD'])); 
                $table .= "<tr><td style='display: none;'>".$row['ID']."</td><td>".$row['NOME_EMP']."</td><td>".$row['DATA_PROD']."</td><td>".$row['EXTRUSORA']."</td><td>".$row['TURNO']."</td><td>".$row['OPERADOR']."</td><td>".$row['PROD_KG']."</td><td>".$row['APARA']."</td><td>".$row['REFILE']."</td><td>".$row['BORRA']."</td><td>".$row['ACABAMENTO']."</td><td>".$row['QTD_PARADA']."</td><td>".$row['TEMPO_PARADA']."</td><td>".$row['OC']."</td>";
                $table .= "<td><a class='waves-effect waves-light btn btn-edit'><i class='material-icons center'>edit</i></a></td>";
                $table .= "<td><a class='waves-effect waves-light btn btn-del'><i class='material-icons center'>delete</i></a></td>";
            }        
            return $table;      
        }
        
        public function seleciona_empresa($json){
            $banco = new datb();         
            $query = "SELECT * FROM empresa";
            $result = $banco ->sql_query_emp($query);
            $table = "";
            $table = "<option disabled selected>SELECIONE UMA EMPRESA</option>";
            foreach ($result as $row){            
                $table .= '<option value="'.$row['ID_EMPRESA'].'">'.$row['NOME_EMPRESA'].'</option>';
            }        
            return $table;      
        }
        
        public function insere_dados($json){          
            $banco = new datb();
            date_default_timezone_set('America/Sao_Paulo');
            $date = date('Y-m-d H:i');
            if(!empty($json->{'oc'})){
                $oc_tr = implode(",",$json->{'oc'});                                    
            $query = "INSERT INTO DADOS(DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,ACABAMENTO,QTD_PARADA,TEMPO_PARADA,OC,TIMESTAMP) VALUES ('".$json->{'data'}."','".$json->{'extrusora'}."','".$json->{'turno'}."','".$json->{'operador'}."','".$json->{'producao'}."','".$json->{'apara'}."','".$json->{'refile'}."','".$json->{'borra'}."','".$json->{'acabamento'}."','".$json->{'qtd_parada'}."','".$json->{'tempo_parada'}."','". $oc_tr."','".$date."');";                      
            }
            else {            
                $query = "INSERT INTO DADOS(DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,ACABAMENTO,QTD_PARADA,TEMPO_PARADA,TIMESTAMP) VALUES ('".$json->{'data'}."','".$json->{'extrusora'}."','".$json->{'turno'}."','".$json->{'operador'}."','".$json->{'producao'}."','".$json->{'apara'}."','".$json->{'refile'}."','".$json->{'borra'}."','".$json->{'acabamento'}."','".$json->{'qtd_parada'}."','".$json->{'tempo_parada'}."','".$date."');";                      
            }
                                
            return $banco ->sql_insert($query);            
        }
        
        public function importaDados($json){
            try{
                $banco = new datb();
                date_default_timezone_set('America/Sao_Paulo');
                $date = date('Y-m-d H:i');
                $query = "INSERT INTO D(EMPRESA_FK,DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,ACABAMENTO,QTD_PARADA,TEMPO_PARADA,TIMESTAMP) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stm = $banco->sql_insert($query);
                $linha = null;
                foreach($this->planilha->rows() as $chave => $valor):
				if ($chave >= 1 ):		
					$empresa  = trim($valor[0]);
					$data_prod    = trim($valor[1]);
					$extrusora     = trim($valor[2]);
					$turno   = trim($valor[3]);
					$operador = trim($valor[4]);
                                        $prod_kg  = trim($valor[5]);
					$apara    = trim($valor[6]);
					$refile     = trim($valor[7]);
					$borra   = trim($valor[8]);
					$acabamento = trim($valor[9]);
                                        $qtd_parada  = trim($valor[10]);
					$tempo_parada    = trim($valor[11]);
					$oc     = trim($valor[12]);
                                        $timestamp = $date;
                                        
					$stm->bindValue(1, $empresa);
					$stm->bindValue(2, $data_prod);
					$stm->bindValue(3, $extrusora);
					$stm->bindValue(4, $turno);
					$stm->bindValue(5, $operador);
                                        $stm->bindValue(6, $prod_kg);
					$stm->bindValue(7, $apara);
					$stm->bindValue(8, $refile);
					$stm->bindValue(9, $borra);
					$stm->bindValue(10, $acabamento);
                                        $stm->bindValue(11, $qtd_parada);
					$stm->bindValue(12, $tempo_parada);
					$stm->bindValue(13, $oc);
                                        $stm->bindValue(14, $timestamp);
					$retorno = $stm->execute();					
					if($retorno == true) $linha++;
				 endif;
			endforeach;
 
                    return $linha;
            } catch (Exception $ex) {
                    echo 'Erro: ' . $erro->getMessage();
            }
        }
       
    
        public function seleciona_id($id){
            $banco = new datb();
            $query = "SELECT * FROM DADOS WHERE ID_DADOS=".$id.";";
            $result = $banco->sql_query($query);            
            foreach($result as $row){
                $row['DATA_PROD'] = str_replace("-", "/", $row['DATA_PROD']);
                $row['DATA_PROD'] = date('d/m/Y', strtotime($row['DATA_PROD'])); 
                $row['OC'] = explode(",", $row['OC']);
                echo json_encode($row);
            }   
        }    
        
        public function altera_dados($json){
            $banco = new datb();
            date_default_timezone_set('America/Sao_Paulo');
            $date = date('Y-m-d H:i');
            if(!empty($json->{'oc'})){                
                $oc_tr = implode(",",$json->{'oc'});                
                $query = "UPDATE DADOS SET DATA_PROD='".$json->{'data'}."',EXTRUSORA='".$json->{'extrusora'}."',TURNO='".$json->{'turno'}."',OPERADOR='".$json->{'operador'}."',PROD_KG='".$json->{'producao'}."',APARA='".$json->{'apara'}."',REFILE='".$json->{'refile'}."',BORRA='".$json->{'borra'}."',ACABAMENTO='".$json->{'acabamento'}."',QTD_PARADA='".$json->{'qtd_parada'}."',TEMPO_PARADA='".$json->{'tempo_parada'}."',OC='".$oc_tr."',TIMESTAMP='".$date."' WHERE ID_DADOS='".$json->{'id'}."';";            
            }else{                                
                $query = "UPDATE DADOS SET DATA_PROD='".$json->{'data'}."',EXTRUSORA='".$json->{'extrusora'}."',TURNO='".$json->{'turno'}."',OPERADOR='".$json->{'operador'}."',PROD_KG='".$json->{'producao'}."',APARA='".$json->{'apara'}."',REFILE='".$json->{'refile'}."',BORRA='".$json->{'borra'}."',ACABAMENTO='".$json->{'acabamento'}."',QTD_PARADA='".$json->{'qtd_parada'}."',TEMPO_PARADA='".$json->{'tempo_parada'}."', TIMESTAMP='".$date."' WHERE ID_DADOS='".$json->{'id'}."';";                 
            }
            return $banco->sql_insert($query);
        }
        
        public function deleta_dados($id){
            $banco = new datb();
            $query = "DELETE  FROM DADOS WHERE ID_DADOS=".$id.";";
            return $banco->sql_insert($query);            
        } 
        
        public function geraGrafico($json){            
            $banco = new datb();            
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA)AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,(SELECT DATA_PROD FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' ORDER BY DATA_PROD DESC LIMIT 1) AS ULTIMADATA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."';");
            foreach($result as $row){
                $data[] = $row;                
            }
            return $data;   
        }
        
        public function geraGrafico1($json){            
            $banco = new datb();            
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA)AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,TURNO,(SELECT DATA_PROD FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' ORDER BY DATA_PROD DESC LIMIT 1) AS ULTIMADATA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' GROUP BY TURNO;");
            foreach($result as $row){
                $data[] = $row;                
            }
            return $data;   
        }
                
        public function geraGrafico2($json){            
            $banco = new datb();            
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA)AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,EXTRUSORA,(SELECT DATA_PROD FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' ORDER BY DATA_PROD DESC LIMIT 1) AS ULTIMADATA FROM DADOS WHERE DATA_PROD BETWEEN '".$json->{'data1'}."' AND '".$json->{'data2'}."' GROUP BY EXTRUSORA;");
            foreach($result as $row){                
                $data[] = $row;               
            }
            return $data;   
        }
                 
        
        public function anualGrafico0($json){
            $banco = new datb();            
            $result = $banco->sql_grafico("select 'Producao' as tipo, year(data_prod) as ano,sum(if(month(DATA_PROD) = 1, ifnull(PROD_KG, 0),0)) as janeiro,sum(if(month(DATA_PROD) = 1, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_janeiro,sum(if(month(DATA_PROD) = 2, ifnull(PROD_KG, 0),0)) as fevereiro,sum(if(month(DATA_PROD) = 2, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_fevereiro,sum(if(month(DATA_PROD) = 3, ifnull(PROD_KG, 0),0)) as marco,sum(if(month(DATA_PROD) = 3, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_marco,sum(if(month(DATA_PROD) = 4, ifnull(PROD_KG, 0),0)) as abril,sum(if(month(DATA_PROD) = 4, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_abril,sum(if(month(DATA_PROD) = 5, ifnull(PROD_KG, 0),0)) as maio,sum(if(month(DATA_PROD) = 5, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_maio,sum(if(month(DATA_PROD) = 6, ifnull(PROD_KG, 0),0)) as junho,sum(if(month(DATA_PROD) = 6, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_junho,sum(if(month(DATA_PROD) = 7, ifnull(PROD_KG, 0),0)) as julho,sum(if(month(DATA_PROD) = 7, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_julho,sum(if(month(DATA_PROD) = 8, ifnull(PROD_KG, 0),0)) as agosto,sum(if(month(DATA_PROD) = 8, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_agosto,sum(if(month(DATA_PROD) = 9, ifnull(PROD_KG, 0),0)) as setembro,sum(if(month(DATA_PROD) = 9, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_setembro,sum(if(month(DATA_PROD) = 10, ifnull(PROD_KG, 0),0)) as outubro,sum(if(month(DATA_PROD) = 10, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_outubro,sum(if(month(DATA_PROD) = 11, ifnull(PROD_KG, 0),0)) as novembro,sum(if(month(DATA_PROD) = 11, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_novembro,sum(if(month(DATA_PROD) = 12, ifnull(PROD_KG, 0),0)) as dezembro,sum(if(month(DATA_PROD) = 12, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as perda_dezembro,sum(ifnull(PROD_KG, 0)) as total_produzido,sum(ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0)) as total_perda from DADOS WHERE year(DATA_PROD) BETWEEN '".$json->{'ano1'}."' AND '".$json->{'ano2'}."' group by year(DATA_PROD)");
            //$result = $banco->sql_grafico("select 'Producao' as tipo, year(data_prod) as ano,sum(if(month(DATA_PROD) = 1, ifnull(PROD_KG, 0),0)) as janeiro,sum(if(month(DATA_PROD) = 2, ifnull(PROD_KG, 0),0)) as fevereiro,sum(if(month(DATA_PROD) = 3, ifnull(PROD_KG, 0),0)) as marco,sum(if(month(DATA_PROD) = 4, ifnull(PROD_KG, 0),0)) as abril,sum(if(month(DATA_PROD) = 5, ifnull(PROD_KG, 0),0)) as maio,sum(if(month(DATA_PROD) = 6, ifnull(PROD_KG, 0),0)) as junho,sum(if(month(DATA_PROD) = 7, ifnull(PROD_KG, 0),0)) as julho,sum(if(month(DATA_PROD) = 8, ifnull(PROD_KG, 0),0)) as agosto,sum(if(month(DATA_PROD) = 9, ifnull(PROD_KG, 0),0)) as setembro,sum(if(month(DATA_PROD) = 10, ifnull(PROD_KG, 0),0)) as outubro,sum(if(month(DATA_PROD) = 11, ifnull(PROD_KG, 0),0)) as novembro,sum(if(month(DATA_PROD) = 12, ifnull(PROD_KG, 0),0)) as dezembro,sum(ifnull(PROD_KG, 0)) as total from DADOS WHERE year(DATA_PROD) BETWEEN '".$json->{'ano1'}."'  AND '".$json->{'ano2'}."'  group by year(DATA_PROD) union all select 'Perda' as tipo, year(data_prod) as ano, sum(if(month(DATA_PROD) = 1, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as janeiro,sum(if(month(DATA_PROD) = 2, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as fevereiro,sum(if(month(DATA_PROD) = 3, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as marco,sum(if(month(DATA_PROD) = 4, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as abril,sum(if(month(DATA_PROD) = 5, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as maio,sum(if(month(DATA_PROD) = 6, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as junho,sum(if(month(DATA_PROD) = 7, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as julho,sum(if(month(DATA_PROD) = 8, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as agosto,sum(if(month(DATA_PROD) = 9, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as setembro,sum(if(month(DATA_PROD) = 10, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as outubro,sum(if(month(DATA_PROD) = 11, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as novembro,sum(if(month(DATA_PROD) = 12, ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0),0)) as dezembro,sum(ifnull((APARA + REFILE + BORRA + ACABAMENTO), 0)) as total from DADOS WHERE year(DATA_PROD) BETWEEN '".$json->{'ano1'}."' AND '".$json->{'ano2'}."' group by year(DATA_PROD)");
            foreach($result as $row){                
                $data[] = $row;               
            }
            return $data;   
        }
      
    }



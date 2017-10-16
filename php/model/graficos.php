<?php
    require_once '../model/datb.php';
    class graficos {
        public $linha = array();
            // GRAFICO GERAL
            public function buscaData(){
                $data1 = $_SESSION['data1'];
                $data2 = $_SESSION['data2'];
                $banco = new datb();
                $linhas = 1;
                $result = $banco->sql_grafico("SELECT DATA_PROD FROM DADOS WHERE DATA_PROD BETWEEN'".$data1."' AND '".$data2."' ORDER BY DATA_PROD DESC LIMIT 1;");
            if(mysqli_num_rows($result)> 0){
                while($dados = mysqli_fetch_object($result)){
                    switch($linhas){
                        case 1:
                            $this->linha[0][5] = $dados->DATA_PROD;
                            
                    }
                    $linhas++;
                }                
                $_SESSION['array'] = $this->linha;
            }
            else{
                echo "<script>alert('Não contem dados para gerar o grafico, rever filtro')</script>";
                echo "<script>window.location.assign('../../Gerencial.html')</script>";
                $_SESSION['data1'] = null;
                $_SESSION['data2'] = null;         
            }            
        }
            
            public function geraGrafico0(){
            $data1 = $_SESSION['data1'];
            $data2 = $_SESSION['data2'];
            $banco = new datb();
            $linhas = 1;
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG) AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA  FROM DADOS WHERE DATA_PROD BETWEEN '".$data1."' AND '".$data2."'");
            if(mysqli_num_rows($result)> 0){
                while($dados = mysqli_fetch_object($result)){
                    switch($linhas){
                        case 1:
                            $this->linha[0][0] = $dados->PRODUCAO;
                            $this->linha[0][1] = $dados->PERDA;
                    }
                    $linhas++;
                }                
                $_SESSION['array'] = $this->linha;
            }
            else{
                echo "<script>alert('Não contem dados para gerar o grafico, rever filtro')</script>";
                echo "<script>window.location.assign('../../Gerencial.html')</script>";
                $_SESSION['data1'] = null;
                $_SESSION['data2'] = null;         
            }            
        }
        // GRAFICO POR MAQUINA 
        public function geraGrafico1(){
            $data1 = $_SESSION['data1'];
            $data2 = $_SESSION['data2'];
            $banco = new datb();
            $linhas = 1;
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA)AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,EXTRUSORA FROM DADOS WHERE DATA_PROD BETWEEN '".$data1."' AND '".$data2."' GROUP BY EXTRUSORA;");
            if(mysqli_num_rows($result)> 0){
                while($dados = mysqli_fetch_object($result)){
                    switch($linhas){
                        case 1:
                            $this->linha[1][0] = $dados->PRODUCAO;
                            $this->linha[1][1] = $dados->EXTRUSORA;
                            $this->linha[1][2] = $dados->PERDA;
                            $this->linha[1][3] = $dados->APARA;
                            $this->linha[1][4] = $dados->REFILE;
                            $this->linha[1][5] = $dados->BORRA;
                            $this->linha[1][6] = $dados->ACABAMENTO;
                        break;
                        case 2:
                            $this->linha[2][0] = $dados->PRODUCAO;
                            $this->linha[2][1] = $dados->EXTRUSORA;
                            $this->linha[2][2] = $dados->PERDA;
                            $this->linha[2][3] = $dados->APARA;
                            $this->linha[2][4] = $dados->REFILE;
                            $this->linha[2][5] = $dados->BORRA;
                            $this->linha[2][6] = $dados->ACABAMENTO;
                        break;
                        case 3:
                            $this->linha[3][0] = $dados->PRODUCAO;
                            $this->linha[3][1] = $dados->EXTRUSORA;
                            $this->linha[3][2] = $dados->PERDA;
                            $this->linha[3][3] = $dados->APARA;
                            $this->linha[3][4] = $dados->REFILE;
                            $this->linha[3][5] = $dados->BORRA;
                            $this->linha[3][6] = $dados->ACABAMENTO;
                        break;
                        case 4:
                            $this->linha[4][0] = $dados->PRODUCAO;
                            $this->linha[4][1] = $dados->EXTRUSORA;
                            $this->linha[4][2] = $dados->PERDA;
                            $this->linha[4][3] = $dados->APARA;
                            $this->linha[4][4] = $dados->REFILE;
                            $this->linha[4][5] = $dados->BORRA;
                            $this->linha[4][6] = $dados->ACABAMENTO;
                        break;
                        case 5:
                            $this->linha[5][0] = $dados->PRODUCAO;
                            $this->linha[5][1] = $dados->EXTRUSORA;
                            $this->linha[5][2] = $dados->PERDA;
                            $this->linha[5][3] = $dados->APARA;
                            $this->linha[5][4] = $dados->REFILE;
                            $this->linha[5][5] = $dados->BORRA;
                            $this->linha[5][6] = $dados->ACABAMENTO;
                    }
                    $linhas++;
                }                
                $_SESSION['array'] = $this->linha;
            }
            else{
                echo "<script>alert('Não contem dados para gerar o grafico, rever filtro')</script>";
                echo "<script>window.location.assign('../../Gerencial.html')</script>";
                $_SESSION['data1'] = null;
                $_SESSION['data2'] = null;         
            }            
        }
        
          public function geraGrafico2(){
            $data1 = $_SESSION['data1'];
            $data2 = $_SESSION['data2'];
            $banco = new datb();
            $linhas = 1;
            $result = $banco->sql_grafico("SELECT SUM(PROD_KG)AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA) AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,TURNO FROM DADOS WHERE DATA_PROD BETWEEN '".$data1."' AND '".$data2."' AND TURNO = 'MANHA' UNION SELECT SUM(PROD_KG) AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA) AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,TURNO FROM DADOS WHERE DATA_PROD BETWEEN '".$data1."' AND '".$data2."' AND TURNO = 'TARDE' UNION SELECT SUM(PROD_KG) AS PRODUCAO,SUM(APARA + REFILE + BORRA + ACABAMENTO) AS PERDA,SUM(APARA) AS APARA,SUM(REFILE) AS REFILE,SUM(BORRA) AS BORRA,SUM(ACABAMENTO) AS ACABAMENTO,TURNO FROM DADOS WHERE DATA_PROD BETWEEN '".$data1."' AND '".$data2."' AND TURNO = 'NOITE';");
            if(mysqli_num_rows($result)> 0){
                while($dados = mysqli_fetch_object($result)){
                    switch($linhas){
                        case 1:
                            $this->linha[6][0] = $dados->PRODUCAO;
                            $this->linha[6][1] = $dados->TURNO;
                            $this->linha[6][2] = $dados->PERDA;
                            $this->linha[6][3] = $dados->APARA;
                            $this->linha[6][4] = $dados->REFILE;
                            $this->linha[6][5] = $dados->BORRA;
                            $this->linha[6][6] = $dados->ACABAMENTO;
                        break;
                        case 2:
                            $this->linha[7][0] = $dados->PRODUCAO;
                            $this->linha[7][1] = $dados->TURNO;
                            $this->linha[7][2] = $dados->PERDA;
                            $this->linha[7][3] = $dados->APARA;
                            $this->linha[7][4] = $dados->REFILE;
                            $this->linha[7][5] = $dados->BORRA;
                            $this->linha[7][6] = $dados->ACABAMENTO;
                        break;
                        case 3:
                            $this->linha[8][0] = $dados->PRODUCAO;
                            $this->linha[8][1] = $dados->TURNO;   
                            $this->linha[8][2] = $dados->PERDA;
                            $this->linha[8][3] = $dados->APARA;
                            $this->linha[8][4] = $dados->REFILE;
                            $this->linha[8][5] = $dados->BORRA;
                            $this->linha[8][6] = $dados->ACABAMENTO;
                    }
                    $linhas++;
                }                
                $_SESSION['array'] = $this->linha;
            }
            else{
                echo "<script>alert('Não contem dados para gerar o grafico, rever filtro')</script>";
                echo "<script>window.location.assign('../../Gerencial.html')</script>";
                $_SESSION['data1'] = null;
                $_SESSION['data2'] = null;         
            }            
        }
    }

<?php

class datb{
    // INFO DO BD HOMOLOGACAO
    private $host = "localhost";
    private $usr = "root";
    private $pass = "admin";
    private $dbase = "producao";

    // INFO DO BD PRODUCAO    
    //private $host = "192.168.1.15";
    //private $usr = "root";
    //private $pass = "B@nd@)!@";
    //private $dbase = "producao";
    
    // ATRIBUTOS USADOS
    private $query;
    private $link;
    private $resultado;
    
    
    function MySql(){
        
    }
    // FUNÇÃO CONECTAR
    function  conecta(){
        $this->link = @mysqli_connect($this->host,$this->usr,  $this->pass);
        if(!$this->link){
            // Caso ocorra um erro, exibe uma mensagem com o erro
            print "Ocorreu um Erro na conexão MySQL:";
            print "<b>".  mysqli_error()."</b>";
            die();
        }elseif(!mysqli_select_db($this->link, $this->dbase)){
            // Seleciona o banco após a conexão
            // Caso ocorra um erro, exibe uma mensagem com o erro
            print "Ocorreu um Erro em selecionar o Banco:";
            print "<b>".mysqli_error()."</b>";
            die();
        }
    }
    
    //METODO DESCONECTAR
    function desconecta(){
        mysqli_close($this->link);
    }
    
    // METODO SELECIONAR DADOS
    function sql_query($query){
        $this->conecta();
        $this->query = mysqli_query($this->link,$query);        
        $return = array();        
       while($this->resultado = mysqli_fetch_array($this->query)){
           // Escreve na pagina o retorno para cada registro trazido pela query
           $return[] = array(
               'ID'=>$this->resultado['ID_DADOS'],
               'DATA_PROD'=>$this->resultado['DATA_PROD'],
               'EXTRUSORA'=>$this->resultado['EXTRUSORA'],
               'TURNO'=>$this->resultado['TURNO'],
               'OPERADOR'=>$this->resultado['OPERADOR'],
               'PROD_KG'=>$this->resultado['PROD_KG'],
               'APARA'=>$this->resultado['APARA'],
               'REFILE'=>$this->resultado['REFILE'],
               'BORRA'=>$this->resultado['BORRA'],
               'ACABAMENTO'=>$this->resultado['ACABAMENTO'],
               'QTD_PARADA'=>$this->resultado['QTD_PARADA'],
               'TEMPO_PARADA'=>$this->resultado['TEMPO_PARADA'],
               'OC'=>$this->resultado['OC']           
           );
       }       
       $this->desconecta();
       return $return;       
    }
    
    // INSERIR DADOS
    public function sql_insert($query){
        $this->conecta();
        $this->query = $query;
        if($this->resultado = mysqli_query($this->link,$this->query)){                    
            $this->desconecta();            
            return true;
            
        }
        else {           
            $this->desconecta();
            return false;
        }
    }
}


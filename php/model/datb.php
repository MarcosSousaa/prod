<?php

class datb{
    // INFO DO BD HOMOLOGACAO
    private $host = "localhost";
    private $usr = "root";
    private $pass = "admin";
    private $database = "producao";

    // INFO DO BD PRODUCAO
    /*
    private $host = "192.168.1.15";
    private $usr = "root";
    private $pass = "B@nd@)!@";
    private $database = "producao";
    */
    // ATRIBUTOS USADOS
    private $query;
    private $link;
    private $resultado;
    
    
    function MySql(){
        
    }
    // FUNÇÃO CONECTAR
    function  conecta(){
        $this->link = @mysql_connect($this->host,$this->usr,  $this->pass);
        if(!$this->link){
            // Caso ocorra um erro, exibe uma mensagem com o erro
            print "Ocorreu um Erro na conexão MySQL:";
            print "<b>".mysql_error()."</b>";
            die();
        }elseif(!mysql_select_db($this->dbase,$this->link)){
            // Seleciona o banco após a conexão
            // Caso ocorra um erro, exibe uma mensagem com o erro
            print "Ocorreu um Erro em selecionar o Banco:";
            print "<b>".mysql_error()."</b>";
            die();
        }
    }
    
    //METODO DESCONECTAR
    function desconecta(){
        mysql_close($this->link);
    }
    
    // METODO SELECIONAR DADOS
    function sql_query($query){
        $this->conecta();
        $this->query = $query;
        if($this->resultado = mysql_query($this->query)){
            $this->desconecta();
            return $this->resultado;
        }else{
            // Caso ocorra um erro, exibe uma mensagem com o Erro
            print "Ocorreu um erro ao executar a Query MySQL:";            
            print "Erro no MySQL: <b>".mysql_error()."</b>";
            die();
            $this->desconecta();
        }
    }
    
    // INSERIR DADOS
    public function sql_insert($query){
        $this->conecta();
        $this->query = $query;
        if($this->resultado = mysql_query(($this->query))){
            echo 'DADOS GRAVADOS COM SUCESSO';
            $this->desconecta();
            
        }
        else {
            echo 'FALHA AO INSERIR';
            echo 'Erro no MySQL: <b>'.mysql_error().'</b>';
            $this->desconecta();
        }
    }
}

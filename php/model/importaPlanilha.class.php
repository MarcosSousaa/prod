<?php
 
ini_set('max_execution_time','-1');
require_once "simplexlsx.class.php";
 
class ImportaPlanilha{
 
	// Atributo recebe a instância da conexão PDO
	private $conexao  = null;
 
     // Atributo recebe uma instância da classe SimpleXLSX
	private $planilha = null;
 
	// Atributo recebe a quantidade de linhas da planilha
	private $linhas   = null;
 
	// Atributo recebe a quantidade de colunas da planilha
	private $colunas  = null;
 
	/*
	 * Método Construtor da classe
	 * @param $path - Caminho e nome da planilha do Excel xlsx
	 * @param $conexao - Instância da conexão PDO
	 */
	public function __construct($path=null, $conexao=null){
 
		if(!empty($path) && file_exists($path)):
			$this->planilha = new simplexlsx($path);
			list($this->colunas, $this->linhas) = $this->planilha->dimension();
		else:
			echo 'Arquivo não encontrado!';
			exit();
		endif;
 
		if(!empty($conexao)):
			$this->conexao = $conexao;
		else:
			echo 'Conexão não informada!';
			exit();
		endif;
 
	}
 
	/*
	 * Método que retorna o valor do atributo $linhas
	 * @return Valor inteiro contendo a quantidade de linhas na planilha
	 */
	public function getQtdeLinhas(){
		return $this->linhas;
	}
 
	/*
	 * Método que retorna o valor do atributo $colunas
	 * @return Valor inteiro contendo a quantidade de colunas na planilha
	 */
	public function getQtdeColunas(){
		return $this->colunas;
	}
 

 
	/*
	 * Método para ler os dados da planilha e inserir no banco de dados
	 * @return Valor Inteiro contendo a quantidade de linhas importadas
	 */
	public function insertDados(){
 
		try{
                        date_default_timezone_set('America/Sao_Paulo');
                        $date = date('Y-m-d H:i');
			$sql = 'INSERT INTO d(EMPRESA_FK,DATA_PROD,EXTRUSORA,TURNO,OPERADOR,PROD_KG,APARA,REFILE,BORRA,ACABAMENTO,QTD_PARADA,TEMPO_PARADA,OC,TIMESTAMP) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
			$stm = $this->conexao->prepare($sql);
			
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
		}catch(Exception $erro){
			echo 'Erro: ' . $erro->getMessage();
		}
 
	}
}

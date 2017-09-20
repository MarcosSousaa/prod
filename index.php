<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Controle de Produção | Ind Bandeirante de Plásticos</title>
        <link rel="stylesheet" href="css/estilo.css">
        <!--<link rel="stylesheet" href="css/materialize.css"> -->
    </head>    
    <body>
        <div id="sair">
            <img src="img/sair.png" class="foto-sair" />
        </div>
	<section id="left-menu"> <!-- SECTION MENU -->
                <div class="img edita-div"> <!-- LOGO -->
                    <div class="opcao-editar">
                        
                    </div>
		</div>
		<p class="nome-empresa">Ind Bandeirante</p> <!-- NOME DA EMPRESA -->
		<!-- AKI COMEÇA O MENU -->
		<ul>					
                    <li><a class="produt">INSERIR DADOS PRODUÇÃO</a></li>
                    <li><a class="estatic">ESTATISTICAS</a></li>
		</ul>
		<!-- FIM DO MENU -->
	</section> <!-- FIM DA SECTION MENU -->

	<!-- SECTION CONTEUDO -->
	<section id="right-conteudo">
            <img src="img/voltar.png" class="foto-voltar"> <!-- IMG QUE VOLTA APARECE EM TODOS OS CAMPOS -->
            <!-- AQUI COMEÇA O CONTEUDO DO PRODUTOO -->
            <div id="produto"> 
                <ul>
                    <li>Adicionar</li>
                    <li>Editar</li>
                    <li>Remover</li><br/><br/>
                </ul>
            </div>
            <!-- AQUI TERMINA O CONTEUDO DO PRODUTO -->
            <!-- AQUI COMEÇA O CONTEUDO DO FORNECEDORES -->
            <div id="estatisticas">
                <ul>
                    <li>Adicionar</li>
                    <li>Editar</li>
                    <li>Remover</li> <br/><br>
                </ul>
            <!-- AQUI TERMINA O CONTEUDO DO FORNECEDORES -->
            </div>            
	</section>
	<!-- FIM DA  SECTION CONTEUDO -->
        <script src="js/jquery.min.js"></script>
	<script src="js/jquery.ui.min.js"></script>
	<script src="js/index.js"></script>
        <!--<script src="js/materialize.js"></script> -->
    </body>
        
</html>

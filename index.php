<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Controle de Produção | Ind Bandeirante de Plásticos</title>
    </head>    
    <body>
        <div id="sair">
            <img src="img/sair.png" class="foto-sair" />
        </div>
	<section id="left-menu"> <!-- SECTION MENU -->
                <div class="img edita-div"> <!-- LOGO -->
                    <div class="opcao-editar">
                        <a href="#">Editar</a> <!-- LINK DE EDITAR -->
                    </div>
		</div>
		<p class="nome-empresa">Ind Bandeirante</p> <!-- NOME DA EMPRESA -->
		<!-- AKI COMEÇA O MENU -->
		<ul>					
                    <li><a class="produt">Produtos</a></li>
                    <li><a class="forneced">Fornecedores</a></li>
                    <li><a class="estatic">Estatisticas</a></li>
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
            <div id="fornecedores">
                <ul>
                    <li>Adicionar</li>
                    <li>Editar</li>
                    <li>Remover</li> <br/><br>
                </ul>
            <!-- AQUI TERMINA O CONTEUDO DO FORNECEDORES -->
            </div>
            <!-- AQUI INICIA O CONTEUDO DE ESTATISTICA  HIGHCHARTS TIRADO DO SITE www.highcharts.com -->
            <div id="container" style="min-width: 310px; height: 500px; margin: 0 auto">
            </div>
            <!-- AQUI TERMINA O CONTEUDO DE ESTATISTICA -->
	</section>
	<!-- FIM DA  SECTION CONTEUDO -->
    </body>
</html>

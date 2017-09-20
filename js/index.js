//ESCONDENDO AS DIV E A IMG SAIR
$(document).ready(function(){
    $('#produto').hide();
    $('#estatisticas').hide();
    $('#container').hide();
    $('.foto-voltar').hide();
    
    $(".produt").click(function(){
        $('#produto').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').hide("slide");
        $('#container').hide("slide");
    });
    
    // CHAMANDO A DIV CONTAINER (ESTATISTICA)COM A IMG SAIR E ESCONDENDO A FORNECEDORES E PRODUTO
    $(".estatic").click(function(){
        $('#container').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').hide("slide");
        $('#produto').hide("slide");
    });
    
    // FUNÇÃO VOLTANDO PARA A SECTION LIMPA E ESCONDENDO AS IMG SAIR    
    $('.foto-voltar').click(function(){
        $('#right-conteudo').show("slide");
        $('#produto').hide("slide");
        $('.foto-voltar').hide();
    });   
    
    // FUNÇÃO SAIR  DA PAGINA TEM QUE  REPARAR AINDA SÓ FUNCIONA NO INTERNET EXPLORER
    $('#sair').click(function(){
        confirm("Deseja sair ?");
        close();
    });
});   

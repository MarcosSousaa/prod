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
    
    // ACERTA MASCARA
    $('#data').mask('99/99/9999');
    
    // INICIALIZANDO SELECT
    $('select').material_select();



    $('#inserir').click(function() {
        // VALIDAÇÃO
        var flag = true;
        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            flag = false
        }
        //if($("#ext").val().length <= 2){
        //    $("#ext").focus();
        //    Materialize.toast('Você precisa escolher a extrusora', 4000);
        //    flag = false
        //}                  
        //if($("#turno").val().length <= 2){
        //    $("#turno").focus();
        //    Materialize.toast('Você precisa escolher o turno', 4000);
        //    flag = false
       // }
        if($("#operador").val().length <= 2){
            $("#operador").focus();
            Materialize.toast('Você precisa informar o Nome do Operador', 4000);
            flag = false
        }
        if($("#producao").val().length <= 2){
            $("#producao").focus();
            Materialize.toast('Você precisa informar a Quantidade de Produção', 4000);
            flag = false
        }
        
        if(flag){
            var obj = new Object();
            obg.acao = 1;
            obg.data = $("#data").val();
            obg.extrusora = $("#ext").val();
            obg.turno = $("#turno").val();
            obg.operador = $("#operador").val();
            obg.producao = $("#producao").val();
            obg.apara = $("#apara").val();
            obg.refile = $("#refile").val();
            obg.borra = $("#borra").val();
            obg.qtd_paradas = $("#paradas").val();
            obg.minutos_paradas = $("#minutos_paradas").val();
            obg.oc = $("#oc").val();
            
            var obj = JSON.stringify(obj);
            cadastra(obj);
            
        }
        
        
        
        
        
        
        
        
        
        
        // FUNÇÃO PARA CADASTRAR
        
        function cadastra(item){
            $.ajax({
                method: "POST",
                url: "php/control/controller.php",
                dataType: 'json',
                data: { item: item}
            }).done(function(result){
                if(result){
                    
                }
            })
        }
    });
});   

/* global Materialize */

//ESCONDENDO AS DIV E A IMG SAIR
$(document).ready(function(){
    $('#produto').hide();
    $('#alter-produto').hide();
    $('#estatisticas').hide();
    $('#container').hide();
    $('.foto-voltar').hide();
    $('#geral-table').hide();
    
    $(".produt").click(function(){        
        $('#produto').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').hide("slide");
        $('.estatic').hide("slide");
        $('.alter-produt').hide("slide");
        $('#alter-produto').hide("slide");
        $('#container').hide("slide");        
    });
    
    // CHAMANDO A DIV CONTAINER (ESTATISTICA)COM A IMG SAIR E ESCONDENDO A FORNECEDORES E PRODUTO
    $(".estatic").click(function(){
        $('#container').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').show("slide");
        $('#produto').hide("slide");
        $('.produt').hide("slide");
        $('.alter-produt').hide("slide");
        $('#alter-produto').hide("slide");
    });
    // CHAMANDO A DIV CONTAINER (ALTER-PRODUT)COM A IMG SAIR E ESCONDENDO A PRODUTOS E ESTATISTICAS
    $(".alter-produt").click(function(){
        $('#container').show("slide");
        $('.foto-voltar').show();
        $('#alter-produto').show();
        $('#estatisticas').hide("slide");
        $('.estatic').hide("slide");
        $('#produto').hide("slide");
        $('.produt').hide("slide");
        $('#tabela').empty();
    });
    // FUNÇÃO VOLTANDO PARA A SECTION LIMPA E ESCONDENDO AS IMG SAIR    
    $('.foto-voltar').click(function(){
        $('#right-conteudo').show("slide");
        $('#produto').hide("slide");
        $('.foto-voltar').hide();
        location.reload();
    });   
    
    // FUNÇÃO SAIR  DA PAGINA TEM QUE  REPARAR AINDA SÓ FUNCIONA NO INTERNET EXPLORER
    $('#sair').click(function(){
        confirm("Deseja sair ?");
        close();
    });
    
    
    // MASCARAS
    $('#data').mask('99/99/9999');
    // INICIALIZANDO SELECT
    $('select').material_select(); 
    $("#inserir").click(function() {
        // VALIDAÇÃO
        var flag = true;
        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            flag = false;
        }
        
        if($("#operador").val().length <= 2){
            $("#operador").focus();
            Materialize.toast('Você precisa informar o Nome do Operador', 4000);
            flag = false;
        }
        if($("#producao").val().length <= 2){
            $("#producao").focus();
            Materialize.toast('Você precisa informar a Quantidade de Produção', 4000);
            flag = false;
        }
        
        if(flag){            
            var obj = new Object();
            obj.acao = 1;            
            obj.data = $("#data").val();            
            obj.extrusora = $("#ext").val();            
            obj.turno = $("#turno").val();            
            obj.operador = $("#operador").val();            
            obj.producao = $("#producao").val();            
            obj.apara = $("#apara").val();            
            obj.refile = $("#refile").val();            
            obj.borra = $("#borra").val();            
            obj.qtd_paradas = $("#qtd_paradas").val();            
            obj.minutos_paradas = $("#minutos_paradas").val();            
            obj.oc = $("#oc").val();                        
            var obj = JSON.stringify(obj);
            cadastra(obj);
            
        }
    });
    // FUNÇÃO PARA CADASTRAR
        
    function cadastra(item){
        $.ajax({
            method: "POST",
            data: {item: item},
            url: "php/control/controller.php",
            dataType: 'json'                        
        }).done(function (result) {
            
            if(result){
                $(".foto-voltar").trigger("click");
                Materialize.toast("Registro Inserido com sucesso", 4000);
            }else{
                Materialize.toast("Erro ao inserir registro", 4000);
            }
            
        }).fail(function (msg){
            
            
            $("html").html(msg.responseText);
        });
    }
    
    function seleciona(item){
        alert('entrou no ajax');
        $('#tabela').empty();
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json',
            sucess: function(dados){
                $('#geral-table').show();
                for(var i=0; dados.length>i; i++){
                    $('#tabela').append('<tr><td>'+dados[i].ID_DADOS+'</td><td>'+dados[i].DATA_PROD+'</td><td>'+dados[i].EXTRUSORA+'</td><td>'+dados[i].TURNO+'</td><td>'+dados[i].OPERADOR+'</td><td>'+dados[i].PROD_KG+'</td><td>'+dados[i].APARA+'</td><td>'+dados[i].REFILE+'</td><td>'+dados[i].BORRA+'</td><td>'+dados[i].QTD_PARADAS+'</td><td>'+dados[i].MINUTOS_PARADAS+'</td><td>'+dados[i].OC+'</td></tr>');
                }
            }
        });
    }
   
    $("#botao-teste").click(function(){                                        
        var obj = new Object();        
        obj.acao = 0;                
        obj = JSON.stringify(obj);            
        seleciona(obj);
        alert('rodou a funcao');
    });

});   

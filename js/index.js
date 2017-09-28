/* global Materialize */


$(document).ready(function(){
    //ESCONDENDO AS DIV 
    $('#produto').hide();
    $('#alter-produto').hide();
    $('#estatisticas').hide();
    $('#container').hide();
    $('.foto-voltar').hide();
    $('#geral-table').hide();
    $('#atualizar').hide();
    
    
    
    
// =================================================================================================    
// 
// 
// FUNÇÕES CLICK
    
    // ABRE A DIV PRODUTO(TELA PARA INSERIR DADOS E ESCONDE TUDO)
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
        var obj = new Object();        
        obj.acao = 0;                
        obj = JSON.stringify(obj);            
        seleciona(obj);        
    });
    // FUNÇÃO VOLTANDO PARA A SECTION LIMPA E ESCONDENDO AS IMG SAIR    
    $('.foto-voltar').click(function(){
        $('#right-conteudo').show("slide");
        $('#produto').hide("slide");
        $('.foto-voltar').hide();
        location.reload();
    });   
    
// =========================================================================================
// 
// MASCARAS
    // MASCARAS
    $('#data').mask('99/99/9999');
    $('#tempo_parada').mask('99:99');
    // INICIALIZANDO SELECT
    $('select').material_select(); 
    
    // ======================================================================================
//
//    
// FUNCOES BD(AJAX)
    
    // INSERIR DADOS 
    $("#inserir").click(function() {
        // VALIDAÇÃO
        var valid = true;
        
        if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }
        
        if($("#operador").val().length <= 2){
            $("#operador").focus();
            Materialize.toast('Você precisa informar o Nome do Operador', 4000);
            valid = false;
        }
        if($("#producao").val().length <= 2){
            $("#producao").focus();
            Materialize.toast('Você precisa informar a Quantidade de Produção', 4000);
            valid = false;
        }
        
        if(valid){            
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
            obj.acabamento = $("#acabamento").val();
            obj.qtd_parada = $("#qtd_parada").val();            
            obj.tempo_parada = $("#tempo_parada").val();            
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
                Materialize.toast("Registro Inserido com Sucesso", 40000);
            }else{
                Materialize.toast("Erro ao inserir registro", 4000);
            }
            
        }).fail(function (msg){
            
            
            $("html").html(msg.responseText);
        });
    }
    // FUNCAO SELECIONAR DADOS
    function seleciona(item){        
        $('#tabela').empty();
        $('#geral-table').show();
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json'
                        
        }).done(function(response){           
            $("#table tbody").html(response);
                                    
            
        }).fail(function (msg){
            $("html").html(msg.responseText);
        });
    }
    
    
    // FUNCAO SELECIONA DADOS COM ID 
    function seleciona_dados(item){                
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json'                        
        }).done(function(response){
            alert('deu_certo');
            $('#alter-produto').hide();                     
            $('#inserir').hide();            
            $('#atualizar').show();
            $('#produto').show();              
            $('#id').val(response.ID);
            $('#data').val(response.DATA_PROD);
            $('#data').select();
            $('#ext').val(response.EXTRUSORA).material_select();
            $('#turno').val(response.TURNO).material_select();            
            $('#operador').val(response.OPERADOR);
            $('#operador').select();
            $('#producao').val(response.PROD_KG);
            $('#producao').select();
            $('#apara').val(response.APARA); 
            $('#apara').select();
            $('#refile').val(response.REFILE); 
            $('#refile').select();
            $('#borra').val(response.BORRA);   
            $('#borra').select();
            $('#acabamento').val(response.ACABAMENTO); 
            $('#acabamento').select();
            $('#qtd_parada').val(response.QTD_PARADA);  
            $('#qtd_parada').select();
            $('#tempo_parada').val(response.TEMPO_PARADA);    
            $('#tempo_parada').select();
            $('#oc').val(response.OC).material_select();                            
        }).fail(function (msg){
            $("html").html(msg.responseText);
        });
    }    
    function edita(item){
        $.ajax({
            method: "POST",
            data: {item: item},
            url: "php/control/controller.php",
            dataType: 'json'                        
        }).done(function (result) {            
            if(result){                                
                $(".foto-voltar").trigger("click");            
                Materialize.toast("Registro alterado com Sucesso", 40000);
            }else{
                Materialize.toast("Erro ao alterar registro", 4000);
            }
            
        }).fail(function (msg){                       
            $("html").html(msg.responseText);
        });
    }
    
    $('table').delegate(".btn-edit","click",function(){     
        var id = $('td:first', $(this).parents('tr')).text();        
        var obj = new Object();        
        obj.acao = 2;                
        obj.id = id;
        obj = JSON.stringify(obj);            
        seleciona_dados(obj);        
   });
   
   $('table').delegate(".btn-del","click",function(){       
           var id = $("");
           
   });
   
   $('#atualizar').click(function(){
       var valid = true;
       if($("#data").val().length <= 2){
            $("#data").focus();
            Materialize.toast('Você Precisa Informar a Data', 4000);
            valid = false;
        }        
        if($("#operador").val().length <= 2){
            $("#operador").focus();
            Materialize.toast('Você precisa informar o Nome do Operador', 4000);
            valid = false;
        }
        if($("#producao").val().length <= 2){
            $("#producao").focus();
            Materialize.toast('Você precisa informar a Quantidade de Produção', 4000);
            valid = false;
        }        
        if(valid){            
            var obj = new Object();
            obj.acao = 3;
            obj.id = $("#id").val();
            obj.data = $("#data").val();            
            obj.extrusora = $("#ext").val();            
            obj.turno = $("#turno").val();            
            obj.operador = $("#operador").val();            
            obj.producao = $("#producao").val();            
            obj.apara = $("#apara").val();            
            obj.refile = $("#refile").val();            
            obj.borra = $("#borra").val();
            obj.acabamento = $("#acabamento").val();
            obj.qtd_parada = $("#qtd_parada").val();            
            obj.tempo_parada = $("#tempo_parada").val();            
            obj.oc = $("#oc").val();                        
            var obj = JSON.stringify(obj);
            edita(obj);            
        }
   });
});   


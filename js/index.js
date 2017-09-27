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
            alert ('CARREGOU A TABELA');
            $("#table tbody").html(response);
            
            
            
            
        }).fail(function (msg){
            $("html").html(msg.responseText);
        });
    }
        // FUNCAO ALTERAR DADOS
    function edita(item){                
        $.ajax({
            type: 'POST',          
            data: {item: item},                      
            url: "php/control/controller.php",
            dataType: 'json'
                        
        }).done(function(response){
            alert ('CARREGOU A TABELA');
            $("#table tbody").html(response);
            
            
            
            
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
        seleciona(obj);        
   });
   $('table').delegate(".btn-del","click",function(){       
           var id = $("")
           alert(id);
   });
});   


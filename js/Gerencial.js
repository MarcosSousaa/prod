$(document).ready(function(){        
    $('.foto-voltar').hide();
    $('select').material_select();
    $('#dashboard').hide();
    $('analit-2').hide();
    
    $(".estatic").click(function(){
        $('#container').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').show("slide");
        $('#produto').hide("slide");
        $('.produt').hide("slide");
        $('.alter-produt').hide("slide");
        $('#alter-produto').hide("slide");        
    });
        $('.foto-voltar').click(function(){
        $('#right-conteudo').show("slide");
        $('#produto').hide("slide");
        $('.foto-voltar').hide();
        location.reload();
    }); 
    
    $('#data1').mask('99/99/9999');
    $('#data2').mask('99/99/9999');
    
       
    function geraGraficos(item){                                      
        $.ajax({
            method: 'POST',          
            data: {item: item},                      
            url: "php/control/dashboard.php",
            dataType: 'json'                 
        });
    }
    
     $("#gerar").click(function(){        
        var data1 = $('#data1').val();        
        var newdata1 = data1.split("/").reverse().join("-");        
        var data2 = $('#data2').val();
        var newdata2 = data2.split("/").reverse().join("-");        
        var obj = new Object();        
        obj.acao = 5;                        
        obj.grafico = $('#grafico').val();
        obj.data1 = newdata1;
        obj.data2 = newdata2;        
        obj = JSON.stringify(obj);                    
        geraGraficos(obj);        
    });
    
      
});




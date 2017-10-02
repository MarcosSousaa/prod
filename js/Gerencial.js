$(document).ready(function(){
    $('#estatisticas').hide();
    $('#container').hide();
    $('.foto-voltar').hide();
    $('select').material_select();
    $('#dashboard').hide();
    
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
        $('#pesquisa').hide();
        $('#dashboard').show();        
        $.ajax({
            ype: 'POST',          
            data: {dados: item},                      
            url: "php/control/controller_grafico.php",
            dataType: 'json'            
        }).done(function(response){                                                           
            alert('VAI CARREGAR O GRAFICO');            
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {            
            type: 'bar',
            data: {                
                datasets: [{
                    label: 'Producao',
                    data: [response.PROD_KG
                        ],
                    backgroundColor: [
                        'rgba(215,40,40,0.9)',
                        'rgba(215,40,40,0.9)',
                        'rgba(215,40,40,0.9)',
                        'rgba(215,40,40,0.9)',                        
                    ],
                    
                    
                },{
                    label: 'Meta de Producao',
                    data: ['900.300'],
                    type: 'line'
                   
                }],
                labels: [response.EXTRUSORA]
            },
            
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        
        }).fail(function (msg){
            alert('NAO FOI POSSIVEL GERAR O GRAFICO');
        });
    }
    
     $("#gerar").click(function(){
        var grafico = $('#grafico').val();
        var data1 = $('#data1').val();
        var newdata1 = data1.split("/").reverse().join("-");
        var data2 = $('#data2').val();
        var newdata2 = data2.split("/").reverse().join("-");
        var obj = new Object();        
        obj.acao = 5;                        
        obj.grafico = grafico;
        obj.data1 = newdata1;
        obj.data2 = newdata2;        
        obj = JSON.stringify(obj);                    
        geraGraficos(obj);        
    });
});




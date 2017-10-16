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
    $('#data_1').mask('99/99/9999');
    $('#data_2').mask('99/99/9999');
    
       
    
    
    
    
    /* 
     * 
     * 
     * var ctx4 = document.getElementById("barChart").getContext('2d');
            var myDoughnutChart = new Chart(ctx4, {
                type: 'bar',                
                data: {                                       
                    datasets: [{                        
                        label: 'Producao',
                        data: [<?php echo $grafico[1][0]; ?>,<?php echo $grafico[2][0]; ?>,<?php echo $grafico[3][0]; ?>,<?php echo $grafico[4][0]; ?>,<?php echo $grafico[5][0]; ?>],
                        backgroundColor: [
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            
                        ],                        
                            
                    },
                    {                        
                        label: 'Perda',
                        data: [<?php echo $grafico[1][2]; ?>,<?php echo $grafico[2][2]; ?>,<?php echo $grafico[3][2]; ?>,<?php echo $grafico[4][2]; ?>,<?php echo $grafico[5][2]; ?>],
                        backgroundColor: [                            
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                        ],                        
                            
                    },                 
                    ],
                    labels: ["Extrusora <?php echo $grafico[1][1]; ?>","Extrusora <?php echo $grafico[2][1]; ?>","Extrusora <?php echo $grafico[3][1]; ?>","Extrusora <?php echo $grafico[4][1]; ?>","Extrusora <?php echo $grafico[5][1]; ?>"],
            },
            options:{
                responsive: true,
            }
            });
     * 
     * 
     * */
    
    
    
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
    
      
    $("#btn_show").click(function(){
        var data1 = $('#data_1').val();        
        var newdata1 = data1.split("/").reverse().join("-");                        
        var data2 = $('#data_2').val();        
        var newdata2 = data2.split("/").reverse().join("-");        
        obj = new Object();
        obj.data1 = newdata1;
        obj.data2 = newdata2;                
        obj = JSON.stringify(obj);       
        geraGraficos(obj);
    });
    
    function geraGraficos(item){        
        $.ajax({
            method: 'POST',          
            data: {item: item},                         
            url: "php/view/dashboard_2.php",
            dataType: 'json'                 
        }).done(function (result){
            alert('vai gerar o grafico');
        });
    }
});




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
    
      
    $("#grafic").change(function(){
        var grafico = jQuery(this).val();
        var data1 = $('#data_1').val();        
        var newdata1 = data1.split("/").reverse().join("-");                        
        var data2 = $('#data_2').val();        
        var newdata2 = data2.split("/").reverse().join("-");        
        if($('#grafic').val() == '01'){
            obj = new Object();
            obj.acao = 7;
            obj.data1 = newdata1;
            obj.data2 = newdata2;                
            obj = JSON.stringify(obj);       
            geraGrafico2(obj);        
        }
        else if($('#grafic').val() == '02'){
            obj = new Object();
            obj.acao = 6;
            obj.data1 = newdata1;
            obj.data2 = newdata2;                
            obj = JSON.stringify(obj);       
            geraGraficos(obj);       
        }
    });
    // GRAFICO POR EXTRUSORA
    function geraGraficos(item){        
        $.ajax({
            type: 'POST',          
            data: {item: item},                         
            url: "php/control/controller.php",
            dataType: 'json',
        }).done(function(result){
                alert('VAI GERAR O GRAFICO');                
                $("#estatisticas").hide();
                $("#grafico1").show();
                $("#grafico2").hide();
                item.acao = 7;                
                var extrusora = [];
                var producao = [];
                var apara = [];
                var refile = [];
                var borra = [];
                var acabamento = [];
                var perda = [];
                var cor1 = ['rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)'];
                var cor2 = ['rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)'];
                var cor3 = ['rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)'];
                var cor4 = ['rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)',];
                for(var i in result){
                    extrusora.push("Extrusora " + result[i].EXTRUSORA);
                    producao.push(result[i].PRODUCAO);
                    apara.push(result[i].APARA);
                    refile.push(result[i].REFILE);
                    borra.push(result[i].BORRA);
                    acabamento.push(result[i].ACABAMENTO);
                    perda.push(result[i].PERDA);
                    $("#tabela1 tbody").append("<tr><td>"+result[i].EXTRUSORA+ "</td><td>"+result[i].PRODUCAO+ "</td><td>"+result[i].PERDA+"</td>");
                    $("#tabela2 tbody").append("<tr><td>"+result[i].EXTRUSORA+ "</td><td>"+result[i].APARA+ "</td><td>"+result[i].REFILE+ "</td><td>"+result[i].BORRA+ "</td><td>"+ result[i].ACABAMENTO+"</td>");
                }                
                var extdata = {
                    labels: extrusora,
                    datasets : [
                        {
                            label: 'Producao',
                            data: producao,
                            backgroundColor: cor1,
                            
                        },
                        {
                            label: 'Perda',
                            data: perda,
                            backgroundColor: cor2,
                        }
                    ]
                };
                
                var ext2data = {
                    labels: extrusora,
                    datasets : [
                        {
                            label: 'Apara',
                            data: apara,
                            backgroundColor: cor1,
                        },
                        {
                            label: 'Refile',
                            data: refile,
                            backgroundColor: cor2,
                        },
                        {
                            label: 'Borra',
                            data: borra,
                            backgroundColor: cor3,
                        },
                        {
                            label: 'Acabamento',
                            data: acabamento,
                            backgroundColor: cor4,
                        },                                                
                    ]
                };
                
                var ctx = $("#mycanvas");
                var barGraph = new Chart(ctx, {
                    type: 'bar',
                    data: extdata
                });
                var ctx2 = $("#mycanvas2");
                    var barGraph2 = new Chart(ctx2,{
                    type: 'bar',
                    data: ext2data
                });                
            }).fail(function(result){
                alert('NÃO VAI GERAR O GRAFICO');
                console.log(result);
            });                  
    }
    // GRAFICO POR TURNO
    function geraGrafico2(item){
                 $.ajax({
                    type: 'POST',          
                    data: {item: item},                         
                    url: "php/control/controller.php",
                    dataType: 'json',
                }).done(function(result2){
                     $("#estatisticas").hide();
                    $("#grafico2").show();
                    $("#grafico1").hide();
                    var producao2 = [];
                    var apara2 = [];
                    var refile2 = [];
                    var borra2 = [];
                    var acabamento2 = [];
                    var perda2 = [];
                    var turno2 = [];
                    var cor1 = ['rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)'];
                    var cor2 = ['rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)'];
                    var cor3 = ['rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)'];
                    var cor4 = ['rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)',];
                    for(var i in result2){
                        turno2.push("Turno " + result2[i].TURNO);
                        producao2.push(result2[i].PRODUCAO);
                        apara2.push(result2[i].APARA);
                        refile2.push(result2[i].REFILE);
                        borra2.push(result2[i].BORRA);
                        acabamento2.push(result2[i].ACABAMENTO);
                        perda2.push(result2[i].PERDA);
                        
                    }
                    var turnoData = {
                        labels: turno2,
                        datasets: [
                        {
                            label: 'Producao',
                            data: producao2,
                            backgroundColor: cor1,
                        },
                        {
                            label: 'Perda',
                            data: perda2,
                            backgroundColor: cor2, 
                        }
                        ]
                    }
                    
                    var ctx3 = $("#mycanvas3");
                    var barGraph = new Chart(ctx3, {
                    type: 'bar',
                    data: turnoData
                });
                });
           }
});




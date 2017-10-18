$(document).ready(function(){        
    $('.foto-voltar').hide();
    $('select').material_select();
    $('#dashboard').hide();
    $('analit-2').hide();
    $('#grafico0').hide();
    $('#grafico1').hide();
    $('#grafico2').hide();
    $("#grafico_anual0").hide();
    $("#grafico_anual1").hide();
    $("#grafico_anual2").hide();
    $('#right-conteudo').hide();
    $('#right-conteudo2').hide();
    
    $(".estatic").click(function(){        
        $('#right-conteudo').show("slide");
        $('.foto-voltar').show();
        $('#estatisticas').show("slide");                        
        $('#right-conteudo2').hide();
    });
    
    $('.anual').click(function(){
        $('#right-conteudo2').show("slide") ;
        $('#right-conteudo').hide();
        $('#estatisticas2').show("slide");                        
        
    });
    
    $('.foto-voltar').click(function(){
        $('#right-conteudo').show("slide");
        $('#produto').hide("slide");
        $('.foto-voltar').hide();
        location.reload();
    }); 
    
    /* MASCARAS */
    $('#data_1').mask('99/99/9999');
    $('#data_2').mask('99/99/9999');     
    $('#ano_1').mask('9999');
    $('#ano_2').mask('9999');
    
    
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
        var grafico = $('option:selected',this).val();
        var data1 = $('#data_1').val();        
        var newdata1 = data1.split("/").reverse().join("-");                        
        var data2 = $('#data_2').val();        
        var newdata2 = data2.split("/").reverse().join("-");
        
        if(grafico == '00'){
            $('#tabela1 tbody').empty();
            $('#tabela2 tbody').empty();
            obj = new Object();
            obj.acao = 6;
            obj.data1 = newdata1;
            obj.data2 = newdata2;             
            obj = JSON.stringify(obj);       
            geraGrafico0(obj);        
        }
        else if(grafico == '01'){
            $('#tabela3 tbody').empty();
            $('#tabela4 tbody').empty();
            obj = new Object();
            obj.acao = 7;
            obj.data1 = newdata1;
            obj.data2 = newdata2;             
            obj = JSON.stringify(obj);       
            geraGrafico1(obj);        
        }
        else if(grafico == '02'){
            $('#tabela5 tbody').empty();
            $('#tabela6 tbody').empty();
            obj = new Object();
            obj.acao = 8;
            obj.data1 = newdata1;
            obj.data2 = newdata2;            
            obj = JSON.stringify(obj);       
            geraGrafico2(obj);       
        }
    });
    
    
    $("#grafic_anual").change(function(){
        var grafico = $('option:selected',this).val();
        var ano1 = $('#ano_1').val();                
        var ano2 = $('#ano_2').val();                        
        if(grafico == '00'){
            $('#tabela7 tbody').empty();            
            obj = new Object();
            obj.acao = 9;
            obj.ano1 = ano1;
            obj.ano2 = ano2;             
            obj = JSON.stringify(obj);       
            geraGraficoAnual0(obj);        
        }
        else if(grafico == '01'){
            $('#tabela9 tbody').empty();
            $('#tabela10 tbody').empty();
            obj = new Object();
            obj.acao = 10;
            obj.ano1 = ano1;
            obj.ano2 = ano2;             
            obj = JSON.stringify(obj);       
            geraGraficoAnual1(obj);        
        }
        else if(grafico == '02'){
            $('#tabela11 tbody').empty();
            $('#tabela12 tbody').empty();
            obj = new Object();
            obj.acao = 11;           
            obj.ano1 = ano1;
            obj.ano2 = ano2;             
            obj = JSON.stringify(obj);       
            geraGraficoAnual2(obj);       
        }
    });
    
    // GRAFICO GERAL
    function geraGrafico0(item){
        $.ajax({
           type: 'POST',
           data: {item: item},
           url: "php/control/controller.php",
           dataType: 'json',
        }).done(function(result){
            $("#grafico0").show();
            $("#grafico1").hide();
            $("#grafico2").hide();
            var producao = [];
                var apara = [];
                var refile = [];
                var borra = [];
                var acabamento = [];
                var perda = [];                
                var ultimadata;
                var cor1 = ['rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)'];
                var cor2 = ['rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)'];
                var cor3 = ['rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)'];
                var cor4 = ['rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)',];
                for(var i in result){                    
                    producao.push(result[i].PRODUCAO);
                    apara.push(result[i].APARA);
                    refile.push(result[i].REFILE);
                    borra.push(result[i].BORRA);
                    acabamento.push(result[i].ACABAMENTO);
                    perda.push(result[i].PERDA);
                    ultimadata = result[i].ULTIMADATA;
                    var soma1 = parseFloat(result[i].PRODUCAO) + parseFloat(result[i].PERDA);
                    var percentual1 = (parseFloat(result[i].PERDA) * 100) / soma1;
                    var soma2 = parseFloat(result[i].APARA) + parseFloat(result[i].REFILE) + parseFloat(result[i].BORRA) + parseFloat(result[i].ACABAMENTO);
                    $("#tabela1 tbody").append("<tr><td>"+result[i].PRODUCAO+ "</td><td>"+result[i].PERDA+"</td><td style='color:blue;'>"+soma1.toFixed(3)+"</td><td style='color: red;'><strong>"+percentual1.toFixed(1)+"%</strong></td>");
                    $("#tabela2 tbody").append("<tr><td>"+result[i].APARA+ "</td><td>"+result[i].REFILE+ "</td><td>"+result[i].BORRA+ "</td><td>"+ result[i].ACABAMENTO+"</td><td style='color:blue;'>"+soma2.toFixed(3)+" </td>");                        
                }
                var data = ultimadata.split("-").reverse().join("/");                        
                $('.mensagem0').html("ULTIMA DATA PREENCHIDA COM DADOS, CONFORME O FILTRO SOLICITADO " + data);
                
                var geralData = {
                     labels: ["Producao(BOA)","Producao (PERDA)"],
                    datasets: [
                        {
                            
                            data: [producao,perda],
                            backgroundColor: [cor1,cor2],
                        },                        
                    ]
                }
                
                var geralData2 = {
                     labels: ["Apara","Refile","Borra","Acabamento"],
                    datasets: [
                        {
                            
                            data: [apara,refile,borra,acabamento],
                            backgroundColor: [cor1,cor2,cor3,cor4],
                        },                        
                    ]
                }
                var ctx0 = $("#mycanvas0");
                var doughnutGraph = new Chart(ctx0, {
                    type: 'doughnut',
                    data: geralData
                });
                
                var ctx00 = $("#mycanvas00");
                var doughnutGraph = new Chart(ctx00, {
                    type: 'doughnut',
                    data: geralData2
                });
        });
    }
    // GRAFICO POR TURNO
    function geraGrafico1(item){
        $.ajax({
            type: 'POST',          
            data: {item: item},                         
            url: "php/control/controller.php",
            dataType: 'json',
            }).done(function(result2){                     
                $("#grafico1").show();
                $("#grafico2").hide();
                $("#grafico0").hide();
                var producao2 = [];
                var apara2 = [];
                var refile2 = [];
                var borra2 = [];
                var acabamento2 = [];
                var perda2 = [];
                var turno2 = [];
                var ultimadata2;
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
                    ultimadata2 = result2[i].ULTIMADATA;
                    var soma3 = parseFloat(result2[i].PRODUCAO) + parseFloat(result2[i].PERDA);
                    var soma4 = parseFloat(result2[i].APARA) + parseFloat(result2[i].REFILE) + parseFloat(result2[i].BORRA) + parseFloat(result2[i].ACABAMENTO);
                    $("#tabela3 tbody").append("<tr><td>"+result2[i].TURNO+ "</td><td>"+result2[i].PRODUCAO+ "</td><td>"+result2[i].PERDA+"</td><td style='color:blue;'>"+soma3.toFixed(3)+"</td>");
                    $("#tabela4 tbody").append("<tr><td>"+result2[i].TURNO+ "</td><td>"+result2[i].APARA+ "</td><td>"+result2[i].REFILE+ "</td><td>"+result2[i].BORRA+ "</td><td>"+ result2[i].ACABAMENTO+"</td><td style='color:blue;'>"+soma4.toFixed(3)+"</td>");                        
                }
                var data = ultimadata2.split("-").reverse().join("/");                        
                $('.mensagem2').html("ULTIMA DATA PREENCHIDA COM DADOS, CONFORME O FILTRO SOLICITADO " + data);
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
                var turno2Data = {
                    labels: turno2,
                    datasets : [
                        {
                            label: 'Apara',
                            data: apara2,
                            backgroundColor: cor1,
                        },
                        {
                            label: 'Refile',
                            data: refile2,
                            backgroundColor: cor2,
                        },
                        {
                            label: 'Borra',
                            data: borra2,
                            backgroundColor: cor3,
                        },
                        {
                            label: 'Acabamento',
                            data: acabamento2,
                            backgroundColor: cor4,
                        },                                                
                    ]
                };                    
                var ctx3 = $("#mycanvas3");
                var barGraph = new Chart(ctx3, {
                    type: 'bar',
                    data: turnoData
                });
                var ctx4 = $("#mycanvas4");
                var barGraph = new Chart(ctx4, {
                    type: 'bar',
                    data: turno2Data
                });
            });
    }
    // GRAFICO POR EXTRUSORA
    function geraGrafico2(item){        
        $.ajax({
            type: 'POST',          
            data: {item: item},                         
            url: "php/control/controller.php",
            dataType: 'json',
        }).done(function(result){                
            $("#grafico2").show();
            $("#grafico1").hide();
            $("#grafico0").hide();
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
            var ultimadata1;
            for(var i in result){
                extrusora.push("Extrusora " + result[i].EXTRUSORA);
                producao.push(result[i].PRODUCAO);
                apara.push(result[i].APARA);
                refile.push(result[i].REFILE);
                borra.push(result[i].BORRA);
                acabamento.push(result[i].ACABAMENTO);
                perda.push(result[i].PERDA);
                ultimadata1 = result[i].ULTIMADATA;
                var soma1 = parseFloat(result[i].PRODUCAO) + parseFloat(result[i].PERDA);
                var soma2 = parseFloat(result[i].APARA) + parseFloat(result[i].REFILE) + parseFloat(result[i].BORRA) + parseFloat(result[i].ACABAMENTO);
                $("#tabela5 tbody").append("<tr><td>"+result[i].EXTRUSORA+ "</td><td>"+result[i].PRODUCAO+ "</td><td>"+result[i].PERDA+"</td><td style='color:blue;'>"+soma1.toFixed(3)+"</td>");
                $("#tabela6 tbody").append("<tr><td>"+result[i].EXTRUSORA+ "</td><td>"+result[i].APARA+ "</td><td>"+result[i].REFILE+ "</td><td>"+result[i].BORRA+ "</td><td>"+ result[i].ACABAMENTO+"</td><td style='color:blue;'>"+soma2.toFixed(3)+"</td>");
            }
            var data = ultimadata1.split("-").reverse().join("/");                        
            $('.mensagem1').html("ULTIMA DATA PREENCHIDA COM DADOS, CONFORME O FILTRO SOLICITADO " + data);
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
    
    
    /* GRAFICOS ANUAIS */
   
   
   // GRAFICO GERAL
    function geraGraficoAnual0(item){
        $.ajax({
           type: 'POST',
           data: {item: item},
           url: "php/control/controller.php",
           dataType: 'json',
        }).done(function(result){
            $("#grafico_anual0").show();
            $("#grafico_anual1").hide();
            $("#grafico_anual2").hide();
            var mes = [];
            var ano = [];
            var producao = [];            
            var perda = [];                            
            var cor1 = ['rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)'];
            var cor2 = ['rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)'];
            var cor3 = ['rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)'];
            var cor4 = ['rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)',];
            for(var i in result){                    
                producao.push(result[i].PRODUCAO);                                                                                
                perda.push(result[i].PERDA);
                ano.push(result[i].ANO);
                mes.push(result[i].NOME_MES);              
                var soma1 = parseFloat(result[i].PRODUCAO) + parseFloat(result[i].PERDA);
                var percentual1 = (parseFloat(result[i].PERDA) * 100) / soma1;                
                $("#tabela7 tbody").append("<tr><td>"+result[i].ANO+"</td><td>"+result[i].NOME_MES+"</td><td>"+result[i].PRODUCAO+ "</td><td>"+result[i].PERDA+"</td><td style='color:blue;'>"+soma1.toFixed(3)+"</td><td style='color: red;'><strong>"+percentual1.toFixed(1)+"%</strong></td>");                
                }                                
                var geralAnualData = {
                    labels: mes,
                    datasets: [
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
                }
                
                
                var anu0 = $("#mycanvasanual0");
                var doughnutGraph = new Chart(anu0, {
                    type: 'bar',
                    data: geralAnualData
                });                                
        }).fail(function(result){
            alert('NÃO RODOU');
        });
    }
    // GRAFICO POR TURNO
    function geraGrafico1(item){
        $.ajax({
            type: 'POST',          
            data: {item: item},                         
            url: "php/control/controller.php",
            dataType: 'json',
            }).done(function(result2){                     
                $("#grafico1").show();
                $("#grafico2").hide();
                $("#grafico0").hide();
                var producao2 = [];
                var apara2 = [];
                var refile2 = [];
                var borra2 = [];
                var acabamento2 = [];
                var perda2 = [];
                var turno2 = [];
                var ultimadata2;
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
                    ultimadata2 = result2[i].ULTIMADATA;
                    var soma3 = parseFloat(result2[i].PRODUCAO) + parseFloat(result2[i].PERDA);
                    var soma4 = parseFloat(result2[i].APARA) + parseFloat(result2[i].REFILE) + parseFloat(result2[i].BORRA) + parseFloat(result2[i].ACABAMENTO);
                    $("#tabela3 tbody").append("<tr><td>"+result2[i].TURNO+ "</td><td>"+result2[i].PRODUCAO+ "</td><td>"+result2[i].PERDA+"</td><td style='color:blue;'>"+soma3.toFixed(3)+"</td>");
                    $("#tabela4 tbody").append("<tr><td>"+result2[i].TURNO+ "</td><td>"+result2[i].APARA+ "</td><td>"+result2[i].REFILE+ "</td><td>"+result2[i].BORRA+ "</td><td>"+ result2[i].ACABAMENTO+"</td><td style='color:blue;'>"+soma4.toFixed(3)+"</td>");                        
                }
                var data = ultimadata2.split("-").reverse().join("/");                        
                $('.mensagem2').html("ULTIMA DATA PREENCHIDA COM DADOS, CONFORME O FILTRO SOLICITADO " + data);
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
                var turno2Data = {
                    labels: turno2,
                    datasets : [
                        {
                            label: 'Apara',
                            data: apara2,
                            backgroundColor: cor1,
                        },
                        {
                            label: 'Refile',
                            data: refile2,
                            backgroundColor: cor2,
                        },
                        {
                            label: 'Borra',
                            data: borra2,
                            backgroundColor: cor3,
                        },
                        {
                            label: 'Acabamento',
                            data: acabamento2,
                            backgroundColor: cor4,
                        },                                                
                    ]
                };                    
                var ctx3 = $("#mycanvas3");
                var barGraph = new Chart(ctx3, {
                    type: 'bar',
                    data: turnoData
                });
                var ctx4 = $("#mycanvas4");
                var barGraph = new Chart(ctx4, {
                    type: 'bar',
                    data: turno2Data
                });
            });
    }
    // GRAFICO POR EXTRUSORA
    function geraGrafico2(item){        
        $.ajax({
            type: 'POST',          
            data: {item: item},                         
            url: "php/control/controller.php",
            dataType: 'json',
        }).done(function(result){                
            $("#grafico2").show();
            $("#grafico1").hide();
            $("#grafico0").hide();
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
            var ultimadata1;
            for(var i in result){
                extrusora.push("Extrusora " + result[i].EXTRUSORA);
                producao.push(result[i].PRODUCAO);
                apara.push(result[i].APARA);
                refile.push(result[i].REFILE);
                borra.push(result[i].BORRA);
                acabamento.push(result[i].ACABAMENTO);
                perda.push(result[i].PERDA);
                ultimadata1 = result[i].ULTIMADATA;
                var soma1 = parseFloat(result[i].PRODUCAO) + parseFloat(result[i].PERDA);
                var soma2 = parseFloat(result[i].APARA) + parseFloat(result[i].REFILE) + parseFloat(result[i].BORRA) + parseFloat(result[i].ACABAMENTO);
                $("#tabela5 tbody").append("<tr><td>"+result[i].EXTRUSORA+ "</td><td>"+result[i].PRODUCAO+ "</td><td>"+result[i].PERDA+"</td><td style='color:blue;'>"+soma1.toFixed(3)+"</td>");
                $("#tabela6 tbody").append("<tr><td>"+result[i].EXTRUSORA+ "</td><td>"+result[i].APARA+ "</td><td>"+result[i].REFILE+ "</td><td>"+result[i].BORRA+ "</td><td>"+ result[i].ACABAMENTO+"</td><td style='color:blue;'>"+soma2.toFixed(3)+"</td>");
            }
            var data = ultimadata1.split("-").reverse().join("/");                        
            $('.mensagem1').html("ULTIMA DATA PREENCHIDA COM DADOS, CONFORME O FILTRO SOLICITADO " + data);
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
});




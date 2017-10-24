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
    $('#btn_voltar').hide();
    
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
    
      
    //$("#grafic").change(function(){
    $("#btn_gerar").click(function(){        
        var data1 = $('#data_1').val();        
        var newdata1 = data1.split("/").reverse().join("-");                        
        var data2 = $('#data_2').val();        
        var newdata2 = data2.split("/").reverse().join("-");                
        $('#tabela1 tbody').empty();
        $('#tabela2 tbody').empty();
        obj = new Object();
        obj.acao = 6;
        obj.data1 = newdata1;
        obj.data2 = newdata2;             
        obj = JSON.stringify(obj);       
        geraGrafico0(obj);        
        $('#tabela3 tbody').empty();
        $('#tabela4 tbody').empty();
        obj = new Object();
        obj.acao = 7;
        obj.data1 = newdata1;
        obj.data2 = newdata2;             
        obj = JSON.stringify(obj);       
        geraGrafico1(obj);                        
        $('#tabela5 tbody').empty();
        $('#tabela6 tbody').empty();
        obj = new Object();
        obj.acao = 8;
        obj.data1 = newdata1;
        obj.data2 = newdata2;            
        obj = JSON.stringify(obj);       
        geraGrafico2(obj);
        $('#estatisticas').hide();
    });        
    
    //$("#grafic_anual").change(function(){
    $('#btn_gerar2').click(function(){        
        var ano1 = $('#ano_1').val();                
        var ano2 = $('#ano_2').val();               
        $('#tabela7 tbody').empty();             
        $('#tabela8 tbody').empty();
        obj = new Object();
        obj.acao = 9;
        obj.ano1 = ano1;
        obj.ano2 = ano2;             
        obj = JSON.stringify(obj);       
        geraGraficoAnual0(obj);                        
        /*       
        $('#tabela9 tbody').empty();
        $('#tabela10 tbody').empty();
        obj = new Object();
        obj.acao = 10;
        obj.ano1 = ano1;
        obj.ano2 = ano2;             
        obj = JSON.stringify(obj);       
        geraGraficoAnual1(obj);                        
        $('#tabela11 tbody').empty();
        $('#tabela12 tbody').empty();
        obj = new Object();
        obj.acao = 11;           
        obj.ano1 = ano1;
        obj.ano2 = ano2;             
        obj = JSON.stringify(obj);       
        geraGraficoAnual2(obj);       
        */
       $('#estatisticas2').hide();
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
            $(".foto-voltar").show();
            var geralAnualData = {
                labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
                
                datasets: [
                                        
                    
                ]
                
            }
            
            var anu0 = $("#mycanvasanual0");                
            var barAnual = new Chart(anu0, {
                type: 'bar',
                data: geralAnualData
            });                        
            var total_produzido = [];
            var total_perda = [];
            var ano = [];                                    
            var jan = [];
            var fev = [];
            var mar = [];
            var abr = [];
            var mai = [];
            var jun = [];
            var jul = [];
            var ago = [];
            var set = [];
            var out = [];
            var nov = [];
            var dez = [];
            var perda_jan = [];
            var perda_fev = [];
            var perda_mar = [];
            var perda_abr = [];
            var perda_mai = [];
            var perda_jun = [];
            var perda_jul = [];
            var perda_ago = [];
            var perda_set = [];
            var perda_out = [];
            var perda_nov = [];
            var perda_dez = [];
            var cor = [];
            cor[0] = ['rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)','rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)', 'rgba(41, 128, 185,1.0)'];
            cor[1] = ['rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)','rgba(192, 57, 43,1.0)'];
            cor[2] = ['rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)','rgba(44, 62, 80,1.0)'];
            cor[3] = ['rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)','rgba(39, 174, 96,1.0)'];                       
            cor[4] = ['rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)','rgba(155, 89, 182,1.0)'];
            cor[5] = ['rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)','rgba(22, 160, 133,1.0)',];
            var x = 0;
            var z = 0;
            for(var i in result){                
                while(x <= i){                
                    ano = result[i].ano;                    
                    jan = result[i].janeiro;
                    fev = result[i].fevereiro;
                    mar = result[i].marco;
                    abr = result[i].abril;
                    mai = result[i].maio;
                    jun = result[i].junho;
                    jul = result[i].julho;
                    ago = result[i].agosto;
                    set = result[i].setembro;
                    out = result[i].outubro;
                    nov = result[i].novembro;
                    dez = result[i].dezembro;
                    perda_jan = result[i].perda_janeiro;
                    perda_fev = result[i].perda_fevereiro;
                    perda_mar = result[i].perda_marco;
                    perda_abr = result[i].perda_abril;
                    perda_mai = result[i].perda_maio;
                    perda_jun = result[i].perda_junho;
                    perda_jul = result[i].perda_julho;
                    perda_ago = result[i].perda_agosto;
                    perda_set = result[i].perda_setembro;
                    perda_out = result[i].perda_outubro;
                    perda_nov = result[i].perda_novembro;
                    perda_dez = result[i].perda_dezembro;                                          
                    var dataset = {
                        label: "Producao "+ ano,
                        backgroundColor: cor[z],
                        data:[jan,fev,mar,abr,mai,jun,jul,ago,set,out,nov,dez],
                       
                    };
                    var cor2 = z + 1;
                    var dataset2 = {
                        label: "Perda "+ ano,
                        backgroundColor: cor[cor2],
                        data:[perda_jan,perda_fev,perda_mar,perda_abr,perda_mai,perda_jun,perda_jul,perda_ago,perda_set,perda_out,perda_nov,perda_dez],
                       
                    };
                    geralAnualData.datasets.push(dataset);
                    geralAnualData.datasets.push(dataset2);
                    barAnual.update();
                    x = x + 1;
                    z = z + 2;
                    $("#tabela7 tbody").append("<tr><td>Producao</td><td>"+ano+"</td><td>"+jan+"</td><td>"+fev+"</td><td>"+mar+ "</td><td>"+abr+"</td><td>"+mai+"</td><td>"+jun+"</td><td>"+jul+"</td><td>"+ago+ "</td><td>"+set+"</td><td>"+out+"</td><td>"+nov+"</td><td>"+dez+"</td><td></td><td style='color:blue;'>"+result[i].total_produzido+"</td>");
                    $("#tabela8 tbody").append("<tr><td>Perda</td><td>"+ano+"</td><td>"+perda_jan+"</td><td>"+perda_fev+"</td><td>"+perda_mar+ "</td><td>"+perda_abr+"</td><td>"+perda_mai+"</td><td>"+perda_jun+"</td><td>"+perda_jul+"</td><td>"+perda_ago+ "</td><td>"+perda_set+"</td><td>"+perda_out+"</td><td>"+perda_nov+"</td><td>"+perda_dez+"</td><td></td><td style='color:blue;'>"+result[i].total_perda+"</td>");
                }
                
            }            

            
            //geralAnualData.datasets.push(newDataset1);            
            //barAnual.update();
            
            
            
            
            //$(".comparar").append("<a class='waves-effect waves-light btn btn-adc'>one</a>")
            
        }).fail(function(result){
            alert('NÃO RODOU');
        });
    }
    
   
           

});




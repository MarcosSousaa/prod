//ESCONDENDO AS DIV E A IMG SAIR
$(document).ready(function(){
	$('#produto').hide();
	$('#fornecedores').hide();
	$('#container').hide();
    $('.foto-voltar').hide();
});

//CHAMANDO A DIV PRODUTO COM A IMG SAIR E ESCONDENDO A FORNECEDORES E CONTAINER(ESTATISTICA)
$(document).ready(function(){
	$(".produt").click(function(){
		$('#produto').show("slide");
        $('.foto-voltar').show();
		$('#fornecedores').hide("slide");
		$('#container').hide("slide");
	});

	// CHAMANDO A DIV FORNECEDORES COM A IMG SAIR  E ESCONDENDO A PRODUTO E CONTAINER(ESTATISTICA)
	$(".forneced").click(function(){
		$('#fornecedores').show("slide");
        $('.foto-voltar').show();
		$('#produto').hide("slide");
		$('#container').hide("slide");
	});

	// CHAMANDO A DIV CONTAINER (ESTATISTICA)COM A IMG SAIR E ESCONDENDO A FORNECEDORES E PRODUTO
	$(".estatic").click(function(){
		$('#container').show("slide");
        $('.foto-voltar').show();
		$('#fornecedores').hide("slide");
		$('#produto').hide("slide");
	})
});
    // FUNÇÃO VOLTANDO PARA A SECTION LIMPA E ESCONDENDO AS IMG SAIR
    $(document).ready(function(){
        $('.foto-voltar').click(function(){
            $('#right-conteudo').show("slide");
            $('#produto').hide("slide");
            $('.foto-voltar').hide();
        });
         $('.foto-voltar').click(function(){
            $('#right-conteudo').show("slide");
            $('#fornecedores').hide("slide");
            $('.foto-voltar').hide();
        });
         $('.foto-voltar').click(function(){
            $('#right-conteudo').show("slide");
            $('#container').hide("slide");
            $('.foto-voltar').hide();
         });

    });
// FUNÇÃO SAIR  DA PAGINA TEM QUE  REPARAR AINDA SÓ FUNCIONA NO INTERNET EXPLORER
$(document).ready(function(){
	$('#sair').click(function(){
		confirm("Deseja sair ?");
		close();
	});
});

// HIGHCHARTS
$(document).ready(function () {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Tituilo:Estatisticas de algo'
        },
        subtitle: {
            text: 'Sub:YouDevelopers'
        },
        xAxis: {
            categories: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    });
});
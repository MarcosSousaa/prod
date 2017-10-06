<?php            
    include '../model/graficos.php';
    /* INSTACIA A CLASSE GRAFICOS */
    $geraGrafico = new graficos();
    /*  RECEBE DADOS VIA POST */
    $data1 = $_POST['data1'];        
    $data2 = $_POST['data2'];    
    
    /* CORRIGI DADAS PADRAO MYSQL*/
    $newdata1 = str_replace("/", "-", $data1);
    $newdata_1 = date('Y-m-d', strtotime($newdata1));    
    $newdata2 = str_replace("/", "-", $data2);
    $newdata_2 = date('Y-m-d', strtotime($newdata2));
    /* CRIA AS SESSION */
    $_SESSION['data1'] = $newdata_1;
    $_SESSION['data2'] = $newdata_2;
    if($data1 >= '25/09/2017'){
    $geraGrafico->geraGrafico0();
    $geraGrafico->geraGrafico1();
    $geraGrafico->geraGrafico2();
    $geraGrafico->buscaData();
    $grafico = $_SESSION['array'];
    $dt = date('d-m-Y', strtotime($grafico[0][5]));
    $dt2 = str_replace("-", "/", $dt);
    
    
    }
    else {
        echo "<script>alert('A DATA INCIAL DEVE SER MAIOR QUE A DATA DE 25/09/2017, POR FAVOR CORRIGIR A DATA')</script>";
        echo "<script>$(document).ready(function(){location.href();});</script>";
    }
       
?>    

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />        
        <title>Painel Producao - Ind Bandeirante</title>
        <link rel="stylesheet" href="../../css/materialize.min.css" />
        <link rel="stylesheet" href="../../css/Gerencial.css" />
        <script src="../../js/jquery.min.js"></script>
        <script src="../../js/Chart.js"></script>             
    </head>
    <body>
        <div class="row" id="panel">
            <a class="waves-effect waves-light btn" id="voltar" href="../../Gerencial.html">VOLTAR</a>
            <div class="row">
                <h5><strong>ULTIMA DATA PREENCHIDA COM DADOS, CONFORME O FILTRO SOLICITADO <?php echo $dt2;?> </strong></h5>
                <hr />
                <div class="col s3">                    
                    <p><strong>Nome Grafico</strong> : Producao - Periodo <?php echo $data1." a "; echo $data2?></p>
                    <canvas id="myChart"></canvas>
                </div>                
                <div class="col s3">
                    <table class="striped">
                        <thead>
                            <th>Producao Boa(KG)</th>
                            <th>Perda(KG)</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td><?php echo number_format($grafico[0][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[0][1],3,",",".");?></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <div class="row">                            
                <div class="col s5">
                     <p><strong>Nome Grafico</strong> : Producao por Extrusoras - Periodo <?php echo $data1." a "; echo $data2?></p>             
                    <canvas id="barChart"></canvas>
                </div>                
                <div class="col s1"></div>
                <div class="col s4 sintetico">
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Extrusora</th>
                                <th>Producao Boa(KG)</th>
                                <th>Perda(KG)</th>
                                <th><strong style="color: blue;">Total Producao por Extrusora(KG)</strong></th>
                            </tr>                            
                        </thead>
                        <tbody>
                            <tr>
                                <td><?php echo $grafico[1][1];?></td>
                                <td><?php echo number_format($grafico[1][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[1][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][0] + $grafico[1][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[2][1];?></td>
                                <td><?php echo number_format($grafico[2][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[2][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[2][0] + $grafico[2][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[3][1];?></td>
                                <td><?php echo number_format($grafico[3][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[3][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[3][0] + $grafico[3][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[4][1];?></td>
                                <td><?php echo number_format($grafico[4][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[4][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[4][0] + $grafico[4][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[5][1];?></td>
                                <td><?php echo number_format($grafico[5][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[5][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[5][0] + $grafico[5][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><strong style="color: blue;">TOTAL GERAL</strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][0] + $grafico[2][0] + $grafico[3][0] + $grafico[4][0] + $grafico[5][0],3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][2] + $grafico[2][2] + $grafico[3][2] + $grafico[4][2] + $grafico[5][2],3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][0] + $grafico[2][0] + $grafico[3][0] + $grafico[4][0] + $grafico[5][0] + $grafico[1][2] + $grafico[2][2] + $grafico[3][2] + $grafico[4][2] + $grafico[5][2],3,",",".");?></strong></td>
                            </tr>
                        </tbody>
                    </table>                                          
                </div>                
                <div class="analitico">                    
                    <div class="col s6">                        
                        <p><strong style="color: red;">Perda Analitica</strong></p>
                        <canvas id="barChart2"></canvas>
                    </div>
                    <div class="col s4">
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Extrusora</th>
                                    <th>Apara(KG)</th>
                                    <th>Refile(KG)</th>
                                    <th>Borra(KG)</th>
                                    <th>Acabamento(KG)</th>
                                    <th style="color: blue;">Total Produzido por Extrusora(KG)</th>
                                </tr>                                                                    
                            </thead>
                            <tbody>
                                 <tr>
                                <td><?php echo $grafico[1][1];?></td>
                                <td><?php echo number_format($grafico[1][3],3,",",".");?></td>
                                <td><?php echo number_format($grafico[1][4],3,",",".");?></td>
                                <td><?php echo number_format($grafico[1][5],3,",",".");?></td>
                                <td><?php echo number_format($grafico[1][6],3,",",".");?></td>
                                <td style="color: blue;"><strong><?php echo number_format($grafico[1][3] + $grafico[1][4] + $grafico[1][5] + $grafico[1][6],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[2][1];?></td>
                                <td><?php echo number_format($grafico[2][3],3,",",".");?></td>
                                <td><?php echo number_format($grafico[2][4],3,",",".");?></td>
                                <td><?php echo number_format($grafico[2][5],3,",",".");?></td>
                                <td><?php echo number_format($grafico[2][6],3,",",".");?></td>
                                <td style="color: blue;"><strong><?php echo number_format($grafico[2][3] + $grafico[2][4] + $grafico[2][5] + $grafico[2][6],3,",",".");?></strong></td> 
                            </tr>
                            <tr>
                                <td><?php echo $grafico[3][1];?></td>                                                                
                                <td><?php echo number_format($grafico[3][3],3,",",".");?></td>
                                <td><?php echo number_format($grafico[3][4],3,",",".");?></td>
                                <td><?php echo number_format($grafico[3][5],3,",",".");?></td>
                                <td><?php echo number_format($grafico[3][6],3,",",".");?></td>
                                <td style="color: blue;"><strong><?php echo number_format($grafico[3][3] + $grafico[3][4] + $grafico[3][5] + $grafico[3][6],3,",",".");?></strong></td> 
                            </tr>
                            <tr>
                                <td><?php echo $grafico[4][1];?></td>
                                <td><?php echo number_format($grafico[4][3],3,",",".");?></td>
                                <td><?php echo number_format($grafico[4][4],3,",",".");?></td>
                                <td><?php echo number_format($grafico[4][5],3,",",".");?></td>
                                <td><?php echo number_format($grafico[4][6],3,",",".");?></td>
                                <td style="color: blue;"><strong><?php echo number_format($grafico[4][3] + $grafico[4][4] + $grafico[4][5] + $grafico[4][6],3,",",".");?></strong></td> 
                            </tr>
                            <tr>
                                <td><?php echo $grafico[5][1];?></td>
                                <td><?php echo number_format($grafico[5][3],3,",",".");?></td>
                                <td><?php echo number_format($grafico[5][4],3,",",".");?></td>
                                <td><?php echo number_format($grafico[5][5],3,",",".");?></td>
                                <td><?php echo number_format($grafico[5][6],3,",",".");?></td>
                                <td style="color: blue;"><strong><?php echo number_format($grafico[5][3] + $grafico[5][4] + $grafico[5][5] + $grafico[5][6],3,",",".");?></strong></td> 
                            </tr>
                            <tr>
                                <td><strong style="color: blue;">TOTAL GERAL</strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][3] + $grafico[2][3] + $grafico[3][3] + $grafico[4][3] + $grafico[5][3],3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][4] + $grafico[2][4] + $grafico[3][4] + $grafico[4][4] + $grafico[5][4],3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][5] + $grafico[2][5] + $grafico[3][5] + $grafico[4][5] + $grafico[5][5] ,3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][6] + $grafico[2][6] + $grafico[3][6] + $grafico[4][6] + $grafico[5][6] ,3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[1][3] + $grafico[2][3] + $grafico[3][3] + $grafico[4][3] + $grafico[5][3] + $grafico[1][4] + $grafico[2][4] + $grafico[3][4] + $grafico[4][4] + $grafico[5][4] + $grafico[1][5] + $grafico[2][5] + $grafico[3][5] + $grafico[4][5] + $grafico[5][5] + $grafico[1][6] + $grafico[2][6] + $grafico[3][6] + $grafico[4][6] + $grafico[5][6]  ,3,",",".");?></strong></td>
                            </tr>
                            </tbody>                                     
                        </table>
                    </div>
                </div>   
            </div>            
            <hr />
            <div class="row">
                <div class="col s4">
                    <p><strong>Nome Grafico</strong> : Producao Por Turno - Periodo <?php echo $data1." a "; echo $data2?></p>
                    <canvas id="pieChart2"></canvas>
                </div>
                <div class="col s1"></div>
                <div class="col s4">
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Turno</th>
                                <th>Producao Boa(KG)</th>
                                <th>Perda (KG)</th>
                                <th style="color: blue;">Total Produzido por  Turno(KG)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><?php echo $grafico[6][1];?></td>
                                <td><?php echo number_format($grafico[6][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[6][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[6][0] + $grafico[6][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[7][1];?></td>
                                <td><?php echo number_format($grafico[7][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[7][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[7][0] + $grafico[7][2],3,",",".");?></strong></td>
                            </tr>
                            <tr>
                                <td><?php echo $grafico[8][1];?></td>
                                <td><?php echo number_format($grafico[8][0],3,",",".");?></td>
                                <td><?php echo number_format($grafico[8][2],3,",",".");?></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[8][0] + $grafico[8][2],3,",",".");?></strong></td>
                            </tr>
                             <tr>
                                <td><strong style="color: blue">TOTAL GERAL</strong></td>
                                <td><strong style="color: blue"><?php echo number_format($grafico[6][0] + $grafico[7][0] + $grafico[8][0] ,3,",",".");?></strong></td>
                                <td><strong style="color: blue"><?php echo number_format($grafico[6][2] + $grafico[7][2] + $grafico[8][2],3,",",".");?></strong></td>
                                <td><strong style="color: blue;"><?php echo number_format($grafico[6][0] + $grafico[7][0] + $grafico[8][0] + $grafico[6][2] + $grafico[7][2] + $grafico[8][2],3,",",".");?></strong></td>
                            </tr>                     
                        </tbody>
                    </table>  
                </div>
            </div>            
        </div>                      
        <script>            
            var ctx = document.getElementById("myChart").getContext('2d');
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data:  {
                    labels: ["Producao Diaria(BOA)","Producao Diaria(PERDA)"],
                    datasets: [{
                        data: [<?php echo $grafico[0][0]; ?>,<?php echo $grafico[0][1]; ?>],
                        backgroundColor: [
                        'rgba(41, 128, 185,1.0)',
                        'rgba(192, 57, 43,1.0)',
                        ],
                        labels: ['Producao Diaria(BOA)','Producao Diaria(PERDA)'],                                   
                    },                                                                                                                
                    ],                   
                    
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                },               
            }
            });           
            var ctx3 = document.getElementById("pieChart2").getContext('2d');
            var myDoughnutChart = new Chart(ctx3, {
                type: 'bar',                
                data: {                                       
                    datasets: [{                        
                        label: 'Producao',
                        data: [<?php echo $grafico[6][0]; ?>,<?php echo $grafico[7][0]; ?>,<?php echo $grafico[8][0]; ?>],
                        backgroundColor: [
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',                                                        
                        ],                                                    
                    },
                    {                        
                        label: 'Perda',
                        data: [<?php echo $grafico[6][2]; ?>,<?php echo $grafico[7][2]; ?>,<?php echo $grafico[8][2];?>],
                        backgroundColor: [                            
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                                                                                                               
                        ],                                                    
                    },
                      
                    ],                    
                    labels: ["Turno: <?php echo $grafico[6][1]; ?>","Turno: <?php echo $grafico[7][1]; ?>"," Turno <?php echo $grafico[8][1]; ?>"],
            },
            options:{
                responsive: true,
            }
            });
            var ctx4 = document.getElementById("barChart").getContext('2d');
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
            var ctx5 = document.getElementById("barChart2").getContext('2d');
            var myDoughnutChart = new Chart(ctx5, {
                type: 'bar',                
                data: {                                       
                    datasets: [{                        
                        label: 'Apara',
                        data: [<?php echo $grafico[1][3]; ?>,<?php echo $grafico[2][3]; ?>,<?php echo $grafico[3][3]; ?>,<?php echo $grafico[4][3]; ?>,<?php echo $grafico[5][3]; ?>],
                        backgroundColor: [
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                            'rgba(41, 128, 185,1.0)',
                        ],                        
                            
                    },
                    {                        
                        label: 'Refile',
                        data: [<?php echo $grafico[1][4]; ?>,<?php echo $grafico[2][4]; ?>,<?php echo $grafico[3][4]; ?>,<?php echo $grafico[4][4]; ?>,<?php echo $grafico[5][4]; ?>],
                        backgroundColor: [                            
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                            'rgba(192, 57, 43,1.0)',                        
                        ],                        
                            
                    },
                      {                        
                        label: 'Borra',
                        data: [<?php echo $grafico[1][5]; ?>,<?php echo $grafico[2][5]; ?>,<?php echo $grafico[3][5]; ?>,<?php echo $grafico[4][5]; ?>,<?php echo $grafico[5][5]; ?>],
                        backgroundColor: [                            
                            'rgba(39, 174, 96,1.0)',                        
                            'rgba(39, 174, 96,1.0)',
                            'rgba(39, 174, 96,1.0)',
                            'rgba(39, 174, 96,1.0)',
                            'rgba(39, 174, 96,1.0)',
                        ],                        
                            
                    }, 
                      {                        
                        label: 'Acabamento',
                        data: [<?php echo $grafico[1][6]; ?>,<?php echo $grafico[2][6]; ?>,<?php echo $grafico[3][6]; ?>,<?php echo $grafico[4][6]; ?>,<?php echo $grafico[5][6]; ?>],
                        backgroundColor: [                            
                            'rgba(233, 212, 96,1.0)',
                            'rgba(233, 212, 96,1.0)',
                            'rgba(233, 212, 96,1.0)',
                            'rgba(233, 212, 96,1.0)',
                            'rgba(233, 212, 96,1.0)',
                        ],                        
                            
                    }, 
                    ],
                    labels: ["Extrusora <?php echo $grafico[1][1]; ?>","Extrusora <?php echo $grafico[2][1]; ?>","Extrusora <?php echo $grafico[3][1]; ?>","Extrusora <?php echo $grafico[4][1]; ?>","Extrusora <?php echo $grafico[5][1]; ?>"],
            },
            options:{
                responsive: true,
            }
            });
        </script>
        <script src="../../js/Gerencial.js"></script> 
    </body>
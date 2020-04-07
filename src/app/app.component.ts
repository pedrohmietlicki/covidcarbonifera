import { Cidades } from './interfaces/Cidades';
import { CidadesService } from './cidades.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart} from 'chart.js'
import { Observable } from 'rxjs';
CidadesService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IndiceCorona';
  @ViewChild("dados",{static: true}) elemento: ElementRef;
  private dados = {nomes:[],confirmados:[]};
   totalPessoasInfectadas=0;
   previsao = 0;
  
  
  constructor(private Cidades:CidadesService){
  

  }
  ngOnInit(){
      
      this.getCidades();
      
      
      
  }
  getCidades(){
    // Ratos | Butia | barao | Charqueadas | General Câmara | Minas do Leao| Sao jeo | Triunfo
    let ibge_code = [4301107,4302709,4301750,4305355,4308805, 4312252,4318408,4322004 ];
    for(let i = 0 ; i< ibge_code.length; i++){
      
      this.Cidades.getCidades(ibge_code[i])
      .subscribe((dado:Cidades)=>{
        
        if(dado.count>0){
          this.dados.confirmados.push(dado.results[0].confirmed);
          this.dados.nomes.push(dado.results[0].city)
        }
        
        if(i == (ibge_code.length-1)){
          this.montaGrafico();
          this.calcularTotal();
        }
      });
    }
   
      
    
  }
  montaGrafico(){
    
    new Chart(this.elemento.nativeElement,{
      type: 'doughnut',
      data:{
        labels: this.dados.nomes,
        datasets:[
          {
            data:this.dados.confirmados,
            backgroundColor:['#016CA0','#ED3237']
          }
        ]
      }
    })
  }
  calcularTotal(){
    const reducer = (acumulador,valorAtual)=> acumulador + valorAtual;
    this.totalPessoasInfectadas = this.dados.confirmados.reduce(reducer);
    this.previsao = this.totalPessoasInfectadas * (Math.pow(1.22,10));
    this.previsao = Math.round(this.previsao)
  }

}

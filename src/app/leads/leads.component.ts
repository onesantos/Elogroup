import {Component, OnInit} from '@angular/core';
import {Leads, Oportunidade} from './leads';
import {LeadsService} from './service/leads.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: Leads;
  todosSelecionados: boolean;
  mostrar = false;
  mostrarOportunidade = false;

  constructor(private leadsService: LeadsService, private router: Router) {
    this.todosSelecionados = false;
    this.leads = new Leads();
    this.leads.oportunidades = [
      {id: 1, value: 'RPA', isSelected: false},
      {id: 2, value: 'Produto Digital', isSelected: false},
      {id: 3, value: 'Analytics', isSelected: false},
      {id: 4, value: 'BPM', isSelected: false},
    ];
  }

  ngOnInit() {

  }

  onSubmit() {
    const todosDeselecionados = this.leads.oportunidades.every((item: any) => item.isSelected === false);
    if (todosDeselecionados) {
      this.mostrarOportunidade = true;
      setTimeout(() => {
        this.mostrarOportunidade = false;
      }, 3000);
    } else {
      this.mostrarAlerta();
      this.leadsService.save(this.leads);
    }

  }


  private mostrarAlerta() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
      this.router.navigate(['leads-list']);
    }, 3000);

  }

  isSelectedAll() {
    this.todosSelecionados = this.leads.oportunidades.every((item: any) => item.isSelected === true);
  }

  checkUncheckAll() {
    for (const item of this.leads.oportunidades) {
      item.isSelected = this.todosSelecionados;
    }
  }
}

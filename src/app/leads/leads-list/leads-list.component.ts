import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {LeadsService} from '../service/leads.service';
import {Status} from '../leads';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {
  clienteEmPotencial = [];

  dadosConfirmados = [];

  reuniaoAgenda = [];


  constructor(private leadsService: LeadsService) {
  }

  ngOnInit() {
    const leadsList = this.leadsService.getAll();
    this.clienteEmPotencial = leadsList.filter(value => value.status === Status.CLIENTE_EM_POTENCIAL);
    this.dadosConfirmados = leadsList.filter(value => value.status === Status.DADOS_CONFIRMADOS);
    this.reuniaoAgenda = leadsList.filter(value => value.status === Status.REUNIAO);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.atualizarStatus(event);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  private atualizarStatus(event: CdkDragDrop<any[]>) {
    const previousList = [event.previousContainer.data];
    const index = event.previousIndex;
    const datum = previousList[0][index];
    if (datum.status === Status.CLIENTE_EM_POTENCIAL) {
      datum.status = Status.DADOS_CONFIRMADOS;
    } else if (datum.status === Status.DADOS_CONFIRMADOS) {
      datum.status = Status.REUNIAO;
    }
    this.leadsService.save(datum);
  }
}

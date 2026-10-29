import { Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list';
import { TicketFormComponent } from './components/ticket-form/ticket-form';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/nuevo', component: TicketFormComponent },
  { path: 'tickets/editar/:id', component: TicketFormComponent }
];
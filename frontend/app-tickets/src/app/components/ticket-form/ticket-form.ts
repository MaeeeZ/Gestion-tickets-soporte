import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css'
})
export class TicketFormComponent implements OnInit {
  ticket: Ticket = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: 'Sistemas',
    prioridad: 'Media',
    estado: 'Abierto'
  };
  
  esEdicion: boolean = false;
  errorMensaje: string = '';

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.esEdicion = true;
      this.ticketService.getTicket(id).subscribe({
        next: (data) => this.ticket = data,
        error: () => this.errorMensaje = 'No se pudo cargar el ticket.'
      });
    }
  }

  guardarTicket(): void {
    if (!this.ticket.asunto || !this.ticket.solicitante || !this.ticket.descripcion) {
      this.errorMensaje = 'Por favor complete todos los campos obligatorios.';
      return;
    }

    if (this.esEdicion) {
      this.ticketService.updateTicket(this.ticket.id!, this.ticket).subscribe({
        next: () => this.router.navigate(['/tickets']),
        error: (err) => {
          console.error(err);
          this.errorMensaje = 'Error al actualizar el ticket. ¿El backend está corriendo?';
        }
      });
    } else {
      this.ticketService.createTicket(this.ticket).subscribe({
        next: () => this.router.navigate(['/tickets']),
        error: (err) => {
          console.error(err);
          this.errorMensaje = 'Error al crear el ticket. Revisa la conexión con la API.';
        }
      });
    }
  }
}
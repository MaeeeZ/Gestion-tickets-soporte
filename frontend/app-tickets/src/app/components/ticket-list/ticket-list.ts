import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  errorMensaje: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.errorMensaje = '';
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo conectar con la API (puerto 3000). Revisa que el backend esté ejecutándose.';
        console.error(err);
      }
    });
  }

  eliminarTicket(id: number): void {
    if (confirm('¿Está seguro de eliminar este ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => this.cargarTickets(),
        error: (err) => console.error(err)
      });
    }
  }
}
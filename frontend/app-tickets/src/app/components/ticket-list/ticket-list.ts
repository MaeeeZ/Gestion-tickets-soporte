import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data: Ticket[]) => {
        console.log('Tickets recibidos:', data);
        this.tickets = data;
        this.errorMensaje = '';
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al cargar tickets:', err);
        this.errorMensaje = 'No se pudo conectar con la API.';
        this.cdr.detectChanges();
      }
    });
  }

  eliminarTicket(id: number): void {
    if (confirm('¿Está seguro de eliminar este ticket?')) {
      this.ticketService.deleteTicket(id).subscribe({
        next: () => this.cargarTickets(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Alumno {
  id: number;
  matricula: string;
  nombre: string;
  carrera: string;
  semestre: number;
  status: 'Activo' | 'Baja temporal' | 'Egresado';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Estado para mostrar u ocultar la tabla
  mostrarTabla = signal<boolean>(true);

  // Filtros
  filtroNombre = signal<string>('');
  filtroCarrera = signal<string>('Todas');

  // Menú lateral móvil / colapsable
  sidebarAbierto = signal<boolean>(true);

  // Lista de carreras disponibles
  carreras: string[] = [
    'Todas',
    'Ingeniería en Sistemas Computacionales',
    'Ingeniería Mecatrónica',
    'Ingeniería Ambiental',
  ];

  // Datos de los alumnos (como se muestran en la imagen)
  alumnos = signal<Alumno[]>([
    {
      id: 1,
      matricula: '20260002598',
      nombre: 'Luis Enrique Lopez Beltran',
      carrera: 'Ingeniería en Sistemas Computacionales',
      semestre: 7,
      status: 'Activo',
    },
    {
      id: 2,
      matricula: '20240002598',
      nombre: 'María González Torres',
      carrera: 'Ingeniería Mecatrónica',
      semestre: 7,
      status: 'Activo',
    },
    {
      id: 3,
      matricula: '20240003598',
      nombre: 'Carlos Ramírez Díaz',
      carrera: 'Ingeniería en Sistemas Computacionales',
      semestre: 3,
      status: 'Baja temporal',
    },
    {
      id: 4,
      matricula: '20240004598',
      nombre: 'Ana Martínez Ruiz',
      carrera: 'Ingeniería Ambiental',
      semestre: 6,
      status: 'Activo',
    },
    {
      id: 5,
      matricula: '20240005598',
      nombre: 'Pedro Sánchez Flores',
      carrera: 'Ingeniería Mecatrónica',
      semestre: 9,
      status: 'Egresado',
    },
  ]);

  // Lista filtrada reactiva
  alumnosFiltrados = computed(() => {
    const nombre = this.filtroNombre().toLowerCase().trim();
    const carrera = this.filtroCarrera();

    return this.alumnos().filter((alumno) => {
      const coincideNombre =
        !nombre ||
        alumno.nombre.toLowerCase().includes(nombre) ||
        alumno.matricula.toLowerCase().includes(nombre);

      const coincideCarrera =
        carrera === 'Todas' || alumno.carrera === carrera;

      return coincideNombre && coincideCarrera;
    });
  });

  // Estadísticas reactivas
  totalAlumnos = computed(() => this.alumnosFiltrados().length);

  totalActivos = computed(
    () => this.alumnosFiltrados().filter((a) => a.status === 'Activo').length
  );

  totalEgresados = computed(
    () => this.alumnosFiltrados().filter((a) => a.status === 'Egresado').length
  );

  // Métodos
  toggleTabla(): void {
    this.mostrarTabla.update((prev) => !prev);
  }

  toggleSidebar(): void {
    this.sidebarAbierto.update((prev) => !prev);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Activo':
        return 'status-badge status-activo';
      case 'Baja temporal':
        return 'status-badge status-baja';
      case 'Egresado':
        return 'status-badge status-egresado';
      default:
        return 'status-badge';
    }
  }
}

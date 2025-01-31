
import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private apiUrl = `${environment.backendUrl}/evento`;
  private http= inject(HttpClient)


  getListaEventos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createEvento(evento: any) {
    return this.http.post<any>(this.apiUrl, evento);
  }

  editEvento(id: number, camposEditados: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, camposEditados);
  }

  deleteEvento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

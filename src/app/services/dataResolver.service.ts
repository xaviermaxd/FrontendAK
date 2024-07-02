// data-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { PropietarioService } from './propietario.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {
  constructor(private propietarioService: PropietarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.paramMap.get('id')!;
    const path = state.url.split('/')[1];

    if (path === 'propietario-detalles') {
      return this.propietarioService.getPropietario(id).pipe(first());
    }

    return of(null);
  }
}

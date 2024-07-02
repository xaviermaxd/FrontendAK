import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent { 
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  getPages(): (number | string)[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    let pagesToShow: (number | string)[] = [];
  
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pagesToShow = [1, 2, 3, '...', totalPages];
      } else if (currentPage >= totalPages - 1) {
        pagesToShow = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }
  
    return pagesToShow;
  }
}

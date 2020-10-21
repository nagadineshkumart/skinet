import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagerComponent } from './components/pager/pager.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagerComponent, PagingHeaderComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    CarouselModule.forRoot(),
  ],
  exports: [PaginationModule, PagerComponent, CarouselModule, PagingHeaderComponent]

})
export class SharedModule { }

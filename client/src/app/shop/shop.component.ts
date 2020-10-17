import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IPagination } from '../shared/models/pagination';
import { IBrands } from '../shared/models/brands';
import { ITypes } from '../shared/models/types';
import { ShopService } from './shop.service';
import {ShopParams} from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;
  pagination: IPagination;
  brands: IBrands[];
  types: ITypes[];
  shopParams  = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(
      (response: any) => {
        this.pagination = response;
      },
      (error) => {
          console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getBrands(){
    this.shopService.getBrands().subscribe(
      (response: any) => {
        this.brands = [{id: 0, name: 'All'}, ...response];
      },
      (error) => {
          console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getTypes(){
    this.shopService.getTypes().subscribe(
      (response: any) => {
        this.types = [{id: 0, name: 'All'}, ...response];
      },
      (error) => {
          console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  onBrandIdSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeIdSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onPageChanged(event: any){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}

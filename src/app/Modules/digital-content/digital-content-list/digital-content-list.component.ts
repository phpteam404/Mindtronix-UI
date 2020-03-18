import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ContentService } from 'src/app/services/content.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-digital-content-list',
  templateUrl: './digital-content-list.component.html',
  styleUrls: ['./digital-content-list.component.scss']
})
export class DigitalContentListComponent implements OnInit {
  list: any;
  cols:any;
  totalRecords: number; 
  first:number=0;
  listParamsRef:any={};
  constructor(private _router: Router,
             private _ar: ActivatedRoute,
             private _service: ContentService,
             private _cService: CommonService,
             private _confirm: ConfirmationService,
             public translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
   }

  ngOnInit(): void {
  }
  addNewContent(event: Event){
    this._router.navigate(['add'],{relativeTo:this._ar});
  }
  viewContent(data:any){
    this._router.navigate(['view',data.content_name,btoa(data.digital_content_management_id)],{ relativeTo: this._ar});
  }
  isEmptyTable() {
    return (this.totalRecords == 0 ? true : false);
  }

  loadDigitalContentLazy(event: LazyLoadEvent) {
    var sortOrder= (event.sortOrder==1) ? "ASC" : "DESC";
    var params = new HttpParams()
      .set('start', event.first+'')
      .set('number', event.rows+'');
    if (event.sortField) {
      params = params.set('sort', event.sortField);
      params = params.set('order', sortOrder);
    }
    if (event.globalFilter) {
      params = params.set('search_key', event.globalFilter);
    }
    this.listParamsRef = params;
    this._service.getdigitalContentList(params).subscribe(res=>{
      if(res.status){
        this.cols = (res.data.table_headers)?res.data.table_headers:[];
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });
  }
  DeleteDigitalContent(data:any) {
    this._confirm.confirm({
      accept: () => {
        var params = new HttpParams()
                    .set('tablename', 'digital_content_management')
                    .set('id', data.digital_content_management_id);   
        this._cService.delete(params).subscribe(res=>{
          if(res.status){
            this.getList();
          }else{
          }
        });
      },
      reject: () => {}
    });
  }
  getList(){
    this.first = this.listParamsRef.updates[0].value;
    this._service.getdigitalContentList(this.listParamsRef).subscribe(res=>{
      if(res.status){
        this.cols = res.data.table_headers;
        this.list = res.data.data;
        this.totalRecords = res.data.total_records;
      }
    });
  }
  selectedTag:any=[];
  selectTag(event,tag: any, overlaypanel: OverlayPanel) {
    this.selectedTag = tag.split(',');
    const index: number = this.selectedTag.indexOf(this.selectedTag[0]);
    if (index !== -1) {
      this.selectedTag.splice(index, 1);
    } 
    console.log('tag---', this.selectedTag);
    if(this.selectedTag)
      overlaypanel.toggle(event);
}
}

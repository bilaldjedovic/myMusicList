import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryApiService } from 'src/app/category-api.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})

export class ShowCategoryComponent implements OnInit {

  songList$!:Observable<any[]>;
  categoryList$!:Observable<any[]>;
  categoryList:any=[];



  

  //Map for categories to collect

  categoryMap:Map<number, string> = new Map()

  

  constructor(private service:CategoryApiService) { }

  ngOnInit(): void {
    this.songList$ = this.service.getSongList();
    this.categoryList$ = this.service.getCategoryList();
   
    this.refreshCategoryMap(); 
   }

//modals

modalTitle:string='';
activateAddEditSong:boolean = false;
song:any;

modalClose(){
  this.activateAddEditSong = false;
  this.songList$ = this.service.getSongList();
}

modalEdit(item:any){
  this.song = item;
  this.modalTitle = "Edit song"
  this.activateAddEditSong = true;
}

//delete 
delete(item:any){
  if(confirm(`Are you sure song with ID ${item.id} will be deleted `)){
    this.service.deleteSong(item.id).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }
      var showUpdateSuccess = document.getElementById('delete-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })
  }
}
//add modal
modalAdd(){
  this.song = {
    id:0,
    categoryId:null,
    songName:null,
    link:null,
    author:null,
    rate:null,
    favorite:null
  }
  this.modalTitle ="Add song";
  this.activateAddEditSong = true;
}

  refreshCategoryMap(){
    this.service.getCategoryList().subscribe(data => {
      this.categoryList = data;

      for(let i=0; i< data.length; i++)
      {
        this.categoryMap.set(this.categoryList[i].id, this.categoryList[i].category);
      }
    })
  }

}

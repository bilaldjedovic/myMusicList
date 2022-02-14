import { Component,Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryApiService } from 'src/app/category-api.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  songList$!:Observable<any[]>;
  categoryList$!:Observable<any[]>;

  readonly CategoryApiUrl = "https://localhost:7212/api";

  constructor(private service:CategoryApiService) { }



  @Input() song:any;
    id:  number = 0;
    categoryId!: number;
    songName: string = "";
    link: string = "";
    author: string = "";
    rate!: number;
    createdAt: Date = new Date();
    modifiedAt: Date = new Date();

  
    
   


    ngOnInit(): void {

      this.id = this.song.id;
      this.categoryId = this.song.categoryId;
      this.songName = this.song.songName;
      this.link = this.song.link;
      this.author = this.song.author;
      this.rate = this.song.rate;
      this.categoryList$ = this.service.getCategoryList();
      this.songList$ = this.service.getSongList();
      
    }
    

    addSong(){
      var song = {
        categoryId:this.categoryId,
        songName:this.songName,
        link: this.link,
        author:this.author,
        rate:this.rate,
        createdAt:this.createdAt,
        modifiedAt:this.modifiedAt
      }

      this.service.addSong(song).subscribe(res =>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }
        var showAddSuccess = document.getElementById('add-success-alert');
        if(showAddSuccess){
          showAddSuccess.style.display = "block";
        }
        setTimeout(function(){
          if(showAddSuccess){
            showAddSuccess.style.display = "none"
          }
        }, 4000);
      })

    }

    updateSong(){
      var song = {
        id: this.id,
        categoryId:this.categoryId,
        songName:this.songName,
        link: this.link,
        author:this.author,
        rate:this.rate,
        createdAt:this.createdAt,
        modifiedAt:this.modifiedAt
      }
      var id1:number = this.id
      this.service.updateSong(id1, song).subscribe(res =>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }
        var showUpdateSuccess = document.getElementById('add-success-alert');
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

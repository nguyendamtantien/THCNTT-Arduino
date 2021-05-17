import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css']
})
export class ThongtinComponent implements OnInit {
  URL = "https://my-arduino-htt.firebaseio.com/.json?fbclid=IwAR3PAfpcyeYt17Wa5P8XqS8j_D7lyaIzO4hq5ssSZ0IA87NY5BTnoYVdHmI"
  lists = [];
  constructor(public http: HttpClient){
 
  }
  ngOnInit(): void {
   
  }
  ngAfterContentChecked(){
    this.http.get(this.URL).toPromise().then(data =>{
      console.log(data);
      for (let key in data)
      if(data.hasOwnProperty(key))
        this.lists.push(data[key]);
    });
  }
}

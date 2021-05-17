import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../shared/account.model';
import { AccountService } from '../shared/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public accService: AccountService,
    public authService: AuthService,
    private fb: FormBuilder,
  ) { }
  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email:['',Validators.required], 
      password:['',Validators.required],
      /*
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
      },{
      validator: MustMatch('password', 'confirmpassword')//hàm tự viết SV có thể bỏ qua không kiểm tra cũng được
      */
    });
  }
  onSubmit(){
    let acc = new Account();
    //lay thông tin dữ liệu nhập trên form
    acc.email = this.registerForm.controls["email"].value;
    acc.password = this.registerForm.controls["password"].value;
    console.log(acc);
    this.accService.insertAccount(acc).subscribe(data=>{console.log(data)});
  }
}

import { CartService } from './../../services/cart.service';
import { Users } from './../../model/users';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  isActive = false;
  messageButton = 'Voir';

  constructor(private userService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  toggle() {
    this.isActive = !this.isActive;
    if(!this.isActive){
      this.messageButton = 'Voir';
    } else {
      this.messageButton = 'Masquer';
    }
  }

  initFormLogin(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.email, Validators.required]),
      password: this.formBuilder.control('', [Validators.minLength(6), Validators.required])
    });
  }

  onSubmit(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const newUser: Users = {email: email, password: password};
    this.userService.authentifier(newUser).then(
      (data) => {
        const cart = this.cartService.cart;
        if (cart.length !== 0) {
          this.router.navigate(['/checkout']);
        } else {
          this.router.navigate(['/shop']);
        }
      }
    ).catch((error) => {
      console.log(error);
      this.errorMessage = error.message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);

    });

  }

}

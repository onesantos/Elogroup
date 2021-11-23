import {Component, OnInit} from '@angular/core';
import {UserForm} from './user-form';
import {UserFormService} from './service/login.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserForm;
  mostrarPadrao = false;
  mostrarSenhaConfirmaSenha = false;

  constructor(private userForm: UserFormService, private router: Router) {
  }

  ngOnInit() {
    this.user = new UserForm();
  }

  onSubmit($event: any) {
    $event.stopPropagation();
    if ((this.user.senha.length !== 0 && this.user.confirmarSenha.length !== 0) && this.user.senha != this.user.confirmarSenha) {
      this.mostrarSenhaConfirmaSenha = true;
      setTimeout(() => this.mostrarSenhaConfirmaSenha = false, 3000);
      return;
    }
    const strongRegex = new RegExp('^(?=.*[A-Z a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const valid = strongRegex.test(this.user.senha);
    if (!valid) {
      this.mostrarPadrao = true;
      setTimeout(() => this.mostrarPadrao = false, 3000);
      return;
    }
    this.userForm.save(this.user)
    this.router.navigate(['leads-list']);

  }
}

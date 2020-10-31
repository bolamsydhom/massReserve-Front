import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators

} from '@angular/forms';
import { PasswordValidator } from '../validators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordForm: FormGroup;

  currentInput = 'email';
  spinnerEnabled = false;

  loginData = {
    email: '',
    password: ''

  };

  backendError = false;

  account_validation_messages = {
    email: [
      { type: 'required', message: 'يرجى ادخال البريد الإلكتروني' },
      { type: 'pattern', message: 'البريد الالكتروني الذي ادخلته غير صحيح' }
    ],
    password: [
      { type: 'required', message: 'برجاء ادخال الرقم السري' },
      {
        type: 'minlength',
        message: 'يجب ألا يقل الرقم السري عن 5 حروف'

      },
      {
        type: 'pattern',
        message:
          'الرقم السري غير صحيح',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userServices: UserService,
  ) { }

  ngOnInit(): void {
    // localStorage.clear()
    this.createForms();
    if (localStorage.getItem('token')) {
      this.router.navigate(['/family'], { replaceUrl: true });

    }
  }

  createForms() {
    this.loginForm = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])
      )
    });

  }


  onLogin(form) {
    // console.log(form);

    this.spinnerEnabled = true;
    this.userServices.Login(form).subscribe(
      response => {
        localStorage.setItem('token', response['token']);
        localStorage.setItem('person', JSON.stringify(response['person']));
        localStorage.setItem('userId', response['person']._id);
        this.spinnerEnabled = false;
        this.router.navigate(['/family'], { replaceUrl: true });
      },

      (error) => {

        // console.log(error);
        this.spinnerEnabled = false;
        this.backendError = true;
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onInputChange() {
    this.backendError === true ? (this.backendError = false) : '';
  }

}

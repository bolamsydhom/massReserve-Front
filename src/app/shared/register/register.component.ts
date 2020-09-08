import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Country,
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  PhoneValidator
} from '../validators';
import { UserModel } from '../../_model/user';

import { MatDialog } from '@angular/material/dialog';
// import { Modal } from './modal.component';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  spinnerEnabled = false;

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  userData: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  userObject: UserModel;

  modalId;

  countries = [
    new Country('EG', 'Egypt')
  ];

  account_validation_messages = {
    fullName: [
      { type: 'required', message: 'يرجى ادخال الاسم ' },
      { type: 'minlength', message: 'يرجى ادخال الاسم كاملا' },
      { type: 'maxlength', message: 'لا يمكن للاسم تجاوز 60 حرف' },
      // { type: 'pattern', message: 'Your firstname must contain only numbers and letters' },
      // { type: 'validUsername', message: 'Your firstname has already been taken' }
    ],
    idNumber: [
      { type: 'required', message: 'برجاء ادخال الرقم القومي' },
      { type: 'minlength', message: 'يجب الا يقل الرقم القومي عن 14 حرف' },
      { type: 'maxlength', message: 'يجب الا يزيد الرقم القومي عن 14 حرف' },
      { type: 'pattern', message: 'الرقم القومي الذي ادخلته غير صحيح' },
      // { type: 'validUsername', message: 'Your lastname has already been taken' }
    ],
    email: [
      { type: 'required', message: 'يرجى ادخال البريد الالكتروني' },
      { type: 'pattern', message: 'يرجى ادخال بريد الكتروني صحيح' }
    ],
    confirm_password: [
      { type: 'required', message: 'يرجى اعادة كتابة الرقم السري' },
      { type: 'areEqual', message: 'الرقم السري غير مطابق' }
    ],
    password: [
      { type: 'required', message: 'يرجى ادخال الرقم السري' },
      { type: 'minlength', message: 'يجب ان يحتوي الرقم السري على 5 حروف او ارقام على الاقل' },
      { type: 'pattern', message: 'يجب ان يحتوي الرقم السري على حرف كبير و حرف صغير و رقم على الاقل' }
    ],
    phone: [
      { type: 'required', message: 'يرجى ادخال رقم التليفون' },
      { type: 'validCountryPhone', message: 'الرقم الذي ادخلته غير صحيح' }
    ]
  };

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.createForms();
    if (localStorage.getItem('token')) {
      this.router.navigate(['/family'], { replaceUrl: true });

    }
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // country & phone validation
    const country = new FormControl(this.countries[0], Validators.required);

    const phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ])
    });

    this.country_phone_group = new FormGroup({
      country,
      phone
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(50),
        Validators.minLength(20),
        Validators.required
      ])),
      idNumber: new FormControl('', Validators.compose([
        // UsernameValidator.validUsername,
        Validators.minLength(14),
        Validators.pattern('(2|3)[0-9][1-9][0-1][0-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)[+]?[0-9]*(?:\.[0-9]*)?$'),
        // Validators.pattern('(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)'),
        Validators.maxLength(14),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      country_phone: this.country_phone_group
    });

  }

  onSubmitAccountDetails(formData) {
    this.spinnerEnabled = true;
    console.log(formData);
    // const userObject = {

    this.userObject = {
      fullName: formData.fullName,
      idNumber: formData.idNumber,
      email: formData.email,
      password: formData.matching_passwords.password,
      repeatedPassword: formData.matching_passwords.confirm_password,
      phoneNumber: `2${formData.country_phone.phone}`
    };


    // this.user.generateCode(formData.country_phone.phone).subscribe(
    //   (response) => {
    //     localStorage.setItem('phone', formData.country_phone.phone);
    //     this.openDialog(response.id);

    //   },
    //   (error) => {
    //     console.log(error.error.message);
    //   }
    // );

    // this.user.register(this.userObject)
    //   .subscribe(
    //     (response) => {

    //       this.openDialog();

    //       const loginUser = {
    //         email: userObject.email,
    //         password: userObject.password

    //       }
    //       this.user.Login(loginUser).subscribe(
    //         (response) => {
    //           this.spinnerEnabled = false;

    //           localStorage.setItem('token', response['token']);
    //           localStorage.setItem('person', JSON.stringify(response['person']))
    //           localStorage.setItem('userId', response['person']._id);

    //           this.router.navigate(['./userlocation']);
    //         },
    //         (error) => {

    //         }
    //       )

    //     },
    //     (error) => {
    //       this.spinnerEnabled = false;
    //       console.log(error)
    //       console.log('error')
    //     }
    //   );
  }


  goToLogin() {
    this.router.navigate(['./login']);
  }


}


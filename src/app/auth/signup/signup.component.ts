import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../userModel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  signupForm!: FormGroup;
  userId: number = 0;
  mode!: 'create' | 'edit';
  user!: any;
  requiredMessage!: string;
  subjectRequiredMessage!: string;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, validatePassword]],
      hourlyRate: ['', [Validators.min(10)]],
      subject: [['']],
      profilePhoto: [''],
      biography: ['']
    });
    this.userId = this.activatedRoute.snapshot.params.userId;
    if (this.userId > 0) {
      this.mode = 'edit';
      this.authService.getUser(this.userId).subscribe(response => {
        this.user = response.user;
        if (this.user[0].userType == 'tutor') {
          this.signupForm.patchValue({
            userType: this.user[0].userType,
            firstName: this.user[0].firstName,
            lastName: this.user[0].lastName,
            city: this.user[0].city,
            hourlyRate: this.user[0].hourlyRate,
            subject: this.user[0].subject,
            profilePhoto: this.user[0].profilePhoto,
            biography: this.user[0].biography
          });
        }
        else if(this.user[0].userType === 'student') {
          this.signupForm.patchValue({
            userType: this.user[0].userType,
            firstName: this.user[0].firstName,
            lastName: this.user[0].lastName,
            city: this.user[0].city,
          });
        }
      })
    }
    else {
      this.mode = 'create';
    }
  }
  signup() {
    console.log(this.signupForm.value);
    if (this.mode === 'create') {
      if (this.signupForm.invalid || (this.signupForm.value.userType == 'tutor' && this.signupForm.value.subject == "")) {
        this.subjectRequiredMessage = "A subject selection from the dropdown is required.";
        return;
      }
      this.authService.createUser(this.signupForm.value);
    }
    else if(this.mode === "edit") {
      if(this.user[0].userType === "tutor") {
        //go a step forward and require the other values from tutors
        if(this.signupForm.value.hourlyRate < 10 || this.signupForm.value.biography == "" || this.signupForm.value.subject == "") {
          this.requiredMessage = "Make sure you entered values for the hourly rate and biography, and select a subject from the dropdown";
          console.log(this.requiredMessage);
          return;
        }
      }
      //can't do if signupForm.invalid because credential values are excluded, so the form is invalid, so specify the required fields except the hidden credentials - email and password, which can't be edited
      if(this.signupForm.value.userType=="" || this.signupForm.value.firstName == "" || 
          this.signupForm.value.lastName == "" || this.signupForm.value.city == "") {
          // no need for required messages because the invalid message in html is done
        return;
      }
      const newUserObj = {
        userId: this.user[0].userId,
        userType: this.signupForm.value.userType,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        city: this.signupForm.value.city,
        email: this.user[0].email,
        password: this.user[0].password,
        hourlyRate: this.signupForm.value.hourlyRate,
        subject: this.signupForm.value.subject,
        profilePhoto: this.signupForm.value.profilePhoto,
        biography: this.signupForm.value.biography
      }
      this.authService.editUser(newUserObj);
    }
    this.signupForm.reset();
  }
}

function validatePassword(c: FormControl): any {
  let PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]|[_]).{8,10}$/;
  return PASSWORD_REGEXP.test(c.value) ? null : {
    passwordInvalid: {
      message: "Your password must be between 8 and 10 characters long and contain at least one upper case, one lower case, one number, and one special character."
    }
  };
}

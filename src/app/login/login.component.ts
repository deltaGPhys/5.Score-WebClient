import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { JudgeService } from '../services/judge.service';
import { ClimberService } from '../services/climber.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  judgeLoginForm: FormGroup;
  climberLoginForm: FormGroup;

  constructor(private userService: UserService, private judgeService: JudgeService, private climberService: ClimberService, private router: Router) { 
    this.adminLoginForm = this.createAdminFormGroup();
    this.climberLoginForm = this.createClimberFormGroup();
    this.judgeLoginForm = this.createJudgeFormGroup();
  }

  ngOnInit() {
  }

  createAdminFormGroup() {
    return new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });
  }

  onAdminSubmit()  {
    var email: string = this.adminLoginForm.controls.email.value;
    var password: string = this.adminLoginForm.controls.password.value;
    
    this.userService.verifyUser(email, password)
        .subscribe(user => {
          if (user == null) {
            this.adminLoginForm.reset();
          } else {
            this.router.navigate(['/gyms']);
          }
        });
    
  }
  
  createClimberFormGroup() {
    return new FormGroup({
        email: new FormControl('', [Validators.email]),
        id: new FormControl('')
    });
  }
  
  createJudgeFormGroup() {
    return new FormGroup({
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TestService } from '../services/test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface question {
  title: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
}

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
})
export class AddTestComponent implements OnInit {
  questions: question[] = [];
  showSpinner: boolean = false;

  constructor(
    public testService: TestService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {
    this.addQuestion();
  }

  ngOnInit(): void { }

  addQuestion() {
    this.questions.push({
      title: '',
      a: '',
      b: '',
      c: '',
      d: '',
      correct: '',
    });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);    
  }

  onCreateTest(test_details: NgForm) {
    this.showSpinner = true;
    this.testService.createTest(test_details.value, this.questions).subscribe({
      next: (response: any) => {
        this._snackbar.open(response.message,
          'Dismiss',
          { duration: 3000 })
        this.router.navigate(['/'])
      },
      error: (err) => {
        this._snackbar.open(
          err.error.message || 'Please try again later',
          'Dismiss',
          { duration: 3000 }
        )
      }
    }).add(() => {
      this.showSpinner = false
    })
  }
}

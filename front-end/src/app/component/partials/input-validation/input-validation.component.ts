import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required:'Should not be empty',
  email:'email not valid'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }
  ngOnInit(): void {
    this.controls.statusChanges.subscribe(()=>{
      this.checkValidation()
    })
    this.controls.valueChanges.subscribe(()=>{
      this.checkValidation()
    })
  }

  @Input() controls!:AbstractControl
  @Input() showErrorWhen:boolean = true
  errorMessages:string[] = []

  checkValidation(){
    const errors = this.controls.errors
    if(!errors) {
      this.errorMessages = []
      return
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

}

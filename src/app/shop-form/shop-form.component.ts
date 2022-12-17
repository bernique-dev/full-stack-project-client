import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Shop} from "../shared/shop";
import {WEEKDAYNAMES} from "../shared/week-day-names";
import {OpeningTimes} from "../shared/opening-times";
import {TimeOfDay} from "../shared/time-of-day";
import {TimeValidator} from "../shared/time-validator";
import {DayOfWeek} from "../shared/day-of-week";

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  providers: [ShopService],
  styleUrls: ['./shop-form.component.css'],
  exportAs: 'ngModel'
})
export class ShopFormComponent implements OnInit {

  readonly WEEKDAYNAMES = WEEKDAYNAMES

  shopForm = new FormGroup({
    shopName: new FormControl(),
    shopIsOnLeave: new FormControl(),
    shopOpeningTime: new FormControl(),
    shopClosingTime: new FormControl(),
    shopScheduleDay: new FormControl()
  })

  openingTimesList: OpeningTimes[] = [];

  shopId: number = 0;

  isModifying?: boolean = undefined

  constructor(private route: ActivatedRoute, private router: Router, private shopService : ShopService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.shopId = params['id']
          this.isModifying = true
          this.shopService.getShop(this.shopId).subscribe(
            shop => {

              //parsingTime
              let timesList = []
              let dayCnt = 1;
              for (let dayTimesString of shop.openingTimes.split(';')) {
                if (dayTimesString.length > 0) {
                  let dayTimesValues = dayTimesString.split('-')
                  let openingTimeString = dayTimesValues[0]
                  let openingTimeValues = openingTimeString.split(':').map(v => Number(v))
                  let openingTime = new TimeOfDay(openingTimeValues[0], openingTimeValues[1])

                  let closingTimeString = dayTimesValues[1]
                  let closingTimeValues = closingTimeString.split(':').map(v => Number(v))
                  let closingTime = new TimeOfDay(closingTimeValues[0], closingTimeValues[1])

                  timesList.push({
                    openingTime: openingTime,
                    closingTime: closingTime
                  })
                } else {
                  timesList.push({
                    openingTime: undefined,
                    closingTime: undefined
                  })
                }
                // s.timesList(dayCnt as WeekDay, )
                dayCnt = (dayCnt + 1) % 7
              }
              this.openingTimesList = timesList
              this.shopForm.controls['shopName'].setValue(shop.name);
              this.shopForm.controls['shopIsOnLeave'].setValue(shop.isOnLeave);
              console.log(shop.productList)
              this.setScheduleDay(DayOfWeek.Monday);
            }
          )
        } else {
          this.isModifying = false
          for (let day of Object.keys(DayOfWeek).filter((v) => isNaN(Number(v)))) {
            console.log(day)
            this.openingTimesList.push({
              openingTime: undefined,
              closingTime: undefined
            })
          }
          console.log(this.openingTimesList)
          this.shopForm.controls['shopName'].setValue('New Shop')
          this.shopForm.controls['shopIsOnLeave'].setValue(false)
          this.shopForm.controls['shopClosingTime'].setValue("")
          this.shopForm.controls['shopOpeningTime'].setValue("")
          this.setScheduleDay(DayOfWeek.Monday);
        }
      }
    )
  }

  modifyShop(shopId : number) {
    console.log(this.generateShop(shopId))
     this.shopService.modifyShop(this.generateShop(shopId)).subscribe(
      result => this.router.navigateByUrl('shop/details/' + result)
    )
  }

  createShop() {
    console.log(this.generateShop(0))
    this.shopService.addShop(this.generateShop(0)).subscribe(
      result => this.router.navigateByUrl('shop/details/' + result)
    )

  }

  private generateShop(id : number): Shop {
   let scheduleStrings = []
    for (let schedule of this.openingTimesList) {
      if(schedule.openingTime == undefined || schedule.closingTime == undefined) {
        scheduleStrings.push("")
      } else {
        scheduleStrings.push(schedule.openingTime + "-" + schedule.closingTime)
      }
    }
    return {
      id: id,
      name: this.shopForm.controls['shopName'].value,
      isOnLeave: this.shopForm.controls['shopIsOnLeave'].value,
      openingTimes: scheduleStrings.join(";"),
      productList: [],
      creationDate: new Date(),
      openingTimesList: [],
    }
  }

  setScheduleDay(day : DayOfWeek) {
    this.shopForm.controls['shopScheduleDay'].setValue(day);
    let shopOpeningTime = this.openingTimesList[day.valueOf()].openingTime
    let shopClosingTime = this.openingTimesList[day.valueOf()].closingTime
    this.shopForm.controls['shopOpeningTime'].setValue(shopOpeningTime ? shopOpeningTime.toString() : "");
    this.shopForm.controls['shopClosingTime'].setValue(shopClosingTime ? shopClosingTime.toString() : "");
    if (shopOpeningTime != undefined || shopClosingTime != undefined) {
      this.addValidatorsToTimeFields()
    } else {
      this.removeValidatorsToTimeFields()
    }
  }

  addValidatorsToTimeFields() {
    this.shopForm.controls.shopOpeningTime.addValidators(Validators.required)
    this.shopForm.controls.shopClosingTime.addValidators(Validators.required)
    this.shopForm.controls.shopOpeningTime.updateValueAndValidity()
    this.shopForm.controls.shopClosingTime.updateValueAndValidity()
    console.log("AddValidator")
  }

  removeValidatorsToTimeFields() {
    this.shopForm.controls.shopOpeningTime.clearValidators()
    this.shopForm.controls.shopClosingTime.clearValidators()
    this.shopForm.controls.shopOpeningTime.updateValueAndValidity()
    this.shopForm.controls.shopClosingTime.updateValueAndValidity()
    console.log("ClearValidator")
  }

  modifyTime() {
    let shopOpeningTime = this.shopForm.controls['shopOpeningTime'].value
    let shopClosingTime = this.shopForm.controls['shopClosingTime'].value

    this.shopForm.controls.shopOpeningTime.clearValidators();
    this.shopForm.controls.shopClosingTime.clearValidators();

    this.shopForm.controls.shopOpeningTime.addValidators(TimeValidator(shopClosingTime, true))
    this.shopForm.controls.shopClosingTime.addValidators(TimeValidator(shopOpeningTime, false))


    this.addValidatorsToTimeFields()
    this.modifyOpeningTimes()
  }

  clearDaySchedule() {
    this.openingTimesList[this.shopForm.controls['shopScheduleDay'].value] = {
      openingTime: undefined,
      closingTime: undefined
    }
    this.shopForm.controls['shopOpeningTime'].setValue('')
    this.shopForm.controls['shopClosingTime'].setValue('')
    this.removeValidatorsToTimeFields()
  }

  modifyOpeningTimes() {
      if (this.shopForm.valid) {
        let shopOpeningTime = this.shopForm.controls['shopOpeningTime'].value
        let shopClosingTime = this.shopForm.controls['shopClosingTime'].value
        this.openingTimesList[this.shopForm.controls['shopScheduleDay'].value] = {
          openingTime : typeof shopOpeningTime == 'string' ?
                        TimeOfDay.ofString(shopOpeningTime)
                        : shopOpeningTime,
          closingTime : typeof shopClosingTime == 'string' ?
                        TimeOfDay.ofString(shopClosingTime)
                        : shopClosingTime
        } as OpeningTimes
    }
  }

}

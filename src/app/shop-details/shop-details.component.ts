import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShopService} from "../shop.service";
import {Shop} from "../shared/shop";
import {DayOfWeek} from "../shared/day-of-week";
import {TimeOfDay} from "../shared/time-of-day";
import {DAYOFWEEKNAMES} from "../shared/week-day-names";

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  providers: [ShopService],
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  shop?: Shop;
  DAYOFWEEKNAMES = DAYOFWEEKNAMES
  json: string = ""

  constructor(private route: ActivatedRoute, private shopService: ShopService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.shopService.getShop(params['id']).subscribe({
        next: shop => {
          let timesList = []
          let dayCnt = 1;
          shop.creationDate = new Date(shop.creationDate)
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
            dayCnt = (dayCnt + 1) % 7
          }
          shop.openingTimesList = timesList
          this.shop = shop
        },
        error: error => {
          this.router.navigateByUrl('error/' + error.status)
        }
      })
    )
  }

  getDayFromNumber(nb: number) {
    return DAYOFWEEKNAMES.get(nb as DayOfWeek)
  }

}

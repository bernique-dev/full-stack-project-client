import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {Shop} from "../shared/shop";
import {ShopSorter} from "../shared/shopsorter";
import {TimeOfDay} from "../shared/time-of-day";
import {DayOfWeek} from "../shared/day-of-week";
import {Product} from "../shared/product";
import {DAYOFWEEKNAMES} from "../shared/week-day-names";


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  providers: [ShopService]
})
export class ShopListComponent implements OnInit {

  json : string = ""
  shops : Shop[] = [];
  displayedShops: Shop[] = []
  products : Product[] = []

  //  Page managing
  activePageNumber: number = 1
  maxShopPerPage: number = 4
  topShopIndex: number = 1

  maxNavPagesNumber: number = 7
  totalNavPagesNumber: number = 1
  firstNavPage: number = 1
  visibleNavPages: number = 1

  //  Sorting
  currentSorter: ShopSorter = {
    name: "Sort",
    function: (s1, s2) => s1.id - s2.id
  }

  sorters: ShopSorter[] = [
    {
      name: "Name ↑",
      function: (s1: Shop, s2: Shop) => s1.name.localeCompare(s2.name)
    }, {
      name: "Name ↓",
      function: (s1: Shop, s2: Shop) => s2.name.localeCompare(s1.name)
    }, {
      name: "Nbr products ↑",
      function: (s1: Shop, s2: Shop) => s2.productList.length - s1.productList.length
    }, {
      name: "Nbr products ↓",
      function: (s1: Shop, s2: Shop) => s1.productList.length - s2.productList.length
    }, {
      name: "creation date ↑",
      function: (s1: Shop, s2: Shop) => s2.creationDate.getTime() - s1.creationDate.getTime()
    }, {
      name: "creation date ↓",
      function: (s1: Shop, s2: Shop) => s1.creationDate.getTime() - s2.creationDate.getTime()
    }
  ]

  //  Filtering
  nameFilterValue: string = "";
  nameFilter = (s: Shop) => this.nameFilterValue.length > 0 ? s.name.toUpperCase().includes(this.nameFilterValue.toUpperCase()) : true

  minNbrProductFilterValue: number = 0;
  maxNbrProductFilterValue: number = Infinity;
  nbrProductFilter = (s: Shop) => s.productList.length >= this.minNbrProductFilterValue && s.productList.length <= this.maxNbrProductFilterValue

  minCreationDateValueFilterValue : Date = new Date(-8640000000000000);
  maxCreationDateValueFilterValue : Date = new Date(8640000000000000);
  creationDateFilter = (s: Shop) => {
    return s.creationDate >= this.minCreationDateValueFilterValue && s.creationDate <= this.maxCreationDateValueFilterValue
  }

  constructor(private shopService : ShopService) {
  }

  ngOnInit() {
    this.getShops()
  }

  getShops() {
    this.shopService.getShops().subscribe(shops => {
      let shopList = shops
      shopList.forEach(s => {
        let timesList = []
        let dayCnt = 1;
        s.creationDate = new Date(s.creationDate)
        for (let dayTimesString of s.openingTimes.split(';')) {
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
        s.openingTimesList = timesList
      })
      this.shops = shopList;
      this.displayedShops = this.shops;

      this.calculatePagesNumber()
      this.displayShopsPage(1)
      this.minCreationDateValueFilterValue = new Date(Math.min(...this.shops.map(s=>s.creationDate.getTime())));
      this.maxCreationDateValueFilterValue = new Date(Math.max(...this.shops.map(s=>s.creationDate.getTime())));
    });
  }

  getDayFromNumber(nb: number) {
    return DAYOFWEEKNAMES.get(nb as DayOfWeek)
  }

  displayShopsPage(pageNumber: number) {
    this.activePageNumber = pageNumber
    this.topShopIndex = 1 + ((this.activePageNumber - 1) * this.maxShopPerPage)

    let offset = Math.floor(this.maxNavPagesNumber / 2)
    if (this.activePageNumber - offset <= 1) {
      this.firstNavPage = 1;
    } else if (this.activePageNumber + offset >= this.totalNavPagesNumber) {
      this.firstNavPage = this.totalNavPagesNumber - this.maxNavPagesNumber + 1;
    } else {
      this.firstNavPage = this.activePageNumber - offset;
    }

  }

  calculatePagesNumber() {
    this.totalNavPagesNumber = Math.ceil(this.displayedShops.length / this.maxShopPerPage)
    this.visibleNavPages = Math.min(this.maxNavPagesNumber, this.totalNavPagesNumber)
    this.displayShopsPage(1)
  }

  sortWith(sorter: ShopSorter) {
    this.currentSorter = sorter
    this.displayedShops.sort(sorter.function)
  }

  filterShops() {
    this.displayedShops = this.shops.filter(
      s => this.nameFilter(s) && this.nbrProductFilter(s) && this.creationDateFilter(s)
    )
    console.log(this.shops)
    console.log(this.displayedShops)
    this.calculatePagesNumber()
  }

  filterName(filterValue: string) {
    this.nameFilterValue = filterValue;
    this.filterShops();
  }

  filterMinNbrProductFilterValue(filterValue: number) {
    this.minNbrProductFilterValue = filterValue != null ? filterValue : this.minNbrProductFilterValue
    this.filterShops();
  }

  filterMaxNbrProductFilterValue(filterValue: number) {
    this.maxNbrProductFilterValue = filterValue != null ? filterValue : this.maxNbrProductFilterValue
    this.filterShops();
  }

  filterMinDateFilterValue(filterValue: Date) {
    this.minCreationDateValueFilterValue = filterValue;
    if (this.minCreationDateValueFilterValue > this.maxCreationDateValueFilterValue) {
      this.maxCreationDateValueFilterValue = this.minCreationDateValueFilterValue;
    }
    this.filterShops();

  }

  filterMaxDateFilterValue(filterValue: Date) {
    this.maxCreationDateValueFilterValue = filterValue;
    if (this.maxCreationDateValueFilterValue < this.minCreationDateValueFilterValue) {
      this.minCreationDateValueFilterValue = this.maxCreationDateValueFilterValue;
    }
    this.filterShops();
  }

}

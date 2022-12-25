import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  status: number = 0
  message: string = ""

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = Number(this.route.snapshot.params['status'])
    this.message = this.getMessage(this.status)
  }

  getMessage(status: number): string {
    switch (status) {
      case 400:
        return "Une erreur s'est glissée dans la requête..."
      case 401:
        return "Nous n'avons pas eu le droit de faire cette requête..."
      case 404:
        return "Vous cherchiez quelque chose et apparemment, nous ne l'avons pas ou l'avons perdu..."
      case 500:
        return "On dirait que l'une des requêtes a tout cassé..."
      default:
        return "On ne sait pas trop pourquoi mais ça ne marche pas..."
    }
  }

}

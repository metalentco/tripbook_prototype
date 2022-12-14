import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {TripService} from "../../services/trip.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  constructor(
    public tripService: TripService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/sign-in']);
    }
    if(localStorage.getItem('refresh')) {
      window.location.reload();
      localStorage.removeItem('refresh');
    }
  }
}

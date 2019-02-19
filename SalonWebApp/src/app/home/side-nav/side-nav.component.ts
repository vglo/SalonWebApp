import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input('avatarUrl') avatarUrl : String ='assets/images/avatar.jpg';


  @Input('backgroundUrl') backgroundUrl: String ='assets/images/cover.jpg';

  constructor() { }

  ngOnInit() {
  }

}

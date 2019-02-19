import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobileQuery: MediaQueryList;

  theme: String = 'theme';

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 959px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  toggleTheme(){
    const body = document.getElementsByTagName('body')[0];
    if(this.theme === 'theme'){
      body.classList.remove(this.theme.toString());
      this.theme='theme-dark'; 
      body.classList.add(this.theme.toString());  
    } 
    else{
      body.classList.remove(this.theme.toString());
      this.theme='theme'; 
      body.classList.add(this.theme.toString());  
    }
  }

  ngOnInit() {}

}

import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'NewsApp';
  selectedNewsChannel: string="Top 10 Trending News!";
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  public sources: any = [];
  public articles: any = [];

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private newsapi: ServiceService
  ) {}
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.newsapi.initArticles().subscribe((res:any)=>{
      console.log(res)
      this.articles=res.articles;
    }) 
    this.newsapi.initSources().subscribe((res:any)=>{
      console.log(res)
      this.sources=res.sources;
    })
  }
  searchSource(source:any) {
    this.newsapi.getArticlesById(source.id).subscribe((res:any)=>{
this.articles=res.articles;
this.selectedNewsChannel=source.name;
    })
  }
}

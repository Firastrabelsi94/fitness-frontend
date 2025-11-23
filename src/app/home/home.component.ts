import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  today: Date = new Date();

  @ViewChildren('animateCard', { read: ElementRef }) cards!: QueryList<ElementRef>;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
        } else {
          // keep in-view after first reveal; comment out removal to persist
          // el.classList.remove('in-view');
        }
      });
    }, { threshold: 0.15 });

    this.cards.forEach(card => {
      if (this.observer && card.nativeElement) {
        this.observer.observe(card.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

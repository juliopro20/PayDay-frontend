import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  imports: [RouterLink],
  selector: 'app-faq',
  styleUrl: './faq.css',
  templateUrl: './faq.html',
})
export class Faq implements OnInit, AfterViewInit, OnDestroy {
  private fragmentSubscription?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Use requestAnimationFrame + setTimeout to wait for layout stabilization on click
        this.scrollToFragmentWithRetry(fragment);
      }
    });
  }

  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.scrollToFragmentWithRetry(fragment);
    }
  }

  ngOnDestroy(): void {
    this.fragmentSubscription?.unsubscribe();
  }

  private scrollToFragmentWithRetry(elementId: string, attempts = 5): void {
    requestAnimationFrame(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (attempts > 0) {
        // If the element isn't in the DOM yet, retry after a short delay
        setTimeout(() => this.scrollToFragmentWithRetry(elementId, attempts - 1), 50);
      }
    });
  }
}
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DsCardComponent } from './ds-card.component';

describe('DsCardComponent', () => {
  let component: DsCardComponent;
  let fixture: ComponentFixture<DsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCardComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(DsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default padding to md', () => {
    expect(component.padding).toBe('md');
  });

  it('should default elevated to true', () => {
    expect(component.elevated).toBe(true);
  });

  it('should not render header when title is not set', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('mat-card-header')).toBeNull();
  });

  it('should render header when title is set', () => {
    component.title = 'Account Summary';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('mat-card-title')?.textContent).toContain('Account Summary');
  });

  it('should render subtitle when both title and subtitle are set', () => {
    component.title = 'Account Summary';
    component.subtitle = 'Last 30 days';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('mat-card-subtitle')?.textContent).toContain('Last 30 days');
  });

  it('should not render subtitle when only subtitle is set without title', () => {
    component.subtitle = 'Last 30 days';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('mat-card-subtitle')).toBeNull();
  });

  it('should apply flat class when elevated is false', () => {
    component.elevated = false;
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card.classList.contains('ds-card--flat')).toBe(true);
  });

  it('should apply sm class when padding is sm', () => {
    component.padding = 'sm';
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card.classList.contains('ds-card--sm')).toBe(true);
  });

  it('should apply lg class when padding is lg', () => {
    component.padding = 'lg';
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card.classList.contains('ds-card--lg')).toBe(true);
  });
});

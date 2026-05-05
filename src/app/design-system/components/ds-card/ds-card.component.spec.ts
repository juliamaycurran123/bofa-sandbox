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

  it('should default elevated to true', () => {
    expect(component.elevated).toBe(true);
  });

  it('should default padding to md', () => {
    expect(component.padding).toBe('md');
  });

  it('should render title when provided', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector('mat-card-title');
    expect(titleEl.textContent).toContain('Test Title');
  });

  it('should not render header when title is not provided', () => {
    component.title = undefined;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('mat-card-header');
    expect(header).toBeNull();
  });

  it('should render subtitle when provided', () => {
    component.title = 'Title';
    component.subtitle = 'Subtitle';
    fixture.detectChanges();
    const subtitleEl = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(subtitleEl.textContent).toContain('Subtitle');
  });

  it('should apply flat class when elevated is false', () => {
    component.elevated = false;
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card.classList).toContain('ds-card--flat');
  });
});

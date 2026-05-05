import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsPageHeaderComponent } from './ds-page-header.component';

describe('DsPageHeaderComponent', () => {
  let component: DsPageHeaderComponent;
  let fixture: ComponentFixture<DsPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPageHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DsPageHeaderComponent);
    component = fixture.componentInstance;
    component.title = 'Test Page';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Test Page');
  });

  it('should render subtitle when provided', () => {
    component.subtitle = 'A subtitle';
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p.textContent).toContain('A subtitle');
  });

  it('should not render subtitle paragraph when not provided', () => {
    component.subtitle = undefined;
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('p');
    expect(p).toBeNull();
  });

  it('should project content into actions slot', () => {
    const actionsDiv = fixture.nativeElement.querySelector('.ds-page-header__actions');
    expect(actionsDiv).toBeTruthy();
  });
});

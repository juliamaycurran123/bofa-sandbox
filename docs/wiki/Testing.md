# Testing

## Framework

- **Test runner:** Karma
- **Assertion library:** Jasmine
- **Configuration:** `karma.conf.js`

## Running Tests

```bash
# Watch mode (development)
npm test

# Single run, headless, with coverage (CI)
npm run test:ci
# equivalent to: ng test --watch=false --browsers=ChromeHeadless --code-coverage
```

## Coverage

Coverage reports are generated in `./coverage/clearvault/` with:

- HTML report (open `index.html` in a browser)
- Text summary (printed to terminal)

## Test Configuration

### karma.conf.js

Key settings:

| Setting | Value |
|---------|-------|
| Frameworks | `jasmine`, `@angular-devkit/build-angular` |
| Browsers | `Chrome` (watch), `ChromeHeadless` (CI) |
| Coverage dir | `./coverage/clearvault` |
| Reporters | `progress`, `kjhtml` |
| Port | `9876` |

### tsconfig.spec.json

Extends `tsconfig.json` and adds test-specific settings. The TypeScript path aliases (`@core/*`, `@design-system/*`, etc.) are available in tests.

## Test Structure

Tests use the standard Angular `TestBed` pattern:

```typescript
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        DesignSystemModule,
        CoreModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
```

## Conventions

- Test files live alongside their source files with the `.spec.ts` suffix.
- Use `NoopAnimationsModule` in tests to avoid animation-related timing issues.
- Use `provideHttpClientTesting()` to mock HTTP calls.
- Import `CoreModule` in tests that need auth, analytics, or data provider services.
- Use fixtures from `src/test/fixtures/transactions.ts` for transaction-related test data — **never use real PII values** in tests.

## Chrome Binary

For environments where Chrome is not in the default path, set the `CHROME_BIN` environment variable:

```bash
export CHROME_BIN=/path/to/chrome
```

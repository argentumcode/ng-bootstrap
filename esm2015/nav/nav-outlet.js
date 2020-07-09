import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
export class NgbNavOutlet {
}
NgbNavOutlet.decorators = [
    { type: Component, args: [{
                selector: '[ngbNavOutlet]',
                host: { '[class.tab-content]': 'true' },
                encapsulation: ViewEncapsulation.None,
                template: `
      <ng-template ngFor let-item [ngForOf]="nav.items">
          <div class="tab-pane"
               *ngIf="item.isPanelInDom()"
               [id]="item.panelDomId"
               [class.active]="item.active"
               [attr.role]="paneRole ? paneRole : nav.roles ? 'tabpanel' : undefined"
               [attr.aria-labelledby]="item.domId">
              <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef || null"
                           [ngTemplateOutletContext]="{$implicit: item.active}"></ng-template>
          </div>
      </ng-template>
  `
            },] }
];
NgbNavOutlet.propDecorators = {
    paneRole: [{ type: Input }],
    nav: [{ type: Input, args: ['ngbNavOutlet',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uYXYvbmF2LW91dGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdsRTs7OztHQUlHO0FBbUJILE1BQU0sT0FBTyxZQUFZOzs7WUFsQnhCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixJQUFJLEVBQUUsRUFBQyxxQkFBcUIsRUFBRSxNQUFNLEVBQUM7Z0JBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO2FBQ0Y7Ozt1QkFLRSxLQUFLO2tCQUtMLEtBQUssU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYk5hdn0gZnJvbSAnLi9uYXYnO1xuXG4vKipcbiAqIFRoZSBvdXRsZXQgd2hlcmUgY3VycmVudGx5IGFjdGl2ZSBuYXYgY29udGVudCB3aWxsIGJlIGRpc3BsYXllZC5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25nYk5hdk91dGxldF0nLFxuICBob3N0OiB7J1tjbGFzcy50YWItY29udGVudF0nOiAndHJ1ZSd9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cIm5hdi5pdGVtc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiXG4gICAgICAgICAgICAgICAqbmdJZj1cIml0ZW0uaXNQYW5lbEluRG9tKClcIlxuICAgICAgICAgICAgICAgW2lkXT1cIml0ZW0ucGFuZWxEb21JZFwiXG4gICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIml0ZW0uYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFthdHRyLnJvbGVdPVwicGFuZVJvbGUgPyBwYW5lUm9sZSA6IG5hdi5yb2xlcyA/ICd0YWJwYW5lbCcgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIml0ZW0uZG9tSWRcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW0uY29udGVudFRwbD8udGVtcGxhdGVSZWYgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogaXRlbS5hY3RpdmV9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2T3V0bGV0IHtcbiAgLyoqXG4gICAqIEEgcm9sZSB0byBzZXQgb24gdGhlIG5hdiBwYW5lXG4gICAqL1xuICBASW5wdXQoKSBwYW5lUm9sZTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBgTmdiTmF2YFxuICAgKi9cbiAgQElucHV0KCduZ2JOYXZPdXRsZXQnKSBuYXY6IE5nYk5hdjtcbn1cbiJdfQ==
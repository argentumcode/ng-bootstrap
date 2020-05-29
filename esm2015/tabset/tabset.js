import { __decorate } from "tslib";
// tslint:disable:deprecation
import { AfterContentChecked, Component, ContentChildren, Directive, EventEmitter, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
let nextId = 0;
/**
 * A directive to wrap tab titles that need to contain HTML markup or other directives.
 *
 * Alternatively you could use the `NgbTab.title` input for string titles.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
let NgbTabTitle = class NgbTabTitle {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
NgbTabTitle.ctorParameters = () => [
    { type: TemplateRef }
];
NgbTabTitle = __decorate([
    Directive({ selector: 'ng-template[ngbTabTitle]' })
], NgbTabTitle);
export { NgbTabTitle };
/**
 * A directive to wrap content to be displayed in a tab.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
let NgbTabContent = class NgbTabContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
NgbTabContent.ctorParameters = () => [
    { type: TemplateRef }
];
NgbTabContent = __decorate([
    Directive({ selector: 'ng-template[ngbTabContent]' })
], NgbTabContent);
export { NgbTabContent };
/**
 * A directive representing an individual tab.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
let NgbTab = class NgbTab {
    constructor() {
        /**
         * The tab identifier.
         *
         * Must be unique for the entire document for proper accessibility support.
         */
        this.id = `ngb-tab-${nextId++}`;
        /**
         * If `true`, the current tab is disabled and can't be toggled.
         */
        this.disabled = false;
    }
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
};
__decorate([
    Input()
], NgbTab.prototype, "id", void 0);
__decorate([
    Input()
], NgbTab.prototype, "title", void 0);
__decorate([
    Input()
], NgbTab.prototype, "disabled", void 0);
__decorate([
    ContentChildren(NgbTabTitle, { descendants: false })
], NgbTab.prototype, "titleTpls", void 0);
__decorate([
    ContentChildren(NgbTabContent, { descendants: false })
], NgbTab.prototype, "contentTpls", void 0);
NgbTab = __decorate([
    Directive({ selector: 'ngb-tab' })
], NgbTab);
export { NgbTab };
/**
 * A component that makes it easy to create tabbed interface.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
let NgbTabset = class NgbTabset {
    constructor(config) {
        /**
         * If `true`, non-visible tabs content will be removed from DOM. Otherwise it will just be hidden.
         */
        this.destroyOnHide = true;
        /**
         * A tab change event emitted right before the tab change happens.
         *
         * See [`NgbTabChangeEvent`](#/components/tabset/api#NgbTabChangeEvent) for payload details.
         */
        this.tabChange = new EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
        this.orientation = config.orientation;
    }
    /**
     * The horizontal alignment of the tabs with flexbox utilities.
     */
    set justify(className) {
        if (className === 'fill' || className === 'justified') {
            this.justifyClass = `nav-${className}`;
        }
        else {
            this.justifyClass = `justify-content-${className}`;
        }
    }
    /**
     * Selects the tab with the given id and shows its associated content panel.
     *
     * Any other tab that was previously selected becomes unselected and its associated pane is removed from DOM or
     * hidden depending on the `destroyOnHide` value.
     */
    select(tabId) {
        let selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            let defaultPrevented = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: () => { defaultPrevented = true; } });
            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
            }
        }
    }
    ngAfterContentChecked() {
        // auto-correct activeId that might have been set incorrectly as input
        let activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    }
    _getTabById(id) {
        let tabsWithId = this.tabs.filter(tab => tab.id === id);
        return tabsWithId.length ? tabsWithId[0] : null;
    }
};
NgbTabset.ctorParameters = () => [
    { type: NgbTabsetConfig }
];
__decorate([
    ContentChildren(NgbTab)
], NgbTabset.prototype, "tabs", void 0);
__decorate([
    Input()
], NgbTabset.prototype, "activeId", void 0);
__decorate([
    Input()
], NgbTabset.prototype, "destroyOnHide", void 0);
__decorate([
    Input()
], NgbTabset.prototype, "justify", null);
__decorate([
    Input()
], NgbTabset.prototype, "orientation", void 0);
__decorate([
    Input()
], NgbTabset.prototype, "type", void 0);
__decorate([
    Output()
], NgbTabset.prototype, "tabChange", void 0);
NgbTabset = __decorate([
    Component({
        selector: 'ngb-tabset',
        exportAs: 'ngbTabset',
        encapsulation: ViewEncapsulation.None,
        template: `
    <ul [class]="'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')" role="tablist">
      <li class="nav-item" *ngFor="let tab of tabs">
        <a [id]="tab.id" class="nav-link" [class.active]="tab.id === activeId" [class.disabled]="tab.disabled"
          (click)="select(tab.id); $event.preventDefault()" role="tab" [attr.tabindex]="(tab.disabled ? '-1': undefined)"
          [attr.aria-controls]="(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)"
          [attr.aria-selected]="tab.id === activeId" [attr.aria-disabled]="tab.disabled">
          {{tab.title}}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef || null"></ng-template>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <ng-template ngFor let-tab [ngForOf]="tabs">
        <div
          class="tab-pane {{tab.id === activeId ? 'active' : null}}"
          *ngIf="!destroyOnHide || tab.id === activeId"
          role="tabpanel"
          [attr.aria-labelledby]="tab.id" id="{{tab.id}}-panel">
          <ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef || null"></ng-template>
        </div>
      </ng-template>
    </div>
  `
    })
], NgbTabset);
export { NgbTabset };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0YWJzZXQvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7Ozs7OztHQU1HO0FBRUgsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUN0QixZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDO0NBQ3JELENBQUE7O1lBRGlDLFdBQVc7O0FBRGhDLFdBQVc7SUFEdkIsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLDBCQUEwQixFQUFDLENBQUM7R0FDckMsV0FBVyxDQUV2QjtTQUZZLFdBQVc7QUFJeEI7Ozs7R0FJRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDeEIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQztDQUNyRCxDQUFBOztZQURpQyxXQUFXOztBQURoQyxhQUFhO0lBRHpCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQyxDQUFDO0dBQ3ZDLGFBQWEsQ0FFekI7U0FGWSxhQUFhO0FBSTFCOzs7O0dBSUc7QUFFSCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBQW5CO1FBQ0U7Ozs7V0FJRztRQUNNLE9BQUUsR0FBRyxXQUFXLE1BQU0sRUFBRSxFQUFFLENBQUM7UUFTcEM7O1dBRUc7UUFDTSxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBZ0I1QixDQUFDO0lBUkMscUJBQXFCO1FBQ25CLDhGQUE4RjtRQUM5Riw4RUFBOEU7UUFDOUUsaUVBQWlFO1FBQ2pFLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDM0MsQ0FBQztDQUNGLENBQUE7QUE1QlU7SUFBUixLQUFLLEVBQUU7a0NBQTRCO0FBTzNCO0lBQVIsS0FBSyxFQUFFO3FDQUFlO0FBS2Q7SUFBUixLQUFLLEVBQUU7d0NBQWtCO0FBSzBCO0lBQW5ELGVBQWUsQ0FBQyxXQUFXLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLENBQUM7eUNBQW1DO0FBQ2hDO0lBQXJELGVBQWUsQ0FBQyxhQUFhLEVBQUUsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLENBQUM7MkNBQXVDO0FBeEJqRixNQUFNO0lBRGxCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQztHQUNwQixNQUFNLENBa0NsQjtTQWxDWSxNQUFNO0FBMERuQjs7OztHQUlHO0FBNkJILElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFxRHBCLFlBQVksTUFBdUI7UUF0Q25DOztXQUVHO1FBQ00sa0JBQWEsR0FBRyxJQUFJLENBQUM7UUE0QjlCOzs7O1dBSUc7UUFDTyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFHMUQsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQXJDRDs7T0FFRztJQUVILElBQUksT0FBTyxDQUFDLFNBQTREO1FBQ3RFLElBQUksU0FBUyxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssV0FBVyxFQUFFO1lBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxTQUFTLEVBQUUsQ0FBQztTQUN4QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsU0FBUyxFQUFFLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBNkJEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQzVFLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBRTdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNmLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFFM0csSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDaEM7U0FDRjtJQUNILENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsc0VBQXNFO1FBQ3RFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFTyxXQUFXLENBQUMsRUFBVTtRQUM1QixJQUFJLFVBQVUsR0FBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEUsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFNLElBQUksQ0FBQztJQUN2RCxDQUFDO0NBQ0YsQ0FBQTs7WUFwQ3FCLGVBQWU7O0FBL0NWO0lBQXhCLGVBQWUsQ0FBQyxNQUFNLENBQUM7dUNBQXlCO0FBT3hDO0lBQVIsS0FBSyxFQUFFOzJDQUFrQjtBQUtqQjtJQUFSLEtBQUssRUFBRTtnREFBc0I7QUFNOUI7SUFEQyxLQUFLLEVBQUU7d0NBT1A7QUFLUTtJQUFSLEtBQUssRUFBRTs4Q0FBd0M7QUFTdkM7SUFBUixLQUFLLEVBQUU7dUNBQWlDO0FBTy9CO0lBQVQsTUFBTSxFQUFFOzRDQUFtRDtBQW5EakQsU0FBUztJQTVCckIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLFdBQVc7UUFDckIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JUO0tBQ0YsQ0FBQztHQUNXLFNBQVMsQ0F5RnJCO1NBekZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpkZXByZWNhdGlvblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiVGFic2V0Q29uZmlnfSBmcm9tICcuL3RhYnNldC1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byB3cmFwIHRhYiB0aXRsZXMgdGhhdCBuZWVkIHRvIGNvbnRhaW4gSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlcy5cbiAqXG4gKiBBbHRlcm5hdGl2ZWx5IHlvdSBjb3VsZCB1c2UgdGhlIGBOZ2JUYWIudGl0bGVgIGlucHV0IGZvciBzdHJpbmcgdGl0bGVzLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byB3cmFwIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIGEgdGFiLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlRhYkNvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgdGFiLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ItdGFiJ30pXG5leHBvcnQgY2xhc3MgTmdiVGFiIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiBUaGUgdGFiIGlkZW50aWZpZXIuXG4gICAqXG4gICAqIE11c3QgYmUgdW5pcXVlIGZvciB0aGUgZW50aXJlIGRvY3VtZW50IGZvciBwcm9wZXIgYWNjZXNzaWJpbGl0eSBzdXBwb3J0LlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXRhYi0ke25leHRJZCsrfWA7XG5cbiAgLyoqXG4gICAqIFRoZSB0YWIgdGl0bGUuXG4gICAqXG4gICAqIFVzZSB0aGUgW2BOZ2JUYWJUaXRsZWBdKCMvY29tcG9uZW50cy90YWJzZXQvYXBpI05nYlRhYlRpdGxlKSBkaXJlY3RpdmUgZm9yIG5vbi1zdHJpbmcgdGl0bGVzLlxuICAgKi9cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY3VycmVudCB0YWIgaXMgZGlzYWJsZWQgYW5kIGNhbid0IGJlIHRvZ2dsZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHRpdGxlVHBsOiBOZ2JUYWJUaXRsZSB8IG51bGw7XG4gIGNvbnRlbnRUcGw6IE5nYlRhYkNvbnRlbnQgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiVGl0bGUsIHtkZXNjZW5kYW50czogZmFsc2V9KSB0aXRsZVRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJUaXRsZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiVGFiQ29udGVudD47XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cbiAgICAvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG4gICAgdGhpcy50aXRsZVRwbCA9IHRoaXMudGl0bGVUcGxzLmZpcnN0O1xuICAgIHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgY2hhbmdlIGV2ZW50IGZpcmVkIHJpZ2h0IGJlZm9yZSB0aGUgdGFiIGNoYW5nZS5cbiAqXG4gKiBAZGVwcmVjYXRlZCA2LjAuMCBQbGVhc2UgdXNlIE5nYk5hdiBpbnN0ZWFkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVGFiQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYi5cbiAgICovXG4gIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBpZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgdGFiLlxuICAgKi9cbiAgbmV4dElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIHByZXZlbnQgdGFiIHN3aXRjaGluZy5cbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgdGFiYmVkIGludGVyZmFjZS5cbiAqXG4gKiBAZGVwcmVjYXRlZCA2LjAuMCBQbGVhc2UgdXNlIE5nYk5hdiBpbnN0ZWFkXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10YWJzZXQnLFxuICBleHBvcnRBczogJ25nYlRhYnNldCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFtjbGFzc109XCInbmF2IG5hdi0nICsgdHlwZSArIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCc/ICAnICcgKyBqdXN0aWZ5Q2xhc3MgOiAnIGZsZXgtY29sdW1uJylcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNcIj5cbiAgICAgICAgPGEgW2lkXT1cInRhYi5pZFwiIGNsYXNzPVwibmF2LWxpbmtcIiBbY2xhc3MuYWN0aXZlXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHRhYi5pZCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgcm9sZT1cInRhYlwiIFthdHRyLnRhYmluZGV4XT1cIih0YWIuZGlzYWJsZWQgPyAnLTEnOiB1bmRlZmluZWQpXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIighZGVzdHJveU9uSGlkZSB8fCB0YWIuaWQgPT09IGFjdGl2ZUlkID8gdGFiLmlkICsgJy1wYW5lbCcgOiBudWxsKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuaWQgPT09IGFjdGl2ZUlkXCIgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIj5cbiAgICAgICAgICB7e3RhYi50aXRsZX19PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi50aXRsZVRwbD8udGVtcGxhdGVSZWYgfHwgbnVsbFwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwidGFiLXBhbmUge3t0YWIuaWQgPT09IGFjdGl2ZUlkID8gJ2FjdGl2ZScgOiBudWxsfX1cIlxuICAgICAgICAgICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGFiLmlkXCIgaWQ9XCJ7e3RhYi5pZH19LXBhbmVsXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZiB8fCBudWxsXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfanVzdGlmeTogc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3JpZW50YXRpb246IHN0cmluZztcblxuICBqdXN0aWZ5Q2xhc3M6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYikgdGFiczogUXVlcnlMaXN0PE5nYlRhYj47XG5cbiAgLyoqXG4gICAqIFRoZSBpZGVudGlmaWVyIG9mIHRoZSB0YWIgdGhhdCBzaG91bGQgYmUgb3BlbmVkICoqaW5pdGlhbGx5KiouXG4gICAqXG4gICAqIEZvciBzdWJzZXF1ZW50IHRhYiBzd2l0Y2hlcyB1c2UgdGhlIGAuc2VsZWN0KClgIG1ldGhvZCBhbmQgdGhlIGAodGFiQ2hhbmdlKWAgZXZlbnQuXG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIG5vbi12aXNpYmxlIHRhYnMgY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET00uIE90aGVyd2lzZSBpdCB3aWxsIGp1c3QgYmUgaGlkZGVuLlxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgdGFicyB3aXRoIGZsZXhib3ggdXRpbGl0aWVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGp1c3RpZnkoY2xhc3NOYW1lOiAnc3RhcnQnIHwgJ2NlbnRlcicgfCAnZW5kJyB8ICdmaWxsJyB8ICdqdXN0aWZpZWQnKSB7XG4gICAgaWYgKGNsYXNzTmFtZSA9PT0gJ2ZpbGwnIHx8IGNsYXNzTmFtZSA9PT0gJ2p1c3RpZmllZCcpIHtcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYG5hdi0ke2NsYXNzTmFtZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmp1c3RpZnlDbGFzcyA9IGBqdXN0aWZ5LWNvbnRlbnQtJHtjbGFzc05hbWV9YDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIHRoZSB0YWJzZXQuXG4gICAqL1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuICAvKipcbiAgICogVHlwZSBvZiBuYXZpZ2F0aW9uIHRvIGJlIHVzZWQgZm9yIHRhYnMuXG4gICAqXG4gICAqIEN1cnJlbnRseSBCb290c3RyYXAgc3VwcG9ydHMgb25seSBgXCJ0YWJzXCJgIGFuZCBgXCJwaWxsc1wiYC5cbiAgICpcbiAgICogU2luY2UgYDMuMC4wYCBjYW4gYWxzbyBiZSBhbiBhcmJpdHJhcnkgc3RyaW5nIChleC4gZm9yIGN1c3RvbSB0aGVtZXMpLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogJ3RhYnMnIHwgJ3BpbGxzJyB8IHN0cmluZztcblxuICAvKipcbiAgICogQSB0YWIgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlIGhhcHBlbnMuXG4gICAqXG4gICAqIFNlZSBbYE5nYlRhYkNoYW5nZUV2ZW50YF0oIy9jb21wb25lbnRzL3RhYnNldC9hcGkjTmdiVGFiQ2hhbmdlRXZlbnQpIGZvciBwYXlsb2FkIGRldGFpbHMuXG4gICAqL1xuICBAT3V0cHV0KCkgdGFiQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUYWJDaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlRhYnNldENvbmZpZykge1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuanVzdGlmeSA9IGNvbmZpZy5qdXN0aWZ5O1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgdGFiIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBjb250ZW50IHBhbmVsLlxuICAgKlxuICAgKiBBbnkgb3RoZXIgdGFiIHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIHJlbW92ZWQgZnJvbSBET00gb3JcbiAgICogaGlkZGVuIGRlcGVuZGluZyBvbiB0aGUgYGRlc3Ryb3lPbkhpZGVgIHZhbHVlLlxuICAgKi9cbiAgc2VsZWN0KHRhYklkOiBzdHJpbmcpIHtcbiAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRhYklkKTtcbiAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgIXNlbGVjdGVkVGFiLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWQgIT09IHNlbGVjdGVkVGFiLmlkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KFxuICAgICAgICAgIHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkOiBzZWxlY3RlZFRhYi5pZCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFRhYi5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYXV0by1jb3JyZWN0IGFjdGl2ZUlkIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIHNldCBpbmNvcnJlY3RseSBhcyBpbnB1dFxuICAgIGxldCBhY3RpdmVUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVUYWIgPyBhY3RpdmVUYWIuaWQgOiAodGhpcy50YWJzLmxlbmd0aCA/IHRoaXMudGFicy5maXJzdC5pZCA6IDxhbnk+bnVsbCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRUYWJCeUlkKGlkOiBzdHJpbmcpOiBOZ2JUYWIge1xuICAgIGxldCB0YWJzV2l0aElkOiBOZ2JUYWJbXSA9IHRoaXMudGFicy5maWx0ZXIodGFiID0+IHRhYi5pZCA9PT0gaWQpO1xuICAgIHJldHVybiB0YWJzV2l0aElkLmxlbmd0aCA/IHRhYnNXaXRoSWRbMF0gOiA8YW55Pm51bGw7XG4gIH1cbn1cbiJdfQ==
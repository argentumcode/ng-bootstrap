import { Attribute, ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isDefined } from '../util/util';
import { NgbNavConfig } from './nav-config';
import { Key } from '../util/key';
const isValidNavId = (id) => isDefined(id) && id !== '';
const ɵ0 = isValidNavId;
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
export class NgbNavContent {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbNavContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbNavContent]' },] }
];
NgbNavContent.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
export class NgbNavItem {
    constructor(nav, elementRef) {
        this.elementRef = elementRef;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        // TODO: cf https://github.com/angular/angular/issues/30106
        this._nav = nav;
    }
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.contentTpl = this.contentTpls.first;
    }
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    get active() { return this._nav.activeId === this.id; }
    get id() { return isValidNavId(this._id) ? this._id : this.domId; }
    get panelDomId() { return `${this.domId}-panel`; }
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
}
NgbNavItem.decorators = [
    { type: Directive, args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', host: { '[class.nav-item]': 'true' } },] }
];
NgbNavItem.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbNav),] }] },
    { type: ElementRef }
];
NgbNavItem.propDecorators = {
    destroyOnHide: [{ type: Input }],
    disabled: [{ type: Input }],
    domId: [{ type: Input }],
    _id: [{ type: Input, args: ['ngbNavItem',] }],
    contentTpls: [{ type: ContentChildren, args: [NgbNavContent, { descendants: false },] }]
};
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
export class NgbNav {
    constructor(role, config, _cd, _document) {
        this.role = role;
        this._cd = _cd;
        this._document = _document;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
        this.destroyOnHide = config.destroyOnHide;
        this.orientation = config.orientation;
        this.roles = config.roles;
        this.keyboard = config.keyboard;
    }
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    onKeyDown(event) {
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        // tslint:disable-next-line: deprecation
        const key = event.which;
        const enabledLinks = this.links.filter(link => !link.navItem.disabled);
        const { length } = enabledLinks;
        let position = -1;
        enabledLinks.forEach((link, index) => {
            if (link.elRef.nativeElement === this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (key) {
                case Key.ArrowLeft:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.ArrowRight:
                    if (this.orientation === 'vertical') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowDown:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position + 1) % length;
                    break;
                case Key.ArrowUp:
                    if (this.orientation === 'horizontal') {
                        return;
                    }
                    position = (position - 1 + length) % length;
                    break;
                case Key.Home:
                    position = 0;
                    break;
                case Key.End:
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].elRef.nativeElement.focus();
            event.preventDefault();
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id) { this._updateActiveId(id, false); }
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
    }
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({ activeId: this.activeId, nextId, preventDefault: () => { defaultPrevented = true; } });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
            }
        }
    }
}
NgbNav.decorators = [
    { type: Directive, args: [{
                selector: '[ngbNav]',
                exportAs: 'ngbNav',
                host: {
                    '[class.nav]': 'true',
                    '[class.flex-column]': `orientation === 'vertical'`,
                    '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                    '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                    '(keydown.arrowLeft)': 'onKeyDown($event)',
                    '(keydown.arrowRight)': 'onKeyDown($event)',
                    '(keydown.arrowDown)': 'onKeyDown($event)',
                    '(keydown.arrowUp)': 'onKeyDown($event)',
                    '(keydown.Home)': 'onKeyDown($event)',
                    '(keydown.End)': 'onKeyDown($event)'
                }
            },] }
];
NgbNav.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: NgbNavConfig },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
NgbNav.propDecorators = {
    activeId: [{ type: Input }],
    activeIdChange: [{ type: Output }],
    destroyOnHide: [{ type: Input }],
    orientation: [{ type: Input }],
    roles: [{ type: Input }],
    keyboard: [{ type: Input }],
    items: [{ type: ContentChildren, args: [NgbNavItem,] }],
    links: [{ type: ContentChildren, args: [forwardRef(() => NgbNavLink), { descendants: true },] }],
    navChange: [{ type: Output }]
};
/**
 * A directive to put on the nav link.
 *
 * @since 5.2.0
 */
export class NgbNavLink {
    constructor(role, navItem, nav, elRef) {
        this.role = role;
        this.navItem = navItem;
        this.nav = nav;
        this.elRef = elRef;
    }
    hasNavItemClass() {
        // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
        return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
    }
}
NgbNavLink.decorators = [
    { type: Directive, args: [{
                selector: 'a[ngbNavLink]',
                host: {
                    '[id]': 'navItem.domId',
                    '[class.nav-link]': 'true',
                    '[class.nav-item]': 'hasNavItemClass()',
                    '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
                    'href': '',
                    '[class.active]': 'navItem.active',
                    '[class.disabled]': 'navItem.disabled',
                    '[attr.tabindex]': 'navItem.disabled ? -1 : undefined',
                    '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                    '[attr.aria-selected]': 'navItem.active',
                    '[attr.aria-disabled]': 'navItem.disabled',
                    '(click)': 'nav.click(navItem); $event.preventDefault()'
                }
            },] }
];
NgbNavLink.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: NgbNavItem },
    { type: NgbNav },
    { type: ElementRef }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25hdi9uYXYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFFTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRWhDLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQzs7QUFFN0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBaUJuQjs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7O1lBRnJELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQzs7O1lBL0JqRCxXQUFXOztBQXFDYjs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLFVBQVU7SUFxQ3JCLFlBQThDLEdBQUcsRUFBUyxVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQTVCckY7Ozs7V0FJRztRQUNNLGFBQVEsR0FBRyxLQUFLLENBQUM7UUF3QnhCLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQscUJBQXFCO1FBQ25C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b250ZW50SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtpc0RlZmluZWR9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYk5hdkNvbmZpZ30gZnJvbSAnLi9uYXYtY29uZmlnJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5cbmNvbnN0IGlzVmFsaWROYXZJZCA9IChpZDogYW55KSA9PiBpc0RlZmluZWQoaWQpICYmIGlkICE9PSAnJztcblxubGV0IG5hdkNvdW50ZXIgPSAwO1xuXG4vKipcbiAqIENvbnRleHQgcGFzc2VkIHRvIHRoZSBuYXYgY29udGVudCB0ZW1wbGF0ZS5cbiAqXG4gKiBTZWUgW3RoaXMgZGVtb10oIy9jb21wb25lbnRzL25hdi9leGFtcGxlcyNrZWVwLWNvbnRlbnQpIGFzIHRoZSBleGFtcGxlLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYk5hdkNvbnRlbnRDb250ZXh0IHtcbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgY3VycmVudCBuYXYgY29udGVudCBpcyB2aXNpYmxlIGFuZCBhY3RpdmVcbiAgICovXG4gICRpbXBsaWNpdDogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIG11c3QgYmUgdXNlZCB0byB3cmFwIGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBuYXYuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiTmF2Q29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG5cbi8qKlxuICogVGhlIGRpcmVjdGl2ZSB1c2VkIHRvIGdyb3VwIG5hdiBsaW5rIGFuZCByZWxhdGVkIG5hdiBjb250ZW50LiBBcyB3ZWxsIGFzIHNldCBuYXYgaWRlbnRpZmllciBhbmQgc29tZSBvcHRpb25zLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JOYXZJdGVtXScsIGV4cG9ydEFzOiAnbmdiTmF2SXRlbScsIGhvc3Q6IHsnW2NsYXNzLm5hdi1pdGVtXSc6ICd0cnVlJ319KVxuZXhwb3J0IGNsYXNzIE5nYk5hdkl0ZW0gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkluaXQge1xuICBwcml2YXRlIF9uYXY6IE5nYk5hdjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBub24tYWN0aXZlIGN1cnJlbnQgbmF2IGl0ZW0gY29udGVudCB3aWxsIGJlIHJlbW92ZWQgZnJvbSBET01cbiAgICogT3RoZXJ3aXNlIGl0IHdpbGwganVzdCBiZSBoaWRkZW5cbiAgICovXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGU7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbmF2IGl0ZW0gaXMgZGlzYWJsZWQgYW5kIGNhbid0IGJlIHRvZ2dsZWQgYnkgdXNlci5cbiAgICpcbiAgICogTmV2ZXJ0aGVsZXNzIGRpc2FibGVkIG5hdiBjYW4gYmUgc2VsZWN0ZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgdGhlIGAuc2VsZWN0KClgIG1ldGhvZCBhbmQgdGhlIGBbYWN0aXZlSWRdYCBiaW5kaW5nLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGlkIHVzZWQgZm9yIHRoZSBET00gZWxlbWVudHMuXG4gICAqIE11c3QgYmUgdW5pcXVlIGluc2lkZSB0aGUgZG9jdW1lbnQgaW4gY2FzZSB5b3UgaGF2ZSBtdWx0aXBsZSBgbmdiTmF2YHMgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEF1dG9nZW5lcmF0ZWQgYXMgYG5nYi1uYXYtWFhYYCBpZiBub3QgcHJvdmlkZWQuXG4gICAqL1xuICBASW5wdXQoKSBkb21JZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgdXNlZCBhcyBhIG1vZGVsIGZvciBhY3RpdmUgbmF2LlxuICAgKiBJdCBjYW4gYmUgYW55dGhpbmcsIGJ1dCBtdXN0IGJlIHVuaXF1ZSBpbnNpZGUgb25lIGBuZ2JOYXZgLlxuICAgKlxuICAgKiBUaGUgb25seSBsaW1pdGF0aW9uIGlzIHRoYXQgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGhhdmUgdGhlIGAnJ2AgKGVtcHR5IHN0cmluZykgYXMgaWQsXG4gICAqIGJlY2F1c2UgYCBuZ2JOYXZJdGVtIGAsIGBuZ2JOYXZJdGVtPScnYCBhbmQgYFtuZ2JOYXZJdGVtXT1cIicnXCJgIGFyZSBpbmRpc3Rpbmd1aXNoYWJsZVxuICAgKi9cbiAgQElucHV0KCduZ2JOYXZJdGVtJykgX2lkOiBhbnk7XG5cbiAgY29udGVudFRwbDogTmdiTmF2Q29udGVudCB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JOYXZDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JOYXZDb250ZW50PjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiTmF2KSkgbmF2LCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxhbnk+KSB7XG4gICAgLy8gVE9ETzogY2YgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzAxMDZcbiAgICB0aGlzLl9uYXYgPSBuYXY7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCFpc0RlZmluZWQodGhpcy5kb21JZCkpIHtcbiAgICAgIHRoaXMuZG9tSWQgPSBgbmdiLW5hdi0ke25hdkNvdW50ZXIrK31gO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9uYXYuYWN0aXZlSWQgPT09IHRoaXMuaWQ7IH1cblxuICBnZXQgaWQoKSB7IHJldHVybiBpc1ZhbGlkTmF2SWQodGhpcy5faWQpID8gdGhpcy5faWQgOiB0aGlzLmRvbUlkOyB9XG5cbiAgZ2V0IHBhbmVsRG9tSWQoKSB7IHJldHVybiBgJHt0aGlzLmRvbUlkfS1wYW5lbGA7IH1cblxuICBpc1BhbmVsSW5Eb20oKSB7XG4gICAgcmV0dXJuIChpc0RlZmluZWQodGhpcy5kZXN0cm95T25IaWRlKSA/ICF0aGlzLmRlc3Ryb3lPbkhpZGUgOiAhdGhpcy5fbmF2LmRlc3Ryb3lPbkhpZGUpIHx8IHRoaXMuYWN0aXZlO1xuICB9XG59XG5cblxuLyoqXG4gKiBBIG5hdiBkaXJlY3RpdmUgdGhhdCBoZWxwcyB3aXRoIGltcGxlbWVudGluZyB0YWJiZWQgbmF2aWdhdGlvbiBjb21wb25lbnRzLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiTmF2XScsXG4gIGV4cG9ydEFzOiAnbmdiTmF2JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubmF2XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmZsZXgtY29sdW1uXSc6IGBvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ2AsXG4gICAgJ1thdHRyLmFyaWEtb3JpZW50YXRpb25dJzogYG9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIHJvbGVzID09PSAndGFibGlzdCcgPyAndmVydGljYWwnIDogdW5kZWZpbmVkYCxcbiAgICAnW2F0dHIucm9sZV0nOiBgcm9sZSA/IHJvbGUgOiByb2xlcyA/ICd0YWJsaXN0JyA6IHVuZGVmaW5lZGAsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5hcnJvd1JpZ2h0KSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLmFycm93RG93biknOiAnb25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5hcnJvd1VwKSc6ICdvbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkhvbWUpJzogJ29uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uRW5kKSc6ICdvbktleURvd24oJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXYgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX29yaWVudGF0aW9uOiBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yb2xlczogYm9vbGVhbiB8IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBuYXYgdGhhdCBzaG91bGQgYmUgYWN0aXZlXG4gICAqXG4gICAqIFlvdSBjb3VsZCBhbHNvIHVzZSB0aGUgYC5zZWxlY3QoKWAgbWV0aG9kIGFuZCB0aGUgYChuYXZDaGFuZ2UpYCBldmVudFxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWQ6IGFueTtcblxuICAvKipcbiAgICogVGhlIGV2ZW50IGVtaXR0ZWQgYWZ0ZXIgdGhlIGFjdGl2ZSBuYXYgY2hhbmdlc1xuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgdGhlIG5ld2x5IGFjdGl2ZSBuYXYgaWRcbiAgICpcbiAgICogSWYgeW91IHdhbnQgdG8gcHJldmVudCBuYXYgY2hhbmdlLCB5b3Ugc2hvdWxkIHVzZSBgKG5hdkNoYW5nZSlgIGV2ZW50XG4gICAqL1xuICBAT3V0cHV0KCkgYWN0aXZlSWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBub24tYWN0aXZlIG5hdiBjb250ZW50IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIERPTVxuICAgKiBPdGhlcndpc2UgaXQgd2lsbCBqdXN0IGJlIGhpZGRlblxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZTtcblxuICAvKipcbiAgICogVGhlIG9yaWVudGF0aW9uIG9mIG5hdnMuXG4gICAqXG4gICAqIFVzaW5nIGB2ZXJ0aWNhbGAgd2lsbCBhbHNvIGFkZCB0aGUgYGFyaWEtb3JpZW50YXRpb25gIGF0dHJpYnV0ZVxuICAgKi9cbiAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbiAgLyoqXG4gICAqIFJvbGUgYXR0cmlidXRlIGdlbmVyYXRpbmcgc3RyYXRlZ3k6XG4gICAqIC0gYGZhbHNlYCAtIG5vIHJvbGUgYXR0cmlidXRlcyB3aWxsIGJlIGdlbmVyYXRlZFxuICAgKiAtIGAndGFibGlzdCdgIC0gJ3RhYmxpc3QnLCAndGFiJyBhbmQgJ3RhYnBhbmVsJyB3aWxsIGJlIGdlbmVyYXRlZCAoZGVmYXVsdClcbiAgICovXG4gIEBJbnB1dCgpIHJvbGVzOiAndGFibGlzdCcgfCBmYWxzZTtcblxuICAvKipcbiAgICogS2V5Ym9hcmQgc3VwcG9ydCBmb3IgbmF2IGZvY3VzL3NlbGVjdGlvbiB1c2luZyBhcnJvdyBrZXlzLlxuICAgKlxuICAgKiAqIGBmYWxzZWAgLSBubyBrZXlib2FyZCBzdXBwb3J0LlxuICAgKiAqIGB0cnVlYCAtIG5hdnMgd2lsbCBiZSBmb2N1c2VkIHVzaW5nIGtleWJvYXJkIGFycm93IGtleXNcbiAgICogKiBgJ2NoYW5nZVdpdGhBcnJvd3MnYCAtICBuYXYgd2lsbCBiZSBzZWxlY3RlZCB1c2luZyBrZXlib2FyZCBhcnJvdyBrZXlzXG4gICAqXG4gICAqIFNlZSB0aGUgW2xpc3Qgb2YgYXZhaWxhYmxlIGtleWJvYXJkIHNob3J0Y3V0c10oIy9jb21wb25lbnRzL25hdi9vdmVydmlldyNrZXlib2FyZC1zaG9ydGN1dHMpLlxuICAgKlxuICAgKiBAc2luY2UgNi4xLjBcbiAqL1xuICBASW5wdXQoKSBrZXlib2FyZDogYm9vbGVhbiB8ICdjaGFuZ2VXaXRoQXJyb3dzJztcblxuICBAQ29udGVudENoaWxkcmVuKE5nYk5hdkl0ZW0pIGl0ZW1zOiBRdWVyeUxpc3Q8TmdiTmF2SXRlbT47XG4gIEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBOZ2JOYXZMaW5rKSwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgbGlua3M6IFF1ZXJ5TGlzdDxOZ2JOYXZMaW5rPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBBdHRyaWJ1dGUoJ3JvbGUnKSBwdWJsaWMgcm9sZTogc3RyaW5nLCBjb25maWc6IE5nYk5hdkNvbmZpZywgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuZGVzdHJveU9uSGlkZSA9IGNvbmZpZy5kZXN0cm95T25IaWRlO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XG4gICAgdGhpcy5yb2xlcyA9IGNvbmZpZy5yb2xlcztcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYXYgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBuYXYgY2hhbmdlIGhhcHBlbnMgb24gdXNlciBjbGljay5cbiAgICpcbiAgICogVGhpcyBldmVudCB3b24ndCBiZSBlbWl0dGVkIGlmIG5hdiBpcyBjaGFuZ2VkIHByb2dyYW1tYXRpY2FsbHkgdmlhIGBbYWN0aXZlSWRdYCBvciBgLnNlbGVjdCgpYC5cbiAgICpcbiAgICogU2VlIFtgTmdiTmF2Q2hhbmdlRXZlbnRgXSgjL2NvbXBvbmVudHMvbmF2L2FwaSNOZ2JOYXZDaGFuZ2VFdmVudCkgZm9yIHBheWxvYWQgZGV0YWlscy5cbiAgICovXG4gIEBPdXRwdXQoKSBuYXZDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYk5hdkNoYW5nZUV2ZW50PigpO1xuXG4gIGNsaWNrKGl0ZW06IE5nYk5hdkl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkKGl0ZW0uaWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLnJvbGVzICE9PSAndGFibGlzdCcgfHwgIXRoaXMua2V5Ym9hcmQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIGNvbnN0IGtleSA9IGV2ZW50LndoaWNoO1xuICAgIGNvbnN0IGVuYWJsZWRMaW5rcyA9IHRoaXMubGlua3MuZmlsdGVyKGxpbmsgPT4gIWxpbmsubmF2SXRlbS5kaXNhYmxlZCk7XG4gICAgY29uc3Qge2xlbmd0aH0gPSBlbmFibGVkTGlua3M7XG5cbiAgICBsZXQgcG9zaXRpb24gPSAtMTtcblxuICAgIGVuYWJsZWRMaW5rcy5mb3JFYWNoKChsaW5rLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGxpbmsuZWxSZWYubmF0aXZlRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICBwb3NpdGlvbiA9IGluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc2l0aW9uID0gKHBvc2l0aW9uIC0gMSArIGxlbmd0aCkgJSBsZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zaXRpb24gPSAocG9zaXRpb24gKyAxKSAlIGxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zaXRpb24gPSAocG9zaXRpb24gKyAxKSAlIGxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc2l0aW9uID0gKHBvc2l0aW9uIC0gMSArIGxlbmd0aCkgJSBsZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgICAgcG9zaXRpb24gPSBsZW5ndGggLSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMua2V5Ym9hcmQgPT09ICdjaGFuZ2VXaXRoQXJyb3dzJykge1xuICAgICAgICB0aGlzLnNlbGVjdChlbmFibGVkTGlua3NbcG9zaXRpb25dLm5hdkl0ZW0uaWQpO1xuICAgICAgfVxuICAgICAgZW5hYmxlZExpbmtzW3Bvc2l0aW9uXS5lbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgdGhlIG5hdiB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgc2hvd3MgaXRzIGFzc29jaWF0ZWQgcGFuZS5cbiAgICogQW55IG90aGVyIG5hdiB0aGF0IHdhcyBwcmV2aW91c2x5IHNlbGVjdGVkIGJlY29tZXMgdW5zZWxlY3RlZCBhbmQgaXRzIGFzc29jaWF0ZWQgcGFuZSBpcyBoaWRkZW4uXG4gICAqL1xuICBzZWxlY3QoaWQ6IGFueSkgeyB0aGlzLl91cGRhdGVBY3RpdmVJZChpZCwgZmFsc2UpOyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGlmICghaXNEZWZpbmVkKHRoaXMuYWN0aXZlSWQpKSB7XG4gICAgICBjb25zdCBuZXh0SWQgPSB0aGlzLml0ZW1zLmZpcnN0ID8gdGhpcy5pdGVtcy5maXJzdC5pZCA6IG51bGw7XG4gICAgICBpZiAoaXNWYWxpZE5hdklkKG5leHRJZCkpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWN0aXZlSWQobmV4dElkLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVBY3RpdmVJZChuZXh0SWQ6IGFueSwgZW1pdE5hdkNoYW5nZSA9IHRydWUpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVJZCAhPT0gbmV4dElkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoZW1pdE5hdkNoYW5nZSkge1xuICAgICAgICB0aGlzLm5hdkNoYW5nZS5lbWl0KHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJZCA9IG5leHRJZDtcbiAgICAgICAgdGhpcy5hY3RpdmVJZENoYW5nZS5lbWl0KG5leHRJZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gdGhlIG5hdiBsaW5rLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhW25nYk5hdkxpbmtdJyxcbiAgaG9zdDoge1xuICAgICdbaWRdJzogJ25hdkl0ZW0uZG9tSWQnLFxuICAgICdbY2xhc3MubmF2LWxpbmtdJzogJ3RydWUnLFxuICAgICdbY2xhc3MubmF2LWl0ZW1dJzogJ2hhc05hdkl0ZW1DbGFzcygpJyxcbiAgICAnW2F0dHIucm9sZV0nOiBgcm9sZSA/IHJvbGUgOiBuYXYucm9sZXMgPyAndGFiJyA6IHVuZGVmaW5lZGAsXG4gICAgJ2hyZWYnOiAnJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnbmF2SXRlbS5hY3RpdmUnLFxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnbmF2SXRlbS5kaXNhYmxlZCA/IC0xIDogdW5kZWZpbmVkJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnbmF2SXRlbS5pc1BhbmVsSW5Eb20oKSA/IG5hdkl0ZW0ucGFuZWxEb21JZCA6IG51bGwnLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICduYXZJdGVtLmFjdGl2ZScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ25hdkl0ZW0uZGlzYWJsZWQnLFxuICAgICcoY2xpY2spJzogJ25hdi5jbGljayhuYXZJdGVtKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2TGluayB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEF0dHJpYnV0ZSgncm9sZScpIHB1YmxpYyByb2xlOiBzdHJpbmcsIHB1YmxpYyBuYXZJdGVtOiBOZ2JOYXZJdGVtLCBwdWJsaWMgbmF2OiBOZ2JOYXYsXG4gICAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgaGFzTmF2SXRlbUNsYXNzKCkge1xuICAgIC8vIHdpdGggYWx0ZXJuYXRpdmUgbWFya3VwIHdlIGhhdmUgdG8gYWRkIGAubmF2LWl0ZW1gIGNsYXNzLCBiZWNhdXNlIGBuZ2JOYXZJdGVtYCBpcyBvbiB0aGUgbmctY29udGFpbmVyXG4gICAgcmV0dXJuIHRoaXMubmF2SXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFO1xuICB9XG59XG5cblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgY2hhbmdlIGV2ZW50IGVtaXR0ZWQgcmlnaHQgYmVmb3JlIHRoZSBuYXYgY2hhbmdlIGhhcHBlbnMgb24gdXNlciBjbGljay5cbiAqXG4gKiBUaGlzIGV2ZW50IHdvbid0IGJlIGVtaXR0ZWQgaWYgbmF2IGlzIGNoYW5nZWQgcHJvZ3JhbW1hdGljYWxseSB2aWEgYFthY3RpdmVJZF1gIG9yIGAuc2VsZWN0KClgLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYk5hdkNoYW5nZUV2ZW50PFQgPSBhbnk+IHtcbiAgLyoqXG4gICAqIElkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIG5hdi5cbiAgICovXG4gIGFjdGl2ZUlkOiBUO1xuXG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgbmF2LlxuICAgKi9cbiAgbmV4dElkOiBUO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBuYXYgY2hhbmdlIGlmIGNhbGxlZC5cbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuIl19
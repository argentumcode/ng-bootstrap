import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { Key } from '../util/key';
import { ModalDismissReasons } from './modal-dismiss-reasons';
export class NgbModalWindow {
    constructor(_document, _elRef, _zone) {
        this._document = _document;
        this._elRef = _elRef;
        this._zone = _zone;
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to modal opening
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    dismiss(reason) { this.dismissEvent.emit(reason); }
    ngOnInit() { this._elWithFocus = this._document.activeElement; }
    ngAfterViewInit() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular(() => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), 
            // tslint:disable-next-line:deprecation
            filter(e => e.which === Key.Escape && this.keyboard))
                .subscribe(event => requestAnimationFrame(() => {
                if (!event.defaultPrevented) {
                    this._zone.run(() => this.dismiss(ModalDismissReasons.ESC));
                }
            }));
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap(() => preventClose = false), switchMap(() => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1))), filter(({ target }) => nativeElement === target))
                .subscribe(() => { preventClose = true; });
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click').pipe(takeUntil(this._closed$)).subscribe(({ target }) => {
                if (this.backdrop === true && nativeElement === target && !preventClose) {
                    this._zone.run(() => this.dismiss(ModalDismissReasons.BACKDROP_CLICK));
                }
                preventClose = false;
            });
        });
        if (!nativeElement.contains(document.activeElement)) {
            const autoFocusable = nativeElement.querySelector(`[ngbAutofocus]`);
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    ngOnDestroy() {
        const body = this._document.body;
        const elWithFocus = this._elWithFocus;
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular(() => {
            setTimeout(() => elementToFocus.focus());
            this._elWithFocus = null;
        });
        this._closed$.next();
    }
}
NgbModalWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-window',
                host: {
                    '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                    'role': 'dialog',
                    'tabindex': '-1',
                    '[attr.aria-modal]': 'true',
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                    '[attr.aria-describedby]': 'ariaDescribedBy',
                },
                template: `
    <div #dialog [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +
     (scrollable ? ' modal-dialog-scrollable' : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `,
                encapsulation: ViewEncapsulation.None,
                styles: ["ngb-modal-window .component-host-scrollable{-ms-flex-direction:column;display:-ms-flexbox;display:flex;flex-direction:column;overflow:hidden}"]
            },] }
];
NgbModalWindow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: NgZone }
];
NgbModalWindow.propDecorators = {
    _dialogEl: [{ type: ViewChild, args: ['dialog', { static: true },] }],
    ariaLabelledBy: [{ type: Input }],
    ariaDescribedBy: [{ type: Input }],
    backdrop: [{ type: Input }],
    centered: [{ type: Input }],
    keyboard: [{ type: Input }],
    scrollable: [{ type: Input }],
    size: [{ type: Input }],
    windowClass: [{ type: Input }],
    dismissEvent: [{ type: Output, args: ['dismiss',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLXdpbmRvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQXFCNUQsTUFBTSxPQUFPLGNBQWM7SUFrQnpCLFlBQzhCLFNBQWMsRUFBVSxNQUErQixFQUFVLEtBQWE7UUFBOUUsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQWpCcEcsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0IsaUJBQVksR0FBbUIsSUFBSSxDQUFDLENBQUUsaURBQWlEO1FBTXRGLGFBQVEsR0FBcUIsSUFBSSxDQUFDO1FBRWxDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFLTixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFHMEQsQ0FBQztJQUVoSCxPQUFPLENBQUMsTUFBTSxJQUFV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QXNDTCxTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs2QkFFbEMsS0FBSzs4QkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUVMLE1BQU0sU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge2dldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHN9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1tb2RhbC13aW5kb3cnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnXCJtb2RhbCBmYWRlIHNob3cgZC1ibG9ja1wiICsgKHdpbmRvd0NsYXNzID8gXCIgXCIgKyB3aW5kb3dDbGFzcyA6IFwiXCIpJyxcbiAgICAncm9sZSc6ICdkaWFsb2cnLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ1thdHRyLmFyaWEtbW9kYWxdJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5JyxcbiAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnYXJpYURlc2NyaWJlZEJ5JyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICNkaWFsb2cgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKHNpemUgPyAnIG1vZGFsLScgKyBzaXplIDogJycpICsgKGNlbnRlcmVkID8gJyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnIDogJycpICtcbiAgICAgKHNjcm9sbGFibGUgPyAnIG1vZGFsLWRpYWxvZy1zY3JvbGxhYmxlJyA6ICcnKVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9tb2RhbC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxXaW5kb3cgaW1wbGVtZW50cyBPbkluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VsV2l0aEZvY3VzOiBFbGVtZW50IHwgbnVsbCA9IG51bGw7ICAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXG5cbiAgQFZpZXdDaGlsZCgnZGlhbG9nJywge3N0YXRpYzogdHJ1ZX0pIHByaXZhdGUgX2RpYWxvZ0VsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuICBASW5wdXQoKSBhcmlhRGVzY3JpYmVkQnk6IHN0cmluZztcbiAgQElucHV0KCkgYmFja2Ryb3A6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xuICBASW5wdXQoKSBjZW50ZXJlZDogc3RyaW5nO1xuICBASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XG4gIEBJbnB1dCgpIHNjcm9sbGFibGU6IHN0cmluZztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoKSB3aW5kb3dDbGFzczogc3RyaW5nO1xuXG4gIEBPdXRwdXQoJ2Rpc21pc3MnKSBkaXNtaXNzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuICBkaXNtaXNzKHJlYXNvbik6IHZvaWQgeyB0aGlzLmRpc21pc3NFdmVudC5lbWl0KHJlYXNvbik7IH1cblxuICBuZ09uSW5pdCgpIHsgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50OyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IHtuYXRpdmVFbGVtZW50fSA9IHRoaXMuX2VsUmVmO1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXG4gICAgICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4obmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksXG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlICYmIHRoaXMua2V5Ym9hcmQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuRVNDKSk7XG4gICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgLy8gV2UncmUgbGlzdGVuaW5nIHRvICdtb3VzZWRvd24nIGFuZCAnbW91c2V1cCcgdG8gcHJldmVudCBtb2RhbCBmcm9tIGNsb3Npbmcgd2hlbiBwcmVzc2luZyB0aGUgbW91c2VcbiAgICAgIC8vIGluc2lkZSB0aGUgbW9kYWwgZGlhbG9nIGFuZCByZWxlYXNpbmcgaXQgb3V0c2lkZVxuICAgICAgbGV0IHByZXZlbnRDbG9zZSA9IGZhbHNlO1xuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMuX2RpYWxvZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fY2xvc2VkJCksIHRhcCgoKSA9PiBwcmV2ZW50Q2xvc2UgPSBmYWxzZSksXG4gICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tRXZlbnQ8TW91c2VFdmVudD4obmF0aXZlRWxlbWVudCwgJ21vdXNldXAnKS5waXBlKHRha2VVbnRpbCh0aGlzLl9jbG9zZWQkKSwgdGFrZSgxKSkpLFxuICAgICAgICAgICAgICBmaWx0ZXIoKHt0YXJnZXR9KSA9PiBuYXRpdmVFbGVtZW50ID09PSB0YXJnZXQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4geyBwcmV2ZW50Q2xvc2UgPSB0cnVlOyB9KTtcblxuICAgICAgLy8gV2UncmUgbGlzdGVuaW5nIHRvICdjbGljaycgdG8gZGlzbWlzcyBtb2RhbCBvbiBtb2RhbCB3aW5kb3cgY2xpY2ssIGV4Y2VwdCB3aGVuOlxuICAgICAgLy8gMS4gY2xpY2tpbmcgb24gbW9kYWwgZGlhbG9nIGl0c2VsZlxuICAgICAgLy8gMi4gY2xvc2luZyB3YXMgcHJldmVudGVkIGJ5IG1vdXNlZG93bi91cCBoYW5kbGVyc1xuICAgICAgLy8gMy4gY2xpY2tpbmcgb24gc2Nyb2xsYmFyIHdoZW4gdGhlIHZpZXdwb3J0IGlzIHRvbyBzbWFsbCBhbmQgbW9kYWwgZG9lc24ndCBmaXQgKGNsaWNrIGlzIG5vdCB0cmlnZ2VyZWQgYXQgYWxsKVxuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdjbGljaycpLnBpcGUodGFrZVVudGlsKHRoaXMuX2Nsb3NlZCQpKS5zdWJzY3JpYmUoKHt0YXJnZXR9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tkcm9wID09PSB0cnVlICYmIG5hdGl2ZUVsZW1lbnQgPT09IHRhcmdldCAmJiAhcHJldmVudENsb3NlKSB7XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuQkFDS0RST1BfQ0xJQ0spKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2ZW50Q2xvc2UgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKCFuYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBhdXRvRm9jdXNhYmxlID0gbmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbbmdiQXV0b2ZvY3VzXWApIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3QgZmlyc3RGb2N1c2FibGUgPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKG5hdGl2ZUVsZW1lbnQpWzBdO1xuXG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9IGF1dG9Gb2N1c2FibGUgfHwgZmlyc3RGb2N1c2FibGUgfHwgbmF0aXZlRWxlbWVudDtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZWxXaXRoRm9jdXMgPSB0aGlzLl9lbFdpdGhGb2N1cztcblxuICAgIGxldCBlbGVtZW50VG9Gb2N1cztcbiAgICBpZiAoZWxXaXRoRm9jdXMgJiYgZWxXaXRoRm9jdXNbJ2ZvY3VzJ10gJiYgYm9keS5jb250YWlucyhlbFdpdGhGb2N1cykpIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gYm9keTtcbiAgICB9XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCkpO1xuICAgICAgdGhpcy5fZWxXaXRoRm9jdXMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==
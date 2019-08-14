/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable, Injector, RendererFactory2, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ngbFocusTrap } from '../util/focus-trap';
import { ContentRef } from '../util/popup';
import { ScrollBar } from '../util/scrollbar';
import { isDefined, isString } from '../util/util';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../util/scrollbar";
var NgbModalStack = /** @class */ (function () {
    function NgbModalStack(_applicationRef, _injector, _document, _scrollBar, _rendererFactory) {
        var _this = this;
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass'];
        this._windowCmpts = [];
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._windowCmpts.length) {
                /** @type {?} */
                var activeWindowCmpt = _this._windowCmpts[_this._windowCmpts.length - 1];
                ngbFocusTrap(activeWindowCmpt.location.nativeElement, _this._activeWindowCmptHasChanged);
                _this._revertAriaHidden();
                _this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        }));
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype.open = /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, options) {
        var _this = this;
        /** @type {?} */
        var containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
        /** @type {?} */
        var renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        var revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        var removeBodyClass = (/**
         * @return {?}
         */
        function () {
            if (!_this._modalRefs.length) {
                renderer.removeClass(_this._document.body, 'modal-open');
                _this._revertAriaHidden();
            }
        });
        if (!containerEl) {
            throw new Error("The specified modal container \"" + (options.container || 'body') + "\" was not found in the DOM.");
        }
        /** @type {?} */
        var activeModal = new NgbActiveModal();
        /** @type {?} */
        var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
        /** @type {?} */
        var backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        var windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        var ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (/**
         * @param {?} result
         * @return {?}
         */
        function (result) { ngbModalRef.close(result); });
        activeModal.dismiss = (/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) { ngbModalRef.dismiss(reason); });
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    };
    /**
     * @param {?=} reason
     * @return {?}
     */
    NgbModalStack.prototype.dismissAll = /**
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { this._modalRefs.forEach((/**
     * @param {?} ngbModalRef
     * @return {?}
     */
    function (ngbModalRef) { return ngbModalRef.dismiss(reason); })); };
    /**
     * @return {?}
     */
    NgbModalStack.prototype.hasOpenModals = /**
     * @return {?}
     */
    function () { return this._modalRefs.length > 0; };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    NgbModalStack.prototype._attachBackdrop = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    function (moduleCFR, containerEl) {
        /** @type {?} */
        var backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        var backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    NgbModalStack.prototype._attachWindowComponent = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    function (moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        var windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        var windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    };
    /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._applyWindowOptions = /**
     * @private
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    function (windowInstance, options) {
        this._windowAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        function (optionName) {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        }));
    };
    /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._applyBackdropOptions = /**
     * @private
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    function (backdropInstance, options) {
        this._backdropAttributes.forEach((/**
         * @param {?} optionName
         * @return {?}
         */
        function (optionName) {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        }));
    };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._getContentRef = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @param {?} options
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
        }
    };
    /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    NgbModalStack.prototype._createFromTemplateRef = /**
     * @private
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    function (content, activeModal) {
        /** @type {?} */
        var context = {
            $implicit: activeModal,
            close: /**
             * @param {?} result
             * @return {?}
             */
            function (result) { activeModal.close(result); },
            dismiss: /**
             * @param {?} reason
             * @return {?}
             */
            function (reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        var viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    NgbModalStack.prototype._createFromString = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var component = this._document.createTextNode("" + content);
        return new ContentRef([[component]]);
    };
    /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @param {?} options
     * @return {?}
     */
    NgbModalStack.prototype._createFromComponent = /**
     * @private
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @param {?} options
     * @return {?}
     */
    function (moduleCFR, contentInjector, content, context, options) {
        /** @type {?} */
        var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        var modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        var componentRef = contentCmptFactory.create(modalContentInjector);
        /** @type {?} */
        var componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            ((/** @type {?} */ (componentNativeEl))).classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    NgbModalStack.prototype._setAriaHidden = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        /** @type {?} */
        var parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((/**
             * @param {?} sibling
             * @return {?}
             */
            function (sibling) {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    _this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }));
            this._setAriaHidden(parent);
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgbModalStack.prototype._revertAriaHidden = /**
     * @private
     * @return {?}
     */
    function () {
        this._ariaHiddenValues.forEach((/**
         * @param {?} value
         * @param {?} element
         * @return {?}
         */
        function (value, element) {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        }));
        this._ariaHiddenValues.clear();
    };
    /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    NgbModalStack.prototype._registerModalRef = /**
     * @private
     * @param {?} ngbModalRef
     * @return {?}
     */
    function (ngbModalRef) {
        var _this = this;
        /** @type {?} */
        var unregisterModalRef = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = _this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                _this._modalRefs.splice(index, 1);
            }
        });
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    };
    /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    NgbModalStack.prototype._registerWindowCmpt = /**
     * @private
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    function (ngbWindowCmpt) {
        var _this = this;
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = _this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                _this._windowCmpts.splice(index, 1);
                _this._activeWindowCmptHasChanged.next();
            }
        }));
    };
    NgbModalStack.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    NgbModalStack.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: Injector },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ScrollBar },
        { type: RendererFactory2 }
    ]; };
    /** @nocollapse */ NgbModalStack.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i2.ScrollBar), i0.ɵɵinject(i0.RendererFactory2)); }, token: NgbModalStack, providedIn: "root" });
    return NgbModalStack;
}());
export { NgbModalStack };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._activeWindowCmptHasChanged;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._ariaHiddenValues;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._backdropAttributes;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._modalRefs;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._windowAttributes;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._windowCmpts;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._applicationRef;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._document;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._scrollBar;
    /**
     * @type {?}
     * @private
     */
    NgbModalStack.prototype._rendererFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc3RhY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFHZCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWxELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU5QztJQVVFLHVCQUNZLGVBQStCLEVBQVUsU0FBbUIsRUFBNEIsU0FBYyxFQUN0RyxVQUFxQixFQUFVLGdCQUFrQztRQUY3RSxpQkFZQztRQVhXLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBNEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUN0RyxlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVZyRSxnQ0FBMkIsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FB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O2dCQWxCcEYsU0FBUztnQkFQZixnQkFBZ0I7Ozt3QkFSbEI7Q0E4TkMsQUF4TUQsSUF3TUM7U0F2TVksYUFBYTs7Ozs7O0lBQ3hCLG9EQUFvRDs7Ozs7SUFDcEQsMENBQTREOzs7OztJQUM1RCw0Q0FBZ0Q7Ozs7O0lBQ2hELG1DQUF1Qzs7Ozs7SUFDdkMsMENBQ2dHOzs7OztJQUNoRyxxQ0FBMEQ7Ozs7O0lBR3RELHdDQUF1Qzs7Ozs7SUFBRSxrQ0FBMkI7Ozs7O0lBQUUsa0NBQXdDOzs7OztJQUM5RyxtQ0FBNkI7Ozs7O0lBQUUseUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtuZ2JGb2N1c1RyYXB9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQge0NvbnRlbnRSZWZ9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHtTY3JvbGxCYXJ9IGZyb20gJy4uL3V0aWwvc2Nyb2xsYmFyJztcbmltcG9ydCB7aXNEZWZpbmVkLCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQge05nYk1vZGFsT3B0aW9uc30gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHtOZ2JBY3RpdmVNb2RhbCwgTmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxTdGFjayB7XG4gIHByaXZhdGUgX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBfYXJpYUhpZGRlblZhbHVlczogTWFwPEVsZW1lbnQsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgX2JhY2tkcm9wQXR0cmlidXRlcyA9IFsnYmFja2Ryb3BDbGFzcyddO1xuICBwcml2YXRlIF9tb2RhbFJlZnM6IE5nYk1vZGFsUmVmW10gPSBbXTtcbiAgcHJpdmF0ZSBfd2luZG93QXR0cmlidXRlcyA9XG4gICAgICBbJ2FyaWFMYWJlbGxlZEJ5JywgJ2JhY2tkcm9wJywgJ2NlbnRlcmVkJywgJ2tleWJvYXJkJywgJ3Njcm9sbGFibGUnLCAnc2l6ZScsICd3aW5kb3dDbGFzcyddO1xuICBwcml2YXRlIF93aW5kb3dDbXB0czogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByaXZhdGUgX3Njcm9sbEJhcjogU2Nyb2xsQmFyLCBwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICAvLyBUcmFwIGZvY3VzIG9uIGFjdGl2ZSBXaW5kb3dDbXB0XG4gICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlV2luZG93Q21wdCA9IHRoaXMuX3dpbmRvd0NtcHRzW3RoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBuZ2JGb2N1c1RyYXAoYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCk7XG4gICAgICAgIHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcbiAgICAgICAgdGhpcy5fc2V0QXJpYUhpZGRlbihhY3RpdmVXaW5kb3dDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb3Blbihtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LCBvcHRpb25zKTogTmdiTW9kYWxSZWYge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsID1cbiAgICAgICAgaXNEZWZpbmVkKG9wdGlvbnMuY29udGFpbmVyKSA/IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpIDogdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcblxuICAgIGNvbnN0IHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIgPSB0aGlzLl9zY3JvbGxCYXIuY29tcGVuc2F0ZSgpO1xuICAgIGNvbnN0IHJlbW92ZUJvZHlDbGFzcyA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fbW9kYWxSZWZzLmxlbmd0aCkge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgICAgICB0aGlzLl9yZXZlcnRBcmlhSGlkZGVuKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghY29udGFpbmVyRWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNwZWNpZmllZCBtb2RhbCBjb250YWluZXIgXCIke29wdGlvbnMuY29udGFpbmVyIHx8ICdib2R5J31cIiB3YXMgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlTW9kYWwgPSBuZXcgTmdiQWN0aXZlTW9kYWwoKTtcbiAgICBjb25zdCBjb250ZW50UmVmID1cbiAgICAgICAgdGhpcy5fZ2V0Q29udGVudFJlZihtb2R1bGVDRlIsIG9wdGlvbnMuaW5qZWN0b3IgfHwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVNb2RhbCwgb3B0aW9ucyk7XG5cbiAgICBsZXQgYmFja2Ryb3BDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4gPVxuICAgICAgICBvcHRpb25zLmJhY2tkcm9wICE9PSBmYWxzZSA/IHRoaXMuX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUiwgY29udGFpbmVyRWwpIDogbnVsbDtcbiAgICBsZXQgd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRhaW5lckVsLCBjb250ZW50UmVmKTtcbiAgICBsZXQgbmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmID0gbmV3IE5nYk1vZGFsUmVmKHdpbmRvd0NtcHRSZWYsIGNvbnRlbnRSZWYsIGJhY2tkcm9wQ21wdFJlZiwgb3B0aW9ucy5iZWZvcmVEaXNtaXNzKTtcblxuICAgIHRoaXMuX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWYpO1xuICAgIHRoaXMuX3JlZ2lzdGVyV2luZG93Q21wdCh3aW5kb3dDbXB0UmVmKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyLCByZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZW1vdmVCb2R5Q2xhc3MsIHJlbW92ZUJvZHlDbGFzcyk7XG4gICAgYWN0aXZlTW9kYWwuY2xvc2UgPSAocmVzdWx0OiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuY2xvc2UocmVzdWx0KTsgfTtcbiAgICBhY3RpdmVNb2RhbC5kaXNtaXNzID0gKHJlYXNvbjogYW55KSA9PiB7IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKTsgfTtcblxuICAgIHRoaXMuX2FwcGx5V2luZG93T3B0aW9ucyh3aW5kb3dDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5fbW9kYWxSZWZzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoYmFja2Ryb3BDbXB0UmVmICYmIGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5fYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIG5nYk1vZGFsUmVmO1xuICB9XG5cbiAgZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHsgdGhpcy5fbW9kYWxSZWZzLmZvckVhY2gobmdiTW9kYWxSZWYgPT4gbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pKTsgfVxuXG4gIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID4gMDsgfVxuXG4gIHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250YWluZXJFbDogYW55KTogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+IHtcbiAgICBsZXQgYmFja2Ryb3BGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsQmFja2Ryb3ApO1xuICAgIGxldCBiYWNrZHJvcENtcHRSZWYgPSBiYWNrZHJvcEZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGJhY2tkcm9wQ21wdFJlZi5ob3N0Vmlldyk7XG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiBiYWNrZHJvcENtcHRSZWY7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2hXaW5kb3dDb21wb25lbnQobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnksIGNvbnRlbnRSZWY6IGFueSk6XG4gICAgICBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+IHtcbiAgICBsZXQgd2luZG93RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbFdpbmRvdyk7XG4gICAgbGV0IHdpbmRvd0NtcHRSZWYgPSB3aW5kb3dGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3RvciwgY29udGVudFJlZi5ub2Rlcyk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh3aW5kb3dDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh3aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiB3aW5kb3dDbXB0UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0luc3RhbmNlOiBOZ2JNb2RhbFdpbmRvdywgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fd2luZG93QXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcbiAgICAgICAgd2luZG93SW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BJbnN0YW5jZTogTmdiTW9kYWxCYWNrZHJvcCwgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3BBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuICAgICAgICBiYWNrZHJvcEluc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LCBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwsXG4gICAgICBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMpOiBDb250ZW50UmVmIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudCwgYWN0aXZlTW9kYWwpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbUNvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRlbnRJbmplY3RvciwgY29udGVudCwgYWN0aXZlTW9kYWwsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21UZW1wbGF0ZVJlZihjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+LCBhY3RpdmVNb2RhbDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgJGltcGxpY2l0OiBhY3RpdmVNb2RhbCxcbiAgICAgIGNsb3NlKHJlc3VsdCkgeyBhY3RpdmVNb2RhbC5jbG9zZShyZXN1bHQpOyB9LFxuICAgICAgZGlzbWlzcyhyZWFzb24pIHsgYWN0aXZlTW9kYWwuZGlzbWlzcyhyZWFzb24pOyB9XG4gICAgfTtcbiAgICBjb25zdCB2aWV3UmVmID0gY29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tU3RyaW5nKGNvbnRlbnQ6IHN0cmluZyk6IENvbnRlbnRSZWYge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke2NvbnRlbnR9YCk7XG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50XV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbUNvbXBvbmVudChcbiAgICAgIG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250ZW50SW5qZWN0b3I6IEluamVjdG9yLCBjb250ZW50OiBhbnksIGNvbnRleHQ6IE5nYkFjdGl2ZU1vZGFsLFxuICAgICAgb3B0aW9uczogTmdiTW9kYWxPcHRpb25zKTogQ29udGVudFJlZiB7XG4gICAgY29uc3QgY29udGVudENtcHRGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbnRlbnQpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudEluamVjdG9yID1cbiAgICAgICAgSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IFt7cHJvdmlkZTogTmdiQWN0aXZlTW9kYWwsIHVzZVZhbHVlOiBjb250ZXh0fV0sIHBhcmVudDogY29udGVudEluamVjdG9yfSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gY29udGVudENtcHRGYWN0b3J5LmNyZWF0ZShtb2RhbENvbnRlbnRJbmplY3Rvcik7XG4gICAgY29uc3QgY29tcG9uZW50TmF0aXZlRWwgPSBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBpZiAob3B0aW9ucy5zY3JvbGxhYmxlKSB7XG4gICAgICAoY29tcG9uZW50TmF0aXZlRWwgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ2NvbXBvbmVudC1ob3N0LXNjcm9sbGFibGUnKTtcbiAgICB9XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIC8vIEZJWE1FOiB3ZSBzaG91bGQgaGVyZSBnZXQgcmlkIG9mIHRoZSBjb21wb25lbnQgbmF0aXZlRWxlbWVudFxuICAgIC8vIGFuZCB1c2UgYFtBcnJheS5mcm9tKGNvbXBvbmVudE5hdGl2ZUVsLmNoaWxkTm9kZXMpXWAgaW5zdGVhZCBhbmQgcmVtb3ZlIHRoZSBhYm92ZSBDU1MgY2xhc3MuXG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50TmF0aXZlRWxdXSwgY29tcG9uZW50UmVmLmhvc3RWaWV3LCBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QXJpYUhpZGRlbihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChwYXJlbnQgJiYgZWxlbWVudCAhPT0gdGhpcy5fZG9jdW1lbnQuYm9keSkge1xuICAgICAgQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgIGlmIChzaWJsaW5nICE9PSBlbGVtZW50ICYmIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTQ1JJUFQnKSB7XG4gICAgICAgICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5zZXQoc2libGluZywgc2libGluZy5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykpO1xuICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9zZXRBcmlhSGlkZGVuKHBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmV2ZXJ0QXJpYUhpZGRlbigpIHtcbiAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLmZvckVhY2goKHZhbHVlLCBlbGVtZW50KSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYpIHtcbiAgICBjb25zdCB1bnJlZ2lzdGVyTW9kYWxSZWYgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21vZGFsUmVmcy5pbmRleE9mKG5nYk1vZGFsUmVmKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuX21vZGFsUmVmcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fbW9kYWxSZWZzLnB1c2gobmdiTW9kYWxSZWYpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHVucmVnaXN0ZXJNb2RhbFJlZiwgdW5yZWdpc3Rlck1vZGFsUmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyV2luZG93Q21wdChuZ2JXaW5kb3dDbXB0OiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+KSB7XG4gICAgdGhpcy5fd2luZG93Q21wdHMucHVzaChuZ2JXaW5kb3dDbXB0KTtcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG5cbiAgICBuZ2JXaW5kb3dDbXB0Lm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3dpbmRvd0NtcHRzLmluZGV4T2YobmdiV2luZG93Q21wdCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLl93aW5kb3dDbXB0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
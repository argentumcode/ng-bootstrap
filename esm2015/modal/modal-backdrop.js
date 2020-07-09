import { Component, Input, ViewEncapsulation } from '@angular/core';
export class NgbModalBackdrop {
}
NgbModalBackdrop.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-backdrop',
                encapsulation: ViewEncapsulation.None,
                template: '',
                host: { '[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050' }
            },] }
];
NgbModalBackdrop.propDecorators = {
    backdropClass: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kYWwvbW9kYWwtYmFja2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFTbEUsTUFBTSxPQUFPLGdCQUFnQjs7O1lBUDVCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxFQUNBLEVBQUMsU0FBUyxFQUFFLHlFQUF5RSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUM7YUFDckg7Ozs0QkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1tb2RhbC1iYWNrZHJvcCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiAnJyxcbiAgaG9zdDpcbiAgICAgIHsnW2NsYXNzXSc6ICdcIm1vZGFsLWJhY2tkcm9wIGZhZGUgc2hvd1wiICsgKGJhY2tkcm9wQ2xhc3MgPyBcIiBcIiArIGJhY2tkcm9wQ2xhc3MgOiBcIlwiKScsICdzdHlsZSc6ICd6LWluZGV4OiAxMDUwJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxCYWNrZHJvcCB7XG4gIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M6IHN0cmluZztcbn1cbiJdfQ==
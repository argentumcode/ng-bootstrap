import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious } from './pagination';
export { NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious } from './pagination';
export { NgbPaginationConfig } from './pagination-config';
const DIRECTIVES = [
    NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber,
    NgbPaginationPrevious
];
export class NgbPaginationModule {
}
NgbPaginationModule.decorators = [
    { type: NgModule, args: [{ declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule] },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3RCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFDTCxhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDdEIsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxVQUFVLEdBQUc7SUFDakIsYUFBYSxFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQjtJQUNuSCxxQkFBcUI7Q0FDdEIsQ0FBQztBQUdGLE1BQU0sT0FBTyxtQkFBbUI7OztZQUQvQixRQUFRLFNBQUMsRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBOZ2JQYWdpbmF0aW9uLFxuICBOZ2JQYWdpbmF0aW9uRWxsaXBzaXMsXG4gIE5nYlBhZ2luYXRpb25GaXJzdCxcbiAgTmdiUGFnaW5hdGlvbkxhc3QsXG4gIE5nYlBhZ2luYXRpb25OZXh0LFxuICBOZ2JQYWdpbmF0aW9uTnVtYmVyLFxuICBOZ2JQYWdpbmF0aW9uUHJldmlvdXNcbn0gZnJvbSAnLi9wYWdpbmF0aW9uJztcblxuZXhwb3J0IHtcbiAgTmdiUGFnaW5hdGlvbixcbiAgTmdiUGFnaW5hdGlvbkVsbGlwc2lzLFxuICBOZ2JQYWdpbmF0aW9uRmlyc3QsXG4gIE5nYlBhZ2luYXRpb25MYXN0LFxuICBOZ2JQYWdpbmF0aW9uTmV4dCxcbiAgTmdiUGFnaW5hdGlvbk51bWJlcixcbiAgTmdiUGFnaW5hdGlvblByZXZpb3VzXG59IGZyb20gJy4vcGFnaW5hdGlvbic7XG5leHBvcnQge05nYlBhZ2luYXRpb25Db25maWd9IGZyb20gJy4vcGFnaW5hdGlvbi1jb25maWcnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBOZ2JQYWdpbmF0aW9uLCBOZ2JQYWdpbmF0aW9uRWxsaXBzaXMsIE5nYlBhZ2luYXRpb25GaXJzdCwgTmdiUGFnaW5hdGlvbkxhc3QsIE5nYlBhZ2luYXRpb25OZXh0LCBOZ2JQYWdpbmF0aW9uTnVtYmVyLFxuICBOZ2JQYWdpbmF0aW9uUHJldmlvdXNcbl07XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBESVJFQ1RJVkVTLCBleHBvcnRzOiBESVJFQ1RJVkVTLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbk1vZHVsZSB7XG59XG4iXX0=
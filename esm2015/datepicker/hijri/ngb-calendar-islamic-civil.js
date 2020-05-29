import { __decorate } from "tslib";
import { NgbCalendarHijri } from './ngb-calendar-hijri';
import { NgbDate } from '../ngb-date';
import { Injectable } from '@angular/core';
/**
 * Checks if islamic year is a leap year
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 */
function isGregorianLeapYear(gDate) {
    const year = gDate.getFullYear();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 */
const GREGORIAN_EPOCH = 1721425.5;
const ISLAMIC_EPOCH = 1948439.5;
let NgbCalendarIslamicCivil = class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     */
    fromGregorian(gDate) {
        const gYear = gDate.getFullYear(), gMonth = gDate.getMonth(), gDay = gDate.getDate();
        let julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        const days = julianDay - ISLAMIC_EPOCH;
        const hYear = Math.floor((30 * days + 10646) / 10631.0);
        let hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        const hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    }
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     */
    toGregorian(hDate) {
        const hYear = hDate.year;
        const hMonth = hDate.month - 1;
        const hDay = hDate.day;
        const julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        const wjd = Math.floor(julianDay - 0.5) + 0.5, depoch = wjd - GREGORIAN_EPOCH, quadricent = Math.floor(depoch / 146097), dqc = mod(depoch, 146097), cent = Math.floor(dqc / 36524), dcent = mod(dqc, 36524), quad = Math.floor(dcent / 1461), dquad = mod(dcent, 1461), yindex = Math.floor(dquad / 365);
        let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        const gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        const yearday = wjd - gYearStart;
        const tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
        const leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
        const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        const tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                1);
        const day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    }
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    getDaysPerMonth(month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        let length = 29 + month % 2;
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    }
};
NgbCalendarIslamicCivil = __decorate([
    Injectable()
], NgbCalendarIslamicCivil);
export { NgbCalendarIslamicCivil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6Qzs7R0FFRztBQUNILFNBQVMsaUJBQWlCLENBQUMsS0FBYTtJQUN0QyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsbUJBQW1CLENBQUMsS0FBVztJQUN0QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsb0JBQW9CLENBQUMsS0FBYSxFQUFFLE1BQWM7SUFDekQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDNUYsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsbUJBQW1CLENBQUMsSUFBWTtJ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U0FBUyxHQUNYLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUVoSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLEdBQUcsR0FBRyxlQUFlLEVBQ3ZFLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQ25HLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFDbEYsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUM3RCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNqQyxJQUFJLEVBQUUsQ0FBQztTQUNSO1FBRUQsTUFBTSxVQUFVLEdBQUcsZUFBZSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzdHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFakMsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVwSCxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNqRSxNQUFNLElBQUksR0FBRyxlQUFlLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQ04sQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RyxDQUFDLENBQUMsQ0FBQztRQUVYLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxlQUFlLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDekMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNyQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLE1BQU0sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQTlFWSx1QkFBdUI7SUFEbkMsVUFBVSxFQUFFO0dBQ0EsdUJBQXVCLENBOEVuQztTQTlFWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkNhbGVuZGFySGlqcml9IGZyb20gJy4vbmdiLWNhbGVuZGFyLWhpanJpJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDaGVja3MgaWYgaXNsYW1pYyB5ZWFyIGlzIGEgbGVhcCB5ZWFyXG4gKi9cbmZ1bmN0aW9uIGlzSXNsYW1pY0xlYXBZZWFyKGhZZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICgxNCArIDExICogaFllYXIpICUgMzAgPCAxMTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgZ3JlZ29yaWFuIHllYXJzIGlzIGEgbGVhcCB5ZWFyXG4gKi9cbmZ1bmN0aW9uIGlzR3JlZ29yaWFuTGVhcFllYXIoZ0RhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgY29uc3QgeWVhciA9IGdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDA7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgSGlqcmkgTW9udGguXG4gKiBgaE1vbnRoYCBpcyAwIGZvciBNdWhhcnJhbSwgMSBmb3IgU2FmYXIsIGV0Yy5cbiAqIGBoWWVhcmAgaXMgYW55IEhpanJpIGhZZWFyLlxuICovXG5mdW5jdGlvbiBnZXRJc2xhbWljTW9udGhTdGFydChoWWVhcjogbnVtYmVyLCBoTW9udGg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmNlaWwoMjkuNSAqIGhNb250aCkgKyAoaFllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIGhZZWFyKSAvIDMwLjApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIEhpanJpIHllYXIuXG4gKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXG4gKi9cbmZ1bmN0aW9uIGdldElzbGFtaWNZZWFyU3RhcnQoeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuICh5ZWFyIC0gMSkgKiAzNTQgKyBNYXRoLmZsb29yKCgzICsgMTEgKiB5ZWFyKSAvIDMwLjApO1xufVxuXG5mdW5jdGlvbiBtb2QoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gYSAtIGIgKiBNYXRoLmZsb29yKGEgLyBiKTtcbn1cblxuLyoqXG4gKiBUaGUgY2l2aWwgY2FsZW5kYXIgaXMgb25lIHR5cGUgb2YgSGlqcmkgY2FsZW5kYXJzIHVzZWQgaW4gaXNsYW1pYyBjb3VudHJpZXMuXG4gKiBVc2VzIGEgZml4ZWQgY3ljbGUgb2YgYWx0ZXJuYXRpbmcgMjktIGFuZCAzMC1kYXkgbW9udGhzLFxuICogd2l0aCBhIGxlYXAgZGF5IGFkZGVkIHRvIHRoZSBsYXN0IG1vbnRoIG9mIDExIG91dCBvZiBldmVyeSAzMCB5ZWFycy5cbiAqIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL2RldmVsb3BtZW50L2RldmVsb3BtZW50LXByb2Nlc3MvZGVzaWduLXByb3Bvc2Fscy9pc2xhbWljLWNhbGVuZGFyLXR5cGVzXG4gKiBBbGwgdGhlIGNhbGN1bGF0aW9ucyBoZXJlIGFyZSBiYXNlZCBvbiB0aGUgZXF1YXRpb25zIGZyb20gXCJDYWxlbmRyaWNhbCBDYWxjdWxhdGlvbnNcIiBCeSBFZHdhcmQgTS4gUmVpbmdvbGQsIE5hY2h1bVxuICogRGVyc2hvd2l0ei5cbiAqL1xuXG5jb25zdCBHUkVHT1JJQU5fRVBPQ0ggPSAxNzIxNDI1LjU7XG5jb25zdCBJU0xBTUlDX0VQT0NIID0gMTk0ODQzOS41O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwgZXh0ZW5kcyBOZ2JDYWxlbmRhckhpanJpIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgaXNsYW1pYyhjaXZpbCkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICAgKiBgZ0RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXG4gICAqL1xuICBmcm9tR3JlZ29yaWFuKGdEYXRlOiBEYXRlKTogTmdiRGF0ZSB7XG4gICAgY29uc3QgZ1llYXIgPSBnRGF0ZS5nZXRGdWxsWWVhcigpLCBnTW9udGggPSBnRGF0ZS5nZXRNb250aCgpLCBnRGF5ID0gZ0RhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgbGV0IGp1bGlhbkRheSA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoZ1llYXIgLSAxKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0KSArXG4gICAgICAgIC1NYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcbiAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICgzNjcgKiAoZ01vbnRoICsgMSkgLSAzNjIpIC8gMTIgKyAoZ01vbnRoICsgMSA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIoZ0RhdGUpID8gLTEgOiAtMikgKyBnRGF5KTtcbiAgICBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhbkRheSkgKyAwLjU7XG5cbiAgICBjb25zdCBkYXlzID0ganVsaWFuRGF5IC0gSVNMQU1JQ19FUE9DSDtcbiAgICBjb25zdCBoWWVhciA9IE1hdGguZmxvb3IoKDMwICogZGF5cyArIDEwNjQ2KSAvIDEwNjMxLjApO1xuICAgIGxldCBoTW9udGggPSBNYXRoLmNlaWwoKGRheXMgLSAyOSAtIGdldElzbGFtaWNZZWFyU3RhcnQoaFllYXIpKSAvIDI5LjUpO1xuICAgIGhNb250aCA9IE1hdGgubWluKGhNb250aCwgMTEpO1xuICAgIGNvbnN0IGhEYXkgPSBNYXRoLmNlaWwoZGF5cyAtIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyLCBoTW9udGgpKSArIDE7XG4gICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGggKyAxLCBoRGF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IEpTIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBpc2xhbWljKGNpdmlsKSBkYXRlLlxuICAgKiBgaERhdGVgIGlzIGFuIGlzbGFtaWMoY2l2aWwpIGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cbiAgICovXG4gIHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgaFllYXIgPSBoRGF0ZS55ZWFyO1xuICAgIGNvbnN0IGhNb250aCA9IGhEYXRlLm1vbnRoIC0gMTtcbiAgICBjb25zdCBoRGF5ID0gaERhdGUuZGF5O1xuICAgIGNvbnN0IGp1bGlhbkRheSA9XG4gICAgICAgIGhEYXkgKyBNYXRoLmNlaWwoMjkuNSAqIGhNb250aCkgKyAoaFllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIGhZZWFyKSAvIDMwKSArIElTTEFNSUNfRVBPQ0ggLSAxO1xuXG4gICAgY29uc3Qgd2pkID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgLSAwLjUpICsgMC41LCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0gsXG4gICAgICAgICAgcXVhZHJpY2VudCA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTQ2MDk3KSwgZHFjID0gbW9kKGRlcG9jaCwgMTQ2MDk3KSwgY2VudCA9IE1hdGguZmxvb3IoZHFjIC8gMzY1MjQpLFxuICAgICAgICAgIGRjZW50ID0gbW9kKGRxYywgMzY1MjQpLCBxdWFkID0gTWF0aC5mbG9vcihkY2VudCAvIDE0NjEpLCBkcXVhZCA9IG1vZChkY2VudCwgMTQ2MSksXG4gICAgICAgICAgeWluZGV4ID0gTWF0aC5mbG9vcihkcXVhZCAvIDM2NSk7XG4gICAgbGV0IHllYXIgPSBxdWFkcmljZW50ICogNDAwICsgY2VudCAqIDEwMCArIHF1YWQgKiA0ICsgeWluZGV4O1xuICAgIGlmICghKGNlbnQgPT09IDQgfHwgeWluZGV4ID09PSA0KSkge1xuICAgICAgeWVhcisrO1xuICAgIH1cblxuICAgIGNvbnN0IGdZZWFyU3RhcnQgPSBHUkVHT1JJQU5fRVBPQ0ggKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcbiAgICAgICAgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKTtcblxuICAgIGNvbnN0IHllYXJkYXkgPSB3amQgLSBnWWVhclN0YXJ0O1xuXG4gICAgY29uc3QgdGpkID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KSAtIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApICsgTWF0aC5mbG9vcig3MzkgLyAxMiArIChpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IC0xIDogLTIpICsgMSk7XG5cbiAgICBjb25zdCBsZWFwYWRqID0gd2pkIDwgdGpkID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIobmV3IERhdGUoeWVhciwgMywgMSkpID8gMSA6IDI7XG5cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKCh5ZWFyZGF5ICsgbGVhcGFkaikgKiAxMiArIDM3MykgLyAzNjcpO1xuICAgIGNvbnN0IHRqZDIgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKHllYXIgLSAxKSArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpIC0gTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSArXG4gICAgICAgIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgKDM2NyAqIG1vbnRoIC0gMzYyKSAvIDEyICsgKG1vbnRoIDw9IDIgPyAwIDogaXNHcmVnb3JpYW5MZWFwWWVhcihuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIDEpKSA/IC0xIDogLTIpICtcbiAgICAgICAgICAgIDEpO1xuXG4gICAgY29uc3QgZGF5ID0gd2pkIC0gdGpkMiArIDE7XG5cbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgbW9udGguXG4gICAqIGBtb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXG4gICAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cbiAgICovXG4gIGdldERheXNQZXJNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHllYXIgPSB5ZWFyICsgTWF0aC5mbG9vcihtb250aCAvIDEzKTtcbiAgICBtb250aCA9ICgobW9udGggLSAxKSAlIDEyKSArIDE7XG4gICAgbGV0IGxlbmd0aCA9IDI5ICsgbW9udGggJSAyO1xuICAgIGlmIChtb250aCA9PT0gMTIgJiYgaXNJc2xhbWljTGVhcFllYXIoeWVhcikpIHtcbiAgICAgIGxlbmd0aCsrO1xuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xuICB9XG59XG4iXX0=
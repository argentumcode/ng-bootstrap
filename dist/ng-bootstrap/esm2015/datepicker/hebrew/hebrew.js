/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgbDate } from '../ngb-date';
/** @type {?} */
const PARTS_PER_HOUR = 1080;
/** @type {?} */
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
/** @type {?} */
const PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
/** @type {?} */
const PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
/** @type {?} */
const BAHARAD = 11 * PARTS_PER_HOUR + 204;
/** @type {?} */
const HEBREW_DAY_ON_JAN_1_1970 = 2092591;
/** @type {?} */
const GREGORIAN_EPOCH = 1721425.5;
/**
 * @param {?} year
 * @return {?}
 */
function isGregorianLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * @param {?} year
 * @return {?}
 */
function numberOfFirstDayInYear(year) {
    /** @type {?} */
    let monthsBeforeYear = Math.floor((235 * year - 234) / 19);
    /** @type {?} */
    let fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
    /** @type {?} */
    let dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
    /** @type {?} */
    let timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
    /** @type {?} */
    let dayOfWeek = dayNumber % 7;
    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        dayNumber++;
        dayOfWeek = dayNumber % 7;
    }
    if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
        dayNumber += 2;
    }
    else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
        dayNumber++;
    }
    return dayNumber;
}
/**
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInGregorianMonth(month, year) {
    /** @type {?} */
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isGregorianLeapYear(year)) {
        days[1]++;
    }
    return days[month - 1];
}
/**
 * @param {?} year
 * @return {?}
 */
function getHebrewMonths(year) {
    return isHebrewLeapYear(year) ? 13 : 12;
}
/**
 * Returns the number of days in a specific Hebrew year.
 * `year` is any Hebrew year.
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewYear(year) {
    return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
}
/**
 * @param {?} year
 * @return {?}
 */
export function isHebrewLeapYear(year) {
    /** @type {?} */
    let b = (year * 12 + 17) % 19;
    return b >= ((b < 0) ? -7 : 12);
}
/**
 * Returns the number of days in a specific Hebrew month.
 * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
 * `year` is any Hebrew year.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
export function getDaysInHebrewMonth(month, year) {
    /** @type {?} */
    let yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    /** @type {?} */
    let yearType = (yearLength <= 380 ? yearLength : (yearLength - 30)) - 353;
    /** @type {?} */
    let leapYear = isHebrewLeapYear(year);
    /** @type {?} */
    let daysInMonth = leapYear ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29] :
        [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    if (yearType > 0) {
        daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
    }
    if (yearType > 1) {
        daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
    }
    return daysInMonth[month - 1];
}
/**
 * @param {?} date
 * @return {?}
 */
export function getDayNumberInHebrewYear(date) {
    /** @type {?} */
    let numberOfDay = 0;
    for (let i = 1; i < date.month; i++) {
        numberOfDay += getDaysInHebrewMonth(i, date.year);
    }
    return numberOfDay + date.day;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
export function setHebrewMonth(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getHebrewMonths(date.year) - date.month) {
                val -= getHebrewMonths(date.year) - date.month + 1;
                date.year++;
                date.month = 1;
            }
            else {
                date.month += val;
                val = 0;
            }
        }
        else {
            if (val >= date.month) {
                date.year--;
                val -= date.month;
                date.month = getHebrewMonths(date.year);
            }
            else {
                date.month -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
export function setHebrewDay(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                date.year++;
                date.month = 1;
                date.day = 1;
            }
            else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                date.month++;
                date.day = 1;
            }
            else {
                date.day += val;
                val = 0;
            }
        }
        else {
            if (val >= date.day) {
                val -= date.day;
                date.month--;
                if (date.month === 0) {
                    date.year--;
                    date.month = getHebrewMonths(date.year);
                }
                date.day = getDaysInHebrewMonth(date.month, date.year);
            }
            else {
                date.day -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * Returns the equivalent Hebrew date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Hebrew date.
 * @param {?} gdate
 * @return {?}
 */
export function fromGregorian(gdate) {
    /** @type {?} */
    const date = new Date(gdate);
    /** @type {?} */
    const gYear = date.getFullYear();
    /** @type {?} */
    const gMonth = date.getMonth();
    /** @type {?} */
    const gDay = date.getDate();
    /** @type {?} */
    let julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) -
        Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
        Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gYear) ? -1 : -2) + gDay);
    julianDay = Math.floor(julianDay + 0.5);
    /** @type {?} */
    let daysSinceHebEpoch = julianDay - 347997;
    /** @type {?} */
    let monthsSinceHebEpoch = Math.floor(daysSinceHebEpoch * PARTS_PER_DAY / PARTS_PER_MONTH);
    /** @type {?} */
    let hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
    /** @type {?} */
    let firstDayOfThisYear = numberOfFirstDayInYear(hYear);
    /** @type {?} */
    let dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    while (dayOfYear < 1) {
        hYear--;
        firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    }
    /** @type {?} */
    let hMonth = 1;
    /** @type {?} */
    let hDay = dayOfYear;
    while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
        hDay -= getDaysInHebrewMonth(hMonth, hYear);
        hMonth++;
    }
    return new NgbDate(hYear, hMonth, hDay);
}
/**
 * Returns the equivalent JS date value for a given Hebrew date.
 * `hebrewDate` is an Hebrew date to be converted to Gregorian.
 * @param {?} hebrewDate
 * @return {?}
 */
export function toGregorian(hebrewDate) {
    /** @type {?} */
    const hYear = hebrewDate.year;
    /** @type {?} */
    const hMonth = hebrewDate.month;
    /** @type {?} */
    const hDay = hebrewDate.day;
    /** @type {?} */
    let days = numberOfFirstDayInYear(hYear);
    for (let i = 1; i < hMonth; i++) {
        days += getDaysInHebrewMonth(i, hYear);
    }
    days += hDay;
    /** @type {?} */
    let diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
    /** @type {?} */
    let after = diffDays >= 0;
    if (!after) {
        diffDays = -diffDays;
    }
    /** @type {?} */
    let gYear = 1970;
    /** @type {?} */
    let gMonth = 1;
    /** @type {?} */
    let gDay = 1;
    while (diffDays > 0) {
        if (after) {
            if (diffDays >= (isGregorianLeapYear(gYear) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear(gYear) ? 366 : 365;
                gYear++;
            }
            else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                gMonth++;
            }
            else {
                gDay += diffDays;
                diffDays = 0;
            }
        }
        else {
            if (diffDays >= (isGregorianLeapYear(gYear - 1) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear(gYear - 1) ? 366 : 365;
                gYear--;
            }
            else {
                if (gMonth > 1) {
                    gMonth--;
                }
                else {
                    gMonth = 12;
                    gYear--;
                }
                if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                }
                else {
                    gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                    diffDays = 0;
                }
            }
        }
    }
    return new Date(gYear, gMonth - 1, gDay);
}
/**
 * @param {?} numerals
 * @return {?}
 */
export function hebrewNumerals(numerals) {
    if (!numerals) {
        return '';
    }
    /** @type {?} */
    const hArray0_9 = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d5', '\u05d6', '\u05d7', '\u05d8'];
    /** @type {?} */
    const hArray10_19 = [
        '\u05d9', '\u05d9\u05d0', '\u05d9\u05d1', '\u05d9\u05d2', '\u05d9\u05d3', '\u05d8\u05d5', '\u05d8\u05d6',
        '\u05d9\u05d6', '\u05d9\u05d7', '\u05d9\u05d8'
    ];
    /** @type {?} */
    const hArray20_90 = ['', '', '\u05db', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e4', '\u05e6'];
    /** @type {?} */
    const hArray100_900 = [
        '', '\u05e7', '\u05e8', '\u05e9', '\u05ea', '\u05ea\u05e7', '\u05ea\u05e8', '\u05ea\u05e9', '\u05ea\u05ea',
        '\u05ea\u05ea\u05e7'
    ];
    /** @type {?} */
    const hArray1000_9000 = [
        '', '\u05d0', '\u05d1', '\u05d1\u05d0', '\u05d1\u05d1', '\u05d4', '\u05d4\u05d0', '\u05d4\u05d1',
        '\u05d4\u05d1\u05d0', '\u05d4\u05d1\u05d1'
    ];
    /** @type {?} */
    const geresh = '\u05f3';
    /** @type {?} */
    const gershaim = '\u05f4';
    /** @type {?} */
    let mem = 0;
    /** @type {?} */
    let result = [];
    /** @type {?} */
    let step = 0;
    while (numerals > 0) {
        /** @type {?} */
        let m = numerals % 10;
        if (step === 0) {
            mem = m;
        }
        else if (step === 1) {
            if (m !== 1) {
                result.unshift(hArray20_90[m], hArray0_9[mem]);
            }
            else {
                result.unshift(hArray10_19[mem]);
            }
        }
        else if (step === 2) {
            result.unshift(hArray100_900[m]);
        }
        else {
            if (m !== 5) {
                result.unshift(hArray1000_9000[m], geresh, ' ');
            }
            break;
        }
        numerals = Math.floor(numerals / 10);
        if (step === 0 && numerals === 0) {
            result.unshift(hArray0_9[m]);
        }
        step++;
    }
    result = result.join('').split('');
    if (result.length === 1) {
        result.push(geresh);
    }
    else if (result.length > 1) {
        result.splice(result.length - 1, 0, gershaim);
    }
    return result.join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVicmV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2hlYnJldy9oZWJyZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7O01BRzlCLGNBQWMsR0FBRyxJQUFJOztNQUNyQixhQUFhLEdBQUcsRUFBRSxHQUFHLGNBQWM7O01BQ25DLHNCQUFzQixHQUFHLEVBQUUsR0FBRyxjQUFjLEdBQUcsR0FBRzs7TUFDbEQsZUFBZSxHQUFHLEVBQUUsR0FBRyxhQUFhLEdBQUcsc0JBQXNCOztNQUM3RCxPQUFPLEdBQUcsRUFBRSxHQUFHLGNBQWMsR0FBRyxHQUFHOztNQUNuQyx3QkFBd0IsR0FBRyxPQUFPOztNQUNsQyxlQUFlLEdBQUcsU0FBUzs7Ozs7QUFFakMsU0FBUyxtQkFBbUIsQ0FBQyxJQUFZO0lBQ3ZDLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDaEUsQ0FBQzs7Ozs7QUFFRCxTQUFTLHNCQUFzQixDQUFDLElBQVk7O1FBQ3RDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7UUFDdEQsMEJBQTBCLEdBQUcsZ0JBQWdCLEdBQUcsc0JBQXNCLEdBQUcsT0FBTzs7UUFDaEYsU0FBUyxHQUFHLGdCQUFnQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixHQUFHLGFBQWEsQ0FBQzs7UUFDMUYsU0FBUyxHQUFHLDBCQUEwQixHQUFHLGFBQWE7O1FBRXRELFNBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQztJQUU3QixJQUFJLFNBQVMsS0FBSyxD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QUFJLEVBQUUsQ0FBQztLQUNSO0lBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQjtTQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDL0M7SUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG5jb25zdCBQQVJUU19QRVJfSE9VUiA9IDEwODA7XG5jb25zdCBQQVJUU19QRVJfREFZID0gMjQgKiBQQVJUU19QRVJfSE9VUjtcbmNvbnN0IFBBUlRTX0ZSQUNUSU9OQUxfTU9OVEggPSAxMiAqIFBBUlRTX1BFUl9IT1VSICsgNzkzO1xuY29uc3QgUEFSVFNfUEVSX01PTlRIID0gMjkgKiBQQVJUU19QRVJfREFZICsgUEFSVFNfRlJBQ1RJT05BTF9NT05USDtcbmNvbnN0IEJBSEFSQUQgPSAxMSAqIFBBUlRTX1BFUl9IT1VSICsgMjA0O1xuY29uc3QgSEVCUkVXX0RBWV9PTl9KQU5fMV8xOTcwID0gMjA5MjU5MTtcbmNvbnN0IEdSRUdPUklBTl9FUE9DSCA9IDE3MjE0MjUuNTtcblxuZnVuY3Rpb24gaXNHcmVnb3JpYW5MZWFwWWVhcih5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbn1cblxuZnVuY3Rpb24gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgbW9udGhzQmVmb3JlWWVhciA9IE1hdGguZmxvb3IoKDIzNSAqIHllYXIgLSAyMzQpIC8gMTkpO1xuICBsZXQgZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgPSBtb250aHNCZWZvcmVZZWFyICogUEFSVFNfRlJBQ1RJT05BTF9NT05USCArIEJBSEFSQUQ7XG4gIGxldCBkYXlOdW1iZXIgPSBtb250aHNCZWZvcmVZZWFyICogMjkgKyBNYXRoLmZsb29yKGZyYWN0aW9uYWxNb250aHNCZWZvcmVZZWFyIC8gUEFSVFNfUEVSX0RBWSk7XG4gIGxldCB0aW1lT2ZEYXkgPSBmcmFjdGlvbmFsTW9udGhzQmVmb3JlWWVhciAlIFBBUlRTX1BFUl9EQVk7XG5cbiAgbGV0IGRheU9mV2VlayA9IGRheU51bWJlciAlIDc7ICAvLyAwID09IE1vbmRheVxuXG4gIGlmIChkYXlPZldlZWsgPT09IDIgfHwgZGF5T2ZXZWVrID09PSA0IHx8IGRheU9mV2VlayA9PT0gNikge1xuICAgIGRheU51bWJlcisrO1xuICAgIGRheU9mV2VlayA9IGRheU51bWJlciAlIDc7XG4gIH1cbiAgaWYgKGRheU9mV2VlayA9PT0gMSAmJiB0aW1lT2ZEYXkgPiAxNSAqIFBBUlRTX1BFUl9IT1VSICsgMjA0ICYmICFpc0hlYnJld0xlYXBZZWFyKHllYXIpKSB7XG4gICAgZGF5TnVtYmVyICs9IDI7XG4gIH0gZWxzZSBpZiAoZGF5T2ZXZWVrID09PSAwICYmIHRpbWVPZkRheSA+IDIxICogUEFSVFNfUEVSX0hPVVIgKyA1ODkgJiYgaXNIZWJyZXdMZWFwWWVhcih5ZWFyIC0gMSkpIHtcbiAgICBkYXlOdW1iZXIrKztcbiAgfVxuICByZXR1cm4gZGF5TnVtYmVyO1xufVxuXG5mdW5jdGlvbiBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgZGF5cyA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcbiAgaWYgKGlzR3JlZ29yaWFuTGVhcFllYXIoeWVhcikpIHtcbiAgICBkYXlzWzFdKys7XG4gIH1cbiAgcmV0dXJuIGRheXNbbW9udGggLSAxXTtcbn1cblxuZnVuY3Rpb24gZ2V0SGVicmV3TW9udGhzKHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBpc0hlYnJld0xlYXBZZWFyKHllYXIpID8gMTMgOiAxMjtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhlYnJldyB5ZWFyLlxuICogYHllYXJgIGlzIGFueSBIZWJyZXcgeWVhci5cbiAqL1xuZnVuY3Rpb24gZ2V0RGF5c0luSGVicmV3WWVhcih5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyICsgMSkgLSBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKHllYXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNIZWJyZXdMZWFwWWVhcih5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgbGV0IGIgPSAoeWVhciAqIDEyICsgMTcpICUgMTk7XG4gIHJldHVybiBiID49ICgoYiA8IDApID8gLTcgOiAxMik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBzcGVjaWZpYyBIZWJyZXcgbW9udGguXG4gKiBgbW9udGhgIGlzIDEgZm9yIE5pc2FuLCAyIGZvciBJeWFyIGV0Yy4gTm90ZTogSGVicmV3IGxlYXAgeWVhciBjb250YWlucyAxMyBtb250aHMuXG4gKiBgeWVhcmAgaXMgYW55IEhlYnJldyB5ZWFyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF5c0luSGVicmV3TW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IHllYXJMZW5ndGggPSBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKHllYXIgKyAxKSAtIG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhcik7XG4gIGxldCB5ZWFyVHlwZSA9ICh5ZWFyTGVuZ3RoIDw9IDM4MCA/IHllYXJMZW5ndGggOiAoeWVhckxlbmd0aCAtIDMwKSkgLSAzNTM7XG4gIGxldCBsZWFwWWVhciA9IGlzSGVicmV3TGVhcFllYXIoeWVhcik7XG4gIGxldCBkYXlzSW5Nb250aCA9IGxlYXBZZWFyID8gWzMwLCAyOSwgMjksIDI5LCAzMCwgMzAsIDI5LCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5XSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWzMwLCAyOSwgMjksIDI5LCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjldO1xuICBpZiAoeWVhclR5cGUgPiAwKSB7XG4gICAgZGF5c0luTW9udGhbMl0rKzsgIC8vIEtpc2xldiBnZXRzIGFuIGV4dHJhIGRheSBpbiBub3JtYWwgb3IgY29tcGxldGUgeWVhcnMuXG4gIH1cbiAgaWYgKHllYXJUeXBlID4gMSkge1xuICAgIGRheXNJbk1vbnRoWzFdKys7ICAvLyBIZXNodmFuIGdldHMgYW4gZXh0cmEgZGF5IGluIGNvbXBsZXRlIHllYXJzIG9ubHkuXG4gIH1cbiAgcmV0dXJuIGRheXNJbk1vbnRoW21vbnRoIC0gMV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZTogTmdiRGF0ZSk6IG51bWJlciB7XG4gIGxldCBudW1iZXJPZkRheSA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0ZS5tb250aDsgaSsrKSB7XG4gICAgbnVtYmVyT2ZEYXkgKz0gZ2V0RGF5c0luSGVicmV3TW9udGgoaSwgZGF0ZS55ZWFyKTtcbiAgfVxuICByZXR1cm4gbnVtYmVyT2ZEYXkgKyBkYXRlLmRheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhlYnJld01vbnRoKGRhdGU6IE5nYkRhdGUsIHZhbDogbnVtYmVyKTogTmdiRGF0ZSB7XG4gIGxldCBhZnRlciA9IHZhbCA+PSAwO1xuICBpZiAoIWFmdGVyKSB7XG4gICAgdmFsID0gLXZhbDtcbiAgfVxuICB3aGlsZSAodmFsID4gMCkge1xuICAgIGlmIChhZnRlcikge1xuICAgICAgaWYgKHZhbCA+IGdldEhlYnJld01vbnRocyhkYXRlLnllYXIpIC0gZGF0ZS5tb250aCkge1xuICAgICAgICB2YWwgLT0gZ2V0SGVicmV3TW9udGhzKGRhdGUueWVhcikgLSBkYXRlLm1vbnRoICsgMTtcbiAgICAgICAgZGF0ZS55ZWFyKys7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0ZS5tb250aCArPSB2YWw7XG4gICAgICAgIHZhbCA9IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWwgPj0gZGF0ZS5tb250aCkge1xuICAgICAgICBkYXRlLnllYXItLTtcbiAgICAgICAgdmFsIC09IGRhdGUubW9udGg7XG4gICAgICAgIGRhdGUubW9udGggPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGUubW9udGggLT0gdmFsO1xuICAgICAgICB2YWwgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhlYnJld0RheShkYXRlOiBOZ2JEYXRlLCB2YWw6IG51bWJlcik6IE5nYkRhdGUge1xuICBsZXQgYWZ0ZXIgPSB2YWwgPj0gMDtcbiAgaWYgKCFhZnRlcikge1xuICAgIHZhbCA9IC12YWw7XG4gIH1cbiAgd2hpbGUgKHZhbCA+IDApIHtcbiAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgIGlmICh2YWwgPiBnZXREYXlzSW5IZWJyZXdZZWFyKGRhdGUueWVhcikgLSBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZSkpIHtcbiAgICAgICAgdmFsIC09IGdldERheXNJbkhlYnJld1llYXIoZGF0ZS55ZWFyKSAtIGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSArIDE7XG4gICAgICAgIGRhdGUueWVhcisrO1xuICAgICAgICBkYXRlLm1vbnRoID0gMTtcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgfSBlbHNlIGlmICh2YWwgPiBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpIC0gZGF0ZS5kYXkpIHtcbiAgICAgICAgdmFsIC09IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcikgLSBkYXRlLmRheSArIDE7XG4gICAgICAgIGRhdGUubW9udGgrKztcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0ZS5kYXkgKz0gdmFsO1xuICAgICAgICB2YWwgPSAwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsID49IGRhdGUuZGF5KSB7XG4gICAgICAgIHZhbCAtPSBkYXRlLmRheTtcbiAgICAgICAgZGF0ZS5tb250aC0tO1xuICAgICAgICBpZiAoZGF0ZS5tb250aCA9PT0gMCkge1xuICAgICAgICAgIGRhdGUueWVhci0tO1xuICAgICAgICAgIGRhdGUubW9udGggPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRlLmRheSA9IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlLmRheSAtPSB2YWw7XG4gICAgICAgIHZhbCA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSGVicmV3IGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cbiAqIGBnZGF0ZWAgaXMgYSBKUyBEYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBIZWJyZXcgZGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21HcmVnb3JpYW4oZ2RhdGU6IERhdGUpOiBOZ2JEYXRlIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGdkYXRlKTtcbiAgY29uc3QgZ1llYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksIGdNb250aCA9IGRhdGUuZ2V0TW9udGgoKSwgZ0RheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBsZXQganVsaWFuRGF5ID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqIChnWWVhciAtIDEpICsgTWF0aC5mbG9vcigoZ1llYXIgLSAxKSAvIDQpIC1cbiAgICAgIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyAxMDApICsgTWF0aC5mbG9vcigoZ1llYXIgLSAxKSAvIDQwMCkgK1xuICAgICAgTWF0aC5mbG9vcigoMzY3ICogKGdNb250aCArIDEpIC0gMzYyKSAvIDEyICsgKGdNb250aCArIDEgPD0gMiA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyKSA/IC0xIDogLTIpICsgZ0RheSk7XG4gIGp1bGlhbkRheSA9IE1hdGguZmxvb3IoanVsaWFuRGF5ICsgMC41KTtcbiAgbGV0IGRheXNTaW5jZUhlYkVwb2NoID0ganVsaWFuRGF5IC0gMzQ3OTk3O1xuICBsZXQgbW9udGhzU2luY2VIZWJFcG9jaCA9IE1hdGguZmxvb3IoZGF5c1NpbmNlSGViRXBvY2ggKiBQQVJUU19QRVJfREFZIC8gUEFSVFNfUEVSX01PTlRIKTtcbiAgbGV0IGhZZWFyID0gTWF0aC5mbG9vcigobW9udGhzU2luY2VIZWJFcG9jaCAqIDE5ICsgMjM0KSAvIDIzNSkgKyAxO1xuICBsZXQgZmlyc3REYXlPZlRoaXNZZWFyID0gbnVtYmVyT2ZGaXJzdERheUluWWVhcihoWWVhcik7XG4gIGxldCBkYXlPZlllYXIgPSBkYXlzU2luY2VIZWJFcG9jaCAtIGZpcnN0RGF5T2ZUaGlzWWVhcjtcbiAgd2hpbGUgKGRheU9mWWVhciA8IDEpIHtcbiAgICBoWWVhci0tO1xuICAgIGZpcnN0RGF5T2ZUaGlzWWVhciA9IG51bWJlck9mRmlyc3REYXlJblllYXIoaFllYXIpO1xuICAgIGRheU9mWWVhciA9IGRheXNTaW5jZUhlYkVwb2NoIC0gZmlyc3REYXlPZlRoaXNZZWFyO1xuICB9XG4gIGxldCBoTW9udGggPSAxO1xuICBsZXQgaERheSA9IGRheU9mWWVhcjtcbiAgd2hpbGUgKGhEYXkgPiBnZXREYXlzSW5IZWJyZXdNb250aChoTW9udGgsIGhZZWFyKSkge1xuICAgIGhEYXkgLT0gZ2V0RGF5c0luSGVicmV3TW9udGgoaE1vbnRoLCBoWWVhcik7XG4gICAgaE1vbnRoKys7XG4gIH1cbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGgsIGhEYXkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSlMgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlbiBIZWJyZXcgZGF0ZS5cbiAqIGBoZWJyZXdEYXRlYCBpcyBhbiBIZWJyZXcgZGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gR3JlZ29yaWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9HcmVnb3JpYW4oaGVicmV3RGF0ZTogTmdiRGF0ZVN0cnVjdCB8IE5nYkRhdGUpOiBEYXRlIHtcbiAgY29uc3QgaFllYXIgPSBoZWJyZXdEYXRlLnllYXI7XG4gIGNvbnN0IGhNb250aCA9IGhlYnJld0RhdGUubW9udGg7XG4gIGNvbnN0IGhEYXkgPSBoZWJyZXdEYXRlLmRheTtcbiAgbGV0IGRheXMgPSBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKGhZZWFyKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBoTW9udGg7IGkrKykge1xuICAgIGRheXMgKz0gZ2V0RGF5c0luSGVicmV3TW9udGgoaSwgaFllYXIpO1xuICB9XG4gIGRheXMgKz0gaERheTtcbiAgbGV0IGRpZmZEYXlzID0gZGF5cyAtIEhFQlJFV19EQVlfT05fSkFOXzFfMTk3MDtcbiAgbGV0IGFmdGVyID0gZGlmZkRheXMgPj0gMDtcbiAgaWYgKCFhZnRlcikge1xuICAgIGRpZmZEYXlzID0gLWRpZmZEYXlzO1xuICB9XG4gIGxldCBnWWVhciA9IDE5NzA7XG4gIGxldCBnTW9udGggPSAxO1xuICBsZXQgZ0RheSA9IDE7XG4gIHdoaWxlIChkaWZmRGF5cyA+IDApIHtcbiAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgIGlmIChkaWZmRGF5cyA+PSAoaXNHcmVnb3JpYW5MZWFwWWVhcihnWWVhcikgPyAzNjYgOiAzNjUpKSB7XG4gICAgICAgIGRpZmZEYXlzIC09IGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIpID8gMzY2IDogMzY1O1xuICAgICAgICBnWWVhcisrO1xuICAgICAgfSBlbHNlIGlmIChkaWZmRGF5cyA+PSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKSkge1xuICAgICAgICBkaWZmRGF5cyAtPSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKTtcbiAgICAgICAgZ01vbnRoKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnRGF5ICs9IGRpZmZEYXlzO1xuICAgICAgICBkaWZmRGF5cyA9IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkaWZmRGF5cyA+PSAoaXNHcmVnb3JpYW5MZWFwWWVhcihnWWVhciAtIDEpID8gMzY2IDogMzY1KSkge1xuICAgICAgICBkaWZmRGF5cyAtPSBpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyIC0gMSkgPyAzNjYgOiAzNjU7XG4gICAgICAgIGdZZWFyLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZ01vbnRoID4gMSkge1xuICAgICAgICAgIGdNb250aC0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdNb250aCA9IDEyO1xuICAgICAgICAgIGdZZWFyLS07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpZmZEYXlzID49IGdldERheXNJbkdyZWdvcmlhbk1vbnRoKGdNb250aCwgZ1llYXIpKSB7XG4gICAgICAgICAgZGlmZkRheXMgLT0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ0RheSA9IGdldERheXNJbkdyZWdvcmlhbk1vbnRoKGdNb250aCwgZ1llYXIpIC0gZGlmZkRheXMgKyAxO1xuICAgICAgICAgIGRpZmZEYXlzID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IERhdGUoZ1llYXIsIGdNb250aCAtIDEsIGdEYXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVicmV3TnVtZXJhbHMobnVtZXJhbHM6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmICghbnVtZXJhbHMpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgY29uc3QgaEFycmF5MF85ID0gWycnLCAnXFx1MDVkMCcsICdcXHUwNWQxJywgJ1xcdTA1ZDInLCAnXFx1MDVkMycsICdcXHUwNWQ0JywgJ1xcdTA1ZDUnLCAnXFx1MDVkNicsICdcXHUwNWQ3JywgJ1xcdTA1ZDgnXTtcbiAgY29uc3QgaEFycmF5MTBfMTkgPSBbXG4gICAgJ1xcdTA1ZDknLCAnXFx1MDVkOVxcdTA1ZDAnLCAnXFx1MDVkOVxcdTA1ZDEnLCAnXFx1MDVkOVxcdTA1ZDInLCAnXFx1MDVkOVxcdTA1ZDMnLCAnXFx1MDVkOFxcdTA1ZDUnLCAnXFx1MDVkOFxcdTA1ZDYnLFxuICAgICdcXHUwNWQ5XFx1MDVkNicsICdcXHUwNWQ5XFx1MDVkNycsICdcXHUwNWQ5XFx1MDVkOCdcbiAgXTtcbiAgY29uc3QgaEFycmF5MjBfOTAgPSBbJycsICcnLCAnXFx1MDVkYicsICdcXHUwNWRjJywgJ1xcdTA1ZGUnLCAnXFx1MDVlMCcsICdcXHUwNWUxJywgJ1xcdTA1ZTInLCAnXFx1MDVlNCcsICdcXHUwNWU2J107XG4gIGNvbnN0IGhBcnJheTEwMF85MDAgPSBbXG4gICAgJycsICdcXHUwNWU3JywgJ1xcdTA1ZTgnLCAnXFx1MDVlOScsICdcXHUwNWVhJywgJ1xcdTA1ZWFcXHUwNWU3JywgJ1xcdTA1ZWFcXHUwNWU4JywgJ1xcdTA1ZWFcXHUwNWU5JywgJ1xcdTA1ZWFcXHUwNWVhJyxcbiAgICAnXFx1MDVlYVxcdTA1ZWFcXHUwNWU3J1xuICBdO1xuICBjb25zdCBoQXJyYXkxMDAwXzkwMDAgPSBbXG4gICAgJycsICdcXHUwNWQwJywgJ1xcdTA1ZDEnLCAnXFx1MDVkMVxcdTA1ZDAnLCAnXFx1MDVkMVxcdTA1ZDEnLCAnXFx1MDVkNCcsICdcXHUwNWQ0XFx1MDVkMCcsICdcXHUwNWQ0XFx1MDVkMScsXG4gICAgJ1xcdTA1ZDRcXHUwNWQxXFx1MDVkMCcsICdcXHUwNWQ0XFx1MDVkMVxcdTA1ZDEnXG4gIF07XG4gIGNvbnN0IGdlcmVzaCA9ICdcXHUwNWYzJywgZ2Vyc2hhaW0gPSAnXFx1MDVmNCc7XG4gIGxldCBtZW0gPSAwO1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGxldCBzdGVwID0gMDtcbiAgd2hpbGUgKG51bWVyYWxzID4gMCkge1xuICAgIGxldCBtID0gbnVtZXJhbHMgJSAxMDtcbiAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgbWVtID0gbTtcbiAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IDEpIHtcbiAgICAgIGlmIChtICE9PSAxKSB7XG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTIwXzkwW21dLCBoQXJyYXkwXzlbbWVtXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQudW5zaGlmdChoQXJyYXkxMF8xOVttZW1dKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IDIpIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTEwMF85MDBbbV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobSAhPT0gNSkge1xuICAgICAgICByZXN1bHQudW5zaGlmdChoQXJyYXkxMDAwXzkwMDBbbV0sIGdlcmVzaCwgJyAnKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBudW1lcmFscyA9IE1hdGguZmxvb3IobnVtZXJhbHMgLyAxMCk7XG4gICAgaWYgKHN0ZXAgPT09IDAgJiYgbnVtZXJhbHMgPT09IDApIHtcbiAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTBfOVttXSk7XG4gICAgfVxuICAgIHN0ZXArKztcbiAgfVxuICByZXN1bHQgPSByZXN1bHQuam9pbignJykuc3BsaXQoJycpO1xuICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJlc3VsdC5wdXNoKGdlcmVzaCk7XG4gIH0gZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA+IDEpIHtcbiAgICByZXN1bHQuc3BsaWNlKHJlc3VsdC5sZW5ndGggLSAxLCAwLCBnZXJzaGFpbSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbn1cbiJdfQ==
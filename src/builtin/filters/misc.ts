import { DateTime } from "luxon";
import { DefaultMap } from "../../collections";
import { isLiquidPrimitive, liquidValueOf } from "../../drop";
import { FilterArgumentError } from "../../errors";
import { EMPTY } from "../../expression";
import { FilterContext } from "../../filter";
import {
  isArray,
  isLiquidTruthy,
  isObject,
  isString,
  isUndefined,
  toLiquidString,
} from "../../object";

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function size(this: FilterContext, left: unknown): number {
  if (isArray(left) || isString(left)) return left.length;
  if (left instanceof Map) return left.size;
  if (isObject(left)) return Object.keys(left).length;
  return 0;
}

/**
 *
 * @param this
 * @param left
 * @param _default
 * @param allowFalse
 * @returns
 */
export function default_(
  this: FilterContext,
  left: unknown,
  _default: unknown,
  allowFalse: unknown = false
): unknown {
  const _left = isLiquidPrimitive(left) ? left[liquidValueOf]() : left;
  if (isLiquidTruthy(allowFalse) && _left === false) return left;
  if (!isLiquidTruthy(_left) || EMPTY.equals(_left)) return _default;
  return left;
}

const FORMAT_TOKENS = new DefaultMap<string, string>("", [
  ["%%", "%"],
  ["%a", "ccc"],
  ["%A", "cccc"],
  ["%b", "LLL"],
  ["%B", "LLLL"],
  ["%c", "DDD tt"],
  ["%d", "dd"],
  ["%H", "HH"],
  ["%I", "hh"],
  ["%j", "ooo"],
  ["%m", "LL"],
  ["%M", "mm"],
  ["%p", "a"],
  ["%s", "X"],
  ["%S", "ss"],
  ["%W", "WW"],
  ["%w", "c"],
  ["%x", "DDD"],
  ["%X", "tt"],
  ["%y", "yy"],
  ["%Y", "yyyy"],
  ["%Z", "ZZZZ"],
]);

const RE_DATE_FORMAT = new RegExp(
  ["%%", ...FORMAT_TOKENS.keys()].join("|"),
  "g"
);

function replaceDateFormat(format: string): string {
  return format.replace(RE_DATE_FORMAT, (match) => FORMAT_TOKENS.get(match));
}

function parseDateString(s: string): DateTime {
  // TODO: Better parsing
  let _date = DateTime.fromSQL(s);
  if (_date.isValid) return _date;

  _date = DateTime.fromISO(s);
  if (_date.isValid) return _date;

  _date = DateTime.fromHTTP(s);
  if (_date.isValid) return _date;

  return _date;
}

/**
 *
 * @param this
 * @param left
 * @param format
 * @returns
 */
export function date(
  this: FilterContext,
  left: unknown,
  format: unknown
): string {
  if (isUndefined(left)) return "";
  if (isUndefined(format)) return String(left);

  let _date: DateTime;

  // TODO: Drop protocol?
  // TODO: Parse date numbers

  if (isString(left)) {
    if (left === "now" || left === "today") {
      _date = DateTime.now();
    } else {
      _date = parseDateString(left);
    }
  } else if (left instanceof Date) {
    _date = DateTime.fromJSDate(left);
  } else if (left instanceof DateTime) {
    _date = left;
  } else {
    throw new FilterArgumentError(`expected a date, found ${left}`);
  }

  // TODO: Check format string
  return _date.toFormat(replaceDateFormat(format as string));
}

/**
 *
 * @param this
 * @param left
 * @param offset
 * @param length
 * @returns
 */
export function slice(
  this: FilterContext,
  left: unknown,
  offset: unknown,
  length?: unknown
): string | unknown[] {
  const _offset = Number(offset);
  if (!Number.isInteger(_offset))
    throw new FilterArgumentError(
      `expected an integer offset, found ${offset}`
    );

  const _length = length === undefined ? 1 : Number(length);
  if (!Number.isInteger(_length))
    throw new FilterArgumentError(
      `expected an integer length, found ${length}`
    );

  // Arrays and strings only.
  const _left = isArray(left) ? left : toLiquidString(left);
  const start = _offset < 0 ? _left.length + _offset : _offset;
  return _left.slice(start, start + _length);
}
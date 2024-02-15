import { Temporal } from '@js-temporal/polyfill';

// hack: もっとシンプルに作る方法があるはず
function createPlainDateTimeFromJSDate(date: Date): Temporal.PlainDateTime {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return Temporal.PlainDateTime.from({
    year,
    month,
    day,
    hour,
    minute,
    second,
  });
}

export function format(
  date: Date,
  formatOptions: Intl.DateTimeFormatOptions,
): string {
  // TODO: ハードコードしない
  // Date オブジェクトが表すローカルタイムと、Temporal に指定されたタイムゾーンが異なる場合、結果にずれが生じないようにする
  const locale = 'ja-JP';
  const timeZone = 'Asia/Tokyo';

  const plainDateTime = createPlainDateTimeFromJSDate(date);
  const zonedDateTime = plainDateTime.toZonedDateTime(
    Temporal.TimeZone.from(timeZone),
  );
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    ...formatOptions,
    timeZone,
  });
  return dateFormatter.format(zonedDateTime.toInstant().epochMilliseconds);
}

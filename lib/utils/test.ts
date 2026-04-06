/**
 * 格式化日期为指定格式的字符串
 * @param date - 日期对象、时间戳或日期字符串
 * @param format - 输出格式，默认 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 *
 * @example
 * formatDate(new Date()) // '2026-03-31'
 * formatDate('2026-01-01', 'YYYY年MM月DD日') // '2026年01月01日'
 * formatDate(1711843200000, 'MM/DD/YYYY') // '03/31/2026'
 */
export function formatDate(
  date: Date | string | number,
  format: string = 'YYYY-MM-DD'
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date: ${String(date)}`);
  }

  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 将数字格式化为人民币金额字符串
 * @param amount - 金额数值
 * @param options - 可选配置
 * @param options.precision - 小数位数，默认 2
 * @param options.prefix - 前缀符号，默认 '¥'
 * @param options.thousandSeparator - 是否使用千分位分隔符，默认 true
 * @returns 格式化后的人民币字符串
 *
 * @example
 * formatCurrency(1234.5)          // '¥1,234.50'
 * formatCurrency(1234.5, { precision: 0 })  // '¥1,235'
 * formatCurrency(-99.9)           // '-¥99.90'
 * formatCurrency(0)               // '¥0.00'
 */
export function formatCurrency(
  amount: number,
  options: {
    precision?: number;
    prefix?: string;
    thousandSeparator?: boolean;
  } = {}
): string {
  const { precision = 2, prefix = '¥', thousandSeparator = true } = options;

  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid amount: ${String(amount)}`);
  }

  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  const fixed = absoluteAmount.toFixed(precision);

  let formatted: string;
  if (thousandSeparator) {
    const [integerPart, decimalPart] = fixed.split('.');
    const withSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formatted = decimalPart ? `${withSeparator}.${decimalPart}` : withSeparator;
  } else {
    formatted = fixed;
  }

  return `${isNegative ? '-' : ''}${prefix}${formatted}`;
}

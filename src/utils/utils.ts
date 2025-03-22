export const slugify = (str: string) => {
  str = str.trim();
  str = str.toLowerCase();

  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');

  str = str.replace(/([^0-9a-z-\s])/g, '');

  str = str.replace(/(\s+)/g, '');

  return str;
};

export const reduceNumber = (
  num: number,
  exceptValues: number[] = [11, 22, 33],
  maxVal: number = 10,
): number => {
  if (!maxVal || num < maxVal || exceptValues.includes(num)) {
    return num;
  }

  let digit = num;
  num = 0;
  while (digit !== 0) {
    num += digit % 10;
    digit = Math.floor(digit / 10);
  }

  return reduceNumber(num, exceptValues);
};

export const reduce2Step = (
  nums: number[],
  exceptFirstStepVals: number[] = [10, 11, 22, 33],
  exceptSecondStepVals: number[] = [],
  maxSecondStepVal: number = 10,
) => {
  const reducedNums = [];
  for (const num of nums) {
    if (num < 10 || exceptFirstStepVals.includes(num)) {
      reducedNums.push(num);
    } else {
      reducedNums.push(...`${num}`.split('').map((n) => Number(n)));
    }
  }
  const firstStepVal = reducedNums.reduce((v, c) => v + c, 0);
  if (exceptFirstStepVals.includes(firstStepVal)) {
    return firstStepVal;
  }
  const secondStepVal = reduceNumber(
    firstStepVal,
    exceptSecondStepVals,
    maxSecondStepVal,
  );
  return secondStepVal;
};

export const reduceNumberWithLastState = (
  num: string,
  exceptValues = [11, 22, 33],
  logs: number[] = [],
): any[] => {
  const numArr = num.split('').map((n) => Number(n));
  logs.push(Number(num));
  const total = numArr.reduce((v, c) => v + c, 0);
  logs.push(total);
  if (total < 10 || exceptValues.includes(total)) {
    return logs.slice(logs.length - 2, logs.length);
  } else {
    return reduceNumberWithLastState(`${total}`, exceptValues, logs);
  }
};

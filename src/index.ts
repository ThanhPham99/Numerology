import { reduce2Step, reduceNumber, slugify } from "./utils/utils";

type PeriodCycle = { [key: number]: { period1: { from: number; to: number | null }; period2: { from: number; to: number | null }; period3: { from: number; to: number | null } } }
type KarmicDeftValues = { number: number; displayNumber: string }


export default class Numerology {
  private readonly raw_username: string;
  private readonly username: string;
  private readonly birthDate: number;
  private readonly birthMonth: number;
  private readonly birthYear: number;
  private readonly now: Date = new Date();

  private vowelValues = ['a', 'e', 'i', 'o', 'u'];

  private karmicDeftValues: KarmicDeftValues[] = [
    { number: 13, displayNumber: '13/4' },
    { number: 14, displayNumber: '14/5' },
    { number: 16, displayNumber: '16/7' },
    { number: 19, displayNumber: '19/1' },
  ];

  private pythagoreanTable: { [key: string]: number } = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  };

  private periodCycle: PeriodCycle = {
    1: {
      period1: { from: 0, to: 26 },
      period2: { from: 26, to: 53 },
      period3: { from: 53, to: null },
    },
    2: {
      period1: { from: 0, to: 34 },
      period2: { from: 34, to: 61 },
      period3: { from: 61, to: null },
    },
    3: {
      period1: { from: 0, to: 33 },
      period2: { from: 33, to: 60 },
      period3: { from: 60, to: null },
    },
    4: {
      period1: { from: 0, to: 32 },
      period2: { from: 32, to: 59 },
      period3: { from: 59, to: null },
    },
    5: {
      period1: { from: 0, to: 31 },
      period2: { from: 31, to: 58 },
      period3: { from: 58, to: null },
    },
    6: {
      period1: { from: 0, to: 30 },
      period2: { from: 30, to: 57 },
      period3: { from: 57, to: null },
    },
    7: {
      period1: { from: 0, to: 29 },
      period2: { from: 29, to: 56 },
      period3: { from: 56, to: null },
    },
    8: {
      period1: { from: 0, to: 28 },
      period2: { from: 28, to: 55 },
      period3: { from: 55, to: null },
    },
    9: {
      period1: { from: 0, to: 27 },
      period2: { from: 27, to: 54 },
      period3: { from: 54, to: null },
    },
  };

  /**
   * Construct a Numerology object
   * @param {string} username The username to be processed
   * @param {number} birthDate The birth date of the user
   * @param {number} birthMonth The birth month of the user
   * @param {number} birthYear The birth year of the user
   */
  constructor(
    username: string,
    birthDate: number,
    birthMonth: number,
    birthYear: number,
  ) {
    this.raw_username = username.toLowerCase();
    this.username = slugify(username.toLowerCase());
    this.birthDate = birthDate;
    this.birthDate = birthDate;
    this.birthMonth = birthMonth;
    this.birthYear = birthYear;
  }


  private checkYWordIsVowel(word: string, index: number) {
    if (
      !this.vowelValues.includes(word[index - 1]) &&
      !this.vowelValues.includes(word[index + 1])
    )
      return true;
    return false;
  }

  /**
   * Get the Life Path Number of the user, given their birth date, month and year
   * @returns {number} The Life Path Number of the user
   */
  public getLifePathNumber(): number {
    const lifePathNumber = reduce2Step([
      this.birthDate,
      this.birthMonth,
      this.birthYear,]);
    return lifePathNumber;
  }

  /**
   * Get the Expression Number of the user, given their username
   * @returns {number} The Expression Number of the user
   */
  public getExpressionNumber(): number {
    let expressionNumber = 0;
    for (const char of this.username) {
      if (this.pythagoreanTable[char]) {
        expressionNumber += this.pythagoreanTable[char];
      }
    }
    expressionNumber = reduce2Step([expressionNumber]);
    return expressionNumber;
  }

  /**
   * Get the Soul Urge Number of the user, given their username
   * This number is also known as the Heart's Desire Number
   * @returns {number} The Soul Urge Number of the user
   */
  public getSoulUrgeNumber(): number {
    let soulUrgeNumber = 0;
    for (let i = 0; i < this.username.length; i++) {
      const char = this.username[i];
      if (
        (this.pythagoreanTable[char] && this.vowelValues.includes(char)) ||
        (char === 'y' && this.checkYWordIsVowel(this.username, i))
      ) {
        soulUrgeNumber += this.pythagoreanTable[char];
      }
    }
    soulUrgeNumber = reduceNumber(soulUrgeNumber, [11, 22]);
    return soulUrgeNumber;
  }

  /**
   * Get the Personality Number of the user, given their username
   * This number represents the outer persona or the way others perceive the user
   * @returns {number} The Personality Number of the user
   */
  public getPersonalityNumber(): number {
    let personalityNumber = 0;
    for (let i = 0; i < this.username.length; i++) {
      const char = this.username[i];
      if (
        (this.pythagoreanTable[char] && !this.vowelValues.includes(char)) ||
        (char === 'y' && !this.checkYWordIsVowel(this.username, i))
      ) {
        personalityNumber += this.pythagoreanTable[char];
      }
    }
    personalityNumber = reduceNumber(personalityNumber, []);
    return personalityNumber;
  }

  /**
   * Get the Karmic Deft Number of the user
   * @returns {KarmicDeftValues | null} The Karmic Deft Number of the user, or null if user has no Karmic Deft Number
   */
  public getKarmicDeftNumber(): KarmicDeftValues | null {
    const deftNumber =
      reduceNumber(this.birthDate, []) + reduceNumber(this.birthMonth, []) + reduceNumber(this.birthYear, []);
    const deftVal = this.karmicDeftValues.find((v) => v.number === deftNumber);
    if (deftVal) return deftVal;
    return null;
  }

  /**
   * Get the Birth Day Number of the user
   * @returns {number} The Birth Day Number of the user
   */
  public getBirthDayNumber(): number {
    if ([10, 11, 22].includes(this.birthDate)) return this.birthDate;
    else return reduceNumber(this.birthDate, []);
  }

  /**
   * Get the Balance Number of the user
   * This number is based on the first letter of each word in the username
   * @returns {number} The Balance Number of the user
   */
  public getBalanceNumber(): number {
    const nameArr = this.raw_username.toLowerCase().split(' ');
    let number = 0;
    for (const word of nameArr) {
      const char = word[0];
      if (this.pythagoreanTable[char]) {
        number += this.pythagoreanTable[char];
      }
    }
    return reduceNumber(number, []);
  }

  /**
   * Get the Challenge Number of the user
   * This number is based on the first letter of each word in the username
   * @returns {number} The Challenge Number of the user
   */
  public getChallengeNumber(): number {
    let challengeNumber = 0;
    const firstChars = this.username.split(' ').map((word) => word[0]);
    for (const char of firstChars) {
      if (this.pythagoreanTable[char]) {
        challengeNumber += this.pythagoreanTable[char];
      }
    }
    challengeNumber = reduceNumber(challengeNumber);
    return challengeNumber;
  }

  /**
   * Get the Personal Year Number of the user for a given year
   * @param {number} predictYear - The year for which to calculate the personal year number (defaults to the current year)
   * @returns {number} The Personal Year Number for the given year
   */

  public getPersonalYearNumber(
    predictYear: number = new Date().getFullYear(),
  ): number {
    const birthDateSum =
      reduceNumber(this.birthDate) + reduceNumber(this.birthMonth) + reduceNumber(predictYear);
    const personalYearNumber = reduceNumber(birthDateSum, []);
    return personalYearNumber;
  }

  /**
   * Get the Personal Month Number of the user for a given month and year
   * @param {number} predictMonth - The month for which to calculate the personal month number (defaults to the current month)
   * @param {number} [predictYear] - The year for which to calculate the personal month number (defaults to the current year)
   * @returns {number} The Personal Month Number for the given month and year
   */
  public getPersonalMonthNumber(
    predictMonth: number = new Date().getMonth() + 1,
    predictYear: number | undefined = undefined,
  ): number {
    const personalYearNumber = this.getPersonalYearNumber(
      predictYear,
    );
    const birthDateSum =
      reduceNumber(predictMonth) + reduceNumber(personalYearNumber);
    const personalMonthNumber = reduceNumber(birthDateSum, []);
    return personalMonthNumber;
  }

  /**
   * Get the Personal Day Number of the user for the current day
   * @returns {number} The Personal Day Number for the current day
   */
  public calcPersonalDayNumber(): number {
    const personalYearNumber = this.getPersonalYearNumber();
    const birthDateSum =
      reduceNumber(new Date().getDate()) + reduceNumber(personalYearNumber);
    const personalDayNumber = reduceNumber(birthDateSum);
    return personalDayNumber;
  }

  /**
   * Get the Period Cycle Numbers for the given life path number.
   * Each period cycle number corresponds to a specific life period and is calculated
   * based on the user's birth month, birth date, and birth year.
   *
   * @param {number} lifePath - The life path number used for calculation.
   * @returns {Array<{period: number, number: number, age: number}>} An array of objects, each representing a period cycle with its number and age.
   */

  public getPeriodCycleNumbers(
    lifePath: number,
  ): Array<{
    period: number; number: number; age: {
      from: number;
      to: number | null;
    }
  }> {
    const lifePathCombine = reduceNumber(lifePath, []);
    return [
      {
        period: 1,
        number: reduceNumber(this.birthMonth),
        age: this.periodCycle[lifePathCombine].period1,
      },
      {
        period: 2,
        number: reduceNumber(this.birthDate),
        age: this.periodCycle[lifePathCombine].period2,
      },
      {
        period: 3,
        number: reduceNumber(this.birthYear, [11, 22]),
        age: this.periodCycle[lifePathCombine].period3,
      },
    ];
  }
}
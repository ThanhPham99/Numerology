# Numerology Library

A TypeScript library for calculating numerology numbers based on a user's birth date and name.

## Description

This library provides a simple and easy-to-use API for calculating various numerology numbers, including Life Path Number, Expression Number, Soul Urge Number, and more.

## Installation

To install the library, run the following command:
```bash
npm install @thanhpham99/numerology
```
## Usage

To use the library, create a new instance of the `Numerology` class and pass in the user's birth date and name:
```typescript
import { Numerology } from '@thanhpham99/numerology';

const numerology = new Numerology('John Doe', 12, 25, 1990);
```
You can then call various methods on the `numerology` object to calculate different numerology numbers:
```typescript
const lifePathNumber = numerology.getLifePathNumber();
const expressionNumber = numerology.getExpressionNumber();
const soulUrgeNumber = numerology.getSoulUrgeNumber();
```
## API

The `Numerology` class has the following methods:

* `getLifePathNumber()`: calculates the Life Path Number based on the user's birth date
* `getExpressionNumber()`: calculates the Expression Number based on the user's name
* `getSoulUrgeNumber()`: calculates the Soul Urge Number based on the user's name
* `getPersonalityNumber()`: calculates the Personality Number based on the user's name
* `getBalanceNumber()`: calculates the Balance Number based on the user's name
* `getChallengeNumber()`: calculates the Challenge Number based on the user's name
* `getKarmicDeftNumber()`: calculates the Karmic Deft Number based on the user's birth date
* `getPersonalYearNumber()`: calculates the Personal Year Number based on the user's birth date and current year
* `getPersonalMonthNumber()`: calculates the Personal Month Number based on the user's birth date and current month
* `getPersonalDayNumber()`: calculates the Personal Day Number based on the user's birth date and current day

## License

This library is licensed under the MIT License.

## Author

thanhpham99

## Version

1.0.1
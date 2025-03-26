# Amharic Keyboard

A TypeScript library for translating English text to Amharic, with support for characters, words, and numbers.

## Overview

Amharic Keyboard is a lightweight TypeScript library that provides utilities for translating English text input into Amharic script. It handles character mappings, vowel combinations, and number conversions to create accurate Amharic text output.

## Features

- **English to Amharic Translation**: Convert English text input to Amharic script
- **Number Translation**: Convert Arabic numerals to Amharic number representation
- **Vowel-Consonant Handling**: Intelligent handling of vowel and consonant combinations
- **Multi-character Support**: Support for complex character combinations
- **TypeScript Support**: Full TypeScript type definitions for better development experience

## Installation

```bash
npm install amharic-keyboard
```

## Usage

### Basic Translation

```typescript
import { translateToAmharic } from 'amharic-keyboard';

// Translate text from English to Amharic
const result = translateToAmharic('selam');
console.log(result.am); // Outputs the Amharic equivalent
console.log(result.en); // Original English text
```

### Number Translation

```typescript
import { translateNumberToAmharic } from 'amharic-keyboard';

// Convert numbers to Amharic representation
const amharicNumber = translateNumberToAmharic(123);
console.log(amharicNumber); // Outputs the Amharic number representation
```

## License

MIT
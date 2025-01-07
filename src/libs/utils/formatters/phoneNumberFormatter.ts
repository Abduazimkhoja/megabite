const phoneNumberPatterns = {
  US: { code: '1', pattern: '+N (NNN) NNN-NNNN' },
  CA: { code: '1', pattern: '+N (NNN) NNN-NNNN' },
  RU: { code: '7', pattern: '+N (NNN) NNN-NN-NN' },
  KZ: { code: '7', pattern: '+N (NNN) NNN-NN-NN' },
  AU: { code: '61', pattern: '+NN N NNNN NNNN' },
  ZA: { code: '27', pattern: '+NN NN NNN NNNN' },
  FR: { code: '33', pattern: '+NN N NNNN NNNN' },
  ES: { code: '34', pattern: '+NN NNN NNN NNN' },
  IT: { code: '39', pattern: '+NN NN NNNNNNNN' },
  GB: { code: '44', pattern: '+NN NN NNNN NNNN' },
  DE: { code: '49', pattern: '+NN (NNN) NNNNNN' },
  BR: { code: '55', pattern: '+NN (NN) NNNN-NNNN' },
  MX: { code: '52', pattern: '+NN (NNN) NNN-NNNN' },
  CN: { code: '86', pattern: '+NN (NNN) NNN-NNNN' },
  IN: { code: '91', pattern: '+NN NNNN NNNNNN' },
  JP: { code: '81', pattern: '+NN NN NNNN NNNN' },
  KR: { code: '82', pattern: '+NN NN NNN NNNN' },
  UA: { code: '380', pattern: '+NN (0NN) NNN-NN-NN' },
  BY: { code: '375', pattern: '+NNN NN NNN-NN-NN' },
  UZ: { code: '998', pattern: '+NNN (NN) NNN-NN-NN' },
} as const;

type Patterns =
  | (typeof phoneNumberPatterns)[keyof typeof phoneNumberPatterns]['pattern']
  | (string & {});
type PatternsKey = keyof typeof phoneNumberPatterns;

export type PhonePattern = Patterns | PatternsKey;

export type FormatPhoneNumber = (phoneNumber: string, phonePattern: PhonePattern) => string;

export const formatPhoneNumber: FormatPhoneNumber = (phoneNumber, phonePattern = 'UZ') => {
  let pattern =
    phonePattern in phoneNumberPatterns
      ? phoneNumberPatterns?.[phonePattern as PatternsKey]?.pattern
      : phonePattern;
  const removePlusInPhone = phoneNumber.replace('+', '');

  const patternNumberCount = [...pattern].reduce(
    (acc, letter) => (letter === 'N' ? ++acc : acc),
    0,
  );

  if (removePlusInPhone.length !== patternNumberCount && phonePattern) {
    const findPatternByPhoneCode = Object.values(phoneNumberPatterns).find(({ code }) =>
      removePlusInPhone.startsWith(code),
    );
    if (!findPatternByPhoneCode) return removePlusInPhone;
    pattern = findPatternByPhoneCode.pattern;
  }

  let index = 0;
  const formattedPhoneNumber = pattern.replace(/N/g, () => removePlusInPhone[index++] || '');

  return formattedPhoneNumber;
};

// formatPhoneNumber( '998123456789', '+NN (0NN) NNN-NN-NN');

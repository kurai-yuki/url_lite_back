export function convertToCamelCase(value: object): object {
  const keys = Object.keys(value);
  const objectValues: unknown[] = Object.values(value);
  const objMap = new Map<string, unknown>();

  const camelCaseKeys = keys.map((key: string) => {
    return key.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );
  });

  for (let i = 0; i < camelCaseKeys.length; i++) {
    const key = camelCaseKeys[i];
    const fieldValue = objectValues[i];

    objMap.set(key, fieldValue);
  }

  return Object.fromEntries(objMap);
}

export function convertToSnakeCase(value: string): string {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

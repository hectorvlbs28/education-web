export class StringUtils {
  static parseJSON(str: string) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }

  static customStringify(obj: any): string {
    const seen = new WeakSet<any>();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    });
  }

  static removeSubstrings(
    fullString: string,
    substringsToRemove: string[]
  ): string {
    const pattern = new RegExp(substringsToRemove.join('|'), 'gi');
    const result = fullString.replace(pattern, '');

    return result;
  }

  static extractFirstBlockFromUUID(uuid: string): string {
    return !uuid ? null : uuid.split('-')[0];
  }

  static escapeStringForJSON(input: string): string {
    return input
      .replace(/\\/g, '\\\\') // Escape backslashes
      .replace(/"/g, '\\"') // Escape double quotes
      .replace(/\n/g, '\\n') // Escape newlines
      .replace(/\r/g, '\\r') // Escape carriage returns
      .replace(/\t/g, '\\t') // Escape tabs
      .replace(/\f/g, '\\f'); // Escape form feeds
  }
}

export class DataUtils {
  /**
   * Generates a unique email with a timestamp to avoid registration conflicts
   */
  static generateUniqueEmail(prefix: string = 'testuser'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}@test.com`;
  }

  /**
   * Generates a random phone number
   */
  static generateRandomPhoneNumber(): string {
    const randomSuffix = Math.floor(100000000 + Math.random() * 900000000);
    return `9${randomSuffix}`;
  }
}

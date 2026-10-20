import * as XLSX from 'xlsx';
import path from 'path';

export class DataUtils {
  static generateUniqueEmail(): string {
    return `auto_${Date.now()}_${Math.floor(Math.random() * 1000)}@gmail.com`;
  }
}

export class ExcelUtils {
  static getTestData<T = Record<string, string>>(relativePath: string, sheetName: string): T[] {
    const fullPath = path.resolve(__dirname, '../../', relativePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found in ${relativePath}`);
    }

    return XLSX.utils.sheet_to_json<T>(sheet, { defval: '' });
  }
}

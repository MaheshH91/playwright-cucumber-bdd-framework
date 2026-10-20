export interface DefectCategory {
  name: string;
  matchedStatuses: string[];
  traceRegex?: string;
}

export const DEFECT_CATEGORIES: DefectCategory[] = [
  {
    name: 'Ignored / Skipped Tests',
    matchedStatuses: ['skipped']
  },
  {
    name: 'Infrastructure & Timeout Issues',
    matchedStatuses: ['broken', 'failed'],
    traceRegex: '.*Timeout.*'
  },
  {
    name: 'Assertion Failures',
    matchedStatuses: ['failed'],
    traceRegex: '.*expect\\(.*'
  },
  {
    name: 'Element / Locator Defects',
    matchedStatuses: ['failed', 'broken'],
    traceRegex: '.*locator\\..*'
  }
];

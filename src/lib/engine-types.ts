export interface DialState {
  scary: number;    // 1-10, minimum threshold (default 1 = any)
  extreme: number;  // 1-10, maximum threshold (default 10 = any)
  pace: number;     // 0=any, 1=slow, 2=medium, 3=fast
}

export const DEFAULT_DIALS: DialState = {
  scary: 1,
  extreme: 10,
  pace: 0,
};

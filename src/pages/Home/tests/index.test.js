import { describe, it, expect } from 'vitest';

describe('username', () => {
  const username = 'test';
  it('should not be an empty string', () => {
    expect(username).not.toBe('');
  });
});

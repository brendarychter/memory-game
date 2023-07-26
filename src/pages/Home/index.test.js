import { describe, it, expect } from 'vitest';

const username = 'test'

describe('memorygame', () => {
    it('should not be an empty string',()=>{
        expect(username).not.toBe('');
    })
});

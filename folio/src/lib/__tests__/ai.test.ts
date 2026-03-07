import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@anthropic-ai/sdk', () => ({
  default: class MockAnthropic {
    messages = {
      create: vi.fn().mockResolvedValue({
        content: [
          {
            type: 'text',
            text: 'I design intuitive interfaces that help millions of people create together.',
          },
        ],
      }),
    };
  },
}));

describe('cleanupBio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns cleaned bio from Anthropic', async () => {
    const { cleanupBio } = await import('@/lib/ai');
    const result = await cleanupBio(
      'Experienced designer. • Led design at Figma • Built design systems • Passionate about UX',
      'Alex Rivera',
      'Senior Product Designer'
    );
    expect(result).toBe('I design intuitive interfaces that help millions of people create together.');
  });

  it('returns original bio if too short', async () => {
    const { cleanupBio } = await import('@/lib/ai');
    const result = await cleanupBio('Short', 'Alex', 'Designer');
    expect(result).toBe('Short');
  });

  it('returns original bio if empty', async () => {
    const { cleanupBio } = await import('@/lib/ai');
    const result = await cleanupBio('', 'Alex', 'Designer');
    expect(result).toBe('');
  });
});

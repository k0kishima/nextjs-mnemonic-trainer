import { describe, it, expect } from 'vitest';
import { getExaminationStatus } from '../examination';

describe('getExaminationStatus', () => {
  it('returns NotStarted when rememberedAt and answeredAt are null', () => {
    const status = getExaminationStatus({
      rememberedAt: null,
      answeredAt: null,
    });
    expect(status).toEqual('NotStarted');
  });

  it('returns AwaitingResponse when rememberedAt is not null and answeredAt is null', () => {
    const status = getExaminationStatus({
      rememberedAt: new Date(),
      answeredAt: null,
    });
    expect(status).toEqual('AwaitingResponse');
  });

  it('returns Completed when both rememberedAt and answeredAt are not null', () => {
    const status = getExaminationStatus({
      rememberedAt: new Date(),
      answeredAt: new Date(),
    });
    expect(status).toEqual('Completed');
  });
});

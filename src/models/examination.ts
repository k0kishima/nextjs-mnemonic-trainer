type ExaminationStatus = 'NotStarted' | 'AwaitingResponse' | 'Completed';

export function getExaminationStatus(examination: {
  rememberedAt: Date | null;
  answeredAt: Date | null;
}): ExaminationStatus {
  if (examination.rememberedAt === null) {
    return 'NotStarted';
  } else if (examination.answeredAt === null) {
    return 'AwaitingResponse';
  } else {
    return 'Completed';
  }
}

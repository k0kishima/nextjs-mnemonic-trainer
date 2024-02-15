import { Container } from './_components';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Container examinationId={id} />;
}

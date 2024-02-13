'use client';

import { StartExaminationButton } from './buttons';

export function Container() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">
        <h1>Dash board</h1>
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t p-4">
        <StartExaminationButton />
      </footer>
    </div>
  );
}

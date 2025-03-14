import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nextForTests';
import type { RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

interface RenderWithi18nReturn extends RenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

export const renderWithi18n = (
  ui: ReactElement
): RenderWithi18nReturn => {
  const result = render(
    <I18nextProvider i18n={i18n}>
      {ui}
    </I18nextProvider>
  );
  return {
    user: userEvent.setup(),
    ...result
  };
};

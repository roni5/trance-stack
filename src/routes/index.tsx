import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Hello, links as helloLinks } from '~/components/Hello';
import Login from '~/components/Login';
import { Features } from '~/features';
import { hasFeature } from '~/hooks/hasFeature';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => ([
  ...helloLinks()
]);

export const loader: LoaderFunction = async ({ request, context }) => {
  const isAuth = await hasFeature(request, Features.AUTH);
  return json({
    isHelloEnabled: await hasFeature(request, Features.HELLO),
    isAuthEnabled: isAuth
  });
};

export default () => {
  const { t } = useTranslation();
  const { isHelloEnabled, isAuthEnabled } = useLoaderData<typeof loader>();
  if (isHelloEnabled) {
    return (<div>
      <Hello/>
      {isAuthEnabled ? <Login/> : null}
    </div>);
  }
  return <div>{t('translation:microcopy.goodBye')}</div>;
};

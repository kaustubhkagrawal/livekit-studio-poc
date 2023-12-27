// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider } from 'react-redux';
import { StudioPage } from '../pages/StudioPage';
import { store } from '@kaustubhkagrawal/shared';
import { useEffect } from 'react';
import PubSub from 'pubsub-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SandboxPage } from '../pages/SandboxPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StudioPage />,
  },
  {
    path: '/sandbox',
    element: <SandboxPage />,
  },
]);

export function App() {
  useEffect(() => {
    const token = PubSub.subscribe('core', (event, data) => {
      console.log('PubSub', { event, data });
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
}

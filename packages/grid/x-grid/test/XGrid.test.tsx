import * as React from 'react';
import { createClientRender, act } from 'test/utils';
import { expect } from 'chai';
import { XGrid } from '@material-ui/x-grid';

async function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

describe('<XGrid />', () => {
  const render = createClientRender();

  it('should resize the width of the columns', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // TODO: Unclear why this fails. Not important
      // since a browser test gives us more confidence anyway
      this.skip();
    }

    function App(props) {
      const { width = 300 } = props;
      return (
        <div style={{ width, height: 300 }}>
          <XGrid
            rows={[
              {
                brand: 'Nike',
              },
            ]}
            columns={[
              { field: 'id', hide: true },
              { field: 'brand', width: 100 },
            ]}
            options={{ checkboxSelection: true }}
          />
        </div>
      );
    }

    const { container, setProps } = render(<App />);
    let rect;
    rect = container.querySelector('[role="row"][data-rowindex="0"]').getBoundingClientRect();
    expect(rect.width).to.equal(300 - 2);
    setProps({ width: 400 });
    act(() => {
      window.dispatchEvent(new window.Event('resize', {}));
    });
    await sleep(200);
    rect = container.querySelector('[role="row"][data-rowindex="0"]').getBoundingClientRect();
    expect(rect.width).to.equal(400 - 2);
  });
});

import * as React from 'react';
import { createClientRender, act, fireEvent } from 'test/utils';
import { expect } from 'chai';
import { XGrid } from '@material-ui/x-grid';
import { useData } from 'packages/storybook/src/hooks/useData';

function getActiveCell() {
  const activeElement = document.activeElement;

  if (!activeElement || !activeElement.parentElement) {
    return null;
  }

  return `${activeElement.parentElement.getAttribute('data-rowindex')}-${activeElement.getAttribute(
    'data-colindex',
  )}`;
}

async function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

describe('<XGrid />', () => {
  const render = createClientRender();

  before(function beforeHook() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // Need layouting
      this.skip();
    }
  });

  describe('keyboard', () => {
    const KeyboardTest = () => {
      const data = useData(100, 20);
      const transformColSizes = (columns) => columns.map((column) => ({ ...column, width: 60 }));

      return (
        <div style={{ width: 300, height: 300 }}>
          <XGrid rows={data.rows} columns={transformColSizes(data.columns)} />
        </div>
      );
    };

    it('cell navigation with arrows ', async () => {
      render(<KeyboardTest />);
      await sleep(10);
      document.querySelector('[data-rowindex="0"]').querySelector('[data-colindex="0"]').focus();
      expect(getActiveCell()).to.equal('0-0');

      fireEvent.keyDown(document.activeElement, { code: 'ArrowRight' });
      await sleep(100);
      expect(getActiveCell()).to.equal('0-1');

      fireEvent.keyDown(document.activeElement, { code: 'ArrowDown' });
      await sleep(100);
      expect(getActiveCell()).to.equal('1-1');

      fireEvent.keyDown(document.activeElement, { code: 'ArrowLeft' });
      await sleep(100);
      expect(getActiveCell()).to.equal('1-0');

      fireEvent.keyDown(document.activeElement, { code: 'ArrowUp' });
      await sleep(100);
      expect(getActiveCell()).to.equal('0-0');
    });

    it('Home / End navigation', async () => {
      render(<KeyboardTest />);
      await sleep(10);
      document.querySelector('[data-rowindex="1"]').querySelector('[data-colindex="1"]').focus();
      expect(getActiveCell()).to.equal('1-1');

      fireEvent.keyDown(document.activeElement, { code: 'Home' });
      await sleep(100);
      expect(getActiveCell()).to.equal('1-0');

      fireEvent.keyDown(document.activeElement, { code: 'End' });
      await sleep(100);
      expect(getActiveCell()).to.equal('1-19');
    });
  });

  it('should resize the width of the columns', async function test() {
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

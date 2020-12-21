import * as React from 'react';
import { XGrid, useApiRef } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

export default function XGridDemo() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
  });

  const apiRef = useApiRef();

  if (typeof window !== 'undefined') {
    window.apiRef = apiRef;
  }

  return (
    <div style={{ height: 520, width: '100%' }}>
      <XGrid
        {...data}
        apiRef={apiRef}
        columns={[{
          field: 'id',
          flex: 1,
        }, {
          field: 'desk',
          flex: 1,
        }]}
        loading={data.rows.length === 0}
        rowHeight={38}
      />
    </div>
  );
}

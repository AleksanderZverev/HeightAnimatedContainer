import React, { FC, useState, useMemo } from 'react';

const App: FC = () => {
  const [itemsCount, setItemsCount] = useState(3);
  const items = useMemo(() => {
      let result = [];
      for (let i = 0; i < itemsCount; i++) {
          result.push(i.toString());
      }
      return result;
  }, [itemsCount]);

  return (
    <div>
        <ul style={{border: '1px solid red'}}>
            {
                items.map(m => <li key={m}>{m}</li>)
            }
        </ul>
        <div>
            <button onClick={() => setItemsCount(itemsCount + 1)}>Add</button>
            <button onClick={() => setItemsCount(itemsCount - 1)}>Remove</button>
        </div>
    </div>
  );
}

export default App;

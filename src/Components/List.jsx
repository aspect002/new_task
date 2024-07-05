import { useState, useCallback, useMemo } from 'react';
import ListItem from './ListItem';

function List({ data }) {
  const [items, setItems] = useState(data);

  const handleClick = useCallback((id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: `!!!${item.value}` } : item
      )
    );
  }, []);

  const memoizedItems = useMemo(
    () =>
      items.map(({ id, value }) => ({
        id,
        value,
      })),
    [items]
  );

  return (
    <ul>
      {memoizedItems.map(({ id, value }) => (
        <ListItem key={id} id={id} value={value} onClick={handleClick} />
      ))}
    </ul>
  );
}

export default List;

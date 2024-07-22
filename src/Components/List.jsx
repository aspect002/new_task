import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import ListItem from './ListItem';
import MyContext from './My_context';
function List({ data }) {

  const value = useContext(MyContext);
  console.log(`Дочерний компонент ${value}`);
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data)
  }, [data])

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

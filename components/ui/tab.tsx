import clsx from 'clsx';

interface TabProps {
  items: { id: number; label: string }[];
  tabIndex: number;
  onTabIndexChange: (index: number) => void;
}
function Tab({ items, tabIndex, onTabIndexChange }: TabProps) {
  return (
    <ul className="mb-10 flex cursor-pointer px-6" role="tab">
      {items.map((item) => (
        <li
          key={item.id}
          className={clsx('flex-1 border-b-2 pb-2 text-center text-[#b3b3b3]', {
            'border-black text-black': tabIndex === item.id,
          })}
          onClick={() => onTabIndexChange(item.id)}
        >
          <p>{item.label}</p>
        </li>
      ))}
    </ul>
  );
}

export default Tab;

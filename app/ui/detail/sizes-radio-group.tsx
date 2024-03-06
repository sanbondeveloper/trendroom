import React from 'react';
import clsx from 'clsx';
import { SIZES } from '@/app/lib/constants';

interface ISizesRadioGroupProps {
  selectedSize: string;
  onSizeChange: (newSize: string) => void;
  onClose: () => void;
}

export default function SizesRadioGroup({ selectedSize, onSizeChange, onClose }: ISizesRadioGroupProps) {
  return (
    <fieldset>
      <legend className="sr-only">사이즈 선택</legend>

      <div className="mx-auto my-0 grid w-[400px] grid-cols-3 gap-6 py-16">
        {SIZES.map((size) => (
          <div
            key={size}
            tabIndex={0}
            onClick={() => {
              onSizeChange(size);
              onClose();
            }}
            className={clsx('cursor-pointer rounded-xl border py-4 text-center', {
              'border-black': selectedSize === size,
            })}
          >
            <input
              tabIndex={-1}
              id={size}
              value={size}
              type="radio"
              name="size"
              className="pointer-events-none fixed opacity-0"
            />
            <label htmlFor={size} className="cursor-pointer">
              {size}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

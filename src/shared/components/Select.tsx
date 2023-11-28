import { Listbox } from "@headlessui/react";
import { useState } from "react";

interface SelectClassnames {
  Selected: string;
  Active: string;
  Default: string;
}

const DEFAULT_CLASSNAMES: SelectClassnames = {
  Selected: 'bg-blue-200 text-blue-800',
  Active: 'bg-blue-200 text-blue-800',
  Default: 'bg-white text-black'
};

interface SelectProps<T, O extends SelectOption<T>> {
  classNames?: Partial<SelectClassnames>;
  options: O[];
  placeholder?: string;
  selectedOption?: O;
  onSelect?: (val: O) => void;
}

export interface SelectOption<T> {
  id: string;
  name: string;
  val?: T;
}

export const Select = <T, O extends SelectOption<T>>({
  classNames = DEFAULT_CLASSNAMES,
  options,
  placeholder = 'None',
  selectedOption,
  onSelect
}: SelectProps<T, O>) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionId: string) => {
    const optionById = options?.find(o => o.id === optionId);
    onSelect(optionById);
  };

  const optionStyles = {
    ...DEFAULT_CLASSNAMES,
    ...classNames
  };

  return <div className="w-72 relative">
  <Listbox value={selectedOption?.id} onChange={handleSelect} disabled={!options?.length}>
    <Listbox.Button
      className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-base shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg hover:bg-white hover:cursor-pointer disabled:bg-gray-200"
      onClick={() => setOpen(prev => !prev)}
    >
      {selectedOption?.name || placeholder}
    </Listbox.Button>
    { open && (
      <Listbox.Options
        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50"
        static
      >
        {(options || []).map((option) => (
          <Listbox.Option
            key={option.id}
            value={option.id}
            className={({ active, selected }) => 
              `px-2 py-2 hover:cursor-pointer text-lg
              ${(active && !selected) && optionStyles.Active || ''}
              ${selected && optionStyles.Selected || ''}
              `
            }
          >
            {option.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    )}
  </Listbox>
</div>;
}
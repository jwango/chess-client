import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";

interface SelectProps<T, O extends SelectOption<T>> {
  key: string;
  options: O[];
  placeholder?: string;
  onSelect?: (val: O) => void;
}

export interface SelectOption<T> {
  id: string;
  name: string;
  val?: T;
}

export const Select = <T, O extends SelectOption<T>>({ key, options, placeholder = 'None', onSelect }: SelectProps<T, O>) => {
  const [selectedOption, setSelectedOption] = useState<O>(null);

  useEffect(() => {
    onSelect && onSelect(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    if (options?.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [key]);

  return <div className="w-72 relative">
  <Listbox value={selectedOption} onChange={setSelectedOption}>
    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-base shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg hover:bg-white hover:cursor-pointer">
      {selectedOption?.name || placeholder}
    </Listbox.Button>
    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
      {(options || []).map((option) => (
        <Listbox.Option
          key={option.id}
          value={option}
          className={({ active }) => 
            `px-2 py-2 hover:cursor-pointer text-lg
            ${active ? 'bg-blue-200 text-blue-800' : 'bg-white text-black'}`
          }
        >
          {option.name}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
</div>;
}
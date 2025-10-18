import React, { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../../components/ui/command";
import { Button } from "../../../components/ui/button";

const EcuSearchCombobox = ({ options, selectedValue, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Use useMemo to filter options based on the search term
  const filteredOptions = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // 🛑 Optimization: Agar search term nahi hai, toh sirf pehle 50 options dikhao
    if (!lowerCaseSearchTerm) {
      return options.slice(0, 50);
    }

    return options.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, options]);

  const currentSelectionName = selectedValue
    ? options.find((item) => item.name === selectedValue)?.name ||
      "Select ECU ID"
    : "Select ECU ID";

  const handleSelect = (value) => {
    // value yahan item.name hoga (lowercase/normalized nahi)
    onValueChange(value);
    setOpen(false); // Selection ke baad modal band kar do
    setSearchTerm(""); // Search term clear kar do
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Button will replace the SelectTrigger UI */}
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between h-12 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 text-zinc-900 dark:text-white"
        >
          {currentSelectionName}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-[425px] dark:bg-[#242526] border-zinc-200 dark:border-gray-600">
        <DialogHeader className="p-4 border-b border-zinc-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold dark:text-white">
            Search ECU ID ({options.length} Total)
          </DialogTitle>
        </DialogHeader>

        <Command shouldFilter={false} className="dark:bg-[#242526]">
          {/* Custom Search Input (CommandInput) */}
          <div className="flex items-center border-b px-3 dark:border-gray-700">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 dark:text-gray-400" />
            <input
              placeholder="Search ECU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 dark:text-white disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* List of Filtered Options */}
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, idx) => (
                <CommandItem
                  key={idx}
                  value={item.name}
                  onSelect={() => handleSelect(item.name)}
                  className="dark:text-white dark:hover:bg-[#2f3031] cursor-pointer"
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedValue === item.name
                        ? "opacity-100 text-red-600"
                        : "opacity-0"
                    }`}
                  />
                  {item.name}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty className="py-6 text-center text-sm dark:text-gray-400">
                No ECU found matching "{searchTerm}"
              </CommandEmpty>
            )}
          </CommandGroup>
        </Command>

        {/* Limit Warning/Info */}
        {searchTerm === "" && options.length > 50 && (
          <div className="p-4 text-xs text-center text-zinc-500 dark:text-gray-400 border-t dark:border-gray-700">
            Start typing to search all {options.length} ECUs.
          </div>
        )}
        {searchTerm !== "" &&
          filteredOptions.length > 0 &&
          filteredOptions.length < options.length && (
            <div className="p-4 text-xs text-center text-zinc-500 dark:text-gray-400 border-t dark:border-gray-700">
              Found {filteredOptions.length} results.
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default EcuSearchCombobox;

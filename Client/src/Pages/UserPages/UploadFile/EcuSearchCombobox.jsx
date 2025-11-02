import { useState, useMemo } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

const EcuSearchCombobox = ({ options, selectedValue, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    if (!lower) return options.slice(0, 50);
    return options.filter((i) => i.name.toLowerCase().includes(lower));
  }, [searchTerm, options]);

  const currentSelectionName =
    selectedValue && options.find((i) => i.name === selectedValue)?.name
      ? options.find((i) => i.name === selectedValue)?.name
      : "Select ECU ID";

  const handleSelect = (value) => {
    onValueChange(value);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between h-12 
          bg-white text-zinc-900 border border-zinc-300 
          dark:bg-[#1f1f22] dark:text-gray-100 dark:border-gray-700 
          hover:bg-zinc-50 dark:hover:bg-[#2a2b2d] 
          transition-colors"
          >
            {currentSelectionName}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-60 dark:text-gray-400" />
          </Button>
        </DialogTrigger>

        <AnimatePresence>
          {open && (
            <DialogContent
              className="p-0 sm:max-w-[425px] 
              bg-white dark:bg-[#1f1f22] 
              border border-zinc-200 dark:border-gray-700 
              shadow-xl rounded-xl overflow-hidden transition-colors"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <DialogHeader className="p-4 border-b border-zinc-200 dark:border-gray-700">
                  <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Search ECU ID ({options.length} Total)
                  </DialogTitle>
                </DialogHeader>

                <Command shouldFilter={false}>
                  <div className="flex items-center border-b px-3 border-zinc-200 dark:border-gray-700">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-500 dark:text-gray-400" />
                    <input
                      placeholder="Search ECU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none 
                      placeholder:text-zinc-500 text-zinc-900 
                      dark:text-white dark:placeholder:text-gray-400 
                      disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                    <AnimatePresence>
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((item, idx) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15, delay: idx * 0.01 }}
                          >
                            <CommandItem
                              value={item.name}
                              onSelect={() => handleSelect(item.name)}
                              className="dark:text-white dark:hover:bg-[#2a2b2d] 
                              text-zinc-900 hover:bg-zinc-100 cursor-pointer transition-colors"
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedValue === item.name
                                    ? "opacity-100 text-blue-600 dark:text-blue-400"
                                    : "opacity-0"
                                }`}
                              />
                              {item.name}
                            </CommandItem>
                          </motion.div>
                        ))
                      ) : (
                        <CommandEmpty className="py-6 text-center text-sm text-zinc-500 dark:text-gray-400">
                          No ECU found matching "{searchTerm}"
                        </CommandEmpty>
                      )}
                    </AnimatePresence>
                  </CommandGroup>
                </Command>

                {searchTerm === "" && options.length > 50 && (
                  <div className="p-4 text-xs text-center text-zinc-500 dark:text-gray-400 border-t border-zinc-200 dark:border-gray-700">
                    Start typing to search all {options.length} ECUs.
                  </div>
                )}
                {searchTerm !== "" &&
                  filteredOptions.length > 0 &&
                  filteredOptions.length < options.length && (
                    <div className="p-4 text-xs text-center text-zinc-500 dark:text-gray-400 border-t border-zinc-200 dark:border-gray-700">
                      Found {filteredOptions.length} results.
                    </div>
                  )}
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </motion.div>
  );
};

export default EcuSearchCombobox;

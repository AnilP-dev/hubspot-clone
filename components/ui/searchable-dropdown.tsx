import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from './checkbox';

interface SearchableDropdownProps {
    name : string;
    items : string[];
    // onFilterChange : 
}

export default function SearchableDropdown({
    name,
    items,
    // onFilterChange
}:SearchableDropdownProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [itemChecked, setItemChecked] = useState<{name: string, checked : boolean}[]>([]);
    const containerRef = useRef<HTMLButtonElement | null>(null);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        const y = items.map((x) => {
            return {
                name : x,
                checked : false
            }
        });

        setItemChecked(y);
    },[items]); 

    useEffect(() => {
        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            if (!open) return;
            const node = containerRef.current;
            if (node && !node.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onPointerDown, true);
        document.addEventListener('touchstart', onPointerDown, true);
        return () => {
            document.removeEventListener('mousedown', onPointerDown, true);
            document.removeEventListener('touchstart', onPointerDown, true);
        };
    }, [open]);

    const visibleItems = query.trim().length === 0
        ? itemChecked
        : itemChecked.filter(i => i.name.toLowerCase().includes(query.toLowerCase().trim()));

    return (
        <button ref={containerRef} className='flex justify-center items-center py-4 px-2 relative '>
            <a
                href='#'
                className='text-hubspot-secondary font-bold text-sm'
                onClick={(e) => { e.preventDefault(); setOpen(!open); }}
            >
                {name}
            </a>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-hubspot-secondary ml-1"></div>

            <div
                className={
                    `absolute left-0 bg-white top-full mb-2 mt-4 min-h-10 min-w-60 border border-hubspot-view-tab-border-color z-40 shadow-md origin-top-left transform transition-all duration-200 ease-out ${
                        open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                    }`
                }
            >
                {/* style="position: absolute; pointer-events: none; left: 44.0352px; bottom: 100%; transform: rotate(180deg);" */}
                <div className='flex flex-col items-center justify-center w-full'>
                    <div className='p-4 bg-inactive-background w-full relative'>
                        <input
                            className='border border-hubspot-view-tab-border-color font-medium text-hubspot-primary text-base pl-2 h-8 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-hubspot-inset-ring-color'
                            type="text"
                            placeholder='Search'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Search size={20} color='#33475b' className=' text-hubspot-primary font-light absolute right-6 top-1/2 -translate-y-1/2'/>
                    </div>
                    <div className='w-full'>
                        {visibleItems.map((item, idx) => {
                            return (
                                <div 
                                    onClick={() => {
                                        const idx = itemChecked.findIndex(x => x.name === item.name);
                                        const data = itemChecked[idx];

                                        setItemChecked([
                                            ...itemChecked.slice(0, idx),
                                            {
                                                ...data,
                                                checked : !data.checked
                                            },
                                            ...itemChecked.slice(idx + 1)
                                        ]);
                                    }} 
                                    key={`${item}-${idx}`} className='min-h-10 px-4 py-1 flex items-center justify-start w-full text-hubspot-table-header-color font-light hover:bg-hubspot-cell-focused-color' >
                                    <Checkbox 
                                        checked={item.checked}
                                        className="border border-hubspot-view-tab-border-color w-5 h-5 bg-white data-[state=checked]:border-hubspot-secondary data-[state=checked]:bg-white data-[state=checked]:text-hubspot-secondary"
                                    />
                                    <span className='flex-1 text-left pl-4'>
                                        {item.name}
                                    </span>
                                </div>
                            )
                        })}

                        
                    </div>
                </div>
                <svg className={`absolute pointer-events-none left-11 bottom-full transform rotate-180 transition-all duration-200 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-0.5'}`} data-test-id="popover-arrow" fill="#F5F8FA" aria-hidden="true" width="30" height="28" viewBox="0 0 28 28"><path clip-path="url(#:rsg:)" fill="none" stroke="#CBD6E2" stroke-width="3" d="M0,0 H28 L14,14 Q14,14 14,14 Z"></path><path stroke="#F5F8FA" d="M0,0 H28 L14,14 Q14,14 14,14 Z"></path><clipPath id=":rsg:"><rect x="-1" y="1" width="30" height="28"></rect></clipPath></svg>
            </div>
        </button>
    );
}
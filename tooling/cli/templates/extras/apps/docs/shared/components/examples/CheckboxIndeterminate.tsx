'use client'

import { Checkbox } from '@workspace/ui/components/Checkbox'
import React from 'react'

export function CheckboxIndeterminate() {
    const [checkedItems, setCheckedItems] = React.useState([false, false, false])

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    const handleAllChange = (checked: boolean) => {
        setCheckedItems(checkedItems.map(() => checked))
    }

    const handleItemChange = (index: number, checked: boolean) => {
        const newCheckedItems = [...checkedItems]
        newCheckedItems[index] = checked
        setCheckedItems(newCheckedItems)
    }

    return (
        <div className="grid gap-2">
            <Checkbox isSelected={allChecked} isIndeterminate={isIndeterminate} onChange={handleAllChange}>
                Select all
            </Checkbox>
            <div className="ml-4 grid gap-2">
                <Checkbox isSelected={checkedItems[0]} onChange={checked => handleItemChange(0, checked)}>
                    Item 1
                </Checkbox>
                <Checkbox isSelected={checkedItems[1]} onChange={checked => handleItemChange(1, checked)}>
                    Item 2
                </Checkbox>
                <Checkbox isSelected={checkedItems[2]} onChange={checked => handleItemChange(2, checked)}>
                    Item 3
                </Checkbox>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react';

import "../css/ManageAddList.css";


function ManageAddList({list, setList, options, limit, message}: {
        list: string[],
        setList(arg: string[]): void,
        options: string[],
        message: string,
        limit: number
    }) {
    const [ selected, setSelected ] = useState<string>(options.filter(opt => !list.includes(opt))[0]);

    const handleAdd = () => {
        setList(list.concat(selected));
    }
    const handleDelete = (item: string) => {
        setList(list.filter(l => l != item));
    }

    useEffect(() => {
        setSelected(options.filter(opt => !list.includes(opt))[0]);
    }, [list])
    
    return (
        <div>
            <div className="form-group">
                <label htmlFor="opt"><h5>{message}:</h5></label>
                <div className="mb-1">
                    {list.map(item => (
                        <span className="badge selected-badge mx-1" key={item}>{item}<sup className="selected-x" onClick={()=>handleDelete(item)}>x</sup></span>
                    ))}
                </div>
                <div className="form-inline">
                    <select className="form-control" id="opt"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}>
                        {options.filter(opt => !list.includes(opt))
                                .map(opt => (
                            <option key={opt}>{opt}</option>
                        ))}
                        <option>Other</option>
                    </select>
                    <button type="button" className="btn btn-outline-primary ml-1"
                        onClick={handleAdd}
                        disabled={list.length >= limit ? true : false}>Add</button>
                </div>
            </div>
        </div>
    )
}
    
export default ManageAddList;
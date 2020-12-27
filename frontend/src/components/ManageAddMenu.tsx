import React, { useEffect, useState } from 'react';

import { menuType, menuItemType } from '../utils/types';
import "../css/ManageAddList.css";


function ManageMenuItem({menu}: {menu: menuType}) {
    const [ itemName, setItemName ] = useState("");

    const handleAddItem = () => {
        console.log("add item");
    }
    const handleDeleteItem = (item: menuItemType) => {
        console.log("delete item")
    }

    return (
        <div key={menu.name} className="border p-2 mx-1 my-2">
            <h6>{menu.name}</h6>
            {menu.items.map(item => (
                <div className="card-body" key={item.name}>
                    {item.name}
                    {item.description}
                    {item.price}
                </div>
            ))}
            <button type="button" className="btn btn-outline-primary">Add Item</button>        
        </div>
    );
}

function ManageAddMenu({menus, setMenus}: {
        menus: menuType[],
        setMenus(arg: menuType[]): void
    }) {
    const [ menuName, setMenuName ] = useState("");
    
    const handleAddMenu = () => {
        if (menuName !== "") {
            setMenus(menus.concat({name: menuName, items: []} as menuType));
            setMenuName("");
        }
    }
    const handleDeleteMenu = (menu: menuType) => {
        console.log("delete menu")
    }

    return (
        <div>
            <div className="form-group">
                <div><h5>Menus:</h5></div>
                {menus.map(menu => (
                    <ManageMenuItem menu={menu} key={menu.name} />
                ))}
                <div className="form-inline">
                    <input type="text" className="form-control" placeholder="Menu name" value={menuName} onChange={(e)=>setMenuName(e.target.value)} />
                    <button type="button" className="btn btn-outline-primary ml-1" onClick={handleAddMenu}>Add Menu</button>
                </div>
            </div>
        </div>
    )
}
    
export default ManageAddMenu;
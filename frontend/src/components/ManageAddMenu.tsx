import React, { useState } from 'react';

import { menuType, menuItemType } from '../utils/types';
import "../css/ManageAddMenu.css";


function ManageMenuItem({menu, menus, setMenus}: {
        menu: menuType,
        menus: menuType[],
        setMenus(arg: menuType[]): void
    }) {
    const [ itemName, setItemName ] = useState("");
    const [ itemDescription, setItemDescription ] = useState("");
    const [ itemPrice, setItemPrice ] = useState(0);

    const handleAddItem = () => {
        setMenus(menus.map(m => m.name === menu.name ? {
            ...menu,
            items: menu.items.concat({
                name: itemName,
                description: itemDescription,
                price: itemPrice
            } as menuItemType)
        } : m));
        setItemName("");
        setItemDescription("");
        setItemPrice(0);
    }
    const handleDeleteItem = (item: menuItemType) => {
        console.log("delete item")
    }

    return (
        <div key={menu.name} className="border rounded p-2 mx-1 my-2">
            <h5>{menu.name}</h5>
            <div className="d-flex flex-wrap">
                {menu.items.map(item => (
                    <div className="card menu-card" key={item.name}>
                        <div>
                            <span>{item.name}</span>
                        </div>
                        <div>
                            <span>{item.description}</span>
                        </div>
                        <div>
                            <span>${item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="card menu-card">
                <input type="text" className="form-control" placeholder="Item name" maxLength={40}
                    value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <input type="text" className="form-control" placeholder="Description"
                    value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                <div className="input-group">
                    <div className="input-group-prepend"><span className="input-group-text">$</span></div>
                    <input type="number" id="price" className="form-control" placeholder="Unit price"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                        min={0} step={0.01} />
                </div>
                <button type="button" className="btn btn-outline-primary"
                    disabled={!(itemPrice >= 0 && itemName.length > 0)}
                    onClick={handleAddItem}>
                    Add Item
                </button>
            </div>
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
                    <ManageMenuItem menu={menu} menus={menus} setMenus={setMenus} key={menu.name} />
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
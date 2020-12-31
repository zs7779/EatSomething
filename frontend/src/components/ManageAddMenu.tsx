import React, { useState } from 'react';

import { menuType, menuItemType } from '../utils/types';
import "../css/ManageAddMenu.css";


function ManageMenu({menu, menus, setMenus}: {
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
        setMenus(menus.map(m => m.name === menu.name ? {
            ...menu,
            items: menu.items.filter(i => i.name === item.name ? false : true)
        } : m));
    }

    return (
        <div key={menu.name}>
            <h5>{menu.name}</h5>
            <div className="d-flex flex-wrap">
                {menu.items.map(item => (
                    <div className="card menu-card" key={item.name}>
                        <div>
                            <button className="float-right btn btn-light delete-button" onClick={() => handleDeleteItem(item)}>x</button>
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
                    </div>
                ))}
            </div>
            <div className="card menu-card">
                <input type="text" className="form-control" placeholder="Item name" maxLength={40}
                    value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <textarea className="form-control" placeholder="Description" rows={3}
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
        setMenus(menus.filter(m => m.name === menu.name ? false : true));
    }

    return (
        <div>
            <div className="form-group">
                <div><h5>Menus:</h5></div>
                {menus.map(menu => (
                    <div className="border rounded p-2 mx-1 my-2" key={menu.name}>
                        <button className="float-right btn btn-light delete-button" onClick={() => handleDeleteMenu(menu)}>x</button>
                        <ManageMenu menu={menu} menus={menus} setMenus={setMenus} />
                    </div>
                ))}
                <div className="form-inline">
                    <input type="text" className="form-control" placeholder="Menu name"
                        value={menuName}
                        onChange={(e)=>setMenuName(e.target.value)} />
                    <button type="button" className="btn btn-outline-primary ml-1"
                        disabled={menuName===""}
                        onClick={handleAddMenu}>Add Menu</button>
                </div>
            </div>
        </div>
    )
}
    
export default ManageAddMenu;
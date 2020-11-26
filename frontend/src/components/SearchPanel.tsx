import React from 'react';

function SearchPanel() {
    return (
        <form className="form-inline justify-content-center">
            <div>
                <input type="text" name="search"
                    placeholder="Restaurant or Cuisine"
                    className="form-control mx-2" style={inputStyle} size={60}
                />
                <button className="btn btn-primary px-5" style={inputStyle}>Go</button>
            </div>
        </form>
    )
}

const inputStyle: Record<string, string> = {
    'borderRadius': '10px'
};
    
export default SearchPanel;
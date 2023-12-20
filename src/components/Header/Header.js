import React from 'react';

function Header() {
    return (
        <div>
            <header>
                <h2>Kitaorganisation</h2>
            </header>
            <div>
                <div className="navButtons">
                    <a href="../Notfallbetreuung"><button className="navItem">Notbetreuung verwalten</button></a>
                    <a href="../"><button className="navItem">Home</button></a>
                    <a href="../Admin"><button className="navItem">Admin</button></a>
                    <a href="../Logout"><button className="navItem">Logout</button></a>
                </div>
            </div>
        </div>
    );
}

export default Header;
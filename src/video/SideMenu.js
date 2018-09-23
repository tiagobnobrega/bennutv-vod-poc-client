import React from 'react';
import './SideMenu.css';

const buildOnclick = link => () => {
  link.onClick && link.onClick(link);
};
const SideMenu = ({ links = [], labelAttr = 'label', keyAttr = 'guid', activeLinkKey='' }) => (
  <React.Fragment>
    <div className="menu">
      <div className="links">
        {links.map(l => (
          <div key={l[keyAttr]} href="#" onClick={buildOnclick(l)} className={activeLinkKey === l[keyAttr]?'selected': ''}>
            {l[labelAttr]}
          </div>
        ))}
      </div>
    </div>
  </React.Fragment>
);

export default SideMenu;

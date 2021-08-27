import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
    return (
        <>
          <div className="navigation-tab">
            <Link to="#" className="navigation-tab__link">Узнать больше</Link>
          </div>
        </>
      );
}


export default NavTab;
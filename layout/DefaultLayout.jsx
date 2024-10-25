import { Outlet } from 'react-router-dom';  
import Sidebar from '../components/Sidebar/Sidebar';
import { ModalProvider } from '../model/ModalContext';  // Import ModalProvider

const DefaultLayout = () => {

  return (
    <ModalProvider>
      <div className="layout-main">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main>
              <div className="main-content">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default DefaultLayout;

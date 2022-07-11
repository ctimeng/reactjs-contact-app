import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div className="container mt-3">
      <Outlet />
    </div>
  );
}

export default Index;

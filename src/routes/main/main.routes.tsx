import React from 'react';
import { connect } from 'react-redux';
import ToastView from '../../components/toast-view';
import { RootState } from '../../redux/store';
import RoleBasedNavigation from '../../components/role-based-navigation';

interface IProps {
  isAuthenticated: boolean;
}
const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const MainNav = ({ isAuthenticated }: IProps) => {
  if (!isAuthenticated) {
    return null; // or loading screen
  }

  return (
    <>
      <RoleBasedNavigation />
      <ToastView />
    </>
  );
};

export default connect(mapStateToProps)(MainNav);

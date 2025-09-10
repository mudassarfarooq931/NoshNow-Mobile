import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import Toast, { ToastType } from 'react-native-toast-notifications';
import { connect } from 'react-redux';
import store, { RootState } from '../redux/store';
import { setToastMessage } from '../redux/slice/toast-slice';
import { colors } from '../constants';

//---------------------
// Redux mapping
const mapStateToProps = (state: RootState) => {
  return {
    message: state.toast.message,
  };
};

//---------------------
interface ToastViewProps {
  dark?: boolean;
  message?: string;
  offset?: number;
}

const ToastView = ({ dark, message, offset }: ToastViewProps) => {
  // Correct ref typing using ToastType
  const toastRef = useRef<ToastType | any>(null);

  const dispatch = store.store.dispatch;

  useEffect(() => {
    if (message) {
      toastRef.current?.hideAll();
      toastRef.current?.show(message);
      dispatch(setToastMessage(null));
    }
  }, [message, dispatch]);

  return (
    <Toast
      ref={toastRef}
      textStyle={[dark ? styles.darkTextStyle : styles.textStyle]}
      style={[dark ? styles.darkContainer : styles.container]}
      duration={3000}
      placement="top"
      type="normal"
      animationType="slide-in"
      offset={offset ?? 30}
    />
  );
};

export default connect(mapStateToProps)(ToastView);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginTop: 15,
    zIndex: 99999999,
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  darkContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    zIndex: 99999999,
  },
  darkTextStyle: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

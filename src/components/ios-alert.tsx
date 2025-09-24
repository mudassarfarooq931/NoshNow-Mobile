import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { getResponsiveDimensions } from '../utils/device-helper';

const { width } = Dimensions.get('window');

interface IOSAlertProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const IOSAlert: React.FC<IOSAlertProps> = ({
  visible,
  title,
  message,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(1.1));

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 10,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(1.1);
    }
  }, [visible]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  const isDeleteButton = confirmText.toLowerCase() === 'delete';
  const responsive = getResponsiveDimensions();
  console.log(responsive, '....responsive,,,,');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [{ scale: scaleAnim }],
              width: responsive.isTablet ? width * 0.4 : width * 0.5,
              paddingVertical: responsive.spacing.lg,
              paddingHorizontal: responsive.spacing.md,
            },
          ]}
        >
          <Text style={[styles.title, { fontSize: responsive.fontSize.large }]}>
            {title}
          </Text>
          <Text
            style={[styles.message, { fontSize: responsive.fontSize.medium }]}
          >
            {message}
          </Text>

          {/* Buttons */}
          <View
            style={[styles.buttonLayout, { marginTop: responsive.spacing.lg }]}
          >
            {cancelText && (
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  {
                    height: responsive.buttonHeight.medium,
                    marginRight: responsive.spacing.sm,
                  },
                ]}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { fontSize: responsive.fontSize.medium },
                  ]}
                >
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.confirmButton,
                isDeleteButton ? styles.deleteConfirmButton : null,
                {
                  height: responsive.buttonHeight.medium,
                  marginLeft: responsive.spacing.sm,
                },
              ]}
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.confirmButtonText,
                  isDeleteButton ? styles.deleteConfirmButtonText : null,
                  { fontSize: responsive.fontSize.medium },
                ]}
              >
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 6,
  },
  message: {
    color: '#8e8e93',
    textAlign: 'center',
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 50,
  },
  cancelButtonText: {
    fontWeight: '600',
    color: '#fff',
  },
  confirmButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 50,
  },
  confirmButtonText: {
    fontWeight: '600',
    color: '#fff',
  },

  deleteConfirmButton: {
    backgroundColor: '#E0E0E2',
  },
  deleteConfirmButtonText: {
    color: '#ff3b30', // Red text
  },
});

export default IOSAlert;

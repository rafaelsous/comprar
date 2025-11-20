import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { styles } from "./styles";

type Props = {
  visible: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  showActionButtons?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AlertDialog({
  visible,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showActionButtons = false,
  onConfirm,
  onCancel,
}: Readonly<Props>) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent // ⭐ garante overlay sobre status bar no Android
    >
      {/* Root absoluto cobrindo toda a tela */}
      <View style={styles.root}>
        {/* Overlay cobrindo 100% da tela física */}
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        {/* Card centralizado */}
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>

          {typeof message === "string" ? (
            <Text style={styles.message}>{message}</Text>
          ) : (
            message
          )}

          {showActionButtons && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={onCancel}
              >
                <Text style={styles.buttonSecondaryText}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={onConfirm}
              >
                <Text style={styles.buttonPrimaryText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

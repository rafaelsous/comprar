import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject, // 🟢 cobre status bar + gesture area
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // 🟢 garante cobertura total
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  dialog: {
    position: "relative",
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    zIndex: 10,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },

  title: {
    position: "absolute",
    right: 0,
    left: 0,
    padding: 16,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    fontSize: 18,
    fontWeight: 700,
    color: "#1E1E1E",
    textAlign: "center",
    backgroundColor: "#D0D2D8",
  },

  message: {
    marginTop: 48,
    marginBottom: 24,
    fontSize: 16,
    color: "#1E1E1E",
    textAlign: "center",
    lineHeight: 24,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  buttonSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  buttonSecondaryText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },

  buttonPrimary: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#cc2936",
    borderRadius: 6,
  },

  buttonPrimaryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
  },
});

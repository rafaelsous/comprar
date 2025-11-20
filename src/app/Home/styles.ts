import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
    alignItems: "center",
    backgroundColor: "#D0D2D8",
  },
  logo: {
    width: 134,
    height: 34,
  },
  form: {
    width: "100%",
    marginTop: 42,
    paddingHorizontal: 24,
    gap: 8,
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 24,
    padding: 24,
    paddingTop: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    paddingBottom: 12,
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E6EC",
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    fontSize: 12,
    fontWeight: 700,
    color: "#828282",
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 16,
    backgroundColor: "#EEF0F5",
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  empty: {
    textAlign: "center",
  },
});

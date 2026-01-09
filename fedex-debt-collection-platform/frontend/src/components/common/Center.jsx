export default function Center({ children }) {
  return (
    <div style={wrapper}>
      {children}
    </div>
  );
}

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

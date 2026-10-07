import { Toaster } from "sonner";
import ChatAndTools from "./components/ChatAndTools";

function App() {
  return (
    <div className="h-dvh w-full overflow-hidden">
      <ChatAndTools />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "hsl(0 0% 100%)",
            color: "hsl(240 10% 3.9%)",
            border: "1px solid hsl(240 5.9% 90%)",
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
}

export default App;
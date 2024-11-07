import { Panel } from "react-resizable-panels";
import { useState } from "react";

const INSTANCE_URI = "http://localhost:3002";

export const WebViewPanel: React.FC = () => {
  // State to control whether the iframe is visible
  const [showWebView, setShowWebView] = useState(false);

  return (
    <Panel defaultSize={50}>
      {!showWebView ? (
        <div className="flex justify-center items-center w-full h-full">
          <button
            onClick={() => setShowWebView(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Show Webview
          </button>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={INSTANCE_URI}
        ></iframe>
      )}
    </Panel>
  );
};

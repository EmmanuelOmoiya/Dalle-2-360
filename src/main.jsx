import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./assets/css/style.css";
import './assets/css/index.css';
import { ContextProvider } from './Context/AppContext';

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</React.StrictMode>
);

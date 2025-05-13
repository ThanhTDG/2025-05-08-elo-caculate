import React from "react";
import "../css/loading.component.css"; // We'll create this CSS file next

const LoadingIndicator = () => {
	return (
		<div className="loading-overlay">
			<div className="loading-spinner"></div>
			<p className="loading-text">Loading...</p>
		</div>
	);
};

export default LoadingIndicator;

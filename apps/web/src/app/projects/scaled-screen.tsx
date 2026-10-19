"use client";

import { useState } from "react";

export type ScaledScreenProps = {
	designWidthPx: number;
	children: React.ReactNode;
};

export function ScaledScreen({ designWidthPx, children }: ScaledScreenProps) {
	const [zoom, setZoom] = useState(0);
	const isMeasured = zoom > 0;

	function observeWidth(node: HTMLDivElement) {
		const observer = new ResizeObserver(() =>
			setZoom(node.clientWidth / designWidthPx),
		);
		observer.observe(node);
		return () => observer.disconnect();
	}

	return (
		<div ref={observeWidth} className="w-full">
			{isMeasured && (
				<div style={{ width: designWidthPx, zoom }}>{children}</div>
			)}
		</div>
	);
}

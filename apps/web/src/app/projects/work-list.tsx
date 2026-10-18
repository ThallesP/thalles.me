"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import { GroupedList } from "@/components/grouped-list/grouped-list";
import type { BrowserWorkProject, WorkProject } from "@/content/projects-work";

import { PreviewDock } from "./preview-dock";
import { PreviewWindow, type PreviewWindowHandle } from "./preview-window";
import { WorkRow, type WorkRowAnchors } from "./work-row";

type PreviewWindowState = {
	project: BrowserWorkProject;
	mode: "zoomed" | "minimized";
};

export type WorkListProps = {
	projects: WorkProject[];
};

export function WorkList({ projects }: WorkListProps) {
	const [hoveredName, setHoveredName] = useState<string | null>(null);
	const [focusedName, setFocusedName] = useState<string | null>(null);
	const [pinnedName, setPinnedName] = useState<string | null>(null);
	const [dismissedName, setDismissedName] = useState<string | null>(null);
	const [previewWindow, setPreviewWindow] = useState<PreviewWindowState | null>(
		null,
	);
	const windowRef = useRef<PreviewWindowHandle>(null);
	const dockRef = useRef<HTMLButtonElement>(null);
	const anchorsRef = useRef<WorkRowAnchors>(null);
	const isAnimatingRef = useRef(false);

	const zoomedName =
		previewWindow?.mode === "zoomed" ? previewWindow.project.name : null;
	const isMinimized = previewWindow?.mode === "minimized";
	const previewProject = previewWindow?.project;

	async function runAnimation(animation: () => Promise<void>) {
		if (isAnimatingRef.current) return;

		isAnimatingRef.current = true;
		await animation();
		isAnimatingRef.current = false;
	}

	function handleHoverChange(name: string, isHovered: boolean) {
		if (isHovered) {
			setHoveredName(name);
			if (pinnedName !== name) setPinnedName(null);
			return;
		}

		setHoveredName(null);
		if (pinnedName === name) setPinnedName(null);
		if (dismissedName === name) setDismissedName(null);
	}

	function handleFocusChange(name: string, isFocused: boolean) {
		if (isFocused) {
			setFocusedName(name);
			return;
		}

		setFocusedName(null);
		if (pinnedName === name) setPinnedName(null);
		if (dismissedName === name) setDismissedName(null);
	}

	function handleTogglePin(name: string) {
		setDismissedName(null);
		setPinnedName(pinnedName === name ? null : name);
	}

	function openWindow(project: BrowserWorkProject, source: DOMRect) {
		if (isAnimatingRef.current) return;

		flushSync(() => {
			setPreviewWindow({ project, mode: "zoomed" });
			setDismissedName(null);
		});
		windowRef.current?.show(source);
	}

	function handleZoom(project: BrowserWorkProject, anchors: WorkRowAnchors) {
		anchorsRef.current = anchors;
		openWindow(project, anchors.card.getBoundingClientRect());
	}

	function handleDockRestore() {
		const dock = dockRef.current;
		if (!previewWindow || !dock) return;

		openWindow(previewWindow.project, dock.getBoundingClientRect());
	}

	function handleRestore() {
		runAnimation(async () => {
			const anchors = anchorsRef.current;
			if (!previewWindow || !anchors) return;

			await windowRef.current?.hideInto(
				anchors.card.getBoundingClientRect(),
				0.6,
			);
			setPreviewWindow(null);
			setPinnedName(previewWindow.project.name);
			anchors.title.focus();
		});
	}

	function handleWindowClose() {
		runAnimation(async () => {
			const anchors = anchorsRef.current;
			if (!previewWindow || !anchors) return;

			await windowRef.current?.hideInPlace();
			setPreviewWindow(null);
			setDismissedName(previewWindow.project.name);
			anchors.title.focus();
		});
	}

	function handleWindowMinimize() {
		runAnimation(async () => {
			const dock = dockRef.current;
			if (!previewWindow || !dock) return;

			await windowRef.current?.hideInto(dock.getBoundingClientRect(), 0);
			minimize(previewWindow.project);
		});
	}

	function minimize(project: BrowserWorkProject) {
		flushSync(() => {
			setPreviewWindow({ project, mode: "minimized" });
			setDismissedName(project.name);
			setPinnedName(null);
		});
		dockRef.current?.focus();
	}

	function handleRowMinimize(
		project: BrowserWorkProject,
		anchors: WorkRowAnchors,
	) {
		if (isAnimatingRef.current) return;

		anchorsRef.current = anchors;
		minimize(project);
	}

	function handleRowClose(
		project: BrowserWorkProject,
		anchors: WorkRowAnchors,
	) {
		if (isAnimatingRef.current) return;

		if (previewProject?.name === project.name) setPreviewWindow(null);
		setDismissedName(project.name);
		setPinnedName(null);
		anchors.title.focus();
	}

	return (
		<>
			<GroupedList className="overflow-visible">
				{projects.map((project) => {
					const isPinned = pinnedName === project.name;
					const isHidden =
						dismissedName === project.name || zoomedName === project.name;
					const isActive =
						hoveredName === project.name ||
						focusedName === project.name ||
						isPinned;

					return (
						<WorkRow
							key={project.name}
							project={project}
							isPinned={isPinned}
							isPreviewShown={isActive && !isHidden}
							onHoverChange={handleHoverChange}
							onFocusChange={handleFocusChange}
							onTogglePin={handleTogglePin}
							onZoom={handleZoom}
							onMinimize={handleRowMinimize}
							onClose={handleRowClose}
						/>
					);
				})}
			</GroupedList>
			<PreviewWindow
				ref={windowRef}
				project={previewProject}
				onClose={handleWindowClose}
				onMinimize={handleWindowMinimize}
				onRestore={handleRestore}
			/>
			<PreviewDock
				ref={dockRef}
				project={previewProject}
				isShown={isMinimized}
				onRestore={handleDockRestore}
			/>
		</>
	);
}

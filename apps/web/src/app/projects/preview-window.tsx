"use client";

import Image from "next/image";
import { useImperativeHandle, useRef } from "react";

import type { BrowserWorkProject } from "@/content/projects-work";

import { AddressBar } from "./address-bar";
import { TrafficLights } from "./traffic-lights";
import {
	type Box,
	cancelAnimations,
	fadeIn,
	fadeOut,
	growFrom,
	shrinkInPlace,
	shrinkTo,
} from "./window-animation";

export type PreviewWindowHandle = {
	show: (source: Box) => void;
	hideInto: (target: Box, opacity: number) => Promise<void>;
	hideInPlace: () => Promise<void>;
};

export type PreviewWindowProps = {
	ref: React.Ref<PreviewWindowHandle>;
	project: BrowserWorkProject | undefined;
	onClose: () => void;
	onMinimize: () => void;
	onRestore: () => void;
};

export function PreviewWindow({
	ref,
	project,
	onClose,
	onMinimize,
	onRestore,
}: PreviewWindowProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const backdropRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const zoomRef = useRef<HTMLButtonElement>(null);

	async function hide(animatePanel: (panel: HTMLElement) => Promise<unknown>) {
		const dialog = dialogRef.current;
		const backdrop = backdropRef.current;
		const panel = panelRef.current;
		if (!dialog || !backdrop || !panel) return;

		await Promise.all([animatePanel(panel), fadeOut(backdrop)]);
		dialog.close();
		cancelAnimations(panel, backdrop);
	}

	useImperativeHandle(ref, () => ({
		show(source) {
			const dialog = dialogRef.current;
			const backdrop = backdropRef.current;
			const panel = panelRef.current;
			if (!dialog || !backdrop || !panel) return;

			cancelAnimations(panel, backdrop);
			dialog.showModal();
			bodyRef.current?.scrollTo({ top: 0 });
			growFrom(panel, source);
			fadeIn(backdrop);
			zoomRef.current?.focus({ preventScroll: true });
		},
		hideInto: (target, opacity) =>
			hide((panel) => shrinkTo(panel, target, opacity)),
		hideInPlace: () => hide(shrinkInPlace),
	}));

	function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
		event.preventDefault();
		onRestore();
	}

	return (
		<dialog
			ref={dialogRef}
			aria-label={project?.domain}
			onCancel={handleCancel}
			className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none place-items-center overflow-hidden bg-transparent p-0 backdrop:bg-transparent open:grid"
		>
			<button
				ref={backdropRef}
				type="button"
				tabIndex={-1}
				aria-label="Restore window"
				onClick={onRestore}
				className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[6px]"
			/>
			<div
				ref={panelRef}
				className="relative flex h-[600px] max-h-[calc(100dvh-48px)] w-[920px] max-w-[calc(100vw-48px)] origin-top-left flex-col overflow-hidden rounded-[14px] bg-card shadow-[0_0_0_0.5px_rgb(255_255_255/0.18),0_40px_120px_rgb(0_0_0/0.7),0_10px_30px_rgb(0_0_0/0.5)]"
			>
				<div className="flex h-10 shrink-0 items-center border-border border-b-[0.5px] bg-[#323234] px-3.5">
					<TrafficLights
						size="md"
						zoomRef={zoomRef}
						onClose={onClose}
						onMinimize={onMinimize}
						onZoom={onRestore}
					/>
					<span className="mr-0 ml-5 flex min-w-0 flex-1 justify-center sm:mr-[66px]">
						{project && <AddressBar size="md" domain={project.domain} />}
					</span>
				</div>
				<div
					ref={bodyRef}
					className="flex-1 overflow-y-auto overscroll-contain bg-black [scrollbar-color:rgb(152_152_157/0.6)_transparent] [scrollbar-width:thin]"
				>
					{project && (
						<Image
							src={project.screenshot.src}
							alt={`${project.domain}, full page`}
							width={project.screenshot.width}
							height={project.screenshot.height}
							sizes="(max-width: 968px) 100vw, 920px"
							className="block h-auto w-full"
						/>
					)}
				</div>
			</div>
		</dialog>
	);
}

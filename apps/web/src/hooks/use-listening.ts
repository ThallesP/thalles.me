import useSWR from "swr";

import type { Listening } from "@/entities/listening";
import { getListening } from "@/http/get-listening";

export function useListening(fallbackData: Listening) {
	const { data: listening } = useSWR("/api/listening", getListening, {
		fallbackData,
		refreshInterval: 15_000,
	});

	return listening;
}

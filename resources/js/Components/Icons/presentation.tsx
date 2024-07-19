import React from 'react';
import type { SVGProps } from 'react';

export default function RiPresentationLine(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 24 24" {...props}><path fill="black" d="M8 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5 16v6H3V10a3 3 0 0 1 5.106-2.137l2.374 2.243l2.313-2.313l1.414 1.414l-3.687 3.687L9 11.46V22H7v-6zm1-7a1 1 0 0 0-1 1v4h2v-4a1 1 0 0 0-1-1m13-4h-9V3h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-3.424l2.823 6h-2.21l-2.824-6H10v-2h9z"></path></svg>);
}
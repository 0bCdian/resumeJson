import { useRef, useState } from "react";
type Props = { value: string | undefined };

export function CopyInput({ value }: Props) {
	const ref = useRef<HTMLInputElement>(null);
	const [isCopied, setIsCopied] = useState(false);
	return (
		<div className="w-full">
			<div className="relative">
				<label htmlFor="apiValue" className="sr-only">
					Label
				</label>
				<input
					ref={ref}
					disabled
					id="apiValue"
					type="text"
					className="col-span-6 border border-gray-500  rounded-lg block w-full px-2.5 py-4  dark:placeholder-gray-400"
					value={value}
				/>
				<div
					data-copied={isCopied}
					onMouseDown={() => {
						if (ref.current) {
							navigator.clipboard
								.writeText(ref.current.value)
								.then(() => {
									if (isCopied) return;
									setIsCopied(true);
									setTimeout(() => {
										setIsCopied(false);
									}, 5000);
								})
								.catch((e) => console.error(e));
						}
					}}
					className="absolute cursor-pointer select-none end-2.5 top-1/2 -translate-y-1/2 data-[copied=true]:bg-success data-[copied=true]:text-success-content  bg-neutral border-gray-600 hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center "
				>
					<span id="default-message" className="inline-flex items-center">
						<svg
							className="w-3 h-3 me-1.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 18 20"
						>
							<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
						</svg>
						<span className="text-xs font-semibold">
							{isCopied ? "Copied" : "Copy"}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
}

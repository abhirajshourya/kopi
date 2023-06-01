import { useState } from 'react';

const MAX_TAG_LENGTH = 6;

const useTagInput = (initialValue: string): [string, (value: string) => void] => {
	const [tag, setTag] = useState(initialValue);

	const setLimitedTag = (value: string): void => {
		if (value.length <= MAX_TAG_LENGTH) {
			setTag(value);
		}
	};

	return [tag, setLimitedTag];
};

export default useTagInput;

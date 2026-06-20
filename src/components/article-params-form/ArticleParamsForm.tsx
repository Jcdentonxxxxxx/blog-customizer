import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';

import {
	backgroundColors,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface IArticleParamsFormProps {
	setApplyOptionState: React.Dispatch<
		React.SetStateAction<typeof defaultArticleState>
	>;
}

export const ArticleParamsForm = (props: IArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const [tempOptionsState, setTempOptionsState] = useState({
		...defaultArticleState,
	});

	const rootRef = useRef(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: undefined,
		onChange: setIsOpen,
	});

	const handleOnChange = (name: string) => (selectedOption: OptionType) => {
		console.log(`Изменён ${name}:`, selectedOption);
		setTempOptionsState({
			...tempOptionsState,
			[name]: selectedOption,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyOptionState();
	};

	const resetOptionState = () => {
		const resetState = { ...defaultArticleState };
		setTempOptionsState(resetState);
		props.setApplyOptionState(resetState);
	};

	const applyOptionState = () => {
		props.setApplyOptionState({ ...tempOptionsState });
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={resetOptionState}>
					<Select
						options={backgroundColors}
						selected={tempOptionsState.backgroundColor}
						title={'Цвет фона'}
						onChange={handleOnChange('backgroundColor')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

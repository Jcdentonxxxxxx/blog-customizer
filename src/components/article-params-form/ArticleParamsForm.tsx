import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	backgroundColors,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface IArticleParamsFormProps {
	setApplyOptionState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = (props: IArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tempOptionsState, setTempOptionsState] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: undefined,
		onChange: setIsOpen,
	});

	const handleOnChange =
		(name: keyof ArticleStateType) => (selectedOption: OptionType) => {
			setTempOptionsState((prev) => {
				return {
					...prev,
					[name]: selectedOption,
				};
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
		<aside
			ref={rootRef}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			/>
			<div className={styles.wrapper}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={resetOptionState}>
					<Text as={'h1'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={tempOptionsState.fontFamilyOption}
						title={'Шрифт'}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={tempOptionsState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						options={fontColors}
						selected={tempOptionsState.fontColor}
						title={'Цвет шрифта'}
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={tempOptionsState.backgroundColor}
						title={'Цвет фона'}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						options={contentWidthArr}
						selected={tempOptionsState.contentWidth}
						title={'Ширина контента'}
						onChange={handleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</div>
		</aside>
	);
};

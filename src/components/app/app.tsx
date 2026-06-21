import { CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const rootRef = useRef<HTMLElement>(null);
	const [applyOptionState, setApplyOptionState] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	useEffect(() => {
		if (rootRef.current) {
			rootRef.current.style.setProperty(
				'--bg-color',
				applyOptionState.backgroundColor.value
			);
			rootRef.current.style.setProperty(
				'--font-family',
				applyOptionState.fontFamilyOption.value
			);
			rootRef.current.style.setProperty(
				'--font-size',
				applyOptionState.fontSizeOption.value
			);
			rootRef.current.style.setProperty(
				'--font-color',
				applyOptionState.fontColor.value
			);
			rootRef.current.style.setProperty(
				'--container-width',
				applyOptionState.contentWidth.value
			);
		}
	}, [applyOptionState]);

	return (
		<main
			ref={rootRef}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': applyOptionState.fontFamilyOption.value,
					'--font-size': applyOptionState.fontSizeOption.value,
					'--font-color': applyOptionState.fontColor.value,
					'--container-width': applyOptionState.contentWidth.value,
					'--bg-color': applyOptionState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setApplyOptionState={setApplyOptionState} />
			<Article />
		</main>
	);
};

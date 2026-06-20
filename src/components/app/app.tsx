import { CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const rootRef = useRef<HTMLElement>(null);
	const [applyOptionState, setApplyOptionState] = useState<
		typeof defaultArticleState
	>({
		...defaultArticleState,
	});

	useEffect(() => {
		rootRef.current &&
			rootRef.current.style.setProperty(
				'--bg-color',
				applyOptionState.backgroundColor.value
			);
	}, [applyOptionState]);

	return (
		<main
			ref={rootRef}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setApplyOptionState={setApplyOptionState} />
			<Article />
		</main>
	);
};

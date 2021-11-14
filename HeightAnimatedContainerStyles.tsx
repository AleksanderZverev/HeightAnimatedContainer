import {css} from '@emotion/css';

export const withAnimationStyles = (duration: number, transitionTimingFunction: string, newHeight: number) => {
    const container = css`
        overflow: hidden;
        transition: height ${duration}ms ${transitionTimingFunction};
        ${ newHeight ? `height: ${newHeight}px;` : ""}
    `;

    return {container};
}
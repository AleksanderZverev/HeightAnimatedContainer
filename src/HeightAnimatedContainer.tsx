import React, {FC, PropsWithChildren} from "react";
import {withAnimationStyles} from './HeightAnimatedContainerStyles';

interface SizeState {
    height: number;
    baseHeight: number;
}

interface MyProps {
    parentHeightAnimatedContainer?: React.MutableRefObject<HeightAnimatedContainer>;
    duration?: number;
    transitionTimingFunction?: string;
}

export class HeightAnimatedContainer extends React.Component<PropsWithChildren<MyProps>, SizeState> {
    static UnmountCSSTransitionExited = (element: React.MutableRefObject<HeightAnimatedContainer>) => {
        element.current.forceUpdate();
    }

    private mainContainer: HTMLDivElement = null;
    private needInnerUpdates = false;
    private duration: number;
    private transitionTimingFunction: string;

    constructor(props: PropsWithChildren<MyProps>) {
        super(props);

        this.duration = props.duration || 200;
        this.transitionTimingFunction = props.transitionTimingFunction || 'ease';

        this.state = {
            height: 0,
            baseHeight: 0,
        }

        this.needInnerUpdates = this.duration <= 200;
    }

    componentDidMount(): void {
        if (!this.state.baseHeight && this.mainContainer ) {
            this.setState({baseHeight: this.mainContainer.scrollHeight});
        }
    }

    private setMainContainer = (element: HTMLDivElement) => {
        if (!element) {
            this.mainContainer.removeEventListener('transitionstart', this.transitionStarted);
            this.mainContainer.removeEventListener('transitionend', this.transitionEnded);
        }

        this.mainContainer = element;

        if (!this.mainContainer)
            return;

        this.mainContainer.addEventListener('transitionstart', this.transitionStarted);
        this.mainContainer.addEventListener('transitionend', this.transitionEnded);
    }

    private transitionStarted = () => {
        if (this.props.parentHeightAnimatedContainer) {
            this.props.parentHeightAnimatedContainer.current.forceUpdate();

            if (!this.needInnerUpdates)
                return;
            
            let diff3 = this.duration * 0.3;
            let diff6 = this.duration * 0.6;
            let diff9 = this.duration * 0.9;
            setTimeout(() => {
                this.props.parentHeightAnimatedContainer.current.forceUpdate();
            }, this.duration - diff9);
            setTimeout(() => {
                this.props.parentHeightAnimatedContainer.current.forceUpdate();
            }, this.duration - diff6);
            setTimeout(() => {
                this.props.parentHeightAnimatedContainer.current.forceUpdate();
            }, this.duration - diff3);
        }
    }

    private transitionEnded = () => {
        if (this.props.parentHeightAnimatedContainer) {
            this.props.parentHeightAnimatedContainer.current.forceUpdate();
        }
    }

    private onChildMounted = (element: HTMLElement) => {
        this.updateHeight(element);
    }

    private updateHeight = (element: HTMLElement) => {
        const height = element.scrollHeight;

        if (this.state.height != height) {
            this.setState({height: height});
        }
    }

    render(): React.ReactNode {
        const {container} = withAnimationStyles(
            this.duration, 
            this.transitionTimingFunction,
            this.state.height || this.state.baseHeight);

        return (
            <div ref={this.setMainContainer} className={container}>
                <NewCallBackContainer onMounted={this.onChildMounted}>
                    {this.props.children}
                </NewCallBackContainer>
            </div>
        );
    }
}

const NewCallBackContainer:FC<PropsWithChildren<OnMountedCallProps>> = (props) => {
    const onMounted = (mainContainer: HTMLDivElement) => {
        if (!mainContainer)
            return;

        props.onMounted(mainContainer);
    }

    return (
        <div ref={onMounted}>
            {props.children}
        </div>
    )
}


interface OnMountedCallProps {
    onMounted: (element: HTMLElement) => void;
}
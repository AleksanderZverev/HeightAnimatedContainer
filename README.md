### Demo

See on:

[Sandbox](https://codesandbox.io/s/react-auto-animated-container-demo-7bvmv)

[Gif](https://github.com/AleksanderZverev/HeightAnimatedContainer/blob/master/demo_presentation.gif)

[Youtube](https://www.youtube.com/watch?v=IqUgMOFOdsU)


### Usage

```tsx
<HeightAnimatedContainer duration={300} transitionTimingFunction="ease">
	<AnyDynamicList>
		{anyChildren}
	</AnyDynamicList>
</HeightAnimatedContainer>
```

### Attention 

If you use another **HeightAnimatedContainer** inside HeightAnimatedContainer, you must specify a **reference** of a parent.

```tsx
<HeightAnimatedContainer ref={parent} duration={300}>
	<AnyDynamicList>
		<HeightAnimatedContainer parentHeightAnimatedContainer={parent} duration={300}>
			{someOtherChildren}
		</HeightAnimatedContainer>
		{anyChildren}
	</AnyDynamicList>
</HeightAnimatedContainer>
```

If you use **CSSTransition** which has **unmountOnExit** property enabled, then you need to call **UnmountCSSTransitionExited** static method in **OnExited** event.

```tsx
<HeightAnimatedContainer ref={parent} duration={300}>
    <CSSTransition
        key={i}
        timeout={animationDurationMS}
        classNames={{
            enterActive: fallDown,
            exitActive: fallDownR,
        }}
        unmountOnExit
        onExited={() => HeightAnimatedContainer.UnmountCSSTransitionExited(parent) }
        >
        <SomeComponent></SomeComponent>
    </CSSTransition>
</HeightAnimatedContainer>
```


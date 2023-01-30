export const runAnimation = (animationScript: Function) => {
    animationScript();
    requestAnimationFrame(() => runAnimation(animationScript));
}

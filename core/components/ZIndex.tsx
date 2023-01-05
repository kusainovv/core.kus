import React, { createRef, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * Component created for combining all elements with z-index logic into one
 * including z-index layout priority - if there're the same elements with the equivalent z-index
 * last element with the same z-index - be show.
 * @returns react portal in which container is last div at page
*/
export const ZIndex : React.FC<{ children: ReactNode }> = ({ children }) => {
    const ref_content = createRef<HTMLDivElement>();

    const [container, setContainer] = useState<HTMLElement | null>(null);
    useEffect(() => {
        if (container === null) {
            setContainer(document.createElement('div'));
        }

        container && document.body.appendChild(container);
        return () => {
          container && document.body.removeChild(container);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ container ]);

    if (container) {
        return ReactDOM.createPortal(<div ref={ref_content}>
            {children}
        </div>, container as Element);
    }

    return <></>
}
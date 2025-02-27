import { ReactNode } from 'react';

type ISectionProps = {
    title?: string;
    description?: string;
    yPadding?: string;
    children: ReactNode;
};

const Section = (props: ISectionProps) => (
    <div
        className={`w-full mx-auto bg-gray-200 px-3 h-52 ${
            props.yPadding ? props.yPadding : 'py-16'
        }`}>
        {(props.title || props.description) && (
            <div className="mb-12 text-center">
                {props.title && (
                    <h2 className="text-4xl text-gray-900 font-bold">
                        {props.title}
                    </h2>
                )}
                {props.description && (
                    <div className="mt-4 text-xl md:px-20">
                        {props.description}
                    </div>
                )}
            </div>
        )}

        {props.children}
    </div>
);

export { Section };

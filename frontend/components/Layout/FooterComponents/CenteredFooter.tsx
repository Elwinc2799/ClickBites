import { ReactNode } from 'react';

import { FooterCopyright } from './FooterCopyright';

type ICenteredFooterProps = {
    logo: ReactNode;
    children: ReactNode;
};

const CenteredFooter = (props: ICenteredFooterProps) => (
    <div className="text-center">
        {props.logo}

        <div className="mt-8 text-sm">
            <FooterCopyright />
        </div>

        <style jsx>
            {`
                .navbar :global(li) {
                    margin-left: 1rem /* 16px */;
                    margin-right: 1rem /* 16px */;
                }
            `}
        </style>
    </div>
);

export { CenteredFooter };
